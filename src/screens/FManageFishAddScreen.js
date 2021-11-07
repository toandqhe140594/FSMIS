import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Overlay } from "react-native-elements";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";
import { SCHEMA } from "../constants";
import { showAlertAbsoluteBox, showAlertBox } from "../utilities";

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
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [addStatus, setAddStatus] = useState("");
  const { fishList } = useStoreState((state) => state.FishModel);
  const { getFishList } = useStoreActions((actions) => actions.FishModel);
  const { addFishToLake } = useStoreActions((actions) => actions.FManageModel);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FISH_FORM),
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    const addData = { ...data };
    addFishToLake({ addData, setAddStatus });
    setIsLoading(true);
  };
  useEffect(() => {
    getFishList();
  }, []);
  useEffect(() => {
    if (addStatus === "SUCCESS") {
      setIsLoading(false);
      showAlertAbsoluteBox(
        "Thông báo",
        "Thêm cá thành công!",
        () => {
          navigation.goBack();
        },
        "Xác nhận",
      );
    } else if (addStatus === "FAILED") {
      setIsLoading(false);
      showAlertBox("Thông báo", "Đã có lỗi xảy ra, vui lòng thử lại");
    }
  }, [addStatus]);
  return (
    <>
      <HeaderTab name="Thêm cá vào hồ" />
      <Overlay isVisible={isLoading}>
        <ActivityIndicator color="#2089DC" />
      </Overlay>
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
