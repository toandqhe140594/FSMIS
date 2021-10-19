import { Button, Center, Divider, ScrollView, VStack } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";

import InlineInputComponent from "../components/common/InlineInputComponent";
import InputComponent from "../components/common/InputComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import AddFishCard from "../components/LakeEditProfile/AddFishCard";
import CheckboxSelectorComponent from "../components/LakeEditProfile/CheckboxSelectorComponent";
import SingleImageSection from "../components/LakeEditProfile/SingleImageSection";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
  textArea: {
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 5,
  },
});

const LakeEditProfileScreen = () => {
  return (
    <>
      <HeaderTab name="Chỉnh sửa hồ bé" />
      <ScrollView>
        <VStack space={3} divider={<Divider />}>
          <Center mt={1}>
            {/* Image Picker section */}
            <SingleImageSection style={styles.sectionWrapper} />
          </Center>

          <Center>
            <InputComponent
              myStyles={styles.sectionWrapper}
              label="Tên hồ câu"
              placeholder="Nhập tên hồ câu"
            />
          </Center>

          <Center>
            <VStack style={styles.sectionWrapper}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                Loại hình câu
              </Text>
              <CheckboxSelectorComponent />
            </VStack>
          </Center>

          <Center>
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Giá vé"
              placeholder="Miêu tả giá vé hồ"
              numberOfLines={3}
            />
          </Center>

          <Center>
            <VStack space={1} style={styles.sectionWrapper}>
              <Text style={{ fontWeight: "bold" }}>Thông số</Text>
              <InlineInputComponent
                label="Chiều dài (m)"
                placeholder="Nhập chiều dài hồ"
              />
              <InlineInputComponent
                label="Chiều rộng (m)"
                placeholder="Nhập chiều rộng của hồ"
              />
              <InlineInputComponent
                label="Độ sâu (m)"
                placeholder="Nhập độ sâu của hồ"
              />
            </VStack>
          </Center>

          <Center>
            <VStack space={3} style={styles.sectionWrapper}>
              <Text style={{ fontWeight: "bold" }}>Các loại cá</Text>
              <VStack>
                <AddFishCard />
              </VStack>
              <Button style={styles.button} alignSelf="center">
                Thêm loại cá
              </Button>
            </VStack>
          </Center>
          <Center>
            <VStack style={styles.sectionWrapper} space={2} mb={3}>
              {/* Submit button */}
              <Button style={styles.button} alignSelf="center">
                Lưu thông tin hồ câu
              </Button>
              <Button
                style={styles.button}
                variant="outline"
                alignSelf="center"
              >
                Xoá hồ câu
              </Button>
            </VStack>
          </Center>
        </VStack>
      </ScrollView>
    </>
  );
};

export default LakeEditProfileScreen;
