// import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Center,
  Checkbox,
  Divider,
  HStack,
  Select,
  Text,
  VStack,
} from "native-base";
import React from "react";
// import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import AddImageSection from "../components/CatchReport/AddImageSection";
import CatchReportCard from "../components/CatchReport/CatchReportCard";
// import * as yup from "yup";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
  selectInput: {
    width: "100%",
  },
  textArea: {
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 5,
  },
});

const AnglerCatchReportScreen = () => {
  return (
    <ScrollView>
      <VStack space={3} divider={<Divider />}>
        <Center>
          <VStack space={2} style={styles.sectionWrapper}>
            {/* AddImageButton */}
            <AddImageSection />
            {/* Textarea input field */}
            <TextInput
              multiline
              numberOfLines={6}
              maxLength={1000}
              placeholder="Mô tả ngày câu của bạn"
              style={styles.textArea}
            />
          </VStack>
        </Center>

        <Center>
          <HStack
            style={styles.sectionWrapper}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text bold fontSize="md">
              Vị trí hồ câu
            </Text>
            {/* Select lake type dropdown field */}
            <Select
              w="70%"
              accessibilityLabel="Chọn hồ câu"
              fontSize="md"
              placeholder="Chọn hồ câu"
            >
              <Select.Item label="Hồ thường" value={1} />
              <Select.Item label="Hồ VIP" value={2} />
            </Select>
          </HStack>
        </Center>

        <Center>
          <VStack style={styles.sectionWrapper} space={3}>
            <Text bold fontSize="md">
              Thông tin cá
            </Text>
            {/* Catch Report card list */}
            <VStack>
              {/* Should wrap inside <FlatList> */}
              <CatchReportCard />
              {/* </FlatList> */}
            </VStack>
            {/* Add catch report card button */}
            <Button style={styles.button} alignSelf="center">
              Thêm loại cá
            </Button>
          </VStack>
        </Center>

        <Center>
          <VStack style={styles.sectionWrapper} space={3}>
            {/* Public checkbox field */}
            <Checkbox alignItems="flex-start">Công khai thông tin</Checkbox>
            {/* Submit button */}
            <Button style={styles.button} alignSelf="center">
              Gửi và checkout
            </Button>
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default AnglerCatchReportScreen;
