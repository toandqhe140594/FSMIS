import { yupResolver } from "@hookform/resolvers/yup";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, VStack } from "native-base";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";
import { SCHEMA } from "../constants";

const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const styles = StyleSheet.create({
  appContainer: {
    alignItems: "center",
    height: CUSTOM_SCREEN_HEIGHT,
  },
  sectionWrapper: {
    width: "90%",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
  },
});

const FManageFishAddScreen = () => {
  const { fishList } = useStoreState((state) => state.FishModel);
  const { getFishList } = useStoreActions((actions) => actions.FishModel);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FISH_FORM),
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    console.log(data);
  };
  useEffect(() => {
    getFishList();
  }, []);
  return (
    <>
      <HeaderTab name="Thêm cá vào hồ" />
      <View style={styles.appContainer}>
        <FormProvider {...methods}>
          <VStack space={2} style={styles.sectionWrapper}>
            <SelectComponent
              label="Loại cá"
              placeholder="Chọn loại cá"
              data={fishList}
              controllerName="fishSpeciesId"
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <InputComponent
                myStyles={{ width: "48%", marginRight: 12 }}
                label="Biểu nhỏ"
                placeholder="Nhập biểu nhỏ"
                controllerName="minWeight"
                useNumPad
              />
              <InputComponent
                myStyles={{ flexGrow: 1 }}
                label="Biểu to"
                placeholder="Nhập biểu to"
                controllerName="maxWeight"
                useNumPad
              />
            </View>
            <InputComponent
              label="Số lượng cá"
              placeholder="Nhập số con"
              controllerName="quantity"
              useNumPad
            />
            <InputComponent
              label="Tổng cân nặng"
              placeholder="Nhập tổng cân nặng (kg)"
              controllerName="totalWeight"
              useNumPad
            />
          </VStack>
          <Button style={styles.button} onPress={handleSubmit(onSubmit)}>
            Thêm cá
          </Button>
        </FormProvider>
      </View>
    </>
  );
};

export default FManageFishAddScreen;
