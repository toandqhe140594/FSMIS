// import "react-native-get-random-values";

import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useRoute } from "@react-navigation/native";
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
import { ScrollView, StyleSheet } from "react-native";
// import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

import CatchReportCard from "../components/CatchReport/CatchReportCard";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES } from "../constants";

const validationSchema = yup.object().shape({
  aCaption: yup.string().required("Hãy viết suy nghĩ của bạn về ngày câu"),
  aLakeType: yup.number().required("Loại hồ không được để trống"),
  isPublic: yup.bool(),
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
  const [imageArray, setImageArray] = useState([]);
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { isPublic: false },
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit } = methods;
  const onSubmit = (data) => {
    console.log(data);
    // console.log(imageArray);
  };
  const updateImageArray = (id) => {
    setImageArray(imageArray.filter((image) => image.id !== id));
  };
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      setImageArray(route.params?.base64Array);
      return () => {
        setImageArray([]);
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
                <CatchReportCard />
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
