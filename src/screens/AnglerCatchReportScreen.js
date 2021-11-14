import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
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
import React, { useCallback, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";

import CatchReportSection from "../components/CatchReport/CatchReportSection";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { showAlertAbsoluteBox } from "../utilities";

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
  const [listFish, setListFish] = useState([]);
  const [success, setSuccess] = useState(null);
  const increaseCatchesCount = useStoreActions(
    (actions) => actions.ProfileModel.increaseCatchesCount,
  );
  const submitCatchReport = useStoreActions(
    (actions) => actions.CheckInModel.submitCatchReport,
  );
  const getLakeList = useStoreActions(
    (actions) => actions.CheckInModel.getLakeListByLocationId,
  );
  const listLake = useStoreState((states) => states.CheckInModel.lakeList);
  const listFishModel = useStoreState((states) => states.CheckInModel.fishList);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { isPublic: false },
    resolver: yupResolver(SCHEMA.ANGLER_CATCH_REPORT_FORM),
  });

  const { control, handleSubmit, watch, setValue } = methods;
  const watchALakeTypeField = watch("aLakeType");
  const personalCheckout = useStoreActions(
    (actions) => actions.CheckInModel.personalCheckout,
  );
  const onSubmit = (data) => {
    console.log(data);
    // const reduced = cards.reduce((filtered, card) => {
    //   const { fishInLakeId } = listFish.find(({ id }) => id === card.fishType);
    //   filtered.push({
    //     quantity: card.catches,
    //     fishSpeciesId: card.fishType,
    //     returnToOwner: card.isReleased,
    //     weight: card.totalWeight,
    //     fishInLakeId,
    //   });
    //   return filtered;
    // }, []);

    // const imagesStringArray = data.imageArray.map((item) => item.base64);
    // submitCatchReport({
    //   catchesDetailList: reduced,
    //   description: aCaption,
    //   hidden: !isPublic,
    //   images: imagesStringArray,
    //   lakeId: aLakeType,
    //   setSuccess,
    // });
  };

  // Fire when navigates back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setValue("imageArray", route.params.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  useEffect(() => {
    getLakeList();
  }, []);

  useEffect(() => {
    const filter = listFishModel.filter(
      (item) => item.id === watchALakeTypeField,
    );
    if (filter[0] !== undefined) {
      setListFish(filter[0].fishList);
    }
  }, [watchALakeTypeField]);

  useEffect(() => {
    if (success === true)
      showAlertAbsoluteBox(
        "Gửi thành công",
        "Thông tin buổi câu được gửi thành công",
        async () => {
          await personalCheckout();
          increaseCatchesCount();
          navigation.pop(1);
        },
      );
    setSuccess(null);
  }, [success]);

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
                  controllerName="imageArray"
                  selectLimit={3}
                />
                {/* Textarea input field */}
                <TextAreaComponent
                  placeholder="Mô tả ngày câu của bạn"
                  numberOfLines={6}
                  controllerName="description"
                />
              </Stack>
            </Center>

            <Center>
              <SelectComponent
                myStyles={styles.sectionWrapper}
                isTitle
                label="Vị trí hồ câu"
                placeholder="Chọn hồ câu"
                data={listLake}
                controllerName="lakeId"
              />
            </Center>

            <Center>
              <Stack style={styles.sectionWrapper} space={2}>
                <Text bold fontSize="md">
                  Thông tin cá
                </Text>
                <CatchReportSection fishList={listFish} />
              </Stack>
            </Center>

            <Center>
              <Box style={styles.sectionWrapper} mb={5}>
                {/* Public checkbox field */}
                <Controller
                  control={control}
                  name="hidden"
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Checkbox
                        mb={1}
                        alignItems="flex-start"
                        value={value}
                        onChange={onChange}
                      >
                        Để bài báo cá này ở chế độ riêng tư
                      </Checkbox>
                      <Text
                        style={{
                          fontSize: 12,
                          fontStyle: "italic",
                          marginBottom: 12,
                        }}
                      >
                        Lưu ý: Bỏ qua lựa chọn này, kết quả báo cá của bạn sẽ
                        công khai ở trang lịch sử bài cá của hồ để mọi người
                        cùng theo dõi
                      </Text>
                    </>
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
