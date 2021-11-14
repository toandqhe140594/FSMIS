import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import InputComponent from "../components/common/InputComponent";
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
    flex: 2,
  },
  buttonWrapper: {
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

const PostEditScreen = () => {
  const currentPost = useStoreState(
    (states) => states.FManageModel.currentPost,
  );
  const locationPostList = useStoreState(
    (states) => states.FManageModel.locationPostList,
  );

  const [editData, setEditData] = useState({});
  const route = useRoute();
  const navigation = useNavigation();
  const editPost = useStoreActions((actions) => actions.FManageModel.editPost);
  const [updateStatus, setUpdateStatus] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.FMANAGE_POST_FORM),
    defaultValues: {
      content: currentPost.content,
      postType: currentPost.postType,
      attachmentType: currentPost.attachmentType,
      imageArray: [],
    },
  });
  const setCurrentPinPost = useStoreActions(
    (actions) => actions.FManageModel.setCurrentPinPost,
  );

  const { handleSubmit, watch, setValue, getValues } = methods;
  const watchAttachmentType = watch("attachmentType");

  /**
   * Populates data to image selector or video link field
   */
  const setDefaultValues = () => {
    if (watchAttachmentType === "IMAGE") {
      setValue("imageArray", [{ id: 1, base64: currentPost.url }]);
    }
    if (watchAttachmentType === "VIDEO") {
      setValue("postVideoLink", currentPost.url);
    }
  };

  useEffect(() => {
    setDefaultValues();
  }, []);
  /**
   * Reset previous input when switching
   * new attachment type
   */
  useEffect(() => {
    switch (watchAttachmentType) {
      case "IMAGE":
        if (getValues("postVideoLink")) {
          setValue("postVideoLink", "");
        }
        break;
      case "VIDEO":
        if (getValues("imageArray")?.length > 0) {
          setValue("imageArray", []);
        }
        break;
      default:
        if (getValues("imageArray")?.length > 0) {
          setValue("imageArray", []);
        }
        if (getValues("postVideoLink")) {
          setValue("postVideoLink", "");
        }
    }
  }, [watchAttachmentType]);

  const setAttachmentUrl = (type) => {
    switch (type) {
      case "IMAGE":
        return getValues("imageArray")[0].base64;
      case "VIDEO":
        return getValues("postVideoLink");
      default:
        return "";
    }
  };
  const onSubmit = (data) => {
    setLoadingButton(true);
    const url = setAttachmentUrl(watchAttachmentType);
    const updateData = {
      ...data,
      id: currentPost.id,
      url,
    };
    editPost({
      updateData,
      setUpdateStatus,
    });
    setEditData(updateData);
    if (currentPost.pinned) {
      setCurrentPinPost(updateData);
    }
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

  const changeListPostItem = () => {
    const foundIndex = locationPostList.findIndex(
      (item) => item.id === editData.id,
    );
    locationPostList[foundIndex] = editData;
  };

  useEffect(() => {
    if (updateStatus === "SUCCESS") {
      showAlertAbsoluteBox(
        "Thông báo",
        "Gửi thông thành công! Đang chỉnh sửa bài viết.",
        async () => {
          changeListPostItem();
          goToFManagePostScreen(navigation);
        },
      );
    } else if (updateStatus === "FAILED") {
      showAlertBox("Thông báo", "Đã xảy ra lỗi! Vui lòng thử lại.");
      setLoadingButton(false);
    }
    setUpdateStatus(null);
  }, [updateStatus]);

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
          <View style={styles.sectionWrapper}>
            <VStack space={2} mb={2}>
              <SelectComponent
                label="Sự kiện"
                placeholder="Chọn sự kiện"
                data={postTypeData}
                controllerName="postType"
              />
              <TextAreaComponent
                label="Miêu tả"
                placeholder=""
                numberOfLines={3}
                controllerName="content"
              />
              <SelectComponent
                placeholder="Chọn đính kèm"
                data={attachmentData}
                label="Đính kèm"
                controllerName="attachmentType"
              />

              {watchAttachmentType === "VIDEO" && (
                <InputComponent
                  placeholder="Nhập link vào đây"
                  label="Đường dẫn"
                  controllerName="postVideoLink"
                />
              )}
            </VStack>
            {watchAttachmentType === "IMAGE" && (
              <MultiImageSection
                containerStyle={{ width: "100%" }}
                formRoute={ROUTE_NAMES.FMANAGE_POST_EDIT}
                controllerName="imageArray"
              />
            )}
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={loadingButton}
              isLoadingText="Đang chỉnh sửa bài viết"
            >
              Đăng
            </Button>
          </View>
        </ScrollView>
      </FormProvider>
    </>
  );
};

export default PostEditScreen;
