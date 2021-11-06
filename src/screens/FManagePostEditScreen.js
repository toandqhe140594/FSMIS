import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Select, Text, VStack } from "native-base";
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
import { showAlertBox } from "../utilities";

const validationSchema = yup.object().shape({
  postType: yup.number().default(1),
  postDescription: yup
    .string()
    .required("Nội dung bài đăng không được để trống"),
  postVideoLink: yup.string(),
});

const postTypeData = [
  { name: "Thông báo", type: "ANNOUNCING", id: 1 },
  { name: "Bồi cá", type: "STOCKING", id: 2 },
  { name: "Báo cá", type: "REPORTING", id: 3 },
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
  //   console.log(`currentPost`, currentPost);
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const [showSection, setShowSection] = useState("NONE");
  const editPost = useStoreActions((actions) => actions.FManageModel.editPost);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      postDescription: `${currentPost.content}`,
    },
  });
  const { handleSubmit } = methods;
  /**
   *  Reset the image array if imageArray is not empty
   *  when switching to input link video
   */
  //   console.log("currentPost :>> ", currentPost);
  useEffect(() => {
    if (showSection !== "IMAGE" && imageArray?.length > 0) setImageArray([]);
  }, [showSection]);

  const setAttachment = (type) => {
    switch (type) {
      case "NONE":
        return "none";
      case "IMAGE":
        return imageArray[0];
      case "VIDEO":
        return "video";
      default:
        return "";
    }
  };

  const onSubmit = (data) => {
    const { postDescription: content, postType } = data;
    const typePost = postTypeData.find((item) => item.id === postType);
    const attachment = setAttachment(showSection);

    editPost({
      attachmentType: showSection,
      content,
      id: currentPost.id,
      postType: typePost.type,
      url: attachment.base64,
    });
    return showAlertBox("Gửi thành công", "Thông tin thay đổi gửi thành công");
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
                defaultValue={currentPost.postType}
              />
              <TextAreaComponent
                label="Miêu tả"
                placeholder=""
                numberOfLines={3}
                controllerName="postDescription"
              />
              <>
                <Text fontSize="md" mb={1}>
                  Đính kèm
                </Text>
                <Select
                  placeholder="Chọn loại đính kèm"
                  accessibilityLabel="Chọn loại đính kèm"
                  onValueChange={setShowSection}
                  defaultValue={showSection}
                  fontSize="md"
                >
                  <Select.Item label="Không đính kèm" value="NONE" />
                  <Select.Item label="Ảnh" value="IMAGE" />
                  <Select.Item label="Link Video" value="VIDEO" />
                </Select>
              </>
              {showSection === "link" && (
                <InputComponent
                  placeholder="Nhập link vào đây"
                  label="Đường dẫn"
                  controllerName="postVideoLink"
                />
              )}
            </VStack>
            {showSection === "IMAGE" && (
              <MultiImageSection
                containerStyle={{ width: "100%" }}
                formRoute={ROUTE_NAMES.FMANAGE_POST_EDIT}
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

export default PostEditScreen;
