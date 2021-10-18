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
});

const MAX_LENGTH = 1000;

const TextAreaComponent = ({ label, placeholder, numberOfLines, myStyles }) => {
  return (
    <Box style={[styles.cotainers, myStyles]}>
      {label.length > 0 && (
        <Text bold mb={2}>
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
};

TextAreaComponent.defaultProps = {
  label: "",
  myStyles: {},
};

export default TextAreaComponent;
