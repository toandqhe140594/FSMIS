import { Select } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

let itemKey = 0;
const generateKey = () => {
  itemKey += 1;
  return itemKey;
};

const styles = StyleSheet.create({
  error: { color: "#f43f5e", fontSize: 12, fontStyle: "italic" },
  asterisk: { color: "#f43f5e", fontSize: 16 },
  bold: { fontWeight: "bold" },
  text: { fontSize: 16, marginBottom: 4 },
});

const SelectComponent = ({
  label,
  placeholder,
  data,
  myStyles,
  hasAsterisk,
  isTitle,
  controllerName,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <View style={myStyles}>
      <Text style={[styles.text, isTitle ? styles.bold : null]}>
        {label}
        {hasAsterisk && <Text style={styles.asterisk}>*</Text>}
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
        <Text style={styles.error}>{errors[controllerName]?.message}</Text>
      )}
    </View>
  );
};

SelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
  hasAsterisk: PropTypes.bool,
  isTitle: PropTypes.bool,
  controllerName: PropTypes.string.isRequired,
};

SelectComponent.defaultProps = {
  myStyles: {},
  hasAsterisk: false,
  isTitle: false,
  data: [],
};

export default SelectComponent;
