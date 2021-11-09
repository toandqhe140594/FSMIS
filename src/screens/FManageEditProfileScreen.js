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
import { showAlertBox } from "../utilities";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const FManageEditProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const { provinceList, districtList, wardList } = useStoreState(
    (state) => state.AddressModel,
  );
  const { locationLatLng, locationDetails } = useStoreState(
    (states) => states.FManageModel,
  );
  const {
    resetDataList,
    getAllProvince,
    getDisctrictByProvinceId,
    getWardByDistrictId,
  } = useStoreActions((actions) => actions.AddressModel);
  const { editFishingLocation } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(SCHEMA.FMANAGE_PROFILE_FORM),
  });
  const generateAddressDropdown = useCallback((name, value) => {
    if (name === "provinceId") {
      getDisctrictByProvinceId({ id: value });
    } else if (name === "districtId") {
      getWardByDistrictId({ id: value });
    }
  }, []);
  const { handleSubmit, getValues, setValue } = methods;
  const onSubmit = (data) => {
    setIsLoading(true);
    const images = imageArray.map((image) => image.base64);
    const updateData = { ...data, ...locationLatLng, images };
    editFishingLocation({ updateData, setUpdateStatus });
  };
  const updateImageArray = (id) => {
    setImageArray(imageArray.filter((image) => image.id !== id));
  };

  const setDefaultValues = () => {
    setValue("name", locationDetails.name);
    setValue("phone", locationDetails.phone);
    setValue("website", locationDetails.website);
    setValue("address", locationDetails.address);
    setValue("provinceId", locationDetails.addressFromWard.provinceId);
    setValue("districtId", locationDetails.addressFromWard.districtId);
    setValue("wardId", locationDetails.addressFromWard.wardId);
    setValue("description", locationDetails.description);
    setValue("timetable", locationDetails.timetable);
    setValue("rule", locationDetails.rule);
    setValue("service", locationDetails.service);
    setImageArray(
      locationDetails.image.map((image, index) => ({
        id: index,
        base64: image,
      })),
    );
  };

  useEffect(() => {
    setIsLoading(true);
    setDefaultValues();
    (async () => {
      getAllProvince();
      getDisctrictByProvinceId({ id: getValues("provinceId") });
      await getWardByDistrictId({ id: getValues("districtId") });
      setIsLoading(false);
      setFullScreen(false);
    })();
    return () => {
      resetDataList();
    };
  }, []);

  // Fire when naviagtes back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setImageArray(route.params.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  /**
   * Fire when status is updated form api call
   */
  useEffect(() => {
    if (updateStatus === "SUCCESS") {
      setIsLoading(false);
      showAlertBox("Thông báo", "Cập nhật thông tin điểm câu thành công!");
      setUpdateStatus(null);
    } else if (updateStatus === "FAILED") {
      setIsLoading(false);
      showAlertBox("Thông báo", "Đã xảy ra lỗi! Vui lòng thử lại sau.");
      setUpdateStatus(null);
    }
  }, [updateStatus]);
  return (
    <>
      <HeaderTab name="Thông tin điểm câu" />
      <ScrollView>
        <Overlay
          isVisible={isLoading}
          fullScreen={fullScreen}
          overlayStyle={
            fullScreen
              ? { justifyContent: "center", alignItems: "center" }
              : null
          }
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
                  imageArray={imageArray}
                  deleteImage={updateImageArray}
                  selectLimit={5}
                />
                {/* Input location name */}
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
                {/* Information input and select fields */}
                <InputComponent
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  hasAsterisk
                  controllerName="phone"
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
