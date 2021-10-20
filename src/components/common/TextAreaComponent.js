import { Box, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  container: {},
  textArea: {
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

const MAX_LENGTH = 1000;

const TextAreaComponent = ({
  label,
  placeholder,
  numberOfLines,
  isTitle,
  myStyles,
  controllerName,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box style={[styles.container, myStyles]}>
      {label.length > 0 && (
        <Text style={isTitle ? styles.title : null} mb={2}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={controllerName}
        render={({ field: { onChange, onBlur, value } }) => (
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
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
  isTitle: PropTypes.bool,
  controllerName: PropTypes.string.isRequired,
};

TextAreaComponent.defaultProps = {
  label: "",
  myStyles: {},
  isTitle: false,
};

export default TextAreaComponent;
