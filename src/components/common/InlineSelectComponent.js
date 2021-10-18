import { HStack, Select } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const COMPACT_SELECT_WIDTH = "60%";
const FULL_SELECT_WIDTH = "70%";

const InlineSelectComponent = ({
  label,
  placeholder,
  data,
  myStyles,
  compact,
  isTitle,
}) => {
  const getSelectWidth = () =>
    compact ? COMPACT_SELECT_WIDTH : FULL_SELECT_WIDTH;

  const getTitleStyle = () =>
    isTitle ? { fontWeight: "bold", fontSize: 16 } : null;
  return (
    <HStack style={[styles.container, myStyles]}>
      <Text style={getTitleStyle()}>{label}</Text>
      <Select
        w={getSelectWidth()}
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        fontSize="sm"
      >
        {data.map((item) => (
          <Select.Item label={item} value={item} />
        ))}
      </Select>
    </HStack>
  );
};

InlineSelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string.isRequired),
  placeholder: PropTypes.string.isRequired,
  compact: PropTypes.bool,
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
  isTitle: PropTypes.bool,
};

InlineSelectComponent.defaultProps = {
  data: [],
  myStyles: {},
  compact: false,
  isTitle: false,
};
export default InlineSelectComponent;
