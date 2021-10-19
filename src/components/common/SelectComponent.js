import { Box, Select, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

const SelectComponent = ({
  label,
  placeholder,
  data,
  myStyle,
  handleValueChange,
  hasAsterisk,
  isTitle,
}) => {
  const onValueChange = (value) => {
    handleValueChange(value);
  };
  return (
    <Box style={[styles.container, myStyle]}>
      <Text style={isTitle ? styles.title : {}} mb={1}>
        {label}
        {hasAsterisk && <Text color="danger.500" />}
      </Text>
      <Select
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        onValueChange={onValueChange}
        fontSize="md"
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
  hasAsterisk: PropTypes.bool,
  isTitle: PropTypes.bool,
};

SelectComponent.defaultProps = {
  myStyle: {},
  handleValueChange: () => {},
  hasAsterisk: false,
  isTitle: false,
};

export default SelectComponent;
