import { Box, Select, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: "bold",
  },
});

const SelectComponent = ({
  label,
  placeholder,
  data,
  myStyle,
  handleValueChange,
  isRequired,
  isTitle,
}) => {
  const onValueChange = (value) => {
    handleValueChange(value);
  };
  return (
    <Box style={[styles.container, myStyle]}>
      <Text style={isTitle ? styles.text : {}} mb={1}>
        {label}
        {isRequired && <Text color="danger.500" />}
      </Text>
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
    </Box>
  );
};

SelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  myStyle: PropTypes.objectOf(PropTypes.string.isRequired),
  handleValueChange: PropTypes.func,
  isRequired: PropTypes.bool,
  isTitle: PropTypes.bool,
};

SelectComponent.defaultProps = {
  myStyle: {},
  handleValueChange: () => {},
  isRequired: false,
  isTitle: false,
};

export default SelectComponent;
