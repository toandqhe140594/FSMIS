import { Center, Input, Select, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import HeaderTab from "../components/HeaderTab";
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
      <Select accessibilityLabel={placeholder} placeholder={placeholder}>
        {data.map((item) => (
          <Select.Item label={item} value={item} my={1}>
            {item}
          </Select.Item>
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
const TextAreaComponent = ({
  label,
  placeholder,
  numberOfLines,
  compStyles,
}) => {
  return (
    <VStack style={compStyles} space={1}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{label}</Text>
      <TextInput
        multiline
        numberOfLines={numberOfLines}
        maxLength={1000}
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
  compStyles: PropTypes.objectOf(PropTypes.string.isRequired),
};

TextAreaComponent.defaultProps = {
  compStyles: {},
};
const PostEditorScreen = () => {
  const [showImageSection, setShowImageSection] = useState(false);
  return (
    <View>
      <HeaderTab name="Bài đăng" />
      <VStack space={3}>
        <Center>
          <VStack style={styles.sectionWrapper}>
            <SelectComponent
              label="Sự kiện"
              placeholder="Chọn sự kiện"
              data={["Thông báo", "Bồi cá", "Báo cá"]}
            />
          </VStack>
        </Center>

        <Center>
          <TextAreaComponent
            label="Miêu tả"
            placeholder=""
            numberOfLines={3}
            compStyles={styles.sectionWrapper}
          />
        </Center>

        <Center>
          <VStack style={styles.sectionWrapper}>
            <Text style={{ fontWeight: "bold" }}>Đính kèm</Text>
            <Select
              placeholder="Chọn kiểu đính kèm"
              onValueChange={(itemValue) => {
                setShowImageSection(itemValue === "image");
              }}
            >
              <Select.Item label="Ảnh" value="image" my={1} />
              <Select.Item label="Facebook Video" value="video" my={1} />
            </Select>
          </VStack>
        </Center>

        {showImageSection && (
          <Center>
            <VStack style={styles.sectionWrapper}>
              <SingleImageSection />
            </VStack>
          </Center>
        )}

        {!showImageSection && (
          <Center>
            <VStack style={styles.sectionWrapper}>
              <InputComponent
                placeholder="Nhập link vào đây"
                label="Đính kèm link"
              />
            </VStack>
          </Center>
        )}
      </VStack>
    </View>
  );
};

export default PostEditorScreen;
