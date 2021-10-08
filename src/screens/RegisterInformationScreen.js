import { Entypo } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import {
  Button,
  Center,
  Heading,
  Icon,
  Input,
  Select,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import * as yup from "yup";

import moment from "../config/moment";

const validationSchema = yup.object().shape({
  name: yup.string().required("Họ và tên không thể bỏ trống"),
  gender: yup.number().default(-1),
});

const RegisterInformationScreen = () => {
  const [date, setDate] = useState(null);
  const [displayedDate, setDisplayedDate] = useState(null);
  const [show, setShow] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Constants.platform === "ios");
    setDate(currentDate);
  };

  useEffect(() => {
    if (date) setDisplayedDate(moment(date).format("DD/MM/YYYY").toString());
  }, [date]);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        {show && (
          <DateTimePicker
            display="default"
            is24Hour
            mode="date"
            value={date || new Date()}
            onChange={onDateChange}
          />
        )}

        <Center
          flex={1}
          minHeight={Math.round(useWindowDimensions().height)}
          safeArea
        >
          <Text />

          <VStack
            flex={1}
            justifyContent="center"
            mb={4}
            space={2}
            w={{ base: "70%", md: "50%", lg: "30%" }}
          >
            <Center mb={6}>
              <Heading textAlign="center" size="lg" width="100%">
                Đăng ký
              </Heading>
              <Text fontSize="lg">Tạo tài khoản mới</Text>
            </Center>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Họ và tên*"
                  size="lg"
                  type="text"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name?.message && (
              <Text color="red.500" fontSize="xs" italic>
                {errors.name?.message}
              </Text>
            )}

            <TouchableOpacity
              onPress={() => {
                setShow(true);
              }}
            >
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
                value={displayedDate ? displayedDate.toString() : ""}
                isDisabled
              />
            </TouchableOpacity>
            {errors.dob?.message && (
              <Text color="red.500" fontSize="xs" italic>
                {errors.dob?.message}
              </Text>
            )}

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  accessibilityLabel="Chọn giới tính"
                  fontSize="md"
                  placeholder="Giới tính"
                  onBlur={onBlur}
                  onValueChange={onChange}
                  selectedValue={value}
                >
                  <Select.Item label="Nam" value={1} />
                  <Select.Item label="Nữ" value={0} />
                  <Select.Item label="Không muốn nói" value={-1} />
                </Select>
              )}
            />
            {errors.gender?.message && (
              <Text color="red.500" fontSize="xs" italic>
                {errors.gender?.message}
              </Text>
            )}

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  InputLeftElement={
                    <Icon
                      as={<Entypo name="address" />}
                      size={5}
                      ml={3}
                      color="muted.500"
                    />
                  }
                  paddingLeft={0}
                  placeholder="Địa chỉ"
                  size="lg"
                  type="text"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="cityAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  accessibilityLabel="Choose Service"
                  fontSize="md"
                  placeholder="Tỉnh, thành phố"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                </Select>
              )}
            />

            <Controller
              control={control}
              name="districtAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  accessibilityLabel="Choose Service"
                  fontSize="md"
                  placeholder="Quận, huyện"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                </Select>
              )}
            />

            <Controller
              control={control}
              name="communeAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  accessibilityLabel="Choose Service"
                  fontSize="md"
                  placeholder="Phường, xã"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                </Select>
              )}
            />

            <Button mt={3} size="lg" onPress={handleSubmit(onSubmit)}>
              Đăng ký
            </Button>
          </VStack>

          <Text mb={6}>
            Bạn chưa có tài khoản? <Text underline>Đăng nhập</Text>
          </Text>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterInformationScreen;
