import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Button, Center, Heading, Text, VStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import DatePickerInput from "../components/common/DatePickerInput";
import DistrictSelector from "../components/common/DistrictSelector";
import InputComponent from "../components/common/InputComponent";
import ProvinceSelector from "../components/common/ProvinceSelector";
import SelectComponent from "../components/common/SelectComponent";
import WardSelector from "../components/common/WardSelector";
import { SCHEMA } from "../constants";
import { goToLoginScreen } from "../navigations";
import { showToastMessage } from "../utilities";

const genderList = [
  { id: true, name: "Nam" },
  { id: false, name: "Nữ" },
];

const RegisterInformationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const accountData = useRef(null);
  const [loading, setLoading] = useState(false);
  const minHeight = Math.round(useWindowDimensions().height - 40);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { provinceId: 0, districtId: 0 },
    resolver: yupResolver(SCHEMA.REGISTER_INFORMATION_FORM),
  });
  const { handleSubmit } = methods;
  const { register } = useStoreActions((actions) => actions.UtilModel);
  const { getAllProvince } = useStoreActions((actions) => actions.AddressModel);

  useEffect(() => {
    getAllProvince().catch(() => {});
    if (route.params) {
      const { phone, password } = route.params;
      accountData.current = { phone, password };
    }
  }, []);

  // Submit form event
  const onSubmit = (data) => {
    setLoading(true);
    const registerData = {
      ...accountData.current,
      ...data,
      dob: data.dob.toJSON(),
    };
    register({ registerData })
      .then(() => {
        showToastMessage("Đăng ký thành công");
        goToLoginScreen(navigation);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const navigateToLoginScreenAction = () => {
    goToLoginScreen(navigation);
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <FormProvider {...methods}>
          <Center flex={1} minHeight={minHeight}>
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

              <InputComponent
                placeholder="Họ và tên*"
                controllerName="fullName"
              />
              <DatePickerInput placeholder="Ngày sinh*" controllerName="dob" />
              {/* Gender select box */}
              <SelectComponent
                placeholder="Giới tính"
                controllerName="gender"
                data={genderList}
              />
              {/* Address input field */}
              <InputComponent placeholder="Địa chỉ" controllerName="address" />
              {/* City select box */}
              <ProvinceSelector
                placeholder="Tỉnh/Thành phố"
                controllerName="provinceId"
              />
              {/* District select box */}
              <DistrictSelector
                placeholder="Quận/Huyện"
                controllerName="districtId"
              />
              {/* Ward select box */}
              <WardSelector placeholder="Phường/xã" controllerName="wardId" />
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
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterInformationScreen;
