import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import {
  Box,
  Button,
  Center,
  Divider,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

import MethodCheckboxSelector from "../components/AdvanceSearch/MethodCheckboxSelector";
import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import OverlayLoading from "../components/common/OverlayLoading";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import FishCardSection from "../components/LakeEditProfile/FishCardSection";
import { DEFAULT_TIMEOUT, DICTIONARY, ROUTE_NAMES, SCHEMA } from "../constants";
import { goBack } from "../navigations";
import { showAlertAbsoluteBox, showAlertBox } from "../utilities";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
  error: { color: "#f43f5e", fontSize: 12, fontStyle: "italic" },
});

const LakeAddNewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreenMode, setFullScreenMode] = useState(true);
  const { addNewLakeInLocation } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const { getFishingMethodList } = useStoreActions(
    (actions) => actions.FishingMethodModel,
  );
  const { getFishList } = useStoreActions((actions) => actions.FishModel);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { methods: [], imageArray: [] },
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FORM),
  });
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const handleGoBack = () => {
    goBack(navigation);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const cleanFishArray = data.fishInLakeList.map((fishCard) =>
      Object.fromEntries(
        Object.entries(fishCard).filter((keyValPair) => keyValPair[1] !== 0),
      ),
    );
    const imageUrl = data.imageArray[0].base64;
    delete data.imageArray;
    const addData = { ...data, imageUrl, fishInLakeList: cleanFishArray };
    addNewLakeInLocation({ addData })
      .then(() => {
        setIsLoading(false);
        showAlertAbsoluteBox(
          DICTIONARY.ALERT_TITLE,
          DICTIONARY.ALERT_ADD_LAKE_SUCCESS_MSG,
          handleGoBack,
          DICTIONARY.CONFIRM_BUTTON_LABEL,
        );
      })
      .catch(() => {
        setIsLoading(false);
        showAlertBox(DICTIONARY.ALERT_TITLE, DICTIONARY.ALERT_ERROR_MSG);
      });
  };
  /**
   * Everytime enter the screen, call api
   * to get fishing method list and fish list
   */
  useEffect(() => {
    Promise.all([getFishingMethodList(), getFishList()]).then(() => {
      setIsLoading(false);
      setFullScreenMode(false);
    });
    const loadingId = setTimeout(() => {
      setIsLoading(false);
      setFullScreenMode(false);
    }, DEFAULT_TIMEOUT);
    return () => {
      clearTimeout(loadingId);
    };
  }, []);

  // Fire when navigates back to the screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setValue(DICTIONARY.FORM_FIELD_IMAGE_ARRAY, route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  if (isLoading && fullScreenMode) {
    return <OverlayLoading coverScreen />;
  }
  return (
    <>
      <HeaderTab name={DICTIONARY.FMANAGE_ADD_LAKE_HEADER} />
      <OverlayLoading loading={isLoading} />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center mt={1}>
              <MultiImageSection
                containerStyle={styles.sectionWrapper}
                formRoute={ROUTE_NAMES.FMANAGE_LAKE_ADD}
                controllerName={DICTIONARY.FORM_FIELD_IMAGE_ARRAY}
              />
            </Center>

            <Center>
              <InputComponent
                myStyles={styles.sectionWrapper}
                label={DICTIONARY.LAKE_NAME_LABEL}
                isTitle
                placeholder={DICTIONARY.INPUT_LAKE_NAME_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_LAKE_NAME}
              />
            </Center>

            <Center>
              <MethodCheckboxSelector
                containerStyle={styles.sectionWrapper}
                label={DICTIONARY.LAKE_FISHING_METHODS_LABEL}
                isTitle
                hasAsterisk
                placeholder={DICTIONARY.SELECT_LAKE_METHODS_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_LAKE_FISHING_METHODS}
              />
            </Center>

            <Center>
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label={DICTIONARY.LAKE_PRICE_LABEL}
                isTitle
                hasAsterisk
                placeholder={DICTIONARY.INPUT_LAKE_PRICE_PLACEHOLDER}
                numberOfLines={6}
                controllerName={DICTIONARY.FORM_FIELD_LAKE_PRICE}
              />
            </Center>

            <Center>
              <VStack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Thông số
                </Text>
                <InputComponent
                  hasAsterisk
                  label={DICTIONARY.LAKE_LENGTH_LABEL}
                  placeholder={DICTIONARY.INPUT_LAKE_LENGTH_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_LAKE_LENGTH}
                  useNumPad
                />
                <InputComponent
                  hasAsterisk
                  label={DICTIONARY.LAKE_WIDTH_LABEL}
                  placeholder={DICTIONARY.INPUT_LAKE_WIDTH_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_LAKE_WIDTH}
                  useNumPad
                />
                <InputComponent
                  hasAsterisk
                  label={DICTIONARY.LAKE_DEPTH_LABEL}
                  placeholder={DICTIONARY.INPUT_LAKE_DEPTH_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_LAKE_DEPTH}
                  useNumPad
                />
              </VStack>
            </Center>

            <Center>
              <Stack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Các loại cá
                </Text>
                {errors[DICTIONARY.FORM_FIELD_FISH_CARD]?.message && (
                  <Text style={styles.error}>
                    {errors[DICTIONARY.FORM_FIELD_FISH_CARD]?.message}
                  </Text>
                )}
                <FishCardSection />
              </Stack>
            </Center>
            <Center>
              <Box style={styles.sectionWrapper} mb={4}>
                {/* Submit button */}
                <Button
                  style={styles.button}
                  alignSelf="center"
                  onPress={handleSubmit(onSubmit)}
                >
                  Thêm hồ câu
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default LakeAddNewScreen;
