import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Box,
  Button,
  Center,
  Divider,
  ScrollView,
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
import { DEFAULT_TIMEOUT, DICTIONARY, ROUTE_NAMES, SCHEMA } from "../constants";
import { goBack } from "../navigations";
import {
  showAlertAbsoluteBox,
  showAlertBox,
  showAlertConfirmBox,
  showToastMessage,
} from "../utilities";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

/**
 * Compare to database method list and return id of all methods in lake
 * @param {Array} methodData list of all methods, each contains name and id
 * @param {Array} lakeMethods list of method's names availble in lake
 * @returns Array of method ids
 */
const getMethodIds = (methodData, lakeMethods) =>
  methodData.reduce((acc, { name, id }) => {
    if (lakeMethods.includes(name)) acc.push(id);
    return acc;
  }, []);

const LakeEditProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreenMode, setFullScreenMode] = useState(true);
  const { fishingMethodList } = useStoreState(
    (state) => state.FishingMethodModel,
  );
  const { getFishingMethodList } = useStoreActions(
    (actions) => actions.FishingMethodModel,
  );
  const { lakeDetail } = useStoreState((states) => states.FManageModel);
  const { editLakeDetail, closeLakeByLakeId } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: lakeDetail.name,
      price: lakeDetail.price,
      width: lakeDetail.width.toString(),
      length: lakeDetail.length.toString(),
      depth: lakeDetail.depth.toString(),
      imageArray: [{ id: 1, base64: lakeDetail.imageUrl }],
      methods: [],
    },
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const navigateToLakeProfileScreen = () => {
    goBack(navigation);
  };

  const handleError = () => {
    setIsLoading(false);
    showAlertBox(DICTIONARY.ALERT_TITLE, DICTIONARY.ALERT_ERROR_MSG);
  };

  /**
   * Submit lake changes
   * @param {Object} data data from controller
   */
  const onSubmit = (data) => {
    setIsLoading(true);
    const { id } = lakeDetail;
    const imageUrl = data.imageArray[0].base64;
    delete data.imageArray;
    const updateData = { ...data, imageUrl };
    editLakeDetail({ updateData, id })
      .then(() => {
        setIsLoading(false);
        showAlertAbsoluteBox(
          DICTIONARY.ALERT_TITLE,
          DICTIONARY.ALERT_EDIT_LAKE_SUCCESS_MSG,
          navigateToLakeProfileScreen,
          DICTIONARY.CONFIRM_BUTTON_LABEL,
        );
      })
      .catch(handleError);
  };

  const handleCloseLake = (id) => () => {
    closeLakeByLakeId({ id })
      .then(() => {
        showToastMessage(DICTIONARY.TOAST_DELETE_LAKE_SUCCESS_MSG);
        navigation.pop(2);
      })
      .catch(handleError);
  };

  const promptBeforeDelete = () => {
    const { name, id } = lakeDetail;
    showAlertConfirmBox(
      DICTIONARY.ALERT_DELETE_LAKE_PROMPT_TITLE,
      `"${name}" ${DICTIONARY.ALERT_DELETE_LAKE_PROMPT_MSG}`,
      handleCloseLake(id),
    );
  };

  /**
   * Call fishing method list api
   */
  useEffect(() => {
    getFishingMethodList().then(() => {
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

  useEffect(() => {
    if (fishingMethodList.length) {
      setValue(
        DICTIONARY.FORM_FIELD_LAKE_FISHING_METHODS,
        getMethodIds(fishingMethodList, lakeDetail.fishingMethodList),
      );
    }
  }, [fishingMethodList.length]);

  /**
   * Fire when navigates back to the screen
   */
  useFocusEffect(
    // useCallback will listen to rsetIsLoading(false);
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
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
      <HeaderTab name="Chỉnh sửa hồ bé" />
      <OverlayLoading loading={isLoading} />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center mt={1}>
              {/* Image Picker section */}
              <MultiImageSection
                containerStyle={styles.sectionWrapper}
                formRoute={ROUTE_NAMES.FMANAGE_LAKE_EDIT}
                controllerName={DICTIONARY.FORM_FIELD_IMAGE_ARRAY}
              />
            </Center>

            <Center>
              <InputComponent
                myStyles={styles.sectionWrapper}
                label={DICTIONARY.LAKE_NAME_LABEL}
                isTitle
                hasAsterisk
                placeholder={DICTIONARY.INPUT_LAKE_NAME_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_LAKE_NAME}
              />
            </Center>

            <Center>
              <MethodCheckboxSelector
                containerStyle={styles.sectionWrapper}
                placeholder={DICTIONARY.SELECT_LAKE_METHODS_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_LAKE_FISHING_METHODS}
                label={DICTIONARY.LAKE_FISHING_METHODS_LABEL}
                hasAsterisk
                isTitle
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
              <Box style={styles.sectionWrapper} mb={5}>
                {/* Submit button */}
                <Button
                  w="90%"
                  mb={2}
                  alignSelf="center"
                  onPress={handleSubmit(onSubmit)}
                >
                  Lưu thông tin hồ câu
                </Button>
                <Button
                  w="90%"
                  colorScheme="red"
                  variant="outline"
                  alignSelf="center"
                  onPress={promptBeforeDelete}
                >
                  Xoá hồ câu
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default LakeEditProfileScreen;
