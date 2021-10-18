import { Box, Input } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const COMPACT_INPUT_WIDTH = "60%";
const FULL_INPUT_WIDTH = "70%";

const InlineInputComponent = ({ label, placeholder, myStyles, compact }) => {
  const getInputWidth = () => ({
    width: compact ? COMPACT_INPUT_WIDTH : FULL_INPUT_WIDTH,
  });
  return (
    <Box style={[styles.container, myStyles]}>
      <Text>{label}</Text>
      <Input style={getInputWidth()} placeholder={placeholder} fontSize="sm" />
    </Box>
  );
};

InlineInputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  myStyles: PropTypes.objectOf(PropTypes.object.isRequired),
  compact: PropTypes.bool,
};

InlineInputComponent.defaultProps = {
  myStyles: {},
  compact: false,
};

export default InlineInputComponent;
