import { Input } from "native-base";
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

const InputComponent = ({
  label,
  placeholder,
  isTitle,
  hasAsterisk,
  myStyles,
  leftIcon,
  controllerName,
  useNumPad,
  shouldDisable,
  myError,
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
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            InputLeftElement={leftIcon}
            type="text"
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            fontSize="md"
            keyboardType={useNumPad ? "number-pad" : "default"}
            isDisabled={shouldDisable}
          />
        )}
      />
      {useCustomError
        ? myError.message && <Text style={styles.error}>{myError.message}</Text>
        : errors[controllerName]?.message && (
            <Text style={styles.error}>{errors[controllerName]?.message}</Text>
          )}
    </View>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  myStyles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Accept object with property of type string or number
  ),
  hasAsterisk: PropTypes.bool,
  isTitle: PropTypes.bool,
  leftIcon: PropTypes.element,
  controllerName: PropTypes.string,
  useNumPad: PropTypes.bool,
  shouldDisable: PropTypes.bool,
  useCustomError: PropTypes.bool,
  myError: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ),
};

InputComponent.defaultProps = {
  label: "",
  placeholder: "",
  myStyles: {},
  hasAsterisk: false,
  isTitle: false,
  leftIcon: <></>,
  controllerName: "",
  useNumPad: false,
  shouldDisable: false,
  useCustomError: false,
  myError: {},
};

export default InputComponent;
