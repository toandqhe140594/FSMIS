import { VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  textArea: {
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 5,
  },
});

const MAX_LENGTH = 1000;

const TextAreaComponent = ({ label, placeholder, numberOfLines, myStyles }) => {
  return (
    <VStack style={[styles.cotainers, myStyles]} space={1}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        multiline
        numberOfLines={numberOfLines}
        maxLength={MAX_LENGTH}
        placeholder={placeholder}
        style={styles.textArea}
      />
    </VStack>
  );
};

TextAreaComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  numberOfLines: PropTypes.number.isRequired,
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
};

TextAreaComponent.defaultProps = {
  myStyles: {},
};

export default TextAreaComponent;
