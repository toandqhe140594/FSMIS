import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, Divider, Stack, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import DistrictSelector from "../components/common/DistrictSelector";
import InputComponent from "../components/common/InputComponent";
import InputWithClipboard from "../components/common/InputWithClipboard";
import ProvinceSelector from "../components/common/ProvinceSelector";
import TextAreaComponent from "../components/common/TextAreaComponent";
import WardSelector from "../components/common/WardSelector";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";
import { DICTIONARY, SCHEMA } from "../constants";
import { showAlertAbsoluteBox, showAlertBox } from "../utilities";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
  loadOnStart: { justifyContent: "center", alignItems: "center" },
  loadOnSubmit: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

const FManageAddNewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const { locationLatLng } = useStoreState((states) => states.FManageModel);
  const { resetDataList, getAllProvince } = useStoreActions(
    (actions) => actions.AddressModel,
  );
  const { createSuggestedLocation } = useStoreActions(
    (actions) => actions.AdminFLocationModel,
  );

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { provinceId: 0, districtId: 0 },
    resolver: yupResolver(SCHEMA.ADMIN_FMANAGE_PROFILE_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const setDefaultValues = () => {
    if (route.params?.suggestData) {
      Object.entries(route.params?.suggestData).forEach(([field, value]) => {
        if (value) setValue(field, value);
      });
    }
  };

  const goBackToSuggestionList = () => {
    navigation.pop(2);
  };

  const handleError = () => {
    setIsLoading(false);
    showAlertBox(DICTIONARY.ALERT_TITLE, DICTIONARY.ALERT_ERROR_MSG);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    delete data.provinceId;
    delete data.districtId;
    const addData = { ...data, ...locationLatLng };
    createSuggestedLocation({ addData })
      .then(() => {
        showAlertAbsoluteBox(
          DICTIONARY.ALERT_TITLE,
          DICTIONARY.ALERT_ADD_LOCATION_SUCCESS_MSG,
          goBackToSuggestionList,
          DICTIONARY.CONFIRM_BUTTON_LABEL,
        );
      })
      .catch(handleError);
  };

  /**
   * Trigger first time when enters
   * and when screen unmounts
   */
  useEffect(() => {
    getAllProvince().then(() => {
      setDefaultValues();
      setIsLoading(false);
      setFullScreen(false);
    });
    const loadingId = setTimeout(() => {
      setIsLoading(false);
      setFullScreen(false);
    }, 10000);
    return () => {
      resetDataList();
      clearTimeout(loadingId);
    };
  }, []);

  /**
   * Trigger when navigation goes back to this screen
   */
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setValue(DICTIONARY.FORM_FIELD_IMAGE_ARRAY, route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name={DICTIONARY.FMANAGE_ADD_LOCATION_HEADER} />
      <Overlay
        isVisible={isLoading}
        fullScreen
        overlayStyle={fullScreen ? styles.loadOnStart : styles.loadOnSubmit}
      >
        <ActivityIndicator size={60} color="#2089DC" />
      </Overlay>
      <ScrollView>
        <FormProvider {...methods}>
          <VStack mt={4} space={3} divider={<Divider />}>
            <Center>
              <Stack space={2} style={styles.sectionWrapper}>
                <InputComponent
                  isTitle
                  label={DICTIONARY.LOCATION_NAME_LABEL}
                  hasAsterisk
                  placeholder={DICTIONARY.INPUT_LOCATION_NAME_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_LOCATION_NAME}
                />
              </Stack>
            </Center>
            <Center>
              <VStack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Thông tin liên hệ
                </Text>
                <InputComponent
                  useNumPad
                  label={DICTIONARY.LOCATION_PHONE_LABEL}
                  placeholder={DICTIONARY.INPUT_LOCATION_PHONE_PLACEHOLDER}
                  hasAsterisk
                  controllerName={DICTIONARY.FORM_FIELD_LOCATION_PHONE}
                />
                <InputWithClipboard
                  label={DICTIONARY.LOCATION_WEBSITE_LABEL}
                  placeholder={DICTIONARY.INPUT_LOCATION_WEBSITE_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_LOCATION_WEBSITE}
                />
                <InputComponent
                  label={DICTIONARY.ADDRESS_LABEL}
                  placeholder={DICTIONARY.INPUT_ADDRESS_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_ADDRESS}
                />
                <ProvinceSelector
                  label={DICTIONARY.PROVINCE_LABEL}
                  placeholder={DICTIONARY.SELECT_PROVINCE_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_PROVINCE}
                />
                <DistrictSelector
                  label={DICTIONARY.DISTRICT_LABEL}
                  placeholder={DICTIONARY.SELECT_DISTRICT_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_DISTRICT}
                />
                <WardSelector
                  label={DICTIONARY.WARD_LABEL}
                  placeholder={DICTIONARY.SELECT_WARD_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_WARD}
                />
              </VStack>
            </Center>

            <Center>
              {/* Map component */}
              <Box style={styles.sectionWrapper}>
                <Text bold fontSize="md" mb={2}>
                  Bản đồ
                </Text>
                <MapOverviewBox />
              </Box>
            </Center>

            <Center>
              {/* Description textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={DICTIONARY.LOCATION_DESCRIPTION_LABEL}
                isTitle
                placeholder={DICTIONARY.INPUT_LOCATION_DESCRIPTION_PLACEHOLDER}
                numberOfLines={6}
                controllerName={DICTIONARY.FORM_FIELD_LOCATION_DESCRIPTION}
              />
            </Center>

            <Center>
              {/* Schedule textarea  */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={DICTIONARY.LOCATION_TIMETABLE_LABEL}
                isTitle
                placeholder={DICTIONARY.INPUT_LOCATION_TIMETABLE_PLACEHOLDER}
                numberOfLines={6}
                controllerName={DICTIONARY.FORM_FIELD_LOCATION_TIMETABLE}
              />
            </Center>

            <Center>
              {/* Service textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={DICTIONARY.LOCATION_SERVICE_LABEL}
                isTitle
                placeholder={DICTIONARY.INPUT_LOCATION_SERVICE_PLACEHOLDER}
                numberOfLines={6}
                controllerName={DICTIONARY.FORM_FIELD_LOCATION_SERVICE}
              />
            </Center>

            <Center>
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={DICTIONARY.LOCATION_RULE_LABEL}
                isTitle
                placeholder={DICTIONARY.INPUT_LOCATION_RULE_PLACEHOLDER}
                numberOfLines={6}
                controllerName={DICTIONARY.FORM_FIELD_LOCATION_RULE}
              />
            </Center>

            <Center>
              <Box style={styles.sectionWrapper} mb={5}>
                {/* Submit button */}
                <Button
                  style={styles.button}
                  alignSelf="center"
                  onPress={handleSubmit(onSubmit)}
                >
                  Thêm điểm câu
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default FManageAddNewScreen;
