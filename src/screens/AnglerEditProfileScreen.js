import { Entypo } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Avatar, Button, Center, Icon, Input, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";
import moment from "../config/moment";

const validationSchema = yup.object().shape({
  name: yup.string().required("Họ và tên không thể bỏ trống"),
  gender: yup.number().default(-1),
  address: yup.string(),
  cityAddress: yup.number().default(-1),
  districtAddress: yup.number().default(-1),
  communeAddress: yup.number().default(-1),
});

const genderData = [
  { label: "Nam", val: 1 },
  { label: "Nữ", val: 0 },
  { label: "Không muốn nói", val: -1 },
];

const cityData = [
  { label: "Hà Nội", val: 1 },
  { label: "Hồ Chí Minh", val: 2 },
];

const districtData = [
  { label: "Hai Bà Trưng", val: 1 },
  { label: "Hoàng Mai", val: 2 },
];

const communeData = [
  { label: "Vĩnh Hưng", val: 1 },
  { label: "Thanh Lương", val: 2 },
];

const EditProfileScreen = () => {
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data); // Test submit
  };

  useEffect(() => {
    if (date) setFormattedDate(moment(date).format("DD/MM/YYYY").toString());
  }, [date]);

  const onDateChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <KeyboardAvoidingView>
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
          <VStack
            flex={1}
            justifyContent="center"
            mt={3}
            mb={5}
            space={4}
            w={{ base: "70%", md: "50%", lg: "30%" }}
          >
            {/* Avatar image */}
            <Center mb={2}>
              <Avatar
                bg="pink.600"
                size="2xl"
                source={{
                  uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                }}
              />
            </Center>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  label="Họ và tên"
                  isTitle
                  placeholder="Thay đổi họ và tên"
                  type="text"
                  hasAsterisk
                  error={errors.name}
                  handleOnBlur={onBlur}
                  handleOnChange={onChange}
                  value={value}
                />
              )}
            />

            {/* Date picker field */}
            <Text bold fontSize="md">
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
                placeholder="Ngày sinh*"
                size="lg"
                value={formattedDate ? formattedDate.toString() : ""}
                isDisabled
              />
            </TouchableOpacity>

            {/* Gender select box */}
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectComponent
                  label="Giới tính"
                  isTitle
                  hasAsterisk
                  placeholder="Chọn giới tính"
                  data={genderData}
                  error={errors.gender}
                  value={value}
                  handleOnBlur={onBlur}
                  handleOnChange={onChange}
                />
              )}
            />

            {/* Address input field */}
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  label="Địa chỉ"
                  isTitle
                  placeholder="Nhập địa chỉ thường trú"
                  handleOnBlur={onBlur}
                  handleOnChange={onChange}
                  value={value}
                />
              )}
            />

            {/* City select box */}
            <Controller
              control={control}
              name="cityAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectComponent
                  label="Tỉnh/Thành phố"
                  isTitle
                  placeholder="Chọn tỉnh/thành phố"
                  data={cityData}
                  handleOnChange={onChange}
                  handleOnBlur={onBlur}
                  value={value}
                />
              )}
            />

            {/* District select box */}
            <Controller
              control={control}
              name="districtAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectComponent
                  label="Quận/Huyện"
                  isTitle
                  placeholder="Chọn quận/huyện"
                  data={districtData}
                  handleOnChange={onChange}
                  handleOnBlur={onBlur}
                  value={value}
                />
              )}
            />

            {/* Commune select box */}
            <Controller
              control={control}
              name="communeAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectComponent
                  label="Phường/Xã"
                  isTitle
                  placeholder="Chọn phường/xã"
                  data={communeData}
                  handleOnChange={onChange}
                  handleOnBlur={onBlur}
                  value={value}
                />
              )}
            />

            {/* Save changes button */}
            <Button mt={2} size="lg" onPress={handleSubmit(onSubmit)}>
              Lưu thay đổi
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
