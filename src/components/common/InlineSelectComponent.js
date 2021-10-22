import { Box, Select } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text } from "react-native";

let itemKey = 0;
const generateKey = () => {
  itemKey += 1;
  return itemKey;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontWeight: "bold", fontSize: 16 },
});

const COMPACT_SELECT_WIDTH = "60%";

const InlineSelectComponent = ({
  label,
  placeholder,
  data,
  myStyles,
  isTitle,
  value,
  handleOnChange,
}) => {
  const getTitleStyle = () => (isTitle ? styles.title : null);
  return (
    <Box style={[styles.container, myStyles]}>
      <Text style={getTitleStyle()}>{label}</Text>
      <Select
        w={COMPACT_SELECT_WIDTH}
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        fontSize="sm"
        selectedValue={value}
        onValueChange={handleOnChange}
      >
        {data.map((item) => (
          <Select.Item key={generateKey()} label={item} value={item} />
        ))}
      </Select>
    </Box>
  );
};

InlineSelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string.isRequired),
  placeholder: PropTypes.string.isRequired,
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
  isTitle: PropTypes.bool,
  handleOnChange: PropTypes.func,
  value: PropTypes.string,
};

InlineSelectComponent.defaultProps = {
  data: [],
  myStyles: {},
  isTitle: false,
  handleOnChange: () => {},
  value: "",
};
export default InlineSelectComponent;
