import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { Overlay } from "react-native-elements";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";
import CheckboxSelectorComponent from "../components/LakeEditProfile/CheckboxSelectorComponent";
import { showToastMessage } from "../utilities";

const FieldWatcher = React.memo(({ name, onValueChange }) => {
  const { control } = useFormContext();
  const watchValue = useWatch({ control, name, defaultValue: [] });
  useEffect(() => {
    onValueChange(watchValue);
  }, [watchValue]);
  return <></>;
});

FieldWatcher.propTypes = {
  name: PropTypes.string,
  onValueChange: PropTypes.func,
};

FieldWatcher.defaultProps = {
  name: "",
  onValueChange: () => {},
};

const OFFSET_BOTTOM = 80;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const ratingData = [{ id: 4, name: "4 sao" }];

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

const schema = yup.object().shape();

const AnglerAdvanceSearchScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { fishList } = useStoreState((state) => state.FishModel);
  const { fishingMethodList } = useStoreState(
    (state) => state.FishingMethodModel,
  );
  const { provinceList } = useStoreState((state) => state.AddressModel);
  const { getFishingMethodList } = useStoreActions(
    (actions) => actions.FishingMethodModel,
  );
  const { prevStateData } = useStoreState((state) => state.AdvanceSearchModel);
  const { getFishList } = useStoreActions((actions) => actions.FishModel);
  const { getAllProvince } = useStoreActions((actions) => actions.AddressModel);
  const { setPrevIdList, resetAllPrevState, searchFishingLocation } =
    useStoreActions((actions) => actions.AdvanceSearchModel);

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { searchTerm: "", rating: 0 },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, setValue } = methods;
  const handleIdListChange = useCallback(
    (type) => (prevState) => {
      setPrevIdList({ type, prevState });
    },
    [],
  ); // because the empty dependency, hence the handeIdListChange will be created once

  const setDefaultValues = () => {
    setValue("fishingMethodIdList", prevStateData.fishingMethodIdList || []);
    setValue("fishSpeciesIdList", prevStateData.fishSpeciesIdList || []);
    setValue("provinceIdList", prevStateData.provinceIdList || 0);
  };

  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    const provinceIdList = [data.provinceIdList];
    const submitData = { ...data, provinceIdList };
    console.log(submitData);
    searchFishingLocation({ setSubmitStatus, submitData });
  };

  /**
   * Reset last store selection and
   * field
   */
  const handleReset = () => {
    resetAllPrevState();
    setValue("provinceIdList", 0);
    setValue("fishingMethodIdList", []);
    setValue("fishSpeciesIdList", []);
    setValue("rating", undefined);
  };

  /**
   *
   */
  useEffect(() => {
    (async () => {
      getAllProvince();
      getFishingMethodList();
      await getFishList();
      setDefaultValues();
      setIsLoading(false);
      setFullScreen(false);
    })();
  }, []);

  /**
   *
   */
  useEffect(() => {
    if (submitStatus === "SUCCESS") {
      // setIsLoading(false);
      // setSubmitStatus(null);
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
              myStyles={{ width: "90%" }}
              label="Từ khoá tìm kiếm"
              placeholder="Nhập số điện thoại, tên hồ câu"
              controllerName="searchTerm"
            />
            <SelectComponent
              myStyles={{ width: "90%" }}
              label="Thành phố"
              placeholder="Lọc theo thành phố"
              data={provinceList}
              controllerName="provinceIdList"
            />
            <FieldWatcher
              name="provinceIdList"
              onValueChange={handleIdListChange("PROVINCE_ID_LIST")}
            />
            <CheckboxSelectorComponent
              myStyles={{ width: "90%" }}
              label="Loại hình câu"
              placeholder="Chọn loại hình câu"
              data={fishingMethodList}
              controllerName="fishingMethodIdList"
            />
            <FieldWatcher
              name="fishingMethodIdList"
              onValueChange={handleIdListChange("FISHING_METHOD_ID_LIST")}
            />
            <CheckboxSelectorComponent
              myStyles={{ width: "90%" }}
              label="Loại cá"
              placeholder="Chọn loại cá"
              data={fishList}
              controllerName="fishSpeciesIdList"
            />
            <FieldWatcher
              name="fishSpeciesIdList"
              onValueChange={handleIdListChange("FISH_SPECIES_ID_LIST")}
            />
            <SelectComponent
              myStyles={{ width: "90%" }}
              label="Đánh giá"
              placeholder="Lọc theo đánh giá"
              data={ratingData}
              controllerName="rating"
            />
          </VStack>
          <View style={styles.buttonWrapper}>
            <Button
              variant="outline"
              style={styles.button}
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
