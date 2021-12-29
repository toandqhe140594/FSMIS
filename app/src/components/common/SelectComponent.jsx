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
  useCustomError,
  itemKeyIdentifier,
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
          return (
            <Select
              accessibilityLabel={placeholder}
              placeholder={placeholder}
              onValueChange={onChange}
              selectedValue={value}
              fontSize="md"
            >
              {data.map((item) => (
                <Select.Item
                  key={item[itemKeyIdentifier]}
                  label={item.name}
                  value={item[itemKeyIdentifier]}
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
  myStyles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  hasAsterisk: PropTypes.bool,
  isTitle: PropTypes.bool,
  controllerName: PropTypes.string.isRequired,
  myError: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ),
  useCustomError: PropTypes.bool,
  itemKeyIdentifier: PropTypes.string,
};

SelectComponent.defaultProps = {
  label: "",
  placeholder: "",
  myStyles: {},
  hasAsterisk: false,
  isTitle: false,
  data: [],
  myError: {},
  useCustomError: false,
  itemKeyIdentifier: "id",
};

export default React.memo(SelectComponent);
