import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Box, Button, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions } from "react-native";

import InputComponent from "../components/common/InputComponent";
import HeaderTab from "../components/HeaderTab";
import { DICTIONARY, SCHEMA } from "../constants";
import { showToastMessage } from "../utilities";

const OFFSET_BOTTOM = 85;
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const AdminFishingMethodEditScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [methodId, setMethodId] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {
    updateFishingMethod,
    updateFishingMethodStatus,
    getAdminFishingMethodList,
  } = useStoreActions((actions) => actions.FishingMethodModel);

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SCHEMA.ADMIN_FISHING_METHOD_ADD_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const handleError = () => {
    setIsLoading(false);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    updateFishingMethod({ id: methodId, submitData: data, active: isActive })
      .then(() => {
        if (!methodId) {
          getAdminFishingMethodList();
          showToastMessage(DICTIONARY.TOAST_ADD_FISHING_METHOD_SUCCESS_MSG);
          navigation.pop(1);
        } else {
          setIsLoading(false);
          showToastMessage(DICTIONARY.TOAST_EDIT_FISHING_METHOD_SUCCESS_MSG);
        }
      })
      .catch(handleError);
  };

  const handleUpdateStatus = () => {
    setIsLoading(true);
    updateFishingMethodStatus({ id: methodId, active: isActive })
      .then(() => {
        setIsLoading(false);
        setIsActive(!isActive);
        showToastMessage(
          DICTIONARY.TOAST_UPDATE_FISHING_METHOD_STATUS_SUCCESS_MSG,
        );
      })
      .catch(handleError);
  };

  useEffect(() => {
    const { id, name, active } = route.params;
    if (id) {
      setMethodId(id);
      setValue(DICTIONARY.FORM_FIELD_ADMIN_FISHING_METHOD_NAME, name);
      setIsActive(active);
    }
  }, []);

  return (
    <>
      <HeaderTab name="Quản lý loại hình câu" />
      <Box height={CUSTOM_SCREEN_HEIGHT}>
        <FormProvider {...methods}>
          <Center flex={1} w="100%" mt={10} justifyContent="flex-start">
            <InputComponent
              myStyles={{ width: "90%" }}
              label={DICTIONARY.ADMIN_FISHING_METHOD_LABEL}
              isTitle
              hasAsterisk
              controllerName={DICTIONARY.FORM_FIELD_ADMIN_FISHING_METHOD_NAME}
            />
            {methodId && (
              <Box
                w="90%"
                mt={1}
                flexDirection="row"
                justifyContent="space-between"
              >
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
          </Center>
          <Button
            w="80%"
            alignSelf="center"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            isLoadingText={DICTIONARY.PROCESSING_BUTTON_LABEL}
          >
            {methodId
              ? DICTIONARY.SAVE_CHANGES_BUTTON_LABEL
              : DICTIONARY.ADD_FISHING_METHOD_BUTTON_LABEL}
          </Button>
          {methodId && (
            <Button
              w="80%"
              colorScheme={
                isActive
                  ? DICTIONARY.RED_COLOR_SCHEME
                  : DICTIONARY.GREEN_COLOR_SCHEME
              }
              alignSelf="center"
              marginTop={2}
              onPress={handleUpdateStatus}
              isLoading={isLoading}
              isLoadingText={DICTIONARY.PROCESSING_BUTTON_LABEL}
            >
              {isActive
                ? DICTIONARY.HIDE_THIS_METHOD_BUTTON_LABEL
                : DICTIONARY.REVEAL_THIS_METHOD_BUTTON_LABEL}
            </Button>
          )}
        </FormProvider>
      </Box>
    </>
  );
};

export default AdminFishingMethodEditScreen;
