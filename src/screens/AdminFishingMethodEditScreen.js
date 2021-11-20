import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Box, Button, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions } from "react-native";

import InputComponent from "../components/common/InputComponent";
import HeaderTab from "../components/HeaderTab";
import { SCHEMA } from "../constants";
import { showToastMessage } from "../utilities";

const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const AdminFishingMethodEditScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [methodId, setMethodId] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const {
    updateFishingMethod,
    updateFishingMethodStatus,
    getAdminFishingMethodList,
  } = useStoreActions((actions) => actions.FishingMethodModel);

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SCHEMA.ADMIN_FISHING_METHOD_ADD_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const onSubmit = (data) => {
    setIsLoading(true);
    updateFishingMethod({
      id: methodId,
      submitData: data,
      active: isActive,
      setSubmitStatus,
    });
  };

  const handleUpdateStatus = () => {
    setIsLoading(true);
    updateFishingMethodStatus({
      id: methodId,
      active: isActive,
      setSubmitStatus,
    });
  };

  useEffect(() => {
    const { id, name, active } = route.params;
    if (id) {
      setMethodId(id);
      setValue("name", name);
      setIsActive(active);
    }
  }, []);

  useEffect(() => {
    if (submitStatus === "SUCCESS") {
      if (!methodId) {
        getAdminFishingMethodList();
        showToastMessage("Thêm loại hình câu thành công");
        navigation.pop(1);
      } else {
        showToastMessage("Cập nhật loại hình câu thành công");
      }
    } else if (submitStatus === "PATCHED") {
      setIsActive(!isActive);
      showToastMessage("Trạng thái của loại hình câu đã được thay đổi");
    } else if (submitStatus === "FAILED") {
      showToastMessage("Đã xảy ra lỗi! Vui lòng thử lại sau");
    }
    setIsLoading(false);
    setSubmitStatus(null);
  }, [submitStatus]);

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
              controllerName="name"
            />
            {methodId && (
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
          <Button
            w="80%"
            alignSelf="center"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            isLoadingText="Đang xử lý"
          >
            {methodId ? "Lưu thay đổi" : "Thêm loại hình câu"}
          </Button>
          {methodId && (
            <Button
              w="80%"
              colorScheme={isActive ? "red" : "green"}
              alignSelf="center"
              marginTop={2}
              onPress={handleUpdateStatus}
              isLoading={isLoading}
              isLoadingText="Đang xử lý"
            >
              {isActive ? "Ẩn loại hình câu này" : "Bỏ ẩn loại hình câu này"}
            </Button>
          )}
        </FormProvider>
      </Box>
    </>
  );
};

export default AdminFishingMethodEditScreen;
