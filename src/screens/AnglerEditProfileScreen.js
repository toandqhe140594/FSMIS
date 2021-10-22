import { Entypo } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Avatar,
  Box,
  Button,
  Center,
  Icon,
  Input,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
  aName: yup.string().required("Họ và tên không thể bỏ trống"),
  aGender: yup.number().default(-1),
  aAddress: yup.string(),
  aCityAddress: yup.number(),
  aDistrictAddress: yup.number(),
  aCommuneAddress: yup.number(),
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
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data); // Test submit
  };

  useEffect(() => {
    if (date) {
      setFormattedDate(moment(date).format("DD/MM/YYYY").toString());
    }
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
          <FormProvider {...methods}>
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
              <InputComponent
                label="Họ và tên"
                isTitle
                placeholder="Nhập họ và tên"
                type="text"
                hasAsterisk
                controllerName="aName"
              />

              {/* Date picker field */}
              <Box>
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
              </Box>

              {/* Gender select box */}
              <SelectComponent
                label="Giới tính"
                isTitle
                placeholder="Chọn giới tính"
                data={genderData}
                controllerName="aGender"
              />

              {/* Address input field */}
              <InputComponent
                label="Địa chỉ"
                isTitle
                placeholder="Nhập địa chỉ thường trú"
                controllerName="aAddress"
              />

              {/* City select box */}
              <SelectComponent
                label="Tỉnh/Thành phố"
                isTitle
                placeholder="Chọn tỉnh/thành phố"
                data={cityData}
                controllerName="aCityAddress"
              />

              {/* District select box */}
              <SelectComponent
                label="Quận/Huyện"
                isTitle
                placeholder="Chọn quận/huyện"
                data={districtData}
                controllerName="aDistrictAddress"
              />

              {/* Commune select box */}
              <SelectComponent
                label="Phường/Xã"
                isTitle
                placeholder="Chọn phường/xã"
                data={communeData}
                controllerName="aCommuneAddress"
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
