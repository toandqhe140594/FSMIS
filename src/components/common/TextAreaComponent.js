import { Box, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 5,
    textAlignVertical: "top",
    padding: 10,
    height: 100,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  text: { fontSize: 16 },
  title: { fontSize: 16, fontWeight: "bold" },
  asterisk: { color: "#f43f5e", fontSize: 16 },
});

const MAX_LENGTH = 1000;

const TextAreaComponent = ({
  label,
  placeholder,
  numberOfLines,
  isTitle,
  myStyles,
  controllerName,
  hasAsterisk,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box style={myStyles}>
      {label.length > 0 && (
        <Text style={isTitle ? styles.title : styles.text} mb={2}>
          {label}
          {hasAsterisk && <Text style={styles.asterisk}>*</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={controllerName}
        render={({ field: { onChange, onBlur, value } }) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <TextInput
              multiline
              numberOfLines={numberOfLines}
              maxLength={MAX_LENGTH}
              placeholder={placeholder}
              style={styles.textArea}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          </TouchableWithoutFeedback>
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

TextAreaComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  numberOfLines: PropTypes.number.isRequired,
  myStyles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Accept object with property of type string or number
  ),
  isTitle: PropTypes.bool,
  controllerName: PropTypes.string.isRequired,
  hasAsterisk: PropTypes.bool,
};

TextAreaComponent.defaultProps = {
  label: "",
  myStyles: {},
  isTitle: false,
  hasAsterisk: false,
};

export default TextAreaComponent;
