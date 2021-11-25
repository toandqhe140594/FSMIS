import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "native-base";
import React, { useCallback, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import { ROUTE_NAMES, SCHEMA } from "../constants";
import {
  goToLoginScreen,
  goToOTPScreen,
  goToRegisterInformationScreen,
} from "../navigations";
import { showToastMessage } from "../utilities";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const accountData = useRef(null);
  const [loading, setLoading] = useState(false);
  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);
  const [visible, setVisible] = useState(false); // Visible state of password field
  const [visibleConfirmation, setVisibleConfirmation] = useState(false); // Visible state of password confirmation field
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(SCHEMA.REGISTER_PHONE_AND_PASS_FORM),
  });
  const minHeight = Math.round(useWindowDimensions().height - 50);
  const togglePasswordVisible = () => {
    setVisible(!visible);
  };

  const togglePasswordConfirmationVisible = () => {
    setVisibleConfirmation(!visibleConfirmation);
  };

  // Event fire when submit form
  const onSubmit = (data) => {
    accountData.current = data;
    setLoading(true);
    sendOtp({ phone: data.phoneNumber, existedStatus: "NONEXISTED" })
      .then(() => {
        goToOTPScreen(
          navigation,
          ROUTE_NAMES.REGISTER,
          accountData.current.phoneNumber,
        );
      })
      .catch(() => {
        setLoading(false);
        showToastMessage("Số điện thoại không hợp lệ hoặc đã tồn tại");
      });
  };

  const navigateToLoginScreenAction = () => {
    goToLoginScreen(navigation);
  };

  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.otpSuccess === true)
        goToRegisterInformationScreen(navigation, {
          phone: accountData.current.phoneNumber,
          password: accountData.current.password,
        });
    }, [route.params]),
  );

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Center flex={1} justifyContent="center" minHeight={minHeight}>
          <VStack
            flex={1}
            justifyContent="center"
            space={1}
            w={{ base: "70%", md: "50%", lg: "30%" }}
          >
            <Center mb={10}>
              <Heading textAlign="center" size="lg" width="100%">
                Đăng ký
              </Heading>
              <Text fontSize="lg">Tạo tài khoản mới</Text>
            </Center>

            {/* Phone number input field */}
            <Text bold fontSize="md">
              Số điện thoại <Text color="danger.500">*</Text>
            </Text>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="phone-iphone" />}
                      size={5}
                      ml={2}
                      color="muted.500"
                    />
                  }
                  keyboardType="number-pad"
                  maxLength={13}
                  paddingLeft={0}
                  placeholder="Số điện thoại"
                  size="lg"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.phoneNumber?.message && (
              <Text color="error.500" fontSize="xs" italic>
                {errors.phoneNumber?.message}
              </Text>
            )}

            {/* Password input field */}
            <Text bold fontSize="md" mt={3}>
              Mật khẩu <Text color="danger.500">*</Text>
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Box position="relative" justifyContent="center">
                  <Input
                    placeholder="Mật khẩu"
                    size="lg"
                    type={visible ? "text" : "password"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <IconButton
                    h="100%"
                    icon={
                      <Icon
                        alignSelf="flex-end"
                        as={
                          <MaterialIcons
                            name={visible ? "visibility" : "visibility-off"}
                          />
                        }
                        color="muted.500"
                        mr={2}
                        size={5}
                      />
                    }
                    justifyContent="center"
                    position="absolute"
                    right={0}
                    w="20%"
                    onPress={togglePasswordVisible}
                  />
                </Box>
              )}
            />
            {errors.password?.message && (
              <Text color="error.500" fontSize="xs" italic>
                {errors.password?.message}
              </Text>
            )}

            {/* Password confirmation input field */}
            <Text bold fontSize="md" mt={3}>
              Nhập lại mật khẩu <Text color="danger.500">*</Text>
            </Text>
            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field: { onChange, onBlur, value } }) => (
                <Box position="relative" justifyContent="center">
                  <Input
                    placeholder="Nhập lại mật khẩu"
                    size="lg"
                    type={visibleConfirmation ? "text" : "password"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <IconButton
                    h="100%"
                    icon={
                      <Icon
                        alignSelf="flex-end"
                        as={
                          <MaterialIcons
                            name={
                              visibleConfirmation
                                ? "visibility"
                                : "visibility-off"
                            }
                          />
                        }
                        color="muted.500"
                        mr={2}
                        size={5}
                      />
                    }
                    justifyContent="center"
                    position="absolute"
                    right={0}
                    w="20%"
                    onPress={togglePasswordConfirmationVisible}
                  />
                </Box>
              )}
            />
            {errors.passwordConfirmation?.message && (
              <Text color="error.500" fontSize="xs" italic>
                {errors.passwordConfirmation?.message}
              </Text>
            )}

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

          <Text mb={6}>
            Bạn chưa có tài khoản?{" "}
            <Text underline onPress={navigateToLoginScreenAction}>
              Đăng nhập
            </Text>
          </Text>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
