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
import OverlayLoading from "../components/common/OverlayLoading";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import { DICTIONARY, ROUTE_NAMES, SCHEMA } from "../constants";
import { goBack } from "../navigations";
import { showAlertAbsoluteBox, showAlertBox } from "../utilities";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  error: { fontStyle: "italic", color: "red", fontSize: 12 },
});

const AnglerCatchReportScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [workingFishList, setWorkingFishList] = useState([]);
  const { lakeList, fishList } = useStoreState((states) => states.CheckInModel);
  const { increaseCatchesCount } = useStoreActions(
    (actions) => actions.ProfileModel,
  );
  const { submitCatchReport } = useStoreActions(
    (actions) => actions.CheckInModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { hidden: false, imageArray: [] },
    resolver: yupResolver(SCHEMA.ANGLER_CATCH_REPORT_FORM),
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const watchLakeIdField = watch(DICTIONARY.FORM_FIELD_CATCH_REPORT_LAKE_ID);

  const handleGoBack = () => {
    goBack(navigation);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const images = data.imageArray.map((item) => item.base64);
    delete data.imageArray;
    const submitData = { ...data, images };
    submitCatchReport({ submitData })
      .then(() => {
        increaseCatchesCount();
        showAlertAbsoluteBox(
          DICTIONARY.ALERT_TITLE,
          DICTIONARY.CATCH_REPORT_SEND_SUCCESS_MSG,
          handleGoBack,
        );
      })
      .catch(() => {
        setIsLoading(false);
        showAlertBox(DICTIONARY.ALERT_TITLE, DICTIONARY.ALERT_ERROR_MSG);
      });
  };

  /**
   * Set list of fish based on lake id chosen
   */
  useEffect(() => {
    const filter = fishList.filter((item) => item.id === watchLakeIdField);
    if (filter[0] !== undefined) {
      setWorkingFishList(filter[0].fishList);
    }
  }, [watchLakeIdField]);

  // Fire when navigates back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setValue(DICTIONARY.FORM_FIELD_IMAGE_ARRAY, route.params.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name={DICTIONARY.ANGLER_CATCH_REPORT_HEADER} />
      <OverlayLoading loading={isLoading} />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center>
              <Stack space={2} style={styles.sectionWrapper}>
                {/* Impage picker section */}
                <MultiImageSection
                  formRoute={ROUTE_NAMES.CATCHES_REPORT_FORM}
                  controllerName={DICTIONARY.FORM_FIELD_IMAGE_ARRAY}
                  selectLimit={3}
                />
                {/* Textarea input field */}
                <TextAreaComponent
                  placeholder={
                    DICTIONARY.INPUT_CATCH_REPORT_DESCRIPTION_PLACEHOLDER
                  }
                  numberOfLines={6}
                  controllerName={
                    DICTIONARY.FROM_FIELD_CATCH_REPORT_DESCRIPTION
                  }
                />
              </Stack>
            </Center>

            <Center>
              <SelectComponent
                myStyles={styles.sectionWrapper}
                isTitle
                hasAsterisk
                label={DICTIONARY.CATCH_REPORT_LAKE_LABEL}
                placeholder={DICTIONARY.SELECT_CATCH_REPORT_LAKE_PLACEHOLDER}
                data={lakeList}
                controllerName={DICTIONARY.FORM_FIELD_CATCH_REPORT_LAKE_ID}
              />
            </Center>

            <Center>
              <Stack style={styles.sectionWrapper} space={1}>
                <Text bold fontSize="md">
                  Thông tin cá
                </Text>
                {errors[DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD]?.message && (
                  <Text style={styles.error}>
                    {errors[DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD]?.message}
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
                  w="90%"
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
