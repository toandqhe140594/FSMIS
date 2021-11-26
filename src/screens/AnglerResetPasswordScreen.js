import { yupResolver } from "@hookform/resolvers/yup";
import { useStoreActions } from "easy-peasy";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-elements";

import PasswordInput from "../components/common/PasswordInput";
import HeaderTab from "../components/HeaderTab";
import { SCHEMA } from "../constants";
import { showToastMessage } from "../utilities";

const ResetPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SCHEMA.ANGLER_PROFILE_PASSWORD_CHANGE_FORM),
  });
  const { handleSubmit } = methods;
  const changePassword = useStoreActions(
    (actions) => actions.ProfileModel.changePassword,
  );
  const logOut = useStoreActions((actions) => actions.logOut);

  const onSubmit = (data) => {
    setLoading(true);
    changePassword({ updateData: data })
      .then(() => {
        showToastMessage("Đổi mật khẩu thành công");
        logOut(); // Logout after change password successfully
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderTab name="Thay đổi mật khẩu" />
      <FormProvider {...methods}>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            paddingTop: 40,
          }}
        >
          <View style={{ width: "80%" }}>
            <PasswordInput
              isTitle
              label="Mật khẩu cũ"
              hasAsterisk
              placeholder="Nhập mật khẩu cũ"
              controllerName="oldPassword"
            />
            <PasswordInput
              isTitle
              label="Mật khẩu mới"
              hasAsterisk
              placeholder="Nhập mật khẩu mới"
              controllerName="newPassword"
              myStyles={{ marginVertical: 20 }}
            />
            <PasswordInput
              isTitle
              label="Nhập lại mật khẩu mới"
              hasAsterisk
              placeholder="Nhập lại mật khẩu mới"
              controllerName="repeatPassword"
            />

            <Button
              title="Gửi"
              onPress={handleSubmit(onSubmit)}
              containerStyle={{ marginTop: 30 }}
              loading={loading}
            />
          </View>
        </View>
      </FormProvider>
    </View>
  );
};

export default ResetPasswordScreen;
