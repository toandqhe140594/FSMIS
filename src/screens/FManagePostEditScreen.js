import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Center, Select, Text, VStack } from "native-base";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import SingleImageSection from "../components/common/SingleImageSection";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";

const validationSchema = yup.object().shape({
  postType: yup.number().default(-1),
  postDescription: yup
    .string()
    .required("Nội dung bài đăng không được để trống"),
  postVideoLink: yup.string(),
});

const postTypeData = [
  { label: "Thông báo", val: -1 },
  { label: "Bồi cá", val: 0 },
  { label: "Báo cá", val: 1 },
];

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
});

const { height } = Dimensions.get("window");
const ideaScreenHeight = height - 85;
const PostEditorScreen = () => {
  const [showImageSection, setShowImageSection] = useState(true);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;
  const handleValueChange = (value) => {
    console.log(value);
    setShowImageSection(value === -1);
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <ScrollView>
      {/* Without scrollview, it seems the keyboard will not hide if tap out of the component */}
      <HeaderTab name="Bài đăng" />
      <FormProvider {...methods}>
        <Center height={ideaScreenHeight} mt={2}>
          <VStack flex={4} space={2} style={styles.sectionWrapper}>
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
            <Box>
              <Text fontSize="md" mb={1}>
                Đính kèm
              </Text>
              <Select
                placeholder="Chọn loại đính kèm"
                accessibilityLabel="Chọn loại đính kèm"
                onValueChange={handleValueChange}
                defaultValue="Ảnh"
                fontSize="md"
              >
                <Select.Item label="Ảnh" value="image" />
                <Select.Item label="Link Video" value="linkVideo" />
              </Select>
            </Box>
            <Box mt={4}>
              {showImageSection && <SingleImageSection />}
              {!showImageSection && (
                <InputComponent
                  placeholder="Nhập link vào đây"
                  label="Đính kèm link"
                  controllerName="postVideoLink"
                />
              )}
            </Box>
          </VStack>
          <Box mb={2} style={styles.sectionWrapper}>
            <Button onPress={handleSubmit(onSubmit)}>Đăng</Button>
          </Box>
        </Center>
      </FormProvider>
    </ScrollView>
  );
};

export default PostEditorScreen;
