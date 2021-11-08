import { Entypo } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Center, Icon, Input, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Avatar, Overlay } from "react-native-elements";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";
import moment from "../config/moment";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { goToMediaSelectScreen } from "../navigations";
import { showAlertBox } from "../utilities";

const genderList = [
  { id: true, name: "Nam" },
  { id: false, name: "Nữ" },
];

const EditProfileScreen = () => {
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [avatarImage, setAvatarImage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const [updateStatus, setUpdateStatus] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const userInfo = useStoreState((state) => state.ProfileModel.userInfo);
  const { provinceList, districtList, wardList } = useStoreState(
    (state) => state.AddressModel,
  );
  const {
    resetDataList,
    getAllProvince,
    getDisctrictByProvinceId,
    getWardByDistrictId,
  } = useStoreActions((actions) => actions.AddressModel);
  const { editPersonalInformation } = useStoreActions(
    (actions) => actions.ProfileModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.ANGLER_PROFILE_FORM),
  });
  const { handleSubmit, getValues, setValue } = methods;

  const setDefaultValues = () => {
    setValue("fullName", userInfo.fullName);
    setValue("gender", userInfo.gender);
    setValue("address", userInfo.address);
    setValue("provinceId", userInfo.addressFromWard.provinceId);
    setValue("districtId", userInfo.addressFromWard.districtId);
    setValue("wardId", userInfo.addressFromWard.wardId);
    setDate(moment(userInfo.dob.split(" ")[0], "DD/MM/YYYY").toDate());
    setAvatarImage(userInfo.avatarUrl);
  };

  const generateAddressDropdown = useCallback((name, value) => {
    if (name === "provinceId") {
      getDisctrictByProvinceId({ id: value });
    } else if (name === "districtId") {
      getWardByDistrictId({ id: value });
    }
  }, []);

  const onDateChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
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
          onPress: () => setAvatarImage(userInfo.avatarUrl),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onSubmit = (data) => {
    // Did not have null or empty validation for avatarImage and formattedDate yet
    const updateData = {
      ...data,
      avatarUrl: avatarImage,
      dob: moment(date).add(1, "days").toDate().toJSON(),
    };
    editPersonalInformation({ updateData, setUpdateStatus });
    setIsLoading(true);
  };
  /**
   * Run first time when the screen inits
   * setDefaultValue for fields
   * get all province list for select dropdown
   * and set custome date picker value
   * When component unmoute, reset distric list and ward list
   */
  useEffect(() => {
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

  useEffect(() => {
    if (date) {
      setFormattedDate(moment(date).format("DD/MM/YYYY").toString());
    }
  }, [date]);

  /**
   * When navigate from MediaSelectScreen back to Edit Form
   * the callback listen to route params and set
   * avatar image to what had been previously chosen in MediaSelectScreen
   */
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setAvatarImage(route.params?.base64Array[0].base64);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );
  useEffect(() => {
    if (updateStatus === "SUCCESS") {
      setIsLoading(false);
      showAlertBox("Thông báo", "Cập nhật bài đăng thành công!");
      setUpdateStatus(null);
    } else if (updateStatus === "FAILED") {
      setIsLoading(false);
      showAlertBox("Thông báo", "Đã xảy ra lỗi! Vui lòng thử lại sau.");
      setUpdateStatus(null);
    }
  }, [updateStatus]);

  return (
    <>
      <KeyboardAvoidingView>
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
        <ScrollView>
          {showDatePicker && (
            <DateTimePicker
              display="default"
              is24Hour
              mode="date"
              value={date || new Date()}
              onChange={onDateChange}
            />
          )}
          <Center flex={1} minHeight={Math.round(useWindowDimensions().height)}>
            <HeaderTab name="Thông tin cá nhân" />
            <FormProvider {...methods}>
              <VStack
                flex={1}
                justifyContent="center"
                mt={3}
                mb={5}
                space={4}
                w={{ base: "70%", md: "50%", lg: "30%" }}
              >
                <Avatar
                  containerStyle={{ alignSelf: "center" }}
                  size={130}
                  rounded
                  source={{
                    uri:
                      avatarImage !== undefined
                        ? avatarImage
                        : userInfo.avatarUrl,
                  }}
                  onLongPress={() => deleteImage()}
                  onPress={() =>
                    goToMediaSelectScreen(navigation, {
                      returnRoute: ROUTE_NAMES.PROFILE_CHANGE_INFORMATION,
                      maxSelectable: 1,
                    })
                  }
                />

                <InputComponent
                  label="Họ và tên"
                  isTitle
                  placeholder="Nhập họ và tên"
                  type="text"
                  hasAsterisk
                  controllerName="fullName"
                />

                {/* Date picker field */}
                <View>
                  <Text bold fontSize="md" mb={1}>
                    Ngày sinh
                  </Text>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Input
                      InputRightElement={
                        <Icon
                          as={<Entypo name="calendar" />}
                          size={5}
                          mr={1}
                          color="muted.500"
                        />
                      }
                      placeholder="Chọn ngày sinh"
                      size="lg"
                      value={formattedDate ? formattedDate.toString() : ""}
                      isDisabled
                    />
                  </TouchableOpacity>
                </View>

                {/* Gender select box */}
                <SelectComponent
                  label="Giới tính"
                  isTitle
                  placeholder="Chọn giới tính"
                  controllerName="gender"
                  data={genderList}
                />

                {/* Address input field */}
                <InputComponent
                  label="Địa chỉ"
                  isTitle
                  placeholder="Nhập địa chỉ thường trú"
                  controllerName="address"
                />

                {/* Province select box */}
                <SelectComponent
                  label="Tỉnh/Thành phố"
                  isTitle
                  placeholder="Chọn tỉnh/thành phố"
                  data={provinceList}
                  controllerName="provinceId"
                  handleDataIfValChanged={generateAddressDropdown}
                />

                {/* District select box */}
                <SelectComponent
                  label="Quận/Huyện"
                  isTitle
                  placeholder="Chọn quận/huyện"
                  data={districtList}
                  controllerName="districtId"
                  handleDataIfValChanged={generateAddressDropdown}
                />

                {/* Ward select box */}
                <SelectComponent
                  label="Phường/Xã"
                  isTitle
                  placeholder="Chọn phường/xã"
                  data={wardList}
                  controllerName="wardId"
                />
                {/* Save changes button */}
                <Button mt={2} size="lg" onPress={handleSubmit(onSubmit)}>
                  Lưu thay đổi
                </Button>
              </VStack>
            </FormProvider>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default EditProfileScreen;
