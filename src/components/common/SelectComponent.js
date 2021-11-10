import { Select } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

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
  myError,
  handleDataIfValChanged,
  useCustomError,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <View style={myStyles}>
      {label.length > 0 && (
        <Text style={[styles.text, isTitle ? styles.bold : null]}>
          {label}
          {hasAsterisk && <Text style={styles.asterisk}>*</Text>}
        </Text>
      )}
      <Controller
        control={control}
        name={controllerName}
        render={({ field: { onChange, value } }) => {
          const handleChange = (val) => {
            onChange(val);
            handleDataIfValChanged(controllerName, val);
          };
          return (
            <Select
              accessibilityLabel={placeholder}
              placeholder={placeholder}
              onValueChange={handleChange}
              selectedValue={value}
              fontSize="md"
            >
              {data.map((item) => (
                <Select.Item
                  key={item.id}
                  label={item.name}
                  value={item.id}
                  my={1}
                />
              ))}
            </Select>
          );
        }}
      />
      {useCustomError
        ? myError.message && <Text style={styles.error}>{myError.message}</Text>
        : errors[controllerName]?.message && (
            <Text style={styles.error}>{errors[controllerName]?.message}</Text>
          )}
    </View>
  );
};

SelectComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
  hasAsterisk: PropTypes.bool,
  isTitle: PropTypes.bool,
  controllerName: PropTypes.string.isRequired,
  myError: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ),
  handleDataIfValChanged: PropTypes.func,
  useCustomError: PropTypes.bool,
};

SelectComponent.defaultProps = {
  label: "",
  placeholder: "",
  myStyles: {},
  hasAsterisk: false,
  isTitle: false,
  data: [],
  myError: {},
  handleDataIfValChanged: () => {},
  useCustomError: false,
};

export default React.memo(SelectComponent);
