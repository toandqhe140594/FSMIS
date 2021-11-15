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
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES } from "../constants";
import { goToFManagePostScreen } from "../navigations";
import { showAlertAbsoluteBox, showAlertBox } from "../utilities";

const validationSchema = yup.object().shape({
  postType: yup.string().required("Loại bài đăng không được để trống"),
  content: yup.string().required("Nội dung bài đăng không được để trống"),
  postVideoLink: yup.string(),
});

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

const PostEditScreen = () => {
  const currentPost = useStoreState(
    (states) => states.FManageModel.currentPost,
  );

  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const editPost = useStoreActions((actions) => actions.FManageModel.editPost);
  const [updateStatus, setUpdateStatus] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      content: currentPost.content,
      postType: currentPost.postType,
      attachmentType: currentPost.attachmentType,
    },
  });

  const { handleSubmit, watch, setValue, getValues } = methods;
  const watchAttachmentType = watch("attachmentType");
  /**
   *  Reset the image array if imageArray is not empty
   *  when switching to input link video
   */

  const setDefaultValues = () => {
    if (watchAttachmentType === "IMAGE") {
      setImageArray([{ id: 1, base64: currentPost.url }]);
    }
    if (watchAttachmentType === "VIDEO") {
      setValue("postVideoLink", currentPost.url);
    }
  };

  useEffect(() => {
    setDefaultValues();
  }, []);
  useEffect(() => {
    switch (watchAttachmentType) {
      case "IMAGE":
        setValue(" postVideoLink", "");
        break;

      case "VIDEO":
        if (imageArray?.length > 0) setImageArray([]);
        break;

      default:
        if (imageArray?.length > 0) setImageArray([]);
    }
  }, [watchAttachmentType]);

  const setAttachmentUrl = (type) => {
    switch (type) {
      case "IMAGE":
        return imageArray[0].base64;
      case "VIDEO":
        return getValues("postVideoLink");
      default:
        return "";
    }
  };
  const onSubmit = (data) => {
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
    setLoadingButton(true);
  };

  const updateImageArray = (id) => {
    setImageArray(imageArray.filter((image) => image.id !== id));
  };
  // Fire when navigates back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setImageArray(route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  useEffect(() => {
    if (updateStatus === "SUCCESS") {
      showAlertAbsoluteBox(
        "Thông báo",
        "Gửi thông thành công! Đang chỉnh sửa bài viết.",
        async () => {
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
          <View style={[{ flex: 2 }, styles.sectionWrapper]}>
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
                imageArray={imageArray}
                deleteImage={updateImageArray}
              />
            )}
          </View>
          <View style={styles.sectionWrapper}>
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
