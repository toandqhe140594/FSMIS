import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  ScrollView,
  Select,
  VStack,
} from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";

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

const InputComponent = ({ label, placeholder, compStyles }) => {
  return (
    <VStack space={1} style={compStyles}>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>
      <Input placeholder={placeholder} />
    </VStack>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  compStyles: PropTypes.objectOf(PropTypes.string.isRequired),
};

InputComponent.defaultProps = {
  compStyles: {},
};

const SelectComponent = ({ label, placeholder, data, compStyles }) => {
  return (
    <VStack space={1} style={compStyles}>
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
  compStyles: PropTypes.objectOf(PropTypes.object.isRequired),
};

SelectComponent.defaultProps = {
  compStyles: {},
};

const InlineInputComponent = ({ label, placeholder, compStyles }) => {
  return (
    <HStack
      style={[
        {
          // borderWidth: 1,
          // borderColor: "red",
          alignItems: "center",
          // justifyContent: "space-between",
        },
        compStyles,
      ]}
    >
      <Box style={{ width: "30%" }}>
        <Text>{label}</Text>
      </Box>
      <Box style={{ width: "70%" }}>
        <Input placeholder={placeholder} fontSize="sm" />
      </Box>
    </HStack>
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

InlineInputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  compStyles: PropTypes.objectOf(PropTypes.object.isRequired),
};

InlineInputComponent.defaultProps = {
  compStyles: {},
};

const LakeEditProfileScreen = () => {
  return (
    <ScrollView>
      <HeaderTab name="Chỉnh sửa hồ bé" />
      <VStack space={3} divider={<Divider />}>
        <Center>
          {/* Image Picker section */}
          <VStack space={2} style={styles.sectionWrapper}>
            {/* <SingleImageSection /> */}
            <SingleImageSection />
          </VStack>
        </Center>

        <Center>
          <InputComponent
            compStyles={styles.sectionWrapper}
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
            compStyles={styles.sectionWrapper}
            label="Giá vé"
            placeholder="Miêu tả giá vé hồ"
            numberOfLines={3}
            maxLength={1000}
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
            <Button style={styles.button} alignSelf="center">
              Xoá hồ câu
            </Button>
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default LakeEditProfileScreen;
