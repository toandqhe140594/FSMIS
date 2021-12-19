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
import { DICTIONARY, SCHEMA } from "../constants";
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
    };
    register({ registerData })
      .then(() => {
        showToastMessage(DICTIONARY.TOAST_REGISTER_INFORMATION_SUCCESS_MSG);
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
                placeholder={DICTIONARY.REQUIRED_FULL_NAME_LABEL}
                controllerName={DICTIONARY.FORM_FIELD_FULL_NAME}
              />
              <DatePickerInput
                placeholder={DICTIONARY.REQUIRED_DOB_LABEL}
                controllerName={DICTIONARY.FORM_FIELD_DOB}
              />
              {/* Gender select box */}
              <SelectComponent
                placeholder={DICTIONARY.GENDER_LABEL}
                controllerName={DICTIONARY.FORM_FIELD_GENDER}
                data={genderList}
              />
              {/* Address input field */}
              <InputComponent
                placeholder={DICTIONARY.ADDRESS_LABEL}
                controllerName={DICTIONARY.FORM_FIELD_ADDRESS}
              />
              {/* City select box */}
              <ProvinceSelector
                placeholder={DICTIONARY.PROVINCE_LABEL}
                controllerName={DICTIONARY.FORM_FIELD_PROVINCE}
              />
              {/* District select box */}
              <DistrictSelector
                placeholder={DICTIONARY.DISTRICT_LABEL}
                controllerName={DICTIONARY.FORM_FIELD_DISTRICT}
              />
              {/* Ward select box */}
              <WardSelector
                placeholder={DICTIONARY.WARD_LABEL}
                controllerName={DICTIONARY.FORM_FIELD_WARD}
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
              Bạn đã có tài khoản? <Text underline>Đăng nhập</Text>
            </Text>
          </Center>
        </FormProvider>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterInformationScreen;
