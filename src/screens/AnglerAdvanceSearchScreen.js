import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Overlay } from "react-native-elements";

import FishCheckboxSelector from "../components/AdvanceSearch/FishCheckboxSelector";
import MethodCheckboxSelector from "../components/AdvanceSearch/MethodCheckboxSelector";
import InputComponent from "../components/common/InputComponent";
import ProvinceSelector from "../components/common/ProvinceSelector";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";
import { showToastMessage } from "../utilities";

const OFFSET_BOTTOM = 80;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const scoreData = [
  { id: 0, name: "Tất cả" },
  { id: 4, name: "Trên 4 sao" },
  { id: 3, name: "Trên 3 sao" },
  { id: 2, name: "Trên 2 sao" },
  { id: 1, name: "Trên 1 sao" },
];

const styles = StyleSheet.create({
  appContainer: {
    height: CUSTOM_SCREEN_HEIGHT,
  },
  sectionWrapper: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 8,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    width: "47%",
  },
  loadOnStart: { justifyContent: "center", alignItems: "center" },
  loadOnSubmit: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

const AnglerAdvanceSearchScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { getFishingMethodList } = useStoreActions(
    (actions) => actions.FishingMethodModel,
  );
  const { prevStateData } = useStoreState((state) => state.AdvanceSearchModel);
  const { getFishList } = useStoreActions((actions) => actions.FishModel);
  const { getAllProvince } = useStoreActions((actions) => actions.AddressModel);
  const { resetPrevStateData, searchFishingLocation } = useStoreActions(
    (actions) => actions.AdvanceSearchModel,
  );

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      input: prevStateData.input,
      fishingMethodIdList: prevStateData.fishingMethodIdList || [],
      fishSpeciesIdList: prevStateData.fishSpeciesIdList || [],
      provinceIdList: prevStateData.provinceIdList[0] || 0,
      score: prevStateData.score,
    },
  });
  const { handleSubmit, setValue } = methods;

  const onSubmit = (data) => {
    setIsLoading(true);
    const provinceIdList =
      data.provinceIdList === 0 ? [] : [data.provinceIdList];
    const submitData = { ...data, provinceIdList };
    searchFishingLocation({ setSubmitStatus, submitData });
  };

  /**
   * Reset last store selected state in easy peasy
   * and field on the screen
   */
  const handleReset = () => {
    resetPrevStateData();
    setValue("input", "");
    setValue("provinceIdList", 0);
    setValue("fishingMethodIdList", []);
    setValue("fishSpeciesIdList", []);
    setValue("score", 0);
  };

  /**
   * Get all api data for select options
   */
  useEffect(() => {
    Promise.all([getAllProvince(), getFishingMethodList(), getFishList()]).then(
      () => {
        setIsLoading(false);
        setFullScreen(false);
      },
    );
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setFullScreen(false);
    }, 10000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  /**
   * Trigget when submit status returns
   */
  useEffect(() => {
    if (submitStatus === "SUCCESS") {
      setSubmitStatus(null);
      navigation.pop(1);
    } else if (submitStatus === "FAILED") {
      setIsLoading(false);
      setSubmitStatus(null);
      showToastMessage("Đã có lỗi xảy ra! Vui lòng thử lại sau");
    }
  }, [submitStatus]);
  return (
    <>
      <HeaderTab name="Tìm kiếm nâng cao" />
      <Overlay
        isVisible={isLoading && fullScreen}
        fullScreen
        overlayStyle={styles.loadOnStart}
      >
        <ActivityIndicator size={60} color="#2089DC" />
      </Overlay>
      <View style={styles.appContainer}>
        <FormProvider {...methods}>
          <VStack flex={1} space={2} style={styles.sectionWrapper}>
            <InputComponent
              myStyles={{ width: "90%", marginBottom: 4 }}
              label="Từ khoá tìm kiếm"
              placeholder="Nhập số điện thoại, tên hồ câu"
              controllerName="input"
            />
            <ProvinceSelector
              containerStyle={{ width: "90%" }}
              label="Tỉnh/Thành phố"
              placeholder="Chọn tỉnh/thành phố"
              controllerName="provinceIdList"
            />
            <MethodCheckboxSelector
              containerStyle={{ width: "90%" }}
              label="Loại hình câu"
              placeholder="Chọn loại hình câu"
              controllerName="fishingMethodIdList"
            />
            <FishCheckboxSelector
              containerStyle={{ width: "90%" }}
              label="Loại cá"
              placeholder="Chọn loại cá"
              controllerName="fishSpeciesIdList"
            />
            <SelectComponent
              myStyles={{ width: "90%" }}
              label="Đánh giá"
              placeholder="Lọc theo đánh giá"
              data={scoreData}
              controllerName="score"
            />
          </VStack>
          <View style={styles.buttonWrapper}>
            <Button
              variant="outline"
              style={styles.button}
              isLoading={isLoading}
              isLoadingText="Đang tìm kiếm"
              onPress={handleReset}
            >
              Xoá bộ lọc
            </Button>
            <Button
              style={styles.button}
              isLoading={isLoading}
              isLoadingText="Đang tìm kiếm"
              onPress={handleSubmit(onSubmit)}
            >
              Tìm kiếm
            </Button>
          </View>
        </FormProvider>
      </View>
    </>
  );
};

export default AnglerAdvanceSearchScreen;
