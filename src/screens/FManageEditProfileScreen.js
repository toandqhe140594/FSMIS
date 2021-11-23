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
import MultiImageSection from "../components/common/MultiImageSection";
import ProvinceSelector from "../components/common/ProvinceSelector";
import TextAreaComponent from "../components/common/TextAreaComponent";
import WardSelector from "../components/common/WardSelector";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { showAlertBox } from "../utilities";

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
const STATUS_SUCCESS = "SUCCESS";
const STATUS_FAILED = "FAILED";
const ALERT_TITLE = "Thông báo";
const ALERT_EDIT_LOCATION_SUCCESS_MSG = "Cập nhật điểm câu thành công";
const ALERT_ERROR_MSG = "Đã xảy ra lỗi! Vui lòng thử lại sau.";
const FMANAGE_EDIT_LOCATION_HEADER = "Thông tin điểm câu";

const FORM_FIELD_IMAGE_ARRAY = "imageArray";
const FORM_FIELD_LOCATION_NAME = "name";
const FORM_FIELD_LOCATION_PHONE = "phone";
const FORM_FIELD_LOCATION_WEBSITE = "website";
const FORM_FIELD_ADDRESS = "address";
const FORM_FIELD_PROVINCE = "provinceId";
const FORM_FIELD_DISTRICT = "districtId";
const FORM_FIELD_WARD = "wardId";
const FORM_FIELD_LOCATION_DESCRIPTION = "description";
const FORM_FIELD_LOCATION_TIMETABLE = "timetable";
const FORM_FIELD_LOCATION_SERVICE = "service";
const FORM_FIELD_LOCATION_RULE = "rule";

const LOCATION_NAME_LABEL = "Tên điểm câu";
const LOCATION_PHONE_LABEL = "Số điện thoại";
const LOCATION_WEBSITE_LABEL = "Website";
const ADDRESS_LABEL = "Địa chỉ";
const PROVINCE_LABEL = "Tỉnh/Thành phố";
const DISTRICT_LABEL = "Quận/Huyện";
const WARD_LABEL = "Phường/Xã";
const LOCATION_DESCRIPTION_LABEL = "Mô tả khu hồ";
const LOCATION_TIMETABLE_LABEL = "Thời gian hoạt động";
const LOCATION_SERVICE_LABEL = "Dịch vụ";
const LOCATION_RULE_LABEL = "Nội quy";

const INPUT_LOCATION_NAME_PLACEHOLDER = "Nhập tên địa điểm câu";
const INPUT_LOCATION_PHONE_PLACEHOLDER = "Nhập số điện thoại";
const INPUT_LOCATION_WEBSITE_PLACEHOLDER = "Nhập website/facebook";
const INPUT_ADDRESS_PLACEHOLDER = "Nhập địa chỉ";
const SELECT_PROVINCE_PLACEHOLDER = "Chọn tỉnh/thành phố";
const SELECT_DISTRICT_PLACEHOLDER = "Chọn quận/huyện";
const SELECT_WARD_PLACEHOLDER = "Chọn phường/xã";
const INPUT_LOCATION_DESCRIPTION_PLACEHOLDER = "Miêu tả khu hồ của bạn";
const INPUT_LOCATION_TIMETABLE_PLACEHOLDER =
  "Miêu tả thời gian hoạt động của khu hồ";
const INPUT_LOCATION_SERVICE_PLACEHOLDER = "Miêu tả dịch vụ khu hồ";
const INPUT_LOCATION_RULE_PLACEHOLDER = "Miêu tả nội quy khu hồ";

const FManageEditProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [getStatus, setGetStatus] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
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
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: locationDetails.name,
      phone: locationDetails.phone,
      website: locationDetails.website,
      address: locationDetails.address,
      provinceId: locationDetails.addressFromWard.provinceId,
      districtId: locationDetails.addressFromWard.districtId,
      wardId: locationDetails.addressFromWard.wardId,
      description: locationDetails.description,
      service: locationDetails.timetable,
      timetable: locationDetails.service,
      rule: locationDetails.rule,
      imageArray: locationDetails.image.map((image, index) => ({
        id: index,
        base64: image,
      })),
    },
    resolver: yupResolver(SCHEMA.FMANAGE_PROFILE_FORM),
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = (data) => {
    setIsLoading(true);
    const images = data.imageArray.map((image) => image.base64);
    delete data.imageArray;
    const updateData = { ...data, ...locationLatLng, images };
    editFishingLocation({ updateData, setUpdateStatus });
  };

  useEffect(() => {
    (async () => {
      await getAllProvince();
      setIsLoading(false);
      setFullScreen(false);
    })();
    const loadingId = setTimeout(() => {
      setIsLoading(false);
      setFullScreen(false);
    }, 10000);
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
        setValue(FORM_FIELD_IMAGE_ARRAY, route.params.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  useEffect(() => {
    if (getStatus === STATUS_SUCCESS) {
      // setFieldLoading(false);
      setGetStatus(null);
    }
  }, [getStatus]);

  /**
   * Fire when status is updated form api call
   */
  useEffect(() => {
    if (updateStatus === STATUS_SUCCESS) {
      setIsLoading(false);
      showAlertBox(ALERT_TITLE, ALERT_EDIT_LOCATION_SUCCESS_MSG);
      setUpdateStatus(null);
    } else if (updateStatus === STATUS_FAILED) {
      setIsLoading(false);
      showAlertBox(ALERT_TITLE, ALERT_ERROR_MSG);
      setUpdateStatus(null);
    }
  }, [updateStatus]);
  return (
    <>
      <HeaderTab name={FMANAGE_EDIT_LOCATION_HEADER} />
      <ScrollView>
        <Overlay
          isVisible={isLoading}
          fullScreen
          overlayStyle={fullScreen ? styles.loadOnStart : styles.loadOnSubmit}
        >
          <ActivityIndicator size={60} color="#2089DC" />
        </Overlay>
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
                  controllerName={FORM_FIELD_IMAGE_ARRAY}
                />
                {/* Input location name */}
                <InputComponent
                  isTitle
                  label={LOCATION_NAME_LABEL}
                  hasAsterisk
                  placeholder={INPUT_LOCATION_NAME_PLACEHOLDER}
                  controllerName={FORM_FIELD_LOCATION_NAME}
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
                  label={LOCATION_PHONE_LABEL}
                  placeholder={INPUT_LOCATION_PHONE_PLACEHOLDER}
                  shouldDisable
                  controllerName={FORM_FIELD_LOCATION_PHONE}
                />
                <InputComponent
                  label={LOCATION_WEBSITE_LABEL}
                  placeholder={INPUT_LOCATION_WEBSITE_PLACEHOLDER}
                  controllerName={FORM_FIELD_LOCATION_WEBSITE}
                />
                <InputComponent
                  label={ADDRESS_LABEL}
                  placeholder={INPUT_ADDRESS_PLACEHOLDER}
                  hasAsterisk
                  controllerName={FORM_FIELD_ADDRESS}
                />
                <ProvinceSelector
                  label={PROVINCE_LABEL}
                  placeholder={SELECT_PROVINCE_PLACEHOLDER}
                  controllerName={FORM_FIELD_PROVINCE}
                />
                <DistrictSelector
                  label={DISTRICT_LABEL}
                  placeholder={SELECT_DISTRICT_PLACEHOLDER}
                  controllerName={FORM_FIELD_DISTRICT}
                />
                <WardSelector
                  label={WARD_LABEL}
                  placeholder={SELECT_WARD_PLACEHOLDER}
                  controllerName={FORM_FIELD_WARD}
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
                label={LOCATION_DESCRIPTION_LABEL}
                isTitle
                hasAsterisk
                placeholder={INPUT_LOCATION_DESCRIPTION_PLACEHOLDER}
                numberOfLines={6}
                controllerName={FORM_FIELD_LOCATION_DESCRIPTION}
              />
            </Center>

            <Center>
              {/* Schedule textarea  */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={LOCATION_TIMETABLE_LABEL}
                isTitle
                hasAsterisk
                placeholder={INPUT_LOCATION_TIMETABLE_PLACEHOLDER}
                numberOfLines={3}
                controllerName={FORM_FIELD_LOCATION_TIMETABLE}
              />
            </Center>

            <Center>
              {/* Service textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={LOCATION_SERVICE_LABEL}
                isTitle
                hasAsterisk
                placeholder={INPUT_LOCATION_SERVICE_PLACEHOLDER}
                numberOfLines={3}
                controllerName={FORM_FIELD_LOCATION_SERVICE}
              />
            </Center>

            <Center>
              {/* rules textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={LOCATION_RULE_LABEL}
                isTitle
                hasAsterisk
                placeholder={INPUT_LOCATION_RULE_PLACEHOLDER}
                numberOfLines={3}
                controllerName={FORM_FIELD_LOCATION_RULE}
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
