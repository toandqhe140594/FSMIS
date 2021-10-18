import { Box, Button, Center, Divider, VStack } from "native-base";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

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
  textArea: {
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 5,
  },
});

const FLocationEditProfileScreen = () => {
  return (
    <>
      <HeaderTab name="Thông tin điểm câu" />
      <ScrollView>
        <VStack space={3} divider={<Divider />}>
          <Center>
            {/* Image Picker section */}
            <VStack space={2} style={styles.sectionWrapper}>
              <Text style={{ fontWeight: "bold" }}>
                Ảnh bìa (nhiều nhất là 5)
              </Text>
              <MultiImageSection />
              {/* Input location name */}
              <InputComponent
                label="Tên địa điểm câu"
                placeholder="Nhập tên địa điểm câu"
              />
            </VStack>
          </Center>
          <Center>
            <VStack space={2} style={styles.sectionWrapper}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
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
            <VStack space={2} style={styles.sectionWrapper}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>Bản đồ</Text>
              <MapOverviewBox />
            </VStack>
          </Center>

          <Center>
            {/* Description textarea */}
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Mô tả khu hồ"
              placeholder="Miêu tả khu hồ của bạn"
              numberOfLines={6}
            />
          </Center>

          <Center>
            {/* Schedule textarea  */}
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Thời gian hoạt động"
              placeholder="Miêu tả thời gian hoạt động của khu hồ"
              numberOfLines={3}
              maxLength={1000}
            />
          </Center>

          <Center>
            {/* Service textarea */}
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Dịch vụ"
              placeholder="Miêu tả dịch vụ khu hồ"
              numberOfLines={3}
            />
          </Center>

          <Center>
            {/* rule textarea */}
            <TextAreaComponent
              myStyles={styles.sectionWrapper}
              label="Nội quy"
              placeholder="Miêu tả nội quy khu hồ"
              numberOfLines={3}
            />
          </Center>

          <Center>
            <Box style={styles.sectionWrapper} space={3} mb={3}>
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

export default FLocationEditProfileScreen;
