import { Box, Select } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontWeight: "bold", fontSize: 16 },
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
  value,
  handleOnChange,
}) => {
  const getSelectWidth = () =>
    compact ? COMPACT_SELECT_WIDTH : FULL_SELECT_WIDTH;

  const getTitleStyle = () => (isTitle ? styles.title : null);
  return (
    <Box style={[styles.container, myStyles]}>
      <Text style={getTitleStyle()}>{label}</Text>
      <Select
        w={getSelectWidth()}
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        fontSize="sm"
        selectedValue={value}
        onValueChange={handleOnChange}
      >
        {data.map((item) => (
          <Select.Item label={item} value={item} />
        ))}
      </Select>
    </Box>
  );
};

InlineSelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string.isRequired),
  placeholder: PropTypes.string.isRequired,
  compact: PropTypes.bool,
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
  isTitle: PropTypes.bool,
  handleOnChange: PropTypes.func,
  value: PropTypes.string,
};

InlineSelectComponent.defaultProps = {
  data: [],
  myStyles: {},
  compact: false,
  isTitle: false,
  handleOnChange: () => {},
  value: "",
};
export default InlineSelectComponent;
