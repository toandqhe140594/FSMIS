import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useCallback, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet } from "react-native";
import * as yup from "yup";

import CatchReportSection from "../components/CatchReport/CatchReportSection";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES } from "../constants";

const validationSchema = yup.object().shape({
  aCaption: yup.string().required("Hãy viết suy nghĩ của bạn về ngày câu"),
  aLakeType: yup.number().required("Loại hồ không được để trống"),
  isPublic: yup.bool(),
  isReleased: yup.bool(),
  cards: yup.array().of(
    yup.object().shape({
      fishType: yup.number().required("Loại cá không được để trống"),
      catches: yup.number().required("Số cá bắt được không được để trống"),
      totalWeight: yup
        .number()
        .required("Tổng cân nặng cá không được để trống"),
      isReleased: yup.bool().default(false),
    }),
  ),
});

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const AnglerCatchReportScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const submitCatchReport = useStoreActions(
    (actions) => actions.LocationModel.submitCatchReport,
  );
  // const lakeList = useStoreActions((actions) => actions.LocationModel.lakeList);
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { isPublic: false },
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit } = methods;
  const onSubmit = (data) => {
    const { aCaption, aLakeType, isPublic, cards } = data;
    const catchesDetailList = cards.map(
      ({
        catches: quantity,
        fishType: fishSpeciesId,
        isReleased: returnToOwner,
        totalWeight: weight,
      }) => ({
        quantity,
        fishSpeciesId,
        returnToOwner,
        weight,
      }),
    );
    if (imageArray !== undefined && imageArray.length > 0) {
      const imagesStringArray = imageArray.map((item) => item.base64);
      submitCatchReport({
        catchesDetailList,
        description: aCaption,
        hidden: isPublic,
        images: imagesStringArray,
        lakeId: aLakeType,
      });
      return Alert.alert("Gửi thành công", "Thông tin gửi thành công", [
        {
          text: "OK",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]);
    }
    return Alert.alert("Thiếu thông tin", "Vui lòng thêm ảnh buổi câu.", [
      {
        text: "OK",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ]);
  };
  const updateImageArray = (id) => {
    setImageArray(imageArray.filter((image) => image.id !== id));
  };
  // Fire when navigates back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setImageArray(route.params.base64Array);
      }
      return () => {
        navigation.setParams({ base64Array: [] });
      };
    }, [route.params]),
  );
  return (
    <>
      <HeaderTab name="Báo cá" />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center>
              <Stack space={2} style={styles.sectionWrapper}>
                {/* Impage picker section */}
                <MultiImageSection
                  formRoute={ROUTE_NAMES.CATCHES_REPORT_FORM}
                  deleteImage={updateImageArray}
                  imageArray={imageArray}
                  selectLimit={3}
                />
                {/* Textarea input field */}
                <TextAreaComponent
                  placeholder="Mô tả ngày câu của bạn"
                  numberOfLines={6}
                  controllerName="aCaption"
                />
              </Stack>
            </Center>

            <Center>
              <SelectComponent
                myStyles={styles.sectionWrapper}
                isTitle
                label="Vị trí hồ câu"
                placeholder="Chọn hồ câu"
                data={[
                  { name: "Hồ thường", id: 1 },
                  { name: "Hồ VIP", id: 2 },
                ]}
                controllerName="aLakeType"
              />
            </Center>

            <Center>
              <Stack style={styles.sectionWrapper} space={2}>
                <Text bold fontSize="md">
                  Thông tin cá
                </Text>
                <CatchReportSection />
              </Stack>
            </Center>

            <Center>
              <Box style={styles.sectionWrapper} mb={5}>
                {/* Public checkbox field */}
                <Controller
                  control={control}
                  name="isPublic"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      mb={1}
                      alignItems="flex-start"
                      value={value}
                      onChange={onChange}
                    >
                      Công khai thông tin
                    </Checkbox>
                  )}
                />
                {/* Submit button */}
                <Button
                  style={styles.button}
                  alignSelf="center"
                  onPress={handleSubmit(onSubmit)}
                >
                  Gửi và checkout
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default AnglerCatchReportScreen;
