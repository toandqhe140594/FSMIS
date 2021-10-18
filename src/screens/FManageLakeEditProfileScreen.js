import {
  Box,
  Button,
  Center,
  Divider,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

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
              isTitle
              placeholder="Nhập tên hồ câu"
            />
          </Center>

          <Center>
            <VStack style={styles.sectionWrapper}>
              <Text fontSize="md" bold mb={2}>
                Loại hình câu
              </Text>
              <CheckboxSelectorComponent />
            </VStack>
          </Center>

          <Center>
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Giá vé"
              isTitle
              placeholder="Miêu tả giá vé hồ"
              numberOfLines={3}
            />
          </Center>

          <Center>
            <VStack space={2} style={styles.sectionWrapper}>
              <Text fontSize="md" bold>
                Thông số
              </Text>
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
            <Stack space={2} style={styles.sectionWrapper}>
              <Text fontSize="md" bold>
                Các loại cá
              </Text>
              <VStack mb={1}>
                <AddFishCard />
              </VStack>
              <Button style={styles.button} alignSelf="center">
                Thêm loại cá
              </Button>
            </Stack>
          </Center>
          <Center>
            <Box style={styles.sectionWrapper} mb={5}>
              {/* Submit button */}
              <Button style={styles.button} alignSelf="center" mb={2}>
                Lưu thông tin hồ câu
              </Button>
              <Button
                style={styles.button}
                variant="outline"
                alignSelf="center"
              >
                Xoá hồ câu
              </Button>
            </Box>
          </Center>
        </VStack>
      </ScrollView>
    </>
  );
};

export default LakeEditProfileScreen;
