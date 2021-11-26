import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Center, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, ScrollView, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import AvatarSection from "../components/AnglerEditProfile/AvatarSection";
import DatePickerInput from "../components/common/DatePickerInput";
import DistrictSelector from "../components/common/DistrictSelector";
import InputComponent from "../components/common/InputComponent";
import ProvinceSelector from "../components/common/ProvinceSelector";
import SelectComponent from "../components/common/SelectComponent";
import WardSelector from "../components/common/WardSelector";
import HeaderTab from "../components/HeaderTab";
import moment from "../config/moment";
import { SCHEMA } from "../constants";
import { showAlertBox } from "../utilities";

const genderList = [
  { id: true, name: "Nam" },
  { id: false, name: "Nữ" },
];

const styles = StyleSheet.create({
  loadOnStart: { justifyContent: "center", alignItems: "center" },
  loadOnSubmit: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

// const STATUS_SUCCESS = "SUCCESS";
// const STATUS_FAILED = "FAILED";
const ALERT_TITLE = "Thông báo";
const ALERT_EDIT_PROFILE_SUCCESS_MSG = "Cập nhật thông tin cá nhân thành công!";
const ALERT_ERROR_MSG = "Đã xảy ra lỗi! Vui lòng thử lại sau.";
const ANGLER_EDIT_PROFILE_HEADER_NAME = "Thông tin cá nhân";

const FORM_FIELD_AVATAR = "avatarUrl";
const FORM_FIELD_FULL_NAME = "fullName";
const FORM_FIELD_GENDER = "gender";
const FORM_FIELD_ADDRESS = "address";
const FORM_FIELD_PROVINCE = "provinceId";
const FORM_FIELD_DISTRICT = "districtId";
const FORM_FIELD_WARD = "wardId";
const FORM_FIELD_DOB = "dob";

const DOB_LABEL = "Ngày sinh";
const FULL_NAME_LABEL = "Họ và tên";
const GENDER_LABEL = "Giới tính";
const ADDRESS_LABEL = "Địa chỉ";
const PROVINCE_LABEL = "Tỉnh/Thành phố";
const DISTRICT_LABEL = "Quận/Huyện";
const WARD_LABEL = "Phường/xã";

const INPUT_NAME_PLACEHOLDER = "Nhập họ và tên";
const SELECT_BIRTHDATE_PLACEHOLDER = "Chọn ngày sinh";
const SELECT_GENDER_PLACEHOLDER = "Chọn giới tính";
const INPUT_ADDRESS_PLACEHOLDER = "Nhập địa chỉ thường trú";
const SELECT_PROVINCE_PLACEHOLDER = "Chọn tỉnh/thành phố";
const SELECT_DISTRICT_PLACEHOLDER = "Chọn quận/huyện";
const SELECT_WARD_PLACEHOLDER = "Chọn phường/xã";

const EditProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const userInfo = useStoreState((state) => state.ProfileModel.userInfo);
  const { resetDataList, getAllProvince } = useStoreActions(
    (actions) => actions.AddressModel,
  );
  const { editPersonalInformation } = useStoreActions(
    (actions) => actions.ProfileModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      avatarUrl: userInfo.avatarUrl,
      fullName: userInfo.fullName,
      gender: userInfo.gender,
      dob: moment(userInfo.dob.split(" ")[0], "DD/MM/YYYY").toDate(),
      address: userInfo.address,
      provinceId: userInfo.addressFromWard.provinceId,
      districtId: userInfo.addressFromWard.districtId,
      wardId: userInfo.addressFromWard.wardId,
    },
    resolver: yupResolver(SCHEMA.ANGLER_PROFILE_FORM),
  });
  const { handleSubmit, setValue } = methods;

  /**
   * Call an alert box to reset avatar image back to default avatar
   */
  const deleteImage = () => {
    Alert.alert(
      "Thông báo",
      "Bạn chắc chắn muốn xóa ảnh này?",
      [
        {
          text: "Hủy",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => setValue("avatarUrl", userInfo.avatarUrl),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    delete data.provinceId;
    delete data.districtId;
    const updateData = {
      ...data,
      dob: data.dob.toJSON(),
    };
    editPersonalInformation({ updateData })
      .then(() => {
        setIsLoading(false);
        showAlertBox(ALERT_TITLE, ALERT_EDIT_PROFILE_SUCCESS_MSG);
      })
      .catch(() => {
        setIsLoading(false);
        showAlertBox(ALERT_TITLE, ALERT_ERROR_MSG);
      });
  };
  /**
   * Set up the screen
   */
  useEffect(() => {
    getAllProvince()
      .then(() => {
        setIsLoading(false);
        setFullScreen(false);
      })
      .catch(() => {
        navigation.pop(1);
      });
    const loadingId = setTimeout(() => {
      setIsLoading(false);
      setFullScreen(false);
    }, 10000);
    return () => {
      clearTimeout(loadingId);
      resetDataList();
    };
  }, []);
  /**
   * When navigate from MediaSelectScreen back to Edit Form
   * the callback listen to route params and set
   * avatar image to what had been previously chosen in MediaSelectScreen
   */
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setValue(FORM_FIELD_AVATAR, route.params?.base64Array[0].base64);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name={ANGLER_EDIT_PROFILE_HEADER_NAME} />
      <Overlay
        isVisible={isLoading}
        fullScreen
        overlayStyle={fullScreen ? styles.loadOnStart : styles.loadOnSubmit}
      >
        <ActivityIndicator size={60} color="#2089DC" />
      </Overlay>
      <ScrollView>
        <Center flex={1}>
          <FormProvider {...methods}>
            <VStack
              flex={1}
              justifyContent="center"
              mt={3}
              mb={5}
              space={1}
              w={{ base: "70%", md: "50%", lg: "30%" }}
            >
              <AvatarSection
                containerStyle={{ alignSelf: "center" }}
                navigation={navigation}
                name={FORM_FIELD_AVATAR}
                handleDelete={deleteImage}
              />
              <InputComponent
                label={FULL_NAME_LABEL}
                isTitle
                placeholder={INPUT_NAME_PLACEHOLDER}
                type="text"
                hasAsterisk
                controllerName={FORM_FIELD_FULL_NAME}
              />
              <DatePickerInput
                label={DOB_LABEL}
                placeholder={SELECT_BIRTHDATE_PLACEHOLDER}
                controllerName={FORM_FIELD_DOB}
              />
              <SelectComponent
                label={GENDER_LABEL}
                isTitle
                placeholder={SELECT_GENDER_PLACEHOLDER}
                controllerName={FORM_FIELD_GENDER}
                data={genderList}
              />
              <InputComponent
                label={ADDRESS_LABEL}
                isTitle
                placeholder={INPUT_ADDRESS_PLACEHOLDER}
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
              <Button mt={6} size="lg" onPress={handleSubmit(onSubmit)}>
                Lưu thay đổi
              </Button>
            </VStack>
          </FormProvider>
        </Center>
      </ScrollView>
    </>
  );
};

export default EditProfileScreen;
