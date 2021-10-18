// import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Center, Checkbox, Divider, Text, VStack } from "native-base";
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
            <VStack space={2} style={styles.sectionWrapper}>
              {/* Impage picker section */}
              <MultiImageSection imageLimit={3} />
              {/* Textarea input field */}
              <TextAreaComponent
                placeholder="Mô tả ngày câu của bạn"
                numberOfLines={6}
              />
            </VStack>
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
            <VStack style={styles.sectionWrapper} space={3}>
              <Text bold fontSize="md">
                Thông tin cá
              </Text>
              {/* Catch Report card list */}
              <VStack>
                <CatchReportCard />
              </VStack>
              {/* Add catch report card button */}
              <Button style={styles.button} alignSelf="center">
                Thêm loại cá
              </Button>
            </VStack>
          </Center>

          <Center>
            <VStack style={styles.sectionWrapper} space={3} mb={3}>
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
    </>
  );
};

export default AnglerCatchReportScreen;
