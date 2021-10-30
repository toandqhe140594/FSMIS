import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Center, Heading, Input, Text, VStack } from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { phoneRegExp } from "../constants";

const errMsg = "Số điện thoại không hợp lệ";
// Validation schema for form
const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Số điện thoại không thể bỏ trống")
    .min(8, errMsg)
    .max(13, errMsg)
    .matches(phoneRegExp, errMsg)
    .label("PhoneNumber"),
});

// Event fire when submit form
const onSubmit = (data) => {
  console.log(data); // Test only
};

const ForgotPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Center flex={1}>
      <Heading size="lg">Quên mật khẩu</Heading>
      <Text fontSize="lg">Bạn hãy nhập số điện thoại</Text>
      <VStack mt={6} space={2} w="70%">
        {/* Phone number input field */}
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              keyboardType="phone-pad"
              maxLength={13}
              placeholder="Số điện thoại"
              size="lg"
              w="100%"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {/* Error message view for phone number */}
        {errors.phoneNumber?.message && (
          <Text color="red.500" fontSize="xs" italic>
            {errors.phoneNumber?.message}
          </Text>
        )}
        {/* Submit button */}
        <Button size="lg" w="100%" onPress={handleSubmit(onSubmit)}>
          Tiếp tục
        </Button>
      </VStack>
    </Center>
  );
};

export default ForgotPasswordScreen;
