import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Overlay } from "react-native-elements";

import FieldWatcherResetter from "../components/common/FieldWatcherResetter";
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
  loadOnStart: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadOnSubmit: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  hint: {
    fontSize: 12,
    fontStyle: "italic",
    alignSelf: "center",
  },
});

const FManageFishAddScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreenMode, setFullScreenMode] = useState(true);
  const [addStatus, setAddStatus] = useState("");
  const { fishList } = useStoreState((state) => state.FishModel);
  const { getFishList } = useStoreActions((actions) => actions.FishModel);
  const { addFishToLake } = useStoreActions((actions) => actions.FManageModel);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { quantity: 0, totalWeight: 0 },
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FISH_ADD_FORM),
  });
  const { handleSubmit } = methods;
  // const watchQuantity = watch("quantity", 0);
  // const watchTotalWeight = watch("totalWeight", 0);
  const onSubmit = (data) => {
    setIsLoading(true);
    const addData = Object.fromEntries(
      Object.entries(data).filter((keyValPair) => keyValPair[1] !== 0),
    );
    addFishToLake({ addData, setAddStatus });
  };

  useEffect(() => {
    (async () => {
      await getFishList();
      setIsLoading(false);
      setFullScreenMode(false);
    })();
  }, []);

  // useEffect(() => {
  //   if (watchQuantity === "") {
  //     setValue("quantity", 0);
  //     clearErrors("quantity");
  //   }
  // }, [watchQuantity]);

  // useEffect(() => {
  //   if (watchTotalWeight === "") {
  //     setValue("totalWeight", 0);
  //     clearErrors("totalWeight");
  //   }
  // }, [watchTotalWeight]);

  useEffect(() => {
    if (addStatus === "SUCCESS") {
      setIsLoading(false);
      setAddStatus(null);
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
      setAddStatus(null);
      showAlertBox("Thông báo", "Đã có lỗi xảy ra, vui lòng thử lại");
    }
  }, [addStatus]);
  return (
    <>
      <HeaderTab name="Thêm cá vào hồ" />
      <Overlay
        isVisible={isLoading}
        fullScreen
        overlayStyle={fullScreenMode ? styles.loadOnStart : styles.loadOnSubmit}
      >
        <ActivityIndicator size={60} color="#2089DC" />
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
            <Text style={styles.hint}>
              Lưu ý: Chỉ cần nhập một trong hai trường dưới đây
            </Text>
            <InputComponent
              label="Số lượng cá"
              placeholder="Nhập số con"
              controllerName="quantity"
              useNumPad
            />
            <FieldWatcherResetter name="quantity" />
            <InputComponent
              label="Tổng cân nặng"
              placeholder="Nhập tổng cân nặng (kg)"
              controllerName="totalWeight"
              useNumPad
            />
            <FieldWatcherResetter name="totalWeight" />
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
