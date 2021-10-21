import { Box, Select, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";

let itemKey = 0;
const generateKey = () => {
  itemKey += 1;
  return itemKey;
};

const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  text: { fontSize: 16 },
});

const SelectComponent = ({
  label,
  placeholder,
  data,
  myStyle,
  hasAsterisk,
  isTitle,
  controllerName,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box style={myStyle}>
      <Text style={[styles.text, isTitle ? styles.bold : null]} mb={1}>
        {label}
        {hasAsterisk && <Text color="danger.500">*</Text>}
      </Text>
      <Controller
        control={control}
        name={controllerName}
        render={({ field: { onChange, value } }) => (
          <Select
            accessibilityLabel={placeholder}
            placeholder={placeholder}
            onValueChange={onChange}
            selectedValue={value}
            fontSize="md"
          >
            {data.map((item) => (
              <Select.Item
                key={generateKey()}
                label={item.label}
                value={item.val}
                my={1}
              >
                {item.label}
              </Select.Item>
            ))}
          </Select>
        )}
      />
      {errors[controllerName]?.message && (
        <Text color="red.500" fontSize="xs" italic>
          {errors[controllerName]?.message}
        </Text>
      )}
    </Box>
  );
};

SelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  myStyle: PropTypes.objectOf(PropTypes.string.isRequired),
  hasAsterisk: PropTypes.bool,
  isTitle: PropTypes.bool,
  // handleOnChange: PropTypes.func,
  controllerName: PropTypes.string.isRequired,
};

SelectComponent.defaultProps = {
  myStyle: {},
  hasAsterisk: false,
  isTitle: false,
  data: [],
  // handleOnChange: () => {},
};

export default SelectComponent;
