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
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

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
  error: { fontStyle: "italic", color: "red", fontSize: 12 },
  loadOnStart: { justifyContent: "center", alignItems: "center" },
  loadOnSubmit: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

const AnglerCatchReportScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [workingFishList, setWorkingFishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const [getStatus, setGetStatus] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const { lakeList, fishList } = useStoreState((states) => states.CheckInModel);
  const { increaseCatchesCount } = useStoreActions(
    (actions) => actions.ProfileModel,
  );
  const { submitCatchReport, getLakeListByLocationId } = useStoreActions(
    (actions) => actions.CheckInModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { isPublic: false },
    resolver: yupResolver(SCHEMA.ANGLER_CATCH_REPORT_FORM),
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const watchLakeIdField = watch("lakeId");
  const onSubmit = (data) => {
    setIsLoading(true);
    const images = data.imageArray.map((item) => item.base64);
    delete data.imageArray; // Delete "imageArray" key in "data" object
    // "data" will not have redundant "imageArray" data but only "images" have been processed
    const submitData = { ...data, images };
    submitCatchReport({ submitData, setSubmitStatus });
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
    /* --------- NOTE TO REMOVE ------------ */
    // Remove when getAllFish api working again
    // Set isLoading default state to false
    // Possibly remove fullScreen state and leave
    // Overlay default style as loadOnSubmit
    getLakeListByLocationId({ setGetStatus });
    /* ------------------------------------- */
  }, []);

  /**
   * Set list of fish based on lake id chosen
   */
  useEffect(() => {
    const filter = fishList.filter((item) => item.id === watchLakeIdField);
    if (filter[0] !== undefined) {
      setWorkingFishList(filter[0].fishList);
    }
  }, [watchLakeIdField]);

  /**
   * Trigger when get status return
   */
  useEffect(() => {
    if (getStatus === "SUCCESS") {
      setIsLoading(false);
      setFullScreen(false);
      setGetStatus(null);
    } else if (getStatus === "FAILED") {
      setIsLoading(false);
      setFullScreen(false);
      setGetStatus(null);
      // alert error
    }
  }, [getStatus]);

  /**
   * Trigger when submit status return
   */
  useEffect(() => {
    if (submitStatus === "SUCCESS") {
      increaseCatchesCount();
      showAlertAbsoluteBox(
        "Gửi thành công",
        "Thông tin buổi câu được gửi thành công",
        () => {
          navigation.pop(1);
        },
      );
      setSubmitStatus(null);
    } else if (submitStatus === "FAILED") {
      setIsLoading(false);
      setSubmitStatus(null);
      showAlertBox("Thông báo", "Đã xảy ra lỗi! Vui lòng thử lại sau.");
    }
  }, [submitStatus]);

  return (
    <>
      <HeaderTab name="Báo cá" />
      <Overlay
        isVisible={isLoading}
        fullScreen
        overlayStyle={fullScreen ? styles.loadOnStart : styles.loadOnSubmit}
      >
        <ActivityIndicator size={60} color="#2089DC" />
      </Overlay>
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
                data={lakeList}
                controllerName="lakeId"
              />
            </Center>

            <Center>
              <Stack style={styles.sectionWrapper} space={1}>
                <Text bold fontSize="md">
                  Thông tin cá
                </Text>
                {errors.catchesDetailList?.message && (
                  <Text style={styles.error}>
                    {errors.catchesDetailList?.message}
                  </Text>
                )}
                <CatchReportSection fishList={workingFishList} />
              </Stack>
            </Center>

            <Center>
              <Box style={styles.sectionWrapper} mb={5}>
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
