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

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
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

const FManageAddNewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const [addStatus, setAddStatus] = useState(null);
  const [locationData, setLocationData] = useState({});
  const [otpSendSuccess, setOtpSendSuccess] = useState(null);
  const { provinceList, districtList, wardList } = useStoreState(
    (state) => state.AddressModel,
  );
  const { locationLatLng } = useStoreState((states) => states.FManageModel);
  const {
    resetDataList,
    getAllProvince,
    getDisctrictByProvinceId,
    getWardByDistrictId,
  } = useStoreActions((actions) => actions.AddressModel);
  const { addNewLocation } = useStoreActions((actions) => actions.FManageModel);
  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { imageArray: [] },
    resolver: yupResolver(SCHEMA.FMANAGE_PROFILE_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const generateAddressDropdown = useCallback((name, value) => {
    if (name === "provinceId") {
      getDisctrictByProvinceId({ id: value });
    } else if (name === "districtId") {
      getWardByDistrictId({ id: value });
    }
  }, []);

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
    setLocationData(addData);
    sendOtp({ phone: data.phone, setSuccess: setOtpSendSuccess });
  };
  /**
   * Trigger first time when enters
   * and when screen unmounts
   */
  useEffect(() => {
    (async () => {
      await getAllProvince();
      setIsLoading(false);
      setFullScreen(false);
    })();
    return () => {
      resetDataList();
    };
  }, []);

  /**
   * Trigger when otp status returns
   */
  useEffect(() => {
    if (otpSendSuccess === true) {
      goToOTPScreen(
        navigation,
        ROUTE_NAMES.FMANAGE_PROFILE_ADD_NEW,
        locationData.phone,
      );
      setIsLoading(false);
      setOtpSendSuccess(null);
    } else if (otpSendSuccess === false) {
      setIsLoading(false);
      setOtpSendSuccess(null);
    }
  }, [otpSendSuccess]);

  /**
   * Trigger when add status returns
   */
  useEffect(() => {
    if (addStatus === "SUCCESS") {
      showAlertAbsoluteBox(
        "Thông báo",
        "Khu hồ thêm thành công!",
        () => {
          goBack(navigation);
        },
        "Xác nhận",
      );
      setAddStatus(null);
    } else if (addStatus === "FAILED") {
      showAlertBox("Thông báo", "Đã có lỗi xảy ra, vui lòng thử lại");
      setIsLoading(false);
      setAddStatus(null);
    }
  }, [addStatus]);

  /**
   * Trigger when navigation goes back to this screen
   */
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setValue("imageArray", route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
      if (route.params?.otpSuccess) {
        setIsLoading(true);
        addNewLocation({ addData: locationData, setAddStatus });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name="Tạo điểm câu mới" />
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
                  controllerName="imageArray"
                />
                <InputComponent
                  isTitle
                  label="Tên địa điểm câu"
                  hasAsterisk
                  placeholder="Nhập tên địa điểm câu"
                  controllerName="name"
                />
              </Stack>
            </Center>
            <Center>
              <VStack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Thông tin liên hệ
                </Text>
                <InputComponent
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  hasAsterisk
                  controllerName="phone"
                  useNumPad
                />

                <InputComponent
                  label="Website"
                  placeholder="Nhập website/facebook"
                  controllerName="website"
                />

                <InputComponent
                  label="Địa chỉ"
                  placeholder="Nhập địa chỉ"
                  hasAsterisk
                  controllerName="address"
                />

                <SelectComponent
                  placeholder="Chọn tỉnh/thành phố"
                  label="Tỉnh/Thành phố"
                  hasAsterisk
                  controllerName="provinceId"
                  data={provinceList}
                  handleDataIfValChanged={generateAddressDropdown}
                />

                <SelectComponent
                  placeholder="Chọn quận/huyện"
                  label="Quận/Huyện"
                  hasAsterisk
                  controllerName="districtId"
                  data={districtList}
                  handleDataIfValChanged={generateAddressDropdown}
                />

                <SelectComponent
                  label="Phường/Xã"
                  placeholder="Chọn phường/xã"
                  hasAsterisk
                  controllerName="wardId"
                  data={wardList}
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
                label="Mô tả khu hồ"
                isTitle
                placeholder="Miêu tả khu hồ của bạn"
                numberOfLines={6}
                controllerName="description"
              />
            </Center>

            <Center>
              {/* Schedule textarea  */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Thời gian hoạt động"
                isTitle
                placeholder="Miêu tả thời gian hoạt động của khu hồ"
                numberOfLines={3}
                controllerName="timetable"
              />
            </Center>

            <Center>
              {/* Service textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Dịch vụ"
                isTitle
                placeholder="Miêu tả dịch vụ khu hồ"
                numberOfLines={3}
                controllerName="service"
              />
            </Center>

            <Center>
              {/* rules textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Nội quy"
                isTitle
                placeholder="Miêu tả nội quy khu hồ"
                numberOfLines={3}
                controllerName="rule"
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
                  Thêm khu hồ
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
