import { Button, VStack } from "native-base";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";
import CheckboxSelectorComponent from "../components/LakeEditProfile/CheckboxSelectorComponent";

const fishingMethodData = ["Câu đài", "Câu đơn", "Câu lục"];

const fishTypeData = ["Cá diếc", "Cá chép", "Cá đầu bìu"];

const ratingData = [
  { label: "1 sao", val: 1 },
  { label: "2 sao", val: 2 },
  { label: "3 sao", val: 3 },
  { label: "4 sao", val: 4 },
  { label: "5 sao", val: 5 },
];

const cityData = [
  { label: "Hà Nội", val: 1 },
  { label: "Hồ Chí Minh", val: 2 },
];

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 16,
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionWrapper: { width: "90%" },
  buttonWrapper: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "47%",
  },
});

const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const AnglerAdvanceSearchScreen = () => {
  const methods = useForm({ mode: "onChange", reValidateMode: "onChange" });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <HeaderTab name="Tìm kiếm nâng cao" />
      <View style={[styles.appContainer, { height: CUSTOM_SCREEN_HEIGHT }]}>
        <FormProvider {...methods}>
          <View style={styles.section}>
            <VStack flex={10} space={2} style={[styles.sectionWrapper]}>
              <InputComponent
                label="Từ khoá tìm kiếm"
                placeholder="Nhập số điện thoại, tên hồ câu"
                controllerName="searchTerm"
              />
              <SelectComponent
                label="Thành phố"
                placeholder="Lọc theo thành phố"
                data={cityData}
                controllerName="citySelected"
              />
              <CheckboxSelectorComponent
                label="Loại hình câu"
                placeholder="Chọn loại hình câu"
                data={fishingMethodData}
                controllerName="fishingMethods"
              />
              <CheckboxSelectorComponent
                label="Loại cá"
                placeholder="Chọn loại cá"
                data={fishTypeData}
                controllerName="fishTypes"
              />
              <SelectComponent
                label="Đánh giá"
                placeholder="Lọc theo đánh giá"
                data={ratingData}
                controllerName="rating"
              />
            </VStack>
            <View style={styles.buttonWrapper}>
              <Button variant="outline" style={styles.button}>
                Xoá bộ lọc
              </Button>
              <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
                Tìm kiếm
              </Button>
            </View>
          </View>
        </FormProvider>
      </View>
    </>
  );
};

export default AnglerAdvanceSearchScreen;
