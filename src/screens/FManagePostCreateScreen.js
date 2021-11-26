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
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { goToFManagePostScreen } from "../navigations";
import { showAlertAbsoluteBox, showAlertBox } from "../utilities";

const postTypeData = [
  { name: "Thông báo", id: "ANNOUNCING" },
  { name: "Bồi cá", id: "STOCKING" },
  { name: "Báo cá", id: "REPORTING" },
];
const attachmentData = [
  { id: "VIDEO", name: "Video" },
  { id: "IMAGE", name: "Ảnh" },
  { id: "NONE", name: "Không đính kèm" },
];

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const OFFSET_BOTTOM = 85;
// Get window height without status bar height
const CUSTOM_SCREEN_HEIGHT = Dimensions.get("window").height - OFFSET_BOTTOM;

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
  const watchAttachmentType = watch("attachmentType");

  const setAttachmentUrl = (type) => {
    switch (type) {
      case "IMAGE":
        return getValues("imageArray")[0].base64;
      case "VIDEO":
        return getValues("mediaUrl");
      default:
        return "";
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
          "Thông báo",
          "Gửi thông tin thành công! Bài viết đang được tạo",
          handleScreenNavigation,
        );
      })
      .catch(() => {
        setLoadingButton(false);
        showAlertBox("Thông báo", "Đã xảy ra lỗi! Vui lòng thử lại.");
      });
  };

  // Fire when navigates back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setValue("imageArray", route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name="Bài đăng" />
      <FormProvider {...methods}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            height: CUSTOM_SCREEN_HEIGHT,
            marginTop: 8,
          }}
        >
          <View style={StyleSheet.compose(styles.sectionWrapper, { flex: 1 })}>
            <VStack space={3} mb={2}>
              <SelectComponent
                label="Sự kiện"
                placeholder="Chọn sự kiện"
                data={postTypeData}
                controllerName="postType"
              />
              <TextAreaComponent
                label="Miêu tả"
                placeholder="Nội dung bài đăng"
                numberOfLines={6}
                controllerName="content"
              />
              <SelectComponent
                placeholder="Chọn đính kèm"
                data={attachmentData}
                label="Đính kèm"
                controllerName="attachmentType"
              />
              {watchAttachmentType === "VIDEO" && (
                <InputWithClipboard
                  label="Đường dẫn"
                  placeholder="Nhập mã nhúng video"
                  controllerName="mediaUrl"
                />
              )}
            </VStack>
            {watchAttachmentType === "IMAGE" && (
              <MultiImageSection
                containerStyle={{ width: "100%" }}
                formRoute={ROUTE_NAMES.FMANAGE_POST_CREATE}
                controllerName="imageArray"
              />
            )}
          </View>
          <View style={styles.sectionWrapper}>
            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={loadingButton}
              isLoadingText="Đang tạo bài viết"
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
