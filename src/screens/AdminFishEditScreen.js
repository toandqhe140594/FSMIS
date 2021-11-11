import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Box, Button, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions } from "react-native";
import * as yup from "yup";

// DucHM ADD_START 11/11/2021
import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES, SCHEMA } from "../constants";
// DucHM ADD_END 11/11/2021

const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

// Validation schema for form
const validationSchema = yup.object().shape({
  fishName: yup.string().required("Tên cá không thể bỏ trống"),
});
const AdminFishEditScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isNew, setIsNew] = useState(true);
  const [imageData, setImageData] = useState([]);

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, setValue } = methods;
  // DucHM ADD_START 11/11/2021
  const updateImageArray = (id) => {
    setImageData(imageData.filter((image) => image.id !== id));
  };
  // DucHM ADD_END 11/11/2021
  const onSubmit = (data) => {
    console.log(data); // Test only
  };

  useEffect(() => {
    const { id } = route.params;
    if (id) {
      const { name, image } = route.params;
      setIsNew(false);
      setImageData([{ id: 1, base64: image }]);
      setValue("fishName", name);
    }
  }, []);
  // DucHM ADD_START 11/11/2021
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setImageData(route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );
  // DucHM ADD_END 11/11/2021
  return (
    <>
      <HeaderTab name="Quản lý loại cá" />
      <Box height={CUSTOM_SCREEN_HEIGHT} borderWidth={1}>
        <FormProvider {...methods}>
          <VStack
            w="100%"
            flexGrow={1}
            flexBasis={1}
            justifyContent="flex-start"
            alignItems="center"
            space={2}
          >
            {/* DucHM ADD_START 11/11/2021 */}
            <MultiImageSection
              containerStyle={{ width: "90%" }}
              formRoute={ROUTE_NAMES.ADMIN_FISH_MANAGEMENT_EDIT}
              imageArray={imageData}
              deleteImage={updateImageArray}
            />
            <InputComponent
              myStyles={{ width: "90%" }}
              label="Tên cá"
              hasAsterisk
              placeholder="Nhập tên cá"
              controllerName="fishName"
            />
            {/* DucHM ADD_END 11/11/2021 */}
          </VStack>

          <Button
            w="100%"
            alignSelf="flex-end"
            onPress={handleSubmit(onSubmit)}
          >
            {isNew ? "Thêm loại cá" : "Lưu thay đổi"}
          </Button>
        </FormProvider>
      </Box>
    </>
  );
};

export default AdminFishEditScreen;
