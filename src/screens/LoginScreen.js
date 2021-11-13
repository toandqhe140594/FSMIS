import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import * as yup from "yup";

import { phoneRegExp } from "../constants";
import { goToRegisterScreen } from "../navigations";

// Validation schema for form
const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Số điện thoại không thể bỏ trống")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .label("PhoneNumber"),
  password: yup
    .string()
    .required("Mật khẩu không thể bỏ trống")
    .label("Password"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const login = useStoreActions((actions) => actions.login);

  const [visible, setVisible] = useState(false);

  // Development only
  useEffect(() => {
    // 0921485233 admin
    setValue("phoneNumber", "0963372727");
    setValue("password", "Asdf2k@!");
  }, []);

  const onSubmit = (data) => {
    login({ phone: data.phoneNumber, password: data.password });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Box
          flex={1}
          minHeight={Math.round(
            useWindowDimensions().height - StatusBar.currentHeight,
          )}
        >
          <Center flex={1}>
            <Image
              source={require("../assets/images/logo.png")}
              alt="Logo"
              size="xl"
            />
          </Center>
          <Center flex={1.8}>
            <Heading size="lg">Xin chào</Heading>
            <Text fontSize="lg">
              Hãy cùng khám phá với <Text bold>FSMIS</Text>!
            </Text>
            <VStack flex={1} mt={6} space={1} w={{ base: "70%", md: "50" }}>
              {/* Phone number input field */}
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
                    keyboardType="phone-pad"
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
                <Text color="red.500" fontSize="xs" italic>
                  {errors.phoneNumber?.message}
                </Text>
              )}

              {/* Password input field */}
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
                      onPress={() => setVisible(!visible)}
                    />
                  </Box>
                )}
              />
              {errors.password?.message && (
                <Text color="red.500" fontSize="xs" italic>
                  {errors.password?.message}
                </Text>
              )}

              <Text alignSelf="flex-end" underline>
                Quên mật khẩu?
              </Text>

              {/* Submit button */}
              <Button onPress={handleSubmit(onSubmit)}>Đăng nhập</Button>
            </VStack>
          </Center>
          <Box justifyContent="flex-end" alignItems="center" mb={6}>
            <Text>
              Bạn chưa có tài khoản?{" "}
              <Text
                underline
                onPress={() => {
                  goToRegisterScreen(navigation);
                }}
              >
                Đăng ký
              </Text>
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
