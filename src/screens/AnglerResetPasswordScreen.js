import { yupResolver } from "@hookform/resolvers/yup";
import { useStoreActions } from "easy-peasy";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-elements";

import PasswordInput from "../components/common/PasswordInput";
import HeaderTab from "../components/HeaderTab";
import { DICTIONARY, SCHEMA } from "../constants";
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
        showToastMessage(DICTIONARY.TOAST_CHANGE_PASSWORD_SUCCESS_MSG);
        logOut();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderTab name={DICTIONARY.ANGLER_RESET_PASSWORD_HEADER} />
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
              hasAsterisk
              label={DICTIONARY.OLD_PASSWORD_LABEL}
              placeholder={DICTIONARY.INPUT_OLD_PASSWORD_PLACEHOLDER}
              controllerName={DICTIONARY.FORM_FIELD_OLD_PASSWORD}
            />
            <PasswordInput
              isTitle
              hasAsterisk
              label={DICTIONARY.NEW_PASSWORD_LABEL}
              placeholder={DICTIONARY.INPUT_NEW_PASSWORD_PLACEHOLDER}
              controllerName={DICTIONARY.FORM_FIELD_NEW_PASSWORD}
              myStyles={{ marginVertical: 20 }}
            />
            <PasswordInput
              isTitle
              hasAsterisk
              label={DICTIONARY.NEW_PASSWORD_CONFIRMATION_LABEL}
              controllerName={DICTIONARY.FORM_FIELD_NEW_PASSWORD_CONFIRMATION}
              placeholder={
                DICTIONARY.INPUT_NEW_PASSWORD_CONFIRMATION_PLACEHOLDER
              }
            />

            <Button
              title={DICTIONARY.SEND_BUTTON_LABEL}
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
