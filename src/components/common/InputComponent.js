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
  isRequired,
  myStyles,
}) => {
  return (
    <Box style={[styles.container, myStyles]}>
      <Text style={isTitle ? styles.title : null} mb={1}>
        {label}
        {isRequired && <Text color="danger.500">*</Text>}
      </Text>
      <Input placeholder={placeholder} />
    </Box>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
  isRequired: PropTypes.bool,
  isTitle: PropTypes.bool,
};

InputComponent.defaultProps = {
  myStyles: {},
  isRequired: false,
  isTitle: false,
};

export default InputComponent;
