import { Checkbox, Select } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  error: {},
  bold: { fontWeight: "bold" },
  text: { fontSize: 16, marginBottom: 4 },
});
const CheckboxSelectorComponent = ({
  label,
  groupValue,
  placeholder,
  handleOnSelect,
  data,
}) => {
  return (
    <View>
      {label.length > 0 && <Text style={styles.text}>{label}</Text>}
      <Select placeholder={placeholder} fontSize="md">
        <Select.Item
          label={
            <Checkbox.Group
              colorScheme="green"
              defaultValue={groupValue}
              onChange={handleOnSelect}
              alignItems="flex-start"
            >
              {/* Display list of checkbox options */}
              {data.map((item) => (
                <Checkbox value={item} my={1}>
                  {item}
                </Checkbox>
              ))}
            </Checkbox.Group>
          }
        />
      </Select>
    </View>
  );
};

CheckboxSelectorComponent.propTypes = {
  label: PropTypes.string,
  handleOnSelect: PropTypes.func,
  placeholder: PropTypes.string,
  groupValue: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.string),
};

CheckboxSelectorComponent.defaultProps = {
  label: "",
  groupValue: [],
  data: [],
  handleOnSelect: () => {},
  placeholder: "",
};

export default CheckboxSelectorComponent;
