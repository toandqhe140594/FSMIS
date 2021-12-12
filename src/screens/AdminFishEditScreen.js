import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Box, Button, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions } from "react-native";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import HeaderTab from "../components/HeaderTab";
import { DICTIONARY, ROUTE_NAMES, SCHEMA } from "../constants";
import { showToastMessage } from "../utilities";

const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const AdminFishEditScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [fishId, setFishId] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { updateFish, updateFishStatus, getAdminFishList } = useStoreActions(
    (actions) => actions.FishModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: { imageArray: [] },
    resolver: yupResolver(SCHEMA.ADMIN_FISH_ADD_EDIT_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const handleError = () => {
    setIsLoading(false);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const image = data.imageArray[0].base64;
    delete data.imageArray;
    const submitData = { ...data, image };
    updateFish({ id: fishId, active: isActive, submitData })
      .then(() => {
        if (!fishId) {
          getAdminFishList();
          showToastMessage(DICTIONARY.TOAST_ADD_FISH_SPECIES_SUCCESS_MSG);
          navigation.pop(1);
        } else {
          setIsLoading(false);
          showToastMessage(DICTIONARY.TOAST_EDIT_FISH_SPECIES_SUCCESS_MSG);
        }
      })
      .catch(handleError);
  };

  const handleUpdateStatus = () => {
    setIsLoading(true);
    updateFishStatus({ id: fishId, active: isActive })
      .then(() => {
        setIsLoading(false);
        setIsActive(!isActive);
        showToastMessage(
          DICTIONARY.TOAST_UPDATE_FISH_SPECIES_STATUS_SUCCESS_MSG,
        );
      })
      .catch(handleError);
  };

  useEffect(() => {
    const { id } = route.params;
    if (id) {
      const { name, image, active } = route.params;
      setFishId(id);
      setValue(DICTIONARY.FORM_FIELD_ADMIN_FISH_SPECIES_NAME, name);
      setValue(DICTIONARY.FORM_FIELD_IMAGE_ARRAY, [{ id: 1, base64: image }]);
      setIsActive(active);
    }
  }, []);

  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setValue(DICTIONARY.FORM_FIELD_IMAGE_ARRAY, route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name={DICTIONARY.ADMIN_FISH_MANAGEMENT_HEADER} />
      <Box height={CUSTOM_SCREEN_HEIGHT}>
        <FormProvider {...methods}>
          <VStack
            w="100%"
            flexGrow={1}
            flexBasis={1}
            paddingTop={2}
            justifyContent="flex-start"
            alignItems="center"
            space={2}
          >
            <MultiImageSection
              containerStyle={{ width: "90%" }}
              formRoute={ROUTE_NAMES.ADMIN_FISH_MANAGEMENT_EDIT}
              controllerName={DICTIONARY.FORM_FIELD_IMAGE_ARRAY}
            />
            <InputComponent
              myStyles={{ width: "90%" }}
              label={DICTIONARY.ADMIN_FISH_LABEL}
              isTitle
              hasAsterisk
              placeholder={DICTIONARY.INPUT_ADMIN_FISH_SPECIES_PLACEHOLDER}
              controllerName={DICTIONARY.FORM_FIELD_ADMIN_FISH_SPECIES_NAME}
            />

            {fishId && (
              <Box w="90%" flexDirection="row" justifyContent="space-between">
                <Text fontSize="md" bold>
                  Trạng thái:
                </Text>
                <Text
                  fontSize="md"
                  color={isActive ? "success.500" : "danger.500"}
                >
                  {isActive
                    ? DICTIONARY.IS_ACTIVATE_TEXT
                    : DICTIONARY.IS_DEACTIVATE_TEXT}
                </Text>
              </Box>
            )}
          </VStack>

          <Button
            w="80%"
            alignSelf="center"
            isLoading={isLoading}
            isLoadingText="Đang xử lý"
            onPress={handleSubmit(onSubmit)}
          >
            {fishId
              ? DICTIONARY.SAVE_CHANGES_BUTTON_LABEL
              : DICTIONARY.ADD_FISH_BUTTON_LABEL}
          </Button>
          {fishId && (
            <Button
              w="80%"
              colorScheme={
                isActive
                  ? DICTIONARY.RED_COLOR_SCHEME
                  : DICTIONARY.GREEN_COLOR_SCHEME
              }
              alignSelf="center"
              marginTop={2}
              isLoading={isLoading}
              isLoadingText={DICTIONARY.PROCESSING_BUTTON_LABEL}
              onPress={handleUpdateStatus}
            >
              {isActive
                ? DICTIONARY.HIDE_THIS_FISH_BUTTON_LABEL
                : DICTIONARY.REVEAL_THIS_FISH_BUTTON_LABEL}
            </Button>
          )}
        </FormProvider>
      </Box>
    </>
  );
};

export default AdminFishEditScreen;
