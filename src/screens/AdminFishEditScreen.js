import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Box, Button, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions } from "react-native";

// DucHM ADD_START 11/11/2021
import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES, SCHEMA } from "../constants";
// DucHM ADD_END 11/11/2021

const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const AdminFishEditScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isNew, setIsNew] = useState(true);
  const [isActive, setIsActive] = useState(null);
  const methods = useForm({
    mode: "onChange",
    defaultValues: { fishImage: [] },
    resolver: yupResolver(SCHEMA.ADMIN_FISH_ADD_EDIT_FORM),
  });
  const { handleSubmit, setValue } = methods;
  const onSubmit = (data) => {
    console.log(data); // Test only
  };

  const handleDelete = () => {
    // Do delete fish here
  };

  useEffect(() => {
    const { id } = route.params;
    if (id) {
      const { name, image, active } = route.params;
      setIsNew(false);
      setValue("fishName", name);
      setValue("fishImage", [{ id: 1, base64: image }]);
      setIsActive(active);
    }
  }, []);

  // DucHM ADD_START 11/11/2021
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setValue("fishImage", route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );
  // DucHM ADD_END 11/11/2021
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
            {/* DucHM ADD_START 11/11/2021 */}
            <MultiImageSection
              containerStyle={{ width: "90%" }}
              formRoute={ROUTE_NAMES.ADMIN_FISH_MANAGEMENT_EDIT}
              controllerName="fishImage"
            />
            <InputComponent
              myStyles={{ width: "90%" }}
              label="Tên cá"
              isTitle
              hasAsterisk
              placeholder="Nhập tên cá"
              controllerName="fishName"
            />
            {/* DucHM ADD_END 11/11/2021 */}
            {/* DucHM ADD_START 18/11/2021 */}
            {!isNew && (
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
            {/* DucHM ADD_END 18/11/2021 */}
          </VStack>

          <Button w="80%" alignSelf="center" onPress={handleSubmit(onSubmit)}>
            {isNew ? "Thêm loại cá" : "Lưu thay đổi"}
          </Button>
          {/* // DucHM ADD_START 18/11/2021 */}
          {!isNew && (
            <Button
              w="80%"
              colorScheme={isActive ? "red" : "green"}
              alignSelf="center"
              marginTop={2}
              variant="outline"
              onPress={handleDelete}
            >
              {isActive ? "Ẩn loại cá này" : "Bỏ ẩn loại cá này"}
            </Button>
          )}
          {/* // DucHM ADD_END 18/11/2021 */}
        </FormProvider>
      </Box>
    </>
  );
};

export default AdminFishEditScreen;
