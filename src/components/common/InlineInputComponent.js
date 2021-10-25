import { Input } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const COMPACT_INPUT_WIDTH = "60%";

const InlineInputComponent = ({
  label,
  placeholder,
  myStyles,
  value,
  handleOnChange,
}) => {
  return (
    <View style={[styles.container, myStyles]}>
      <Text>{label}</Text>
      <Input
        w={COMPACT_INPUT_WIDTH}
        placeholder={placeholder}
        fontSize="sm"
        value={value}
        onChangeText={handleOnChange}
      />
    </View>
  );
};

InlineInputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  myStyles: PropTypes.objectOf(PropTypes.object.isRequired),
  value: PropTypes.string,
  handleOnChange: PropTypes.func,
};

InlineInputComponent.defaultProps = {
  myStyles: {},
  value: "",
  handleOnChange: () => {},
};

export default InlineInputComponent;
