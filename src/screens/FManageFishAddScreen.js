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
import { DICTIONARY, SCHEMA } from "../constants";
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const addData = Object.fromEntries(
      Object.entries(data).filter((keyValPair) => keyValPair[1] !== 0),
    );
    addFishToLake({ addData })
      .then(() => {
        setIsLoading(false);
        showAlertAbsoluteBox(
          DICTIONARY.ALERT_TITLE,
          DICTIONARY.ALERT_LAKE_ADD_FISH_SUCCESS_MSG,
          handleGoBack,
          DICTIONARY.CONFIRM_BUTTON_LABEL,
        );
      })
      .catch(() => {
        setIsLoading(false);
        showAlertBox(DICTIONARY.ALERT_TITLE, DICTIONARY.ALERT_ERROR_MSG);
      });
  };

  useEffect(() => {
    getFishList().then(() => {
      setIsLoading(false);
      setFullScreenMode(false);
    });
    const loadingId = setTimeout(() => {
      setIsLoading(false);
      setFullScreenMode(false);
    }, 10000);
    return () => {
      clearTimeout(loadingId);
    };
  }, []);

  return (
    <>
      <HeaderTab name={DICTIONARY.FMANAGE_ADD_FISH_HEADER} />
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
              label={DICTIONARY.FISH_SPECIES_LABEL}
              placeholder={DICTIONARY.SELECT_FISH_SPECIES_PLACEHOLDER}
              data={fishList}
              controllerName={DICTIONARY.FORM_FIELD_FISH_SPECIES}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <InputComponent
                myStyles={{ width: "48%", marginRight: 12 }}
                label={DICTIONARY.FISH_MIN_WEIGHT_LABEL}
                placeholder={DICTIONARY.INPUT_FISH_MIN_WEIGHT_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_FISH_MIN_WEIGHT}
                useNumPad
              />
              <InputComponent
                myStyles={{ flexGrow: 1 }}
                label={DICTIONARY.FISH_MAX_WEIGHT_LABEL}
                placeholder={DICTIONARY.INPUT_FISH_MAX_WEIGHT_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_FISH_MAX_WEIGHT}
                useNumPad
              />
            </View>
            <Text style={styles.hint}>
              Lưu ý: Chỉ cần nhập một trong hai trường dưới đây
            </Text>
            <InputComponent
              label={DICTIONARY.FISH_QUANTITY_LABEL}
              placeholder={DICTIONARY.INPUT_FISH_QUANTITY_PLACEHOLDER}
              controllerName={DICTIONARY.FORM_FIELD_FISH_QUANTITY}
              useNumPad
            />
            <FieldWatcherResetter name={DICTIONARY.FORM_FIELD_FISH_QUANTITY} />
            <InputComponent
              label={DICTIONARY.FISH_TOTAL_WEIGHT_LABEL}
              placeholder={DICTIONARY.INPUT_FISH_TOTAL_WEIGHT_PLACEHOLDER}
              controllerName={DICTIONARY.FORM_FIELD_FISH_TOTAL_WEIGHT}
              useNumPad
            />
            <FieldWatcherResetter
              name={DICTIONARY.FORM_FIELD_FISH_TOTAL_WEIGHT}
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
