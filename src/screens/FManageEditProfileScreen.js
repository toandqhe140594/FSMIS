import { Box, Button, Center, Divider, Stack, Text, VStack } from "native-base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const FManageEditProfileScreen = () => {
  return (
    <>
      <HeaderTab name="Thông tin điểm câu" />
      <ScrollView>
        <VStack space={3} divider={<Divider />}>
          <Center>
            {/* Image Picker section */}
            <Stack space={2} style={styles.sectionWrapper}>
              <Text bold fontSize="md" mt={2}>
                Ảnh bìa (nhiều nhất là 5)
              </Text>
              <MultiImageSection />
              {/* Input location name */}
              <InputComponent
                isTitle
                label="Tên địa điểm câu"
                placeholder="Nhập tên địa điểm câu"
              />
            </Stack>
          </Center>
          <Center>
            <VStack space={2} style={styles.sectionWrapper}>
              <Text fontSize="md" bold>
                Thông tin liên hệ
              </Text>
              {/* Information input and select fields */}
              <InputComponent
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
              />
              <InputComponent label="Website" placeholder="Nhập website" />
              <InputComponent label="Địa chỉ" placeholder="Nhập địa chỉ" />
              <SelectComponent
                placeholder="Chọn tỉnh/thành phố"
                label="Tỉnh/Thành phố"
                data={["Hà Nội", "Hồ Chí Minh"]}
              />
              <SelectComponent
                placeholder="Chọn quận/huyện"
                label="Quận/Huyện"
                data={["Thanh Xuân", "Nam Từ Liêm"]}
              />
              <SelectComponent
                label="Phường/Xã"
                placeholder="Chọn phường/xã"
                data={["Duy Tân"]}
              />
            </VStack>
          </Center>

          <Center>
            {/* Map component */}
            <Box style={styles.sectionWrapper}>
              <Text bold fontSize="md" mb={2}>
                Bản đồ
              </Text>
              <MapOverviewBox />
            </Box>
          </Center>

          <Center>
            {/* Description textarea */}
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Mô tả khu hồ"
              isTitle
              placeholder="Miêu tả khu hồ của bạn"
              numberOfLines={6}
            />
          </Center>

          <Center>
            {/* Schedule textarea  */}
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Thời gian hoạt động"
              isTitle
              placeholder="Miêu tả thời gian hoạt động của khu hồ"
              numberOfLines={3}
            />
          </Center>

          <Center>
            {/* Service textarea */}
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Dịch vụ"
              isTitle
              placeholder="Miêu tả dịch vụ khu hồ"
              numberOfLines={3}
            />
          </Center>

          <Center>
            {/* rule textarea */}
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Nội quy"
              isTitle
              placeholder="Miêu tả nội quy khu hồ"
              numberOfLines={3}
            />
          </Center>

          <Center>
            <Box style={styles.sectionWrapper} mb={5}>
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

export default FManageEditProfileScreen;
