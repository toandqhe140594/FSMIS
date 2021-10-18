// import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";
// import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";

import CatchReportCard from "../components/CatchReport/CatchReportCard";
import InlineSelectComponent from "../components/common/InlineSelectComponent";
import MultiImageSection from "../components/common/MultiImageSection";
// import * as yup from "yup";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const AnglerCatchReportScreen = () => {
  return (
    <>
      <HeaderTab name="Báo cá" />
      <ScrollView>
        <VStack space={3} divider={<Divider />}>
          <Center>
            <Stack space={2} style={styles.sectionWrapper}>
              {/* Impage picker section */}
              <MultiImageSection imageLimit={3} />
              {/* Textarea input field */}
              <TextAreaComponent
                placeholder="Mô tả ngày câu của bạn"
                numberOfLines={6}
              />
            </Stack>
          </Center>

          <Center>
            <InlineSelectComponent
              myStyles={styles.sectionWrapper}
              isTitle
              label="Vị trí hồ câu"
              placeholder="Chọn hồ câu"
              data={["Hồ thường", "Hồ VIP"]}
            />
          </Center>

          <Center>
            <Stack style={styles.sectionWrapper} space={2}>
              <Text bold fontSize="md">
                Thông tin cá
              </Text>
              {/* Catch Report card list */}
              <VStack mb={1}>
                <CatchReportCard />
              </VStack>
              {/* Add catch report card button */}
              <Button style={styles.button} alignSelf="center">
                Thêm loại cá
              </Button>
            </Stack>
          </Center>

          <Center>
            <Box style={styles.sectionWrapper} mb={5}>
              {/* Public checkbox field */}
              <Checkbox mb={1} alignItems="flex-start">
                Công khai thông tin
              </Checkbox>
              {/* Submit button */}
              <Button style={styles.button} alignSelf="center">
                Gửi và checkout
              </Button>
            </Box>
          </Center>
        </VStack>
      </ScrollView>
    </>
  );
};

export default AnglerCatchReportScreen;
