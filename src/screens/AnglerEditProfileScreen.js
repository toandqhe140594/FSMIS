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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";
import moment from "../config/moment";
import { ROUTE_NAMES } from "../constants";
import AddressModel from "../models/AddressModel";
import { goToMediaSelectScreen } from "../navigations";
import store from "../utilities/Store";

store.addModel("AddressModel", AddressModel);

const EditProfileScreen = () => {
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [avatarImage, setAvatarImage] = useState(undefined);
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        aName: yup.string().required("Họ và tên không thể bỏ trống"),
        aGender: yup.bool(),
        aAddress: yup.string(),
        aProvinceId: yup.number(),
        aDistrictId: yup.number(),
        aWardId: yup.number(),
      }),
    [],
  );
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
  const methods = useForm({
    // avoid change mode and reValidationMode to onChange to save re-render
    mode: "onSubmit",
    reValidateMode: "onSbumit",
    defaultValues: {
      aName: userInfo.fullName,
      aGender: userInfo.gender,
      aAddress: userInfo.address,
      aProvinceId: userInfo.addressFromWard.provinceId,
      aDistrictId: userInfo.addressFromWard.districtId,
      aWardId: userInfo.addressFromWard.wardId,
    },
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, getValues } = methods;
  const generateAddressDropdown = useCallback((name, value) => {
    if (name === "aProvinceId") {
      getDisctrictByProvinceId({ id: value });
    } else if (name === "aDistrictId") {
      getWardByDistrictId({ id: value });
    }
  }, []);
  const onDateChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };
  const genderList = useMemo(
    () => [
      { id: true, name: "Nam" },
      { id: false, name: "Nữ" },
    ],
    [],
  );
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
    console.log(data); // Test submit
  };
  /**
   * Run first time when the screen inits
   * get all province list for select dropdown
   * and set custome date picker value
   * When component unmoute, reset distric list and ward list
   */
  useEffect(() => {
    getAllProvince();
    getDisctrictByProvinceId({ id: getValues("aProvinceId") });
    getWardByDistrictId({ id: getValues("aDistrictId") });
    setFormattedDate(userInfo.dob.split(" ")[0]);
    setAvatarImage(userInfo.avatarUrl);
    return () => {
      resetDataList();
    };
  }, []);

  useEffect(() => {
    if (date) {
      setFormattedDate(moment(date).format("DD/MM/YYYY").toString());
    }
  }, [date]);

  useEffect(() => {
    if (userInfo.avatarUrl) setAvatarImage(userInfo.avatarUrl);
  }, [userInfo]);

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
  return (
    <KeyboardAvoidingView>
      <ScrollView nestedScrollEnabled>
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
                controllerName="aName"
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
                controllerName="aGender"
                data={genderList}
              />

              {/* Address input field */}
              <InputComponent
                label="Địa chỉ"
                isTitle
                placeholder="Nhập địa chỉ thường trú"
                controllerName="aAddress"
              />

              {/* Province select box */}
              <SelectComponent
                label="Tỉnh/Thành phố"
                isTitle
                placeholder="Chọn tỉnh/thành phố"
                data={provinceList}
                controllerName="aProvinceId"
                handleDataIfValChanged={generateAddressDropdown}
              />

              {/* District select box */}
              <SelectComponent
                label="Quận/Huyện"
                isTitle
                placeholder="Chọn quận/huyện"
                data={districtList}
                controllerName="aDistrictId"
                handleDataIfValChanged={generateAddressDropdown}
              />

              {/* Ward select box */}
              <SelectComponent
                label="Phường/Xã"
                isTitle
                placeholder="Chọn phường/xã"
                data={wardList}
                controllerName="aWardId"
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
  );
};

export default EditProfileScreen;
