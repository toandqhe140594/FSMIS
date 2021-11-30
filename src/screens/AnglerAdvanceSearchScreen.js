import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";

import FishCheckboxSelector from "../components/AdvanceSearch/FishCheckboxSelector";
import MethodCheckboxSelector from "../components/AdvanceSearch/MethodCheckboxSelector";
import InputComponent from "../components/common/InputComponent";
import OverlayLoading from "../components/common/OverlayLoading";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";
import { DEFAULT_TIMEOUT, DICTIONARY } from "../constants";
import { goBack, goToFManageSuggestScreen } from "../navigations";
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
});

const AnglerAdvanceSearchScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const { provinceList } = useStoreState((state) => state.AddressModel);
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
      fishingMethodIdList: prevStateData.fishingMethodIdList,
      fishSpeciesIdList: prevStateData.fishSpeciesIdList,
      provinceIdList: prevStateData.provinceIdList[0] || DICTIONARY.ZERO_NUMBER,
      score: prevStateData.score,
    },
  });
  const { handleSubmit, setValue } = methods;

  const navigateToSuggestionScreen = () => {
    goToFManageSuggestScreen(navigation);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const provinceIdList =
      data.provinceIdList !== DICTIONARY.ZERO_NUMBER
        ? [data.provinceIdList]
        : [];
    const submitData = { ...data, provinceIdList };
    searchFishingLocation({ submitData })
      .then(() => {
        goBack(navigation);
      })
      .catch(() => {
        setIsLoading(false);
        showToastMessage(DICTIONARY.ALERT_ERROR_MSG);
      });
  };

  /**
   * Reset last store selected state in easy peasy
   * and field on the screen
   */
  const handleReset = () => {
    resetPrevStateData();
    setValue(DICTIONARY.FORM_FIELD_SEARCH_INPUT, DICTIONARY.EMPTY_STRING);
    setValue(DICTIONARY.FORM_FIELD_SEARCH_PROVINCE, DICTIONARY.ZERO_NUMBER);
    setValue(DICTIONARY.FORM_FIELD_SEARCH_METHODS, DICTIONARY.EMPTY_ARRAY);
    setValue(DICTIONARY.FORM_FIELD_SEARCH_SPECIES, DICTIONARY.EMPTY_ARRAY);
    setValue(DICTIONARY.FORM_FIELD_SEARCH_SCORE, DICTIONARY.ZERO_NUMBER);
  };

  /**
   * Get all api data for select options
   */
  useEffect(() => {
    Promise.all([getAllProvince(), getFishingMethodList(), getFishList()])
      .then(() => {
        setIsLoading(false);
        setFullScreen(false);
      })
      .catch(() => {
        goBack(navigation);
      });
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setFullScreen(false);
    }, DEFAULT_TIMEOUT);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading && fullScreen) {
    return <OverlayLoading coverScreen />;
  }
  return (
    <>
      <HeaderTab
        name={DICTIONARY.ANGLER_ADVANCED_SEARCH_HEADER}
        customIcon={{
          name: "info-outline",
          color: "blue",
          type: "material",
          onPress: navigateToSuggestionScreen,
        }}
      />
      <View style={styles.appContainer}>
        <FormProvider {...methods}>
          <VStack flex={1} space={2} style={styles.sectionWrapper}>
            <InputComponent
              myStyles={{ width: "90%", marginBottom: 4 }}
              label={DICTIONARY.SEARCH_INPUT_LABEL}
              placeholder={DICTIONARY.INPUT_SEARCH_TERM_PLACEHOLDER}
              controllerName={DICTIONARY.FORM_FIELD_SEARCH_INPUT}
            />
            <SelectComponent
              myStyles={{ width: "90%" }}
              label={DICTIONARY.SEARCH_PROVINCE_LABEL}
              placeholder={DICTIONARY.SELECT_SEARCH_PROVINCE_PLACEHOLDER}
              controllerName={DICTIONARY.FORM_FIELD_SEARCH_PROVINCE}
              data={provinceList}
            />
            <MethodCheckboxSelector
              containerStyle={{ width: "90%" }}
              label={DICTIONARY.SEARCH_METHODS_LABEL}
              placeholder={DICTIONARY.SELECT_SEARCH_METHODS_PLACEHOLDER}
              controllerName={DICTIONARY.FORM_FIELD_SEARCH_METHODS}
            />
            <FishCheckboxSelector
              containerStyle={{ width: "90%" }}
              label={DICTIONARY.SEARCH_SPECIES_LABEL}
              placeholder={DICTIONARY.INPUT_SEARCH_SPECIES_PLACEHOLDER}
              controllerName={DICTIONARY.FORM_FIELD_SEARCH_SPECIES}
            />
            <SelectComponent
              myStyles={{ width: "90%" }}
              label={DICTIONARY.SEARCH_SCORE_LABEL}
              placeholder={DICTIONARY.INPUT_SEARCH_SCORE_PLACEHOLDER}
              data={scoreData}
              controllerName={DICTIONARY.FORM_FIELD_SEARCH_SCORE}
            />
          </VStack>
          <View style={styles.buttonWrapper}>
            <Button
              variant="outline"
              style={styles.button}
              isLoading={isLoading}
              isLoadingText={DICTIONARY.SEARCH_LOADING_TEXT}
              onPress={handleReset}
            >
              Xoá bộ lọc
            </Button>
            <Button
              style={styles.button}
              isLoading={isLoading}
              isLoadingText={DICTIONARY.SEARCH_LOADING_TEXT}
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
