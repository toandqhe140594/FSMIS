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

const PostCreateScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const currentID = useStoreState((states) => states.FManageModel.currentId);
  const [updateStatus, setUpdateStatus] = useState();
  const getLocationPostListByPage = useStoreActions(
    (actions) => actions.FManageModel.getLocationPostListByPage,
  );
  const createPost = useStoreActions(
    (actions) => actions.FManageModel.createNewPost,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, watch, getValues } = methods;
  const watchAttachmentType = watch("attachmentType");

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
    const attachmentType = watchAttachmentType || "NONE";
    const updateData = {
      ...data,
      attachmentType,
      id: currentID,
      url,
    };
    createPost({
      updateData,
      setUpdateStatus,
    });
  };

  const updateImageArray = (id) => {
    setImageArray(imageArray.filter((image) => image.id !== id));
  };
  // Fire when navigates back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        // Set imageArray state and reset navigation params
        setImageArray(route.params?.base64Array);
      }
    }, [route.params]),
  );

  useEffect(() => {
    if (updateStatus === true) {
      showAlertAbsoluteBox("Thông báo", "Tạo bài thành công!", async () => {
        await getLocationPostListByPage({ pageNo: 1 });
        goToFManagePostScreen(navigation);
      });
    } else if (updateStatus === false) {
      showAlertBox("Thông báo", "Đã xảy ra lỗi! Vui lòng thử lại.");
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
                formRoute={ROUTE_NAMES.FMANAGE_POST_CREATE}
                imageArray={imageArray}
                deleteImage={updateImageArray}
              />
            )}
          </View>
          <View style={styles.sectionWrapper}>
            <Button onPress={handleSubmit(onSubmit)}>Đăng</Button>
          </View>
        </ScrollView>
      </FormProvider>
    </>
  );
};

export default PostCreateScreen;
