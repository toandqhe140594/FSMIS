import { Checkbox, Select } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

let itemKey = 0;
const generateKey = () => {
  itemKey += 1;
  return itemKey;
};

const styles = StyleSheet.create({
  error: { color: "#f43f5e", fontSize: 12, fontStyle: "italic" },
  bold: { fontWeight: "bold" },
  text: { fontSize: 16, marginBottom: 4 },
});

const CheckboxSelectorComponent = ({
  label,
  isTitle,
  placeholder,
  data,
  controllerName,
  myStyles,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [userSelection, setUserSelection] = useState("");
  return (
    <View style={myStyles}>
      {label.length > 0 && (
        <Text style={[styles.text, isTitle ? styles.bold : null]}>{label}</Text>
      )}
      <Select placeholder={userSelection || placeholder} fontSize="md">
        <Select.Item
          disabled
          label={
            <Controller
              control={control}
              name={controllerName}
              render={({ field: { onChange, value } }) => {
                useEffect(() => {
                  if (value.length === 0) setUserSelection(placeholder);
                  else {
                    setUserSelection(
                      value.reduce((acc, current) => `${acc}, ${current}`),
                    );
                  }
                }, [value]);
                return (
                  <Checkbox.Group
                    colorScheme="green"
                    defaultValue={value}
                    onChange={onChange}
                    alignItems="flex-start"
                  >
                    {/* Display list of checkbox options */}
                    {data.map((item) => (
                      <Checkbox key={generateKey()} value={item} my={1}>
                        {item}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                );
              }}
            />
          }
        />
      </Select>
      {errors[controllerName]?.message && (
        <Text style={styles.error}>{errors[controllerName]?.message}</Text>
      )}
    </View>
  );
};

CheckboxSelectorComponent.propTypes = {
  label: PropTypes.string,
  isTitle: PropTypes.bool,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  controllerName: PropTypes.string,
  myStyles: PropTypes.objectOf(PropTypes.string),
};

CheckboxSelectorComponent.defaultProps = {
  label: "",
  isTitle: false,
  data: [],
  placeholder: "",
  controllerName: "",
  myStyles: {},
};

export default CheckboxSelectorComponent;
