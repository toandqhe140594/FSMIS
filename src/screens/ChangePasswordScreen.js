import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Button, Center, Heading, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BackHandler } from "react-native";

import PasswordInput from "../components/common/PasswordInput";
import { SCHEMA } from "../constants";
import { goToLoginScreen } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const ChangePasswordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.FORGOT_PASSWORD_FORM),
  });
  const { handleSubmit } = methods;
  const resetPassword = useStoreActions(
    (actions) => actions.UtilModel.resetPassword,
  );

  const onSubmit = (data) => {
    setLoading(true);
    resetPassword({ password: data.password, phone: route.params?.phone })
      .then(() => {
        showToastMessage("Đổi mật khẩu thành công");
        goToLoginScreen(navigation);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const goBackToLoginScreen = () => {
    goToLoginScreen(navigation);
  };

  useEffect(() => {
    /**
     * Show alert box confirm go back to login screen action
     * @returns true
     */
    const backAction = () => {
      showAlertConfirmBox(
        "Cảnh báo",
        "Bạn có muốn quay về màn hình đăng nhập không",
        goBackToLoginScreen,
      );
      return true;
    };

    // Overwrite android back press
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    // Remove back press handler when unmount screen
    return () => backHandler.remove();
  }, []);

  return (
    <Center flex={1}>
      <Heading size="lg">Thay đổi mật khẩu</Heading>
      <FormProvider {...methods}>
        <VStack mt={4} space={4} w="70%">
          {/* Password input field */}
          <PasswordInput
            placeholder="Nhập mật khẩu mới"
            controllerName="password"
          />
          {/* Password confirmation */}
          <PasswordInput
            placeholder="Nhập lại mật khẩu mới"
            controllerName="passwordConfirmation"
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

export default ChangePasswordScreen;
