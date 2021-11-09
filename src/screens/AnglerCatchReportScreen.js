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
import { showAlertAbsoluteBox, showAlertBox } from "../utilities";

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
  const [listFish, setListFish] = useState([]);
  const [success, setSuccess] = useState(null);
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

  const { control, handleSubmit, watch } = methods;
  const watchALakeTypeField = watch("aLakeType");
  const personalCheckout = useStoreActions(
    (actions) => actions.CheckInModel.personalCheckout,
  );
  const onSubmit = (data) => {
    const { aCaption, aLakeType, isPublic, cards } = data;

    if (imageArray !== undefined && imageArray.length > 0) {
      const reduced = cards.reduce((filtered, card) => {
        const { fishInLakeId } = listFish.find(
          ({ id }) => id === card.fishType,
        );
        filtered.push({
          quantity: card.catches,
          fishSpeciesId: card.fishType,
          returnToOwner: card.isReleased,
          weight: card.totalWeight,
          fishInLakeId,
        });
        return filtered;
      }, []);

      const imagesStringArray = imageArray.map((item) => item.base64);
      submitCatchReport({
        catchesDetailList: reduced,
        description: aCaption,
        hidden: !isPublic,
        images: imagesStringArray,
        lakeId: aLakeType,
        setSuccess,
      });
      return;
    }
    showAlertBox("Thiếu thông tin", "Vui lòng thêm ảnh buổi câu");
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
                data={listLake}
                controllerName="aLakeType"
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
