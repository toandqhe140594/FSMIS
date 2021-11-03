import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  Divider,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import CheckboxSelectorComponent from "../components/LakeEditProfile/CheckboxSelectorComponent";
import FishCardSection from "../components/LakeEditProfile/FishCardSection";
import { ROUTE_NAMES } from "../constants";

const validationSchema = yup.object().shape({
  lakeName: yup.string().required("Tên hồ không thể bỏ trống"),
  lakeDescription: yup.string().required("Miêu tả giá vé ở hồ này"),
  lakeFishingMethods: yup
    .array()
    .test(
      "isArrayEmpty?",
      "Loại hình câu của hồ không được để trống",
      (value) => value.length !== 0,
    ),
  lakeLength: yup.string().required("Chiều dài hồ không được để trống"),
  lakeWidth: yup.string().required("Chiều rộng hồ không được để trống"),
  lakeDepth: yup.string().required("Độ sâu của hồ không được để trống"),
  cards: yup.array().of(
    yup.object().shape({
      fishType: yup.number().required("Loại cá không được để trống"),
      amount: yup.number().required("Số cá bắt được không được để trống"),
      totalWeight: yup
        .number()
        .required("Tổng cân nặng cá không được để trống"),
      minWeight: yup.number().required("Biểu cá không được để trống"),
      maxWeight: yup.number().required("Biểu cá không được để trống"),
    }),
  ),
});

const fishingMethodData = ["Câu đài", "Câu đơn", "Câu lục"];

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const LakeAddNewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { lakeFishingMethods: [] },
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    // Test submit
    console.log(data);
  };

  /**
   * Take id of the image and remove image from imageArray
   * @param {Number} id: id in the object image
   */
  const updateImageArray = (id) => {
    setImageArray(imageArray.filter((image) => image.id !== id));
  };

  // Fire when navigates back to the screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.param?.base64Array && route.params.base64Array.length) {
        setImageArray(route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name="Thêm hồ bé" />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center mt={1}>
              {/* Image Picker section */}
              <MultiImageSection
                containerStyle={styles.sectionWrapper}
                formRoute={ROUTE_NAMES.FMANAGE_LAKE_ADD}
                imageArray={imageArray}
                deleteImage={updateImageArray}
              />
            </Center>

            <Center>
              <InputComponent
                myStyles={styles.sectionWrapper}
                label="Tên hồ câu"
                isTitle
                placeholder="Nhập tên hồ câu"
                controllerName="lakeName"
              />
            </Center>

            <Center>
              <CheckboxSelectorComponent
                myStyles={styles.sectionWrapper}
                label="Loại hình câu"
                isTitle
                placeholder="Chọn loại hình câu"
                data={fishingMethodData}
                controllerName="lakeFishingMethods" // this controller returns an array
              />
            </Center>

            <Center>
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Giá vé"
                isTitle
                placeholder="Miêu tả giá vé hồ"
                numberOfLines={3}
                controllerName="lakeDescription"
              />
            </Center>

            <Center>
              <VStack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Thông số
                </Text>
                <InputComponent
                  label="Chiều dài (m)"
                  placeholder="Nhập chiều dài của hồ"
                  controllerName="lakeLength"
                />
                <InputComponent
                  label="Chiều rộng (m)"
                  placeholder="Nhập chiều rộng của hồ"
                  controllerName="lakeWidth"
                />
                <InputComponent
                  label="Độ sâu (m)"
                  placeholder="Nhập độ sâu của hồ"
                  controllerName="lakeDepth"
                />
              </VStack>
            </Center>

            <Center>
              <Stack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Các loại cá
                </Text>
                <FishCardSection />
              </Stack>
            </Center>
            <Center>
              <Box style={styles.sectionWrapper} mb={5}>
                {/* Submit button */}
                <Button
                  style={styles.button}
                  alignSelf="center"
                  mb={2}
                  onPress={handleSubmit(onSubmit)}
                >
                  Thêm hồ câu
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default LakeAddNewScreen;
