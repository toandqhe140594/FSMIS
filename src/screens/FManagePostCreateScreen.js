import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, VStack } from "native-base";
import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import InputWithClipboard from "../components/common/InputWithClipboard";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import { DICTIONARY, ROUTE_NAMES, SCHEMA } from "../constants";
import { goToFManagePostScreen } from "../navigations";
import { showAlertAbsoluteBox, showAlertBox } from "../utilities";

const postTypeData = [
  {
    name: DICTIONARY.POST_TYPE_ANNOUNCING_DISPLAY_LABEL,
    id: DICTIONARY.POST_TYPE_ANNOUNCING_ID,
  },
  {
    name: DICTIONARY.POST_TYPE_STOCKING_DISPLAY_LABEL,
    id: DICTIONARY.POST_TYPE_STOCKING_ID,
  },
  {
    name: DICTIONARY.POST_TYPE_REPORTING_DISPLAY_LABEL,
    id: DICTIONARY.POST_TYPE_REPORTING_ID,
  },
];

const attachmentData = [
  {
    id: DICTIONARY.ATTACHMENT_TYPE_VIDEO_ID,
    name: DICTIONARY.ATTACHMENT_TYPE_VIDEO_DISPLAY_LABEL,
  },
  {
    id: DICTIONARY.ATTACHMENT_TYPE_IMAGE_ID,
    name: DICTIONARY.ATTACHMENT_TYPE_IMAGE_DISPLAY_LABEL,
  },
  {
    id: DICTIONARY.ATTACHMENT_TYPE_NONE_ID,
    name: DICTIONARY.ATTACHMENT_TYPE_NONE_DISPLAY_LABEL,
  },
];

const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: CUSTOM_SCREEN_HEIGHT,
  },
  sectionWrapper: {
    width: "90%",
    marginTop: 10,
    flex: 1,
  },
  buttonWrapper: {
    width: "90%",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const PostCreateScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const currentID = useStoreState((states) => states.FManageModel.currentId);
  const [loadingButton, setLoadingButton] = useState(false);

  const createPost = useStoreActions(
    (actions) => actions.FManageModel.createNewPost,
  );

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { imageArray: [] },
    resolver: yupResolver(SCHEMA.FMANAGE_POST_FORM),
  });
  const { handleSubmit, watch, getValues, setValue } = methods;
  const watchAttachmentType = watch(DICTIONARY.FORM_FIELD_POST_ATTACHMENT_TYPE);

  const setAttachmentUrl = (type) => {
    switch (type) {
      case DICTIONARY.ATTACHMENT_TYPE_IMAGE_ID:
        return getValues(DICTIONARY.FORM_FIELD_IMAGE_ARRAY)[0].base64;
      case DICTIONARY.ATTACHMENT_TYPE_VIDEO_ID:
        return getValues(DICTIONARY.FORM_FIELD_POST_MEDIA_URL);
      default:
        return DICTIONARY.EMPTY_STRING;
    }
  };

  const handleScreenNavigation = () => {
    goToFManagePostScreen(navigation);
  };

  const onSubmit = (data) => {
    setLoadingButton(true);
    const url = setAttachmentUrl(watchAttachmentType);
    const attachmentType = watchAttachmentType;
    delete data.imageArray;
    delete data.mediaUrl;
    const updateData = { ...data, attachmentType, id: currentID, url };
    createPost({ updateData })
      .then(() => {
        showAlertAbsoluteBox(
          DICTIONARY.ALERT_TITLE,
          DICTIONARY.ALERT_CREATE_POST_SUCCESS_MSG,
          handleScreenNavigation,
        );
      })
      .catch(() => {
        setLoadingButton(false);
        showAlertBox(DICTIONARY.ALERT_TITLE, DICTIONARY.ALERT_ERROR_MSG);
      });
  };

  // Fire when navigates back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setValue(DICTIONARY.FORM_FIELD_IMAGE_ARRAY, route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name={DICTIONARY.FMANAGE_POST_HEADER} />
      <FormProvider {...methods}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.sectionWrapper}>
            <VStack space={3} mb={2}>
              <SelectComponent
                data={postTypeData}
                label={DICTIONARY.POST_TYPE_LABEL}
                placeholder={DICTIONARY.SELECT_POST_TYPE_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_POST_TYPE}
              />
              <TextAreaComponent
                hasFixedHeight
                numberOfLines={6}
                label={DICTIONARY.POST_CONTENT_LABEL}
                placeholder={DICTIONARY.INPUT_POST_CONTENT_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_POST_CONTENT}
              />
              <SelectComponent
                data={attachmentData}
                label={DICTIONARY.POST_ATTACHMENT_TYPE_LABEL}
                placeholder={DICTIONARY.SELECT_ATTACHMENT_TYPE_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_POST_ATTACHMENT_TYPE}
              />
              {watchAttachmentType === DICTIONARY.ATTACHMENT_TYPE_VIDEO_ID && (
                <InputWithClipboard
                  label={DICTIONARY.POST_ATTACHMENT_MEDIA_LABEL}
                  placeholder={DICTIONARY.INPUT_ATTACHMENT_MEDIA_PLACEHOLDER}
                  controllerName={DICTIONARY.FORM_FIELD_POST_MEDIA_URL}
                />
              )}

              {watchAttachmentType === DICTIONARY.ATTACHMENT_TYPE_IMAGE_ID && (
                <MultiImageSection
                  containerStyle={{ width: "100%" }}
                  formRoute={ROUTE_NAMES.FMANAGE_POST_CREATE}
                  controllerName={DICTIONARY.FORM_FIELD_IMAGE_ARRAY}
                />
              )}
            </VStack>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={loadingButton}
              isLoadingText={DICTIONARY.CREATING_BUTTON_LABEL}
            >
              Đăng
            </Button>
          </View>
        </ScrollView>
      </FormProvider>
    </>
  );
};

export default PostCreateScreen;
