import { Box, Input, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  bold: { fontWeight: "bold" },
  text: { fontSize: 16 },
});

const InputComponent = ({
  label,
  placeholder,
  isTitle,
  hasAsterisk,
  myStyles,
  type,
  leftIcon,
  controllerName,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Box style={[styles.container, myStyles]}>
      <Text style={[styles.text, isTitle ? styles.bold : null]} mb={1}>
        {label}
        {hasAsterisk && <Text color="danger.500">*</Text>}
      </Text>
      <Controller
        control={control}
        name={controllerName}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            InputLeftElement={leftIcon}
            type={type}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            fontSize="md"
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

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
  hasAsterisk: PropTypes.bool,
  isTitle: PropTypes.bool,
  type: PropTypes.string,
  leftIcon: PropTypes.element,
  controllerName: PropTypes.string,
};

InputComponent.defaultProps = {
  myStyles: {},
  hasAsterisk: false,
  isTitle: false,
  type: "text",
  leftIcon: <></>,
  controllerName: "",
};

export default InputComponent;
