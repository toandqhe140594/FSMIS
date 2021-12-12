import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, Divider, Stack, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";

import DistrictSelector from "../components/common/DistrictSelector";
import InputComponent from "../components/common/InputComponent";
import InputWithClipboard from "../components/common/InputWithClipboard";
import MultiImageSection from "../components/common/MultiImageSection";
import OverlayLoading from "../components/common/OverlayLoading";
import ProvinceSelector from "../components/common/ProvinceSelector";
import TextAreaComponent from "../components/common/TextAreaComponent";
import WardSelector from "../components/common/WardSelector";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";
import { DEFAULT_TIMEOUT, DICTIONARY, ROUTE_NAMES, SCHEMA } from "../constants";
import { goToOTPScreen } from "../navigations";
import { showAlertBox } from "../utilities";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
});

const getAddressFromFullAddress = (fullAddress, addressFromWard) => {
  let result = fullAddress;
  result = result.replace(
    `, ${addressFromWard.ward}, ${addressFromWard.district}, ${addressFromWard.province}`,
    "",
  );
  return result;
};

const FManageEditProfileScreen = () => {
  const route = useRoute();
  const locationData = useRef(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const { locationLatLng, locationDetails } = useStoreState(
    (states) => states.FManageModel,
  );
  const { resetDataList, getAllProvince } = useStoreActions(
    (actions) => actions.AddressModel,
  );
  const { editFishingLocation } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: locationDetails.name,
      phone: locationDetails.phone,
      website: locationDetails.website,
      address: getAddressFromFullAddress(
        locationDetails.address,
        locationDetails.addressFromWard,
      ),
      provinceId: locationDetails.addressFromWard.provinceId,
      districtId: locationDetails.addressFromWard.districtId,
      wardId: locationDetails.addressFromWard.wardId,
      description: locationDetails.description,
      service: locationDetails.service,
      timetable: locationDetails.timetable,
      rule: locationDetails.rule,
      imageArray: locationDetails.image.map((image, index) => ({
        id: index,
        base64: image,
      })),
    },
    resolver: yupResolver(SCHEMA.FMANAGE_PROFILE_FORM),
  });

  const { handleSubmit, setValue } = methods;

  const handleError = () => {
    setIsLoading(false);
    showAlertBox(DICTIONARY.ALERT_TITLE, DICTIONARY.ALERT_ERROR_MSG);
  };

  const handleEditSuccess = () => {
    setIsLoading(false);
    showAlertBox(
      DICTIONARY.ALERT_TITLE,
      DICTIONARY.ALERT_EDIT_LOCATION_SUCCESS_MSG,
    );
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const images = data.imageArray.map((pic) => pic.base64);
    delete data.imageArray;
    delete data.provinceId;
    delete data.districtId;
    const updateData = { ...data, ...locationLatLng, images };
    // New phone input need OTP validation
    if (updateData.phone !== locationDetails.phone) {
      locationData.current = updateData;
      sendOtp({ phone: updateData.phone })
        .then(() => {
          setIsLoading(false);
          goToOTPScreen(
            navigation,
            ROUTE_NAMES.FMANAGE_PROFILE_EDIT,
            locationData.current.phone,
          );
        })
        .catch(handleError);
    } else {
      editFishingLocation({ updateData })
        .then(handleEditSuccess)
        .catch(handleError);
    }
  };

  useEffect(() => {
    getAllProvince().then(() => {
      setIsLoading(false);
      setFullScreen(false);
    });
    const loadingId = setTimeout(() => {
      setIsLoading(false);
      setFullScreen(false);
    }, DEFAULT_TIMEOUT);
    return () => {
      resetDataList();
      clearTimeout(loadingId);
    };
  }, []);

  // Fire when naviagtes back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setValue(DICTIONARY.FORM_FIELD_IMAGE_ARRAY, route.params.base64Array);
        navigation.setParams({ base64Array: [] });
      }
      if (route.params?.otpSuccess) {
        setIsLoading(true);
        editFishingLocation({ updateData: locationData.current })
          .then(handleEditSuccess)
          .catch(handleError);
      }
    }, [route.params]),
  );

  if (isLoading && fullScreen) {
    return <OverlayLoading coverScreen />;
  }
  return (
    <>
      <HeaderTab name={DICTIONARY.FMANAGE_EDIT_LOCATION_HEADER} />
      <OverlayLoading loading={isLoading} />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center>
              {/* Image Picker section */}
              <Stack space={2} style={styles.sectionWrapper}>
                <Text bold fontSize="md" mt={2}>
                  Ảnh bìa (nhiều nhất là 5)
                </Text>
                <MultiImageSection
                  formRoute={ROUTE_NAMES.FMANAGE_PROFILE_EDIT}
                  selectLimit={5}
                  controllerName={DICTIONARY.FORM_FIELD_IMAGE_ARRAY}
                />
                {/* Input location name */}
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
                {/* Information input and select fields */}
                <InputComponent
                  label={DICTIONARY.LOCATION_PHONE_LABEL}
                  placeholder={DICTIONARY.INPUT_LOCATION_PHONE_PLACEHOLDER}
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
                  hasAsterisk
                  controllerName={DICTIONARY.FORM_FIELD_ADDRESS}
                />
                <ProvinceSelector
                  hasAsterisk
                  label={DICTIONARY.PROVINCE_LABEL}
                  placeholder={DICTIONARY.SELECT_PROVINCE_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_PROVINCE}
                />
                <DistrictSelector
                  hasAsterisk
                  label={DICTIONARY.DISTRICT_LABEL}
                  placeholder={DICTIONARY.SELECT_DISTRICT_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_DISTRICT}
                />
                <WardSelector
                  hasAsterisk
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
                  <Text color="danger.500" fontSize="md">
                    *
                  </Text>
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
                hasAsterisk
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
                hasAsterisk
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
                hasAsterisk
                placeholder={DICTIONARY.INPUT_LOCATION_SERVICE_PLACEHOLDER}
                numberOfLines={6}
                controllerName={DICTIONARY.FORM_FIELD_LOCATION_SERVICE}
              />
            </Center>

            <Center>
              {/* rules textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={DICTIONARY.LOCATION_RULE_LABEL}
                isTitle
                hasAsterisk
                placeholder={DICTIONARY.INPUT_LOCATION_RULE_PLACEHOLDER}
                numberOfLines={6}
                controllerName={DICTIONARY.FORM_FIELD_LOCATION_RULE}
              />
            </Center>

            <Center>
              <Box style={styles.sectionWrapper} mb={5}>
                {/* Submit button */}
                <Button
                  w="90%"
                  alignSelf="center"
                  onPress={handleSubmit(onSubmit)}
                >
                  Lưu thông tin
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default FManageEditProfileScreen;
