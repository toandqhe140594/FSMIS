import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute } from "@react-navigation/native";
import { Box, Button, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions } from "react-native";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import HeaderTab from "../components/HeaderTab";

// DucHM ADD_START 18/11/2021
const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;
// DucHM ADD_END 18/11/2021

// Validation schema for form
const validationSchema = yup.object().shape({
  fishingMethodName: yup.string().required("Tên loại hình không thể bỏ trống"),
});
const AdminFishingMethodEditScreen = () => {
  const route = useRoute();

  const [isNew, setIsNew] = useState(true);
  // DucHM ADD_START 18/11/2021
  const [isActive, setIsActive] = useState(null);
  // DucHM ADD_END 18/11/2021
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, setValue } = methods;

  const onSubmit = (data) => {
    console.log(data); // Test only
  };

  // DucHM ADD_START 18/11/2021
  const handleSwitchStatus = () => {
    // do activate/deactive
    setIsActive(!isActive);
  };
  // DucHM ADD_END 18/11/2021

  useEffect(() => {
    const { id, name, active } = route.params;
    if (id) {
      setIsNew(false);
      setValue("fishingMethodName", name);
      setIsActive(active);
    }
  }, []);

  return (
    <>
      <HeaderTab name="Quản lý loại hình câu" />
      <Box height={CUSTOM_SCREEN_HEIGHT}>
        <FormProvider {...methods}>
          <Center flex={1} w="100%" mt={10} justifyContent="flex-start">
            {/* Fishing method name input field */}
            <InputComponent
              myStyles={{ width: "90%" }}
              label="Tên loại hình câu"
              isTitle
              hasAsterisk
              controllerName="fishingMethodName"
            />
            {!isNew && (
              <Box
                w="90%"
                mt={1}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Text fontSize="md" bold>
                  Trạng thái:
                </Text>
                <Text
                  fontSize="md"
                  color={isActive ? "success.500" : "danger.500"}
                >
                  {isActive ? "Đang hoạt động" : "Đang ẩn"}
                </Text>
              </Box>
            )}
          </Center>
          <Button w="80%" alignSelf="center" onPress={handleSubmit(onSubmit)}>
            {isNew ? "Thêm loại hình câu" : "Lưu thay đổi"}
          </Button>
          {/* // DucHM ADD_START 18/11/2021 */}
          {!isNew && (
            <Button
              w="80%"
              colorScheme={isActive ? "red" : "green"}
              alignSelf="center"
              marginTop={2}
              onPress={handleSwitchStatus}
            >
              {isActive ? "Ẩn loại hình câu này" : "Bỏ ẩn loại hình câu này"}
            </Button>
          )}
          {/* // DucHM ADD_END 18/11/2021 */}
        </FormProvider>
      </Box>
    </>
  );
};

export default AdminFishingMethodEditScreen;
