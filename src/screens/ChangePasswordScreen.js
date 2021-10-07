import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Center, Heading, Input, Text, VStack } from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

// Validation schema for form
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Mật khẩu không thể bỏ trống")
    .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

const onSubmit = (data) => {
  console.log(data); // Test only
};

const ChangePasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  return (
    <Center flex={1}>
      <Heading size="lg">Thay đổi mật khẩu</Heading>
      <VStack mt={4} space={2} w="70%">
        {/* Password input field */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Mật khẩu"
              secureTextEntry
              size="lg"
              type="password"
              w="100%"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {/* Error message view for password */}
        {errors.password?.message && (
          <Text color="red.500" fontSize="xs" italic>
            {errors.password?.message}
          </Text>
        )}
        {/* Password confirmation */}
        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Nhập lại mật khẩu"
              secureTextEntry
              size="lg"
              type="password"
              w="100%"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {/* Error message view for password confirmation */}
        {errors.passwordConfirmation?.message && (
          <Text color="red.500" fontSize="xs" italic>
            {errors.passwordConfirmation?.message}
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

export default ChangePasswordScreen;
