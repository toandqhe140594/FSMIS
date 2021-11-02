import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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

const validationSchema = yup.object().shape({
  postType: yup.number().default(-1),
  postDescription: yup
    .string()
    .required("Nội dung bài đăng không được để trống"),
  postVideoLink: yup.string(),
});

const postTypeData = [
  { name: "Thông báo", id: -1 },
  { name: "Bồi cá", id: 0 },
  { name: "Báo cá", id: 1 },
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

const PostEditorScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const [showSection, setShowSection] = useState(null);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;
  /**
   *  Reset the image array if imageArray is not empty
   *  when switching to input link video
   */
  useEffect(() => {
    if (showSection !== "image" && imageArray?.length > 0) setImageArray([]);
  }, [showSection]);
  const onSubmit = (data) => {
    console.log(data);
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
      return () => {
        navigation.setParams({ base64Array: [] });
      };
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
                  defaultValue="none"
                  fontSize="md"
                >
                  <Select.Item label="Không đính kèm" value="none" />
                  <Select.Item label="Ảnh" value="image" />
                  <Select.Item label="Link Video" value="link" />
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
            {showSection === "image" && (
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

export default PostEditorScreen;
