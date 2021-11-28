import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  useWindowDimensions,
} from "react-native";

import InputComponent from "../components/common/InputComponent";
import PasswordInput from "../components/common/PasswordInput";
import { DICTIONARY, SCHEMA } from "../constants";
import { goToForgotPasswordScreen, goToRegisterScreen } from "../navigations";
import { showToastMessage } from "../utilities";

const PhoneIcon = () => (
  <Icon
    as={<MaterialIcons name="phone-iphone" />}
    size={5}
    ml={2}
    color="muted.500"
  />
);

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const minHeight = Math.round(
    useWindowDimensions().height - StatusBar.currentHeight,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.LOGIN_FORM),
  });
  const { handleSubmit } = methods;
  const login = useStoreActions((actions) => actions.login);

  const registerAction = () => {
    goToRegisterScreen(navigation);
  };

  const forgotPasswordAction = () => {
    goToForgotPasswordScreen(navigation);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    login({ phone: data.phoneNumber, password: data.password })
      .then(() => {
        showToastMessage(DICTIONARY.TOAST_LOGIN_SUCCESS_MSG);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Box flex={1} minHeight={minHeight}>
          <Center flex={1}>
            <Image
              source={require("../assets/images/logo.png")}
              alt="Logo"
              size="xl"
            />
          </Center>
          <Center flex={1.8}>
            <Heading size="lg">Xin chào</Heading>
            <Text fontSize="lg">
              Hãy cùng khám phá với <Text bold>FSMIS</Text>!
            </Text>
            <FormProvider {...methods}>
              <VStack flex={1} mt={6} space={2} w={{ base: "70%", md: "50" }}>
                {/* Phone number input field */}
                <InputComponent
                  useNumPad
                  placeholder={DICTIONARY.INPUT_PHONE_NUMBER_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_PHONE_NUMBER}
                  leftIcon={<PhoneIcon />}
                />
                {/* Password input field */}
                <PasswordInput
                  placeholder={DICTIONARY.INPUT_PASSWORD_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_PASSWORD}
                />
                <Text
                  underline
                  alignSelf="flex-end"
                  onPress={forgotPasswordAction}
                >
                  Quên mật khẩu?
                </Text>

                {/* Submit button */}
                <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
                  Đăng nhập
                </Button>
              </VStack>
            </FormProvider>
          </Center>
          <Box justifyContent="flex-end" alignItems="center" mb={6}>
            <Text>
              Bạn chưa có tài khoản?{" "}
              <Text underline onPress={registerAction}>
                Đăng ký
              </Text>
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
