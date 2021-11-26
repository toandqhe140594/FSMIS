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

import InputComponent from "../components/common/InputComponent";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { goToChangePasswordScreen, goToOTPScreen } from "../navigations";

const PhoneIcon = () => (
  <Icon
    as={<MaterialIcons name="phone-iphone" />}
    size={5}
    ml={2}
    color="muted.500"
  />
);

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const phoneNumber = useRef(null);
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SCHEMA.PHONE_NUMBER),
  });
  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);
  const { handleSubmit } = methods;

  // Event fire when submit form
  const onSubmit = (data) => {
    setLoading(true);
    phoneNumber.current = data.phoneNumber;
    sendOtp({ phone: data.phoneNumber, existedStatus: "EXISTED" })
      .then(() => {
        setLoading(false);
        goToOTPScreen(
          navigation,
          ROUTE_NAMES.PASSWORD_FORGOT,
          data.phoneNumber,
        );
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.otpSuccess === true) {
        goToChangePasswordScreen(navigation, { ...phoneNumber.current });
      }
    }, [route.params]),
  );

  return (
    <Center flex={1}>
      <Heading size="lg">Quên mật khẩu</Heading>
      <Text fontSize="lg">Bạn hãy nhập số điện thoại</Text>
      <FormProvider {...methods}>
        <VStack mt={6} space={2} w="70%">
          {/* Phone number input field */}
          <InputComponent
            useNumPad
            placeholder="Nhập số điện thoại"
            controllerName="phoneNumber"
            leftIcon={<PhoneIcon />}
          />
          {/* Submit button */}
          <Button
            size="lg"
            w="100%"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
            isDisabled={loading}
          >
            Tiếp tục
          </Button>
        </VStack>
      </FormProvider>
    </Center>
  );
};

export default ForgotPasswordScreen;
