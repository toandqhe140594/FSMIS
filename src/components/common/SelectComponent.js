import { Select, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {},
  text: {
    fontWeight: "bold",
  },
});

const SelectComponent = ({
  label,
  placeholder,
  data,
  myStyle,
  handleValueChange,
}) => {
  const onValueChange = (value) => {
    handleValueChange(value);
  };
  return (
    <VStack style={[styles.container, myStyle]} space={1}>
      <Text style={styles.text}>{label}</Text>
      <Select
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        onValueChange={onValueChange}
      >
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
  myStyle: PropTypes.objectOf(PropTypes.string.isRequired),
  handleValueChange: PropTypes.func,
};

SelectComponent.defaultProps = {
  myStyle: {},
  handleValueChange: () => {},
};

export default SelectComponent;
