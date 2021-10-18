import { Box, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
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
}) => {
  return (
    <Box style={[styles.container, myStyles]}>
      {label.length > 0 && (
        <Text style={isTitle ? styles.title : null} mb={2}>
          {label}
        </Text>
      )}
      <TextInput
        multiline
        numberOfLines={numberOfLines}
        maxLength={MAX_LENGTH}
        placeholder={placeholder}
        style={styles.textArea}
      />
    </Box>
  );
};

TextAreaComponent.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  numberOfLines: PropTypes.number.isRequired,
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
  isTitle: PropTypes.bool,
};

TextAreaComponent.defaultProps = {
  label: "",
  myStyles: {},
  isTitle: false,
};

export default TextAreaComponent;
