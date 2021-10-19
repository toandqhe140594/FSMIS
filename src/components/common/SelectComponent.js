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
  handleOnChange,
  hasAsterisk,
  isTitle,
  error,
  value,
  handleOnBlur,
}) => {
  const onValueChange = (val) => {
    handleOnChange(val);
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
        onBlur={handleOnBlur}
        selectedValue={value}
        fontSize="md"
      >
        {data.map((item) => (
          <Select.Item label={item.label} value={item.val} my={1}>
            {item.label}
          </Select.Item>
        ))}
      </Select>
      {error.message && (
        <Text color="red.500" fontSize="xs" italic>
          {error.message}
        </Text>
      )}
    </Box>
  );
};

SelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  myStyle: PropTypes.objectOf(PropTypes.string.isRequired),
  handleOnChange: PropTypes.func,
  hasAsterisk: PropTypes.bool,
  isTitle: PropTypes.bool,
  error: PropTypes.objectOf(PropTypes.string.isRequired),
  value: PropTypes.string,
  handleOnBlur: PropTypes.func,
};

SelectComponent.defaultProps = {
  myStyle: {},
  handleOnChange: () => {},
  hasAsterisk: false,
  isTitle: false,
  error: {},
  value: "",
  handleOnBlur: () => {},
};

export default SelectComponent;
