import { Checkbox, Select } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  error: { color: "#f43f5e", fontSize: 12, fontStyle: "italic" },
  title: { fontSize: 16, marginBottom: 4, fontWeight: "bold" },
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
  const watchSelection = useWatch({
    control,
    name: controllerName,
    defaultValue: [],
  });
  useEffect(() => {
    if (watchSelection.length === 0) setUserSelection(placeholder);
    else if (watchSelection.length > 3) {
      setUserSelection(`${watchSelection.length} lựa chọn`);
    } else {
      const selectMethods = data.reduce((acc, { name, id }) => {
        if (watchSelection.includes(id)) return acc.concat(", ", name);
        return acc;
      }, "");
      setUserSelection(selectMethods.slice(2));
    }
  }, [watchSelection]);
  return (
    <View style={myStyles}>
      {label.length > 0 && (
        <Text style={isTitle ? styles.title : styles.text}>{label}</Text>
      )}
      <Select placeholder={userSelection || placeholder} fontSize="md">
        <Select.Item
          disabled
          label={
            <Controller
              control={control}
              name={controllerName}
              render={({ field: { onChange, value } }) => (
                <Checkbox.Group
                  colorScheme="green"
                  defaultValue={value}
                  onChange={onChange}
                  alignItems="flex-start"
                >
                  {/* Display list of checkbox options */}
                  {data.map((item) => (
                    <Checkbox key={item.id} value={item.id} my={1} size="md">
                      {item.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
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
  data: PropTypes.arrayOf(PropTypes.object),
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
