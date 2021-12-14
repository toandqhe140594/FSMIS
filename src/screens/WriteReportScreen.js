import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, View } from "react-native";
import { Button } from "react-native-elements";

import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import { DICTIONARY, SCHEMA } from "../constants";
import ReportModel from "../models/ReportModel";
import { goBack } from "../navigations";
import { showAlertAbsoluteBox, showToastMessage } from "../utilities";
import store from "../utilities/Store";

store.addModel("ReportModel", ReportModel);

const OFF_SET = 38;
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFF_SET;

const ReportScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const reportParam = useRef({});
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.WRITE_REPORT_FORM),
  });
  const { handleSubmit } = methods;
  const [sendStatus, setSendStatus] = useState(null);
  const sendReport = useStoreActions(
    (actions) => actions.ReportModel.sendReport,
  );

  const handleGoBack = () => {
    goBack(navigation);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    sendReport({
      reportDtoIn: data.content,
      ...reportParam.current,
      setSendStatus,
    });
  };

  useEffect(() => {
    // If there are params pass through
    if (route.params.id) {
      const { id, type } = route.params;
      reportParam.current = { id, type };
    }
  }, []);

  useEffect(() => {
    if (sendStatus === true) {
      setIsLoading(false);
      showAlertAbsoluteBox(
        DICTIONARY.ALERT_TITLE,
        DICTIONARY.ALERT_CREATE_REPORT_SUCCESS,
        handleGoBack,
      );
    }
    if (sendStatus === false) {
      setIsLoading(false);
      showToastMessage(DICTIONARY.TOAST_CREATE_REPORT_FAIL_MSG);
    }
    setSendStatus(null);
  }, [sendStatus]);

  return (
    <View style={{ height: CUSTOM_SCREEN_HEIGHT }}>
      <HeaderTab name={DICTIONARY.ANGLER_WRITE_REPORT_HEADER} />
      <FormProvider {...methods}>
        <View
          style={{
            flex: 1,
            marginTop: 12,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextAreaComponent
            isTitle
            hasAsterisk
            numberOfLines={6}
            myStyles={{ width: "90%" }}
            label={DICTIONARY.REPORT_LABEL}
            placeholder={DICTIONARY.INPUT_REPORT_PLACEHOLDER}
            controllerName={DICTIONARY.FORM_FIELE_REPORT_CONTENT}
          />
          <Button
            loading={isLoading}
            title={DICTIONARY.REPORT_BUTTON_LABEL}
            containerStyle={{ width: "90%" }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </FormProvider>
    </View>
  );
};

export default ReportScreen;
