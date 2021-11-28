import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Button, Center, Heading, Icon, Text, VStack } from "native-base";
import React, { useCallback, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import InputComponent from "../components/common/InputComponent";
import PasswordInput from "../components/common/PasswordInput";
import { DICTIONARY, ROUTE_NAMES, SCHEMA } from "../constants";
import {
  goToLoginScreen,
  goToOTPScreen,
  goToRegisterInformationScreen,
} from "../navigations";
import { showToastMessage } from "../utilities";

const PhoneIcon = () => (
  <Icon
    as={<MaterialIcons name="phone-iphone" />}
    size={5}
    ml={2}
    color="muted.500"
  />
);

const RegisterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const accountData = useRef(null);
  const [loading, setLoading] = useState(false);
  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.REGISTER_PHONE_AND_PASS_FORM),
  });
  const { handleSubmit } = methods;
  const minHeight = Math.round(useWindowDimensions().height - 50);

  // Event fire when submit form
  const onSubmit = (data) => {
    accountData.current = data;
    setLoading(true);
    sendOtp({
      phone: data.phoneNumber,
      existedStatus: DICTIONARY.STATUS_NON_EXISTED,
    })
      .then(() => {
        goToOTPScreen(
          navigation,
          ROUTE_NAMES.REGISTER,
          accountData.current.phoneNumber,
        );
      })
      .catch(() => {
        setLoading(false);
        showToastMessage(DICTIONARY.TOAST_NON_EXISTED_INVALID_PHONE_MSG);
      });
  };

  const navigateToLoginScreenAction = () => {
    goToLoginScreen(navigation);
  };

  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.otpSuccess === true)
        goToRegisterInformationScreen(navigation, {
          phone: accountData.current.phoneNumber,
          password: accountData.current.password,
        });
    }, [route.params]),
  );

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <FormProvider {...methods}>
          <Center flex={1} justifyContent="center" minHeight={minHeight}>
            <VStack
              flex={1}
              justifyContent="center"
              space={2}
              w={{ base: "70%", md: "50%", lg: "30%" }}
            >
              <Center mb={10}>
                <Heading textAlign="center" size="lg" width="100%">
                  Đăng ký
                </Heading>
                <Text fontSize="lg">Tạo tài khoản mới</Text>
              </Center>

              {/* Phone number input field */}
              <InputComponent
                label={DICTIONARY.PHONE_NUMBER_LABEL}
                useNumPad
                hasAsterisk
                placeholder={DICTIONARY.INPUT_PHONE_NUMBER_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_PHONE_NUMBER}
                leftIcon={<PhoneIcon />}
              />
              {/* Password input field */}
              <PasswordInput
                label={DICTIONARY.PASSWORD_LABEL}
                hasAsterisk
                placeholder={DICTIONARY.INPUT_PASSWORD_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_PASSWORD}
              />
              {/* Password confirmation input field */}
              <PasswordInput
                label={DICTIONARY.PASSWORD_CONFIRMATION_LABEL}
                hasAsterisk
                placeholder={DICTIONARY.INPUT_PASSWORD_CONFIRMATION_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_PASSWORD_CONFIRMATION}
              />
              {/* Submit button */}
              <Button
                mt={3}
                size="lg"
                onPress={handleSubmit(onSubmit)}
                isLoading={loading}
                isDisabled={loading}
              >
                Đăng ký
              </Button>
            </VStack>

            <Text mb={6}>
              Bạn chưa có tài khoản?{" "}
              <Text underline onPress={navigateToLoginScreenAction}>
                Đăng nhập
              </Text>
            </Text>
          </Center>
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
