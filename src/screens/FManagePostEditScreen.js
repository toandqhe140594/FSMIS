import { Box, Button, Center, VStack } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import SingleImageSection from "../components/LakeEditProfile/SingleImageSection";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {},
  test: {
    borderWidth: 1,
    borderColor: "red",
  },
  test2: {
    borderWidth: 1,
    borderColor: "blue",
  },
});

const PostEditorScreen = () => {
  const [showImageSection, setShowImageSection] = useState(false);

  const handleValueChange = (value) => {
    setShowImageSection(value === "Ảnh");
  };

  return (
    <>
      <HeaderTab name="Bài đăng" />
      <Center flex={1}>
        <VStack flex={4} space={2} style={styles.sectionWrapper}>
          <SelectComponent
            label="Sự kiện"
            placeholder="Chọn sự kiện"
            data={["Thông báo", "Bồi cá", "Báo cá"]}
          />
          <TextAreaComponent label="Miêu tả" placeholder="" numberOfLines={3} />
          <SelectComponent
            label="Đính kèm"
            placeholder="Chọn kiểu đính kèm"
            data={["Ảnh", "Facebook video"]}
            handleValueChange={handleValueChange}
          />
          {showImageSection && <SingleImageSection />}
          {!showImageSection && (
            <InputComponent
              placeholder="Nhập link vào đây"
              label="Đính kèm link"
            />
          )}
        </VStack>
        <Box mb={2} style={styles.sectionWrapper}>
          <Button style={styles.button}>Đăng</Button>
        </Box>
      </Center>
    </>
  );
};

export default PostEditorScreen;
