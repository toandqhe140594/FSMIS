import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Box, Button, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions } from "react-native";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { showToastMessage } from "../utilities";

const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const AdminFishEditScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [fishId, setFishId] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { updateFish, updateFishStatus, getAdminFishList } = useStoreActions(
    (actions) => actions.FishModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: { imageArray: [] },
    resolver: yupResolver(SCHEMA.ADMIN_FISH_ADD_EDIT_FORM),
  });
  const { handleSubmit, setValue } = methods;
  const onSubmit = (data) => {
    setIsLoading(true);
    const image = data.imageArray[0].base64;
    delete data.imageArray;
    const submitData = { ...data, image };
    updateFish({ id: fishId, submitData, setSubmitStatus, active: isActive });
  };

  const handleUpdateStatus = () => {
    setIsLoading(true);
    updateFishStatus({ id: fishId, setSubmitStatus, active: isActive });
  };

  useEffect(() => {
    const { id } = route.params;
    if (id) {
      const { name, image, active } = route.params;
      setFishId(id);
      setValue("name", name);
      setValue("imageArray", [{ id: 1, base64: image }]);
      setIsActive(active);
    }
  }, []);

  useEffect(() => {
    if (submitStatus === "SUCCESS") {
      if (!fishId) {
        getAdminFishList();
        showToastMessage("Thêm cá thành công");
        navigation.pop(1);
      } else {
        showToastMessage("Cập nhật cá thành công");
      }
    } else if (submitStatus === "PATCHED") {
      setIsActive(!isActive);
      showToastMessage("Trạng thái của cá đã được thay đổi");
    } else if (submitStatus === "FAILED") {
      showToastMessage("Đã xảy ra lỗi! Vui lòng thử lại sau");
    }
    setIsLoading(false);
    setSubmitStatus(null);
  }, [submitStatus]);

  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setValue("imageArray", route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name="Quản lý loại cá" />
      <Box height={CUSTOM_SCREEN_HEIGHT}>
        <FormProvider {...methods}>
          <VStack
            w="100%"
            flexGrow={1}
            flexBasis={1}
            paddingTop={2}
            justifyContent="flex-start"
            alignItems="center"
            space={2}
          >
            <MultiImageSection
              containerStyle={{ width: "90%" }}
              formRoute={ROUTE_NAMES.ADMIN_FISH_MANAGEMENT_EDIT}
              controllerName="imageArray"
            />
            <InputComponent
              myStyles={{ width: "90%" }}
              label="Tên cá"
              isTitle
              hasAsterisk
              placeholder="Nhập tên cá"
              controllerName="name"
            />

            {fishId && (
              <Box w="90%" flexDirection="row" justifyContent="space-between">
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
          </VStack>

          <Button
            w="80%"
            alignSelf="center"
            isLoading={isLoading}
            isLoadingText="Đang xử lý"
            onPress={handleSubmit(onSubmit)}
          >
            {fishId ? "Lưu thay đổi" : "Thêm loại cá"}
          </Button>
          {fishId && (
            <Button
              w="80%"
              colorScheme={isActive ? "red" : "green"}
              alignSelf="center"
              marginTop={2}
              isLoading={isLoading}
              isLoadingText="Đang xử lý"
              onPress={handleUpdateStatus}
            >
              {isActive ? "Ẩn loại cá này" : "Bỏ ẩn loại cá này"}
            </Button>
          )}
        </FormProvider>
      </Box>
    </>
  );
};

export default AdminFishEditScreen;
