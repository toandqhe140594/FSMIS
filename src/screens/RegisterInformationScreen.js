import { Entypo } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
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
import { goToLoginScreen } from "../navigations";
import { showAlertBox, showToastMessage } from "../utilities";

const validationSchema = yup.object().shape({
  name: yup.string().required("Họ và tên không thể bỏ trống"),
  gender: yup.number().default(1),
  address: yup.string().default(""),
  cityAddress: yup.number().default(1),
  districtAddress: yup.number().default(-1),
  communeAddress: yup.number().default(-1),
});

const RegisterInformationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const watchProvince = watch("cityAddress");
  const watchDistrict = watch("districtAddress");

  const { provinceList, districtList, wardList } = useStoreState(
    (states) => states.UtilModel,
  );
  const { getAllAddress, getDistrictList, getWardList, register } =
    useStoreActions((actions) => actions.UtilModel);
  const [date, setDate] = useState(null);
  const [displayedDate, setDisplayedDate] = useState(null);
  const [show, setShow] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (provinceList.length === 0) getAllAddress();
    if (route.params) {
      const { phone, password } = route.params;
      setRegisterData({ phone, password });
    }
  }, []);

  useEffect(() => {
    if (watchProvince) {
      getDistrictList({ provinceId: watchProvince });
      setValue("districtAddress", -1);
      setValue("communeAddress", -1);
    }
  }, [watchProvince]);

  useEffect(() => {
    if (watchDistrict && watchDistrict !== -1) {
      getWardList({ districtId: watchDistrict });
      setValue("communeAddress", 1);
    }
  }, [watchDistrict]);

  useEffect(() => {
    if (success === true) {
      showToastMessage("Đăng ký thành công");
      goToLoginScreen(navigation);
    }
    setLoading(false);
    setSuccess(null);
  }, [success]);

  // Submit form event
  const onSubmit = (data) => {
    const { address, communeAddress: wardId, name: fullName, gender } = data;
    if (!date) {
      showAlertBox("Thiếu thông tin", "Thông tin ngày sinh không thể bỏ trống");
      return;
    }
    setLoading(true);
    register({
      registerData: {
        ...registerData,
        address,
        wardId: wardId === -1 ? 1 : wardId,
        fullName,
        gender,
        dob: date.toJSON(),
      },
      setSuccess,
    });
    setRegisterData({
      ...registerData,
      address,
      wardId,
      fullName,
      gender,
      dob: date.toJSON(),
    });
  };

  // Event fire when another dob date is picked
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Constants.platform === "ios");
    setDate(currentDate);
  };

  // Display picked date in format DD/MM/YYYY
  useEffect(() => {
    if (date) setDisplayedDate(moment(date).format("DD/MM/YYYY").toString());
  }, [date]);

  const navigateToLoginScreenAction = () => {
    goToLoginScreen(navigation);
  };

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
          minHeight={Math.round(useWindowDimensions().height - 40)}
        >
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

            {/* Name input field */}
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

            {/* Date picker field */}
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

            {/* Gender select box */}
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
                </Select>
              )}
            />
            {errors.gender?.message && (
              <Text color="red.500" fontSize="xs" italic>
                {errors.gender?.message}
              </Text>
            )}

            {/* Address input field */}
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

            {/* City select box */}
            <Controller
              control={control}
              name="cityAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  accessibilityLabel="Chọn tỉnh, thành phố"
                  fontSize="md"
                  placeholder="Tỉnh, thành phố"
                  onBlur={onBlur}
                  onValueChange={onChange}
                  selectedValue={value}
                >
                  {provinceList.map((province) => (
                    <Select.Item
                      label={province.name}
                      value={province.id}
                      key={province.id}
                    />
                  ))}
                </Select>
              )}
            />

            {/* District select box */}
            <Controller
              control={control}
              name="districtAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  accessibilityLabel="Chọn quận, huyện"
                  fontSize="md"
                  placeholder="Quận, huyện"
                  onBlur={onBlur}
                  onValueChange={onChange}
                  selectedValue={value}
                >
                  {districtList.map((district) => (
                    <Select.Item
                      label={district.name}
                      value={district.id}
                      key={district.id}
                    />
                  ))}
                </Select>
              )}
            />

            {/* Commune select box */}
            <Controller
              control={control}
              name="communeAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  accessibilityLabel="Chọn phường, xã"
                  fontSize="md"
                  placeholder="Phường, xã"
                  onBlur={onBlur}
                  onValueChange={onChange}
                  selectedValue={value}
                >
                  {wardList.map((ward) => (
                    <Select.Item
                      label={ward.name}
                      value={ward.id}
                      key={ward.id}
                    />
                  ))}
                </Select>
              )}
            />

            {/* Submit button */}
            <Button
              mt={3}
              size="lg"
              onPress={handleSubmit(onSubmit)}
              isLoading={loading}
              isDisabled={loading}
            >
              Đăng ký
            </Button>
          </VStack>
          <Text mb={6} onPress={navigateToLoginScreenAction}>
            Bạn chưa có tài khoản? <Text underline>Đăng nhập</Text>
          </Text>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterInformationScreen;
