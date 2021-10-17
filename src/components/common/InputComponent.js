import { Input, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  text: { fontWeight: "bold" },
});

const InputComponent = ({ label, placeholder, myStyles }) => {
  return (
    <VStack style={[styles.container, myStyles]} space={1}>
      <Text style={styles.text}>{label}</Text>
      <Input placeholder={placeholder} />
    </VStack>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
};

InputComponent.defaultProps = {
  myStyles: {},
};

export default InputComponent;
