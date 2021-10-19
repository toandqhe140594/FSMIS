import { Box, Input, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  title: { fontWeight: "bold", fontSize: 16 },
});

const InputComponent = ({
  label,
  placeholder,
  isTitle,
  hasAsterisk,
  myStyles,
  type,
  leftIcon,
}) => {
  return (
    <Box style={[styles.container, myStyles]}>
      <Text style={isTitle ? styles.title : null} mb={1}>
        {label}
        {hasAsterisk && <Text color="danger.500">*</Text>}
      </Text>
      <Input
        InputLeftElement={leftIcon}
        paddingLeft={leftIcon}
        type={type}
        placeholder={placeholder}
        fontSize="md"
      />
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
};

InputComponent.defaultProps = {
  myStyles: {},
  hasAsterisk: false,
  isTitle: false,
  type: "text",
  leftIcon: <></>,
};

export default InputComponent;
