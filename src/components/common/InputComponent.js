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
  inputComponent: {
    backgroundColor: "white",
  },
  disabled: { backgroundColor: "#d4d4d4" },
});

const INPUT_TYPE_TEXT = "text";
const INPUT_TYPE_PASSWORD = "password";
const KEYBOARD_TYPE_NUMBER_PAD = "number-pad";
const KEYBOARD_TYPE_DEFAULT = "default";

const InputComponent = ({
  label,
  placeholder,
  isTitle,
  hasAsterisk,
  myStyles,
  leftIcon,
  rightIcon,
  controllerName,
  useNumPad,
  shouldDisable,
  myError,
  useCustomError,
  useSecureInput,
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
            InputRightElement={rightIcon}
            type={useSecureInput ? INPUT_TYPE_PASSWORD : INPUT_TYPE_TEXT}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            fontSize="md"
            keyboardType={
              useNumPad ? KEYBOARD_TYPE_NUMBER_PAD : KEYBOARD_TYPE_DEFAULT
            }
            isDisabled={shouldDisable}
            style={shouldDisable ? styles.disabled : styles.inputComponent}
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
  rightIcon: PropTypes.element,
  controllerName: PropTypes.string,
  useNumPad: PropTypes.bool,
  shouldDisable: PropTypes.bool,
  useCustomError: PropTypes.bool,
  myError: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ),
  useSecureInput: PropTypes.bool,
};

InputComponent.defaultProps = {
  label: "",
  placeholder: "",
  myStyles: {},
  hasAsterisk: false,
  isTitle: false,
  leftIcon: null,
  rightIcon: null,
  controllerName: "",
  useNumPad: false,
  shouldDisable: false,
  useCustomError: false,
  myError: {},
  useSecureInput: false,
};

export default InputComponent;
