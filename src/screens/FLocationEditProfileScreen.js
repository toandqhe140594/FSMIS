import {
  Box,
  Button,
  Center,
  Divider,
  Input,
  Select,
  VStack,
} from "native-base";
import PropTypes from "prop-types";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import MultiImageSection from "../components/common/MultiImageSection";
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

const InputComponent = ({ label, placeholder }) => {
  return (
    <VStack space={1}>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>
      <Input placeholder={placeholder} />
    </VStack>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

const SelectComponent = ({ label, placeholder, data }) => {
  return (
    <VStack space={1}>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>
      <Select placeholder={placeholder}>
        {data.map((item) => (
          <Select.Item>{item}</Select.Item>
        ))}
      </Select>
    </VStack>
  );
};

SelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const MapOverviewBox = () => {
  return (
    <TouchableOpacity>
      <Box h={20} style={{ borderColor: "black", borderWidth: 1 }} />
    </TouchableOpacity>
  );
};

const TextAreaComponent = ({
  label,
  placeholder,
  numberOfLines,
  maxLength,
  compStyles,
}) => {
  return (
    <VStack style={compStyles} space={1}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{label}</Text>
      <TextInput
        multiline
        // numberOfLines={6}
        // maxLength={1000}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        placeholder={placeholder}
        style={styles.textArea}
      />
    </VStack>
  );
};

TextAreaComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  numberOfLines: PropTypes.number.isRequired,
  maxLength: PropTypes.number.isRequired,
  compStyles: PropTypes.objectOf(PropTypes.object.isRequired),
};

TextAreaComponent.defaultProps = {
  compStyles: {},
};

const FLocationEditProfileScreen = () => {
  return (
    <ScrollView>
      <HeaderTab />
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
            compStyles={styles.sectionWrapper}
            label="Mô tả khu hồ"
            placeholder="Miêu tả khu hồ của bạn"
            numberOfLines={6}
            maxLength={1000}
          />
        </Center>

        <Center>
          {/* Schedule textarea  */}
          <TextAreaComponent
            compStyles={styles.sectionWrapper}
            label="Thời gian hoạt động"
            placeholder="Miêu tả thời gian hoạt động của khu hồ"
            numberOfLines={3}
            maxLength={1000}
          />
        </Center>

        <Center>
          {/* Service textarea */}
          <TextAreaComponent
            compStyles={styles.sectionWrapper}
            label="Dịch vụ"
            placeholder="Miêu tả dịch vụ khu hồ"
            numberOfLines={3}
            maxLength={1000}
          />
        </Center>

        <Center>
          {/* rule textarea */}
          <TextAreaComponent
            compStyles={styles.sectionWrapper}
            label="Nội quy"
            placeholder="Miêu tả nội quy khu hồ"
            numberOfLines={3}
            maxLength={1000}
          />
        </Center>

        <Center>
          <VStack style={styles.sectionWrapper} space={3} mb={3}>
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

export default FLocationEditProfileScreen;
