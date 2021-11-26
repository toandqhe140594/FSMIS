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
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import DistrictSelector from "../components/common/DistrictSelector";
import InputComponent from "../components/common/InputComponent";
import InputWithClipboard from "../components/common/InputWithClipboard";
import MultiImageSection from "../components/common/MultiImageSection";
import ProvinceSelector from "../components/common/ProvinceSelector";
import TextAreaComponent from "../components/common/TextAreaComponent";
import WardSelector from "../components/common/WardSelector";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { goBack, goToOTPScreen } from "../navigations";
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

const ALERT_TITLE = "Thông báo";
const ALERT_ADD_LOCATION_SUCCESS_MSG = "Thêm điểm câu thành công";
const ALERT_ERROR_MSG = "Đã xảy ra lỗi! Vui lòng thử lại sau.";
const FMANAGE_ADD_LOCATION_HEADER = "Tạo điểm câu mới";

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

const CONFIRM_BUTTON_LABEL = "Xác nhận";
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

const FManageAddNewScreen = () => {
  const route = useRoute();
  const locationData = useRef(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const { locationLatLng } = useStoreState((states) => states.FManageModel);
  const { resetDataList, getAllProvince } = useStoreActions(
    (actions) => actions.AddressModel,
  );
  const { addNewLocation } = useStoreActions((actions) => actions.FManageModel);
  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { imageArray: [], provinceId: 0, districtId: 0 },
    resolver: yupResolver(SCHEMA.FMANAGE_PROFILE_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const handleError = () => {
    setIsLoading(false);
    showAlertBox(ALERT_TITLE, ALERT_ERROR_MSG);
  };

  const onSubmit = (data) => {
    // if location info is missing
    if (!locationLatLng.latitude) {
      showAlertBox("Thông báo", "Vị trí hồ câu trên bản đồ không thể bỏ trống");
      return;
    }
    setIsLoading(true);
    const images = data.imageArray.map((image) => image.base64);
    delete data.imageArray;
    const addData = { ...data, ...locationLatLng, images };
    locationData.current = addData;
    sendOtp({ phone: data.phone })
      .then(() => {
        setIsLoading(false);
        goToOTPScreen(
          navigation,
          ROUTE_NAMES.FMANAGE_PROFILE_ADD_NEW,
          locationData.current.phone,
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
        setValue(FORM_FIELD_IMAGE_ARRAY, route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
      if (route.params?.otpSuccess) {
        setIsLoading(true);
        addNewLocation({ addData: locationData.current })
          .then(() => {
            showAlertAbsoluteBox(
              ALERT_TITLE,
              ALERT_ADD_LOCATION_SUCCESS_MSG,
              () => {
                goBack(navigation);
              },
              CONFIRM_BUTTON_LABEL,
            );
          })
          .catch(handleError);
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name={FMANAGE_ADD_LOCATION_HEADER} />
      <Overlay
        isVisible={isLoading}
        fullScreen
        overlayStyle={fullScreen ? styles.loadOnStart : styles.loadOnSubmit}
      >
        <ActivityIndicator size={60} color="#2089DC" />
      </Overlay>
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center>
              <Stack space={2} style={styles.sectionWrapper}>
                <Text bold fontSize="md" mt={2}>
                  Ảnh bìa (nhiều nhất là 5)
                </Text>
                <MultiImageSection
                  formRoute={ROUTE_NAMES.FMANAGE_PROFILE_ADD_NEW}
                  selectLimit={5}
                  controllerName={FORM_FIELD_IMAGE_ARRAY}
                />
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
                <InputComponent
                  useNumPad
                  label={LOCATION_PHONE_LABEL}
                  placeholder={INPUT_LOCATION_PHONE_PLACEHOLDER}
                  hasAsterisk
                  controllerName={FORM_FIELD_LOCATION_PHONE}
                />
                <InputWithClipboard
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
                numberOfLines={6}
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
                numberOfLines={6}
                controllerName={FORM_FIELD_LOCATION_SERVICE}
              />
            </Center>

            <Center>
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={LOCATION_RULE_LABEL}
                isTitle
                hasAsterisk
                placeholder={INPUT_LOCATION_RULE_PLACEHOLDER}
                numberOfLines={6}
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
