import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Center, Input, Text } from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Avatar } from "react-native-elements";
import * as yup from "yup";

import HeaderTab from "../components/HeaderTab";

// Validation schema for form
const validationSchema = yup.object().shape({
  fishName: yup.string().required("Tên cá không thể bỏ trống"),
});
const AdminFishEditScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data); // Test only
  };

  const isNew = true;

  return (
    <>
      <HeaderTab name="Quản lý tài khoản" />
      <Box flex={1} alignItems="center" justifyContent="flex-start">
        <Center w="80%">
          <Avatar
            size="xlarge"
            source={{
              uri: "https://picsum.photos/200",
            }}
            containerStyle={{ padding: 10, margin: 5 }}
            imageProps={{
              resizeMode: "contain",
            }}
          />

          {/* Phone number input field */}
          <Box alignItems="flex-start" w="100%">
            <Text bold fontSize="md">
              Tên cá <Text color="danger.500">*</Text>
            </Text>
            <Controller
              control={control}
              name="fishName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Tên loại cá"
                  size="md"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  w="100%"
                  h={10}
                  mt={2}
                />
              )}
            />
            {errors.fishName?.message && (
              <Text color="error.500" fontSize="xs" italic>
                {errors.fishName?.message}
              </Text>
            )}
          </Box>
        </Center>

        <Box w="70%" mb={5} justifyContent="flex-end" flex={1}>
          <Button w="100%" onPress={handleSubmit(onSubmit)}>
            {isNew ? "Thêm loại cá" : "Lưu thay đổi"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AdminFishEditScreen;
