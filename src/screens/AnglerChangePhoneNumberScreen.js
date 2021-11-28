import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Button, Center, VStack } from "native-base";
import React, { useCallback, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";

import InputComponent from "../components/common/InputComponent";
import PasswordInput from "../components/common/PasswordInput";
import HeaderTab from "../components/HeaderTab";
import { DICTIONARY, ROUTE_NAMES, SCHEMA } from "../constants";
import { goToOTPScreen } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const ChangePhoneNumberScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const formData = useRef(null);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.CHANGE_PHONE_NUMBER_FORM),
  });
  const { handleSubmit } = methods;

  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);
  const changePhoneNumber = useStoreActions(
    (actions) => actions.ProfileModel.changePhoneNumber,
  );
  const logOut = useStoreActions((actions) => actions.logOut);

  const handleError = () => {
    setIsLoading(false);
  };

  /**
   * Start change phone number chain action
   * @param {Object} data form data to send to api
   * @param {string} data.phone new phone number that need to be linked with the account
   * @param {string} data.password current password
   * @returns nothing
   */
  const changePhoneNumberAction = (data) => () => {
    setIsLoading(true);
    formData.current = data;
    sendOtp({ phone: data.phone, existedStatus: DICTIONARY.STATUS_NON_EXISTED })
      .then(() => {
        setIsLoading(false);
        goToOTPScreen(
          navigation,
          ROUTE_NAMES.PROFILE_CHANGE_PHONE_NUMBER,
          formData.current.phone,
        );
      })
      .catch(handleError);
  };

  const onSubmit = (data) => {
    showAlertConfirmBox(
      DICTIONARY.ALERT_TITLE,
      DICTIONARY.ALERT_CHANGE_PHONE_PROMPT_MSG,
      changePhoneNumberAction(data),
    );
  };

  /**
   * Trigger when navigation goes back to this screen
   */
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.otpSuccess) {
        setIsLoading(true);
        changePhoneNumber({ ...formData.current })
          .then(() => {
            showToastMessage(DICTIONARY.TOAST_CHANGE_PHONE_NUMBER_SUCCESS_MSG);
            logOut();
          })
          .catch(handleError);
      }
    }, [route.params]),
  );

  return (
    <Center flex={1} minHeight={Math.round(useWindowDimensions().height)}>
      <HeaderTab name={DICTIONARY.ANGLER_CHANGE_PHONE_NUMBER_HEADER} />
      <FormProvider {...methods}>
        <VStack
          flex={1}
          justifyContent="center"
          space={3}
          mb={10}
          w={{ base: "70%", md: "50%", lg: "30%" }}
        >
          <InputComponent
            label={DICTIONARY.PHONE_NUMBER_LABEL}
            useNumPad
            isTitle
            hasAsterisk
            placeholder={DICTIONARY.INPUT_PHONE_NUMBER_PLACEHOLDER}
            controllerName={DICTIONARY.FORM_FIELD_ANGLER_PHONE}
          />
          <PasswordInput
            label={DICTIONARY.PASSWORD_LABEL}
            isTitle
            hasAsterisk
            placeholder={DICTIONARY.INPUT_PASSWORD_PLACEHOLDER}
            controllerName={DICTIONARY.FORM_FIELD_PASSWORD}
          />
          {/* Continue/Submit button */}
          <Button
            mt={4}
            isLoading={isLoading}
            isLoadingText={DICTIONARY.PROCESSING_BUTTON_LABEL}
            onPress={handleSubmit(onSubmit)}
          >
            Tiếp tục
          </Button>
        </VStack>
      </FormProvider>
    </Center>
  );
};

export default ChangePhoneNumberScreen;
