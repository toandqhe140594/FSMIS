import { Button, Center, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

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
  container: {
    flex: 1,
  },
  wrapper: { width: "90%" },
  buttonWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const AnglerAdvanceSearchScreen = () => {
  const [fishingMethods, setFishingMethods] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState("");
  const [fishTypes, setFishTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState("");
  const methods = useForm({ mode: "onChange", reValidateMode: "onChange" });
  const handleOnSelectMethods = (values) => {
    setFishingMethods(values || []);
  };
  const handleOnSelectTypes = (values) => {
    setFishTypes(values || []);
  };
  const onSubmit = (date) => {
    console.log(data);
  };
  useEffect(() => {
    if (fishingMethods.length === 0)
      setSelectedMethods("Lọc theo loại hình câu");
    else
      setSelectedMethods(
        fishingMethods.reduce(
          (accumulator, currentValue) => `${accumulator}, ${currentValue}`,
        ),
      );
  }, [fishingMethods]);
  useEffect(() => {
    if (fishTypes.length === 0) setSelectedTypes("Lọc theo loại cá");
    else
      setSelectedTypes(
        fishTypes.reduce(
          (accumulator, currentValue) => `${accumulator}, ${currentValue}`,
        ),
      );
  }, [fishTypes]);
  return (
    <>
      <HeaderTab name="Tìm kiếm nâng cao" />
      <View style={[styles.container]}>
        <FormProvider {...methods}>
          <Center flex={9}>
            <VStack flex={8} space={2} style={[styles.wrapper]}>
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
                placeholder={selectedMethods}
                groupValue={fishingMethods}
                handleOnSelect={handleOnSelectMethods}
                data={fishingMethodData}
              />
              <CheckboxSelectorComponent
                label="Loại cá"
                placeholder={selectedTypes}
                groupValue={fishTypes}
                handleOnSelect={handleOnSelectTypes}
                data={fishTypeData}
              />
              <SelectComponent
                label="Đánh giá"
                placeholder="Lọc theo đánh giá"
                data={ratingData}
                controllerName="rating"
              />
            </VStack>
            <View style={[styles.wrapper, styles.buttonWrapper]}>
              <Button variant="outline" style={{ width: "45%" }}>
                Xoá bộ lọc
              </Button>
              <Button style={{ width: "45%" }}>Tìm kiếm</Button>
            </View>
          </Center>
        </FormProvider>
      </View>
    </>
  );
};

export default AnglerAdvanceSearchScreen;
