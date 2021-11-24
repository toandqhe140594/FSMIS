import { Checkbox, Select } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  error: { color: "#f43f5e", fontSize: 12, fontStyle: "italic" },
  asterisk: { color: "#f43f5e", fontSize: 16 },
  title: { fontSize: 16, marginBottom: 4, fontWeight: "bold" },
  text: { fontSize: 16, marginBottom: 4 },
});

const defaultValue = "0";

const CheckboxSelectorComponent = ({
  label,
  isTitle,
  hasAsterisk,
  placeholder,
  data,
  controllerName,
  myStyles,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [userSelection, setUserSelection] = useState(placeholder);
  const watchSelection = useWatch({
    control,
    name: controllerName,
  });
  useEffect(() => {
    if (watchSelection.length === 0) setUserSelection(placeholder);
    else setUserSelection(`${watchSelection.length} lựa chọn`);
  }, [watchSelection]);
  return (
    <View style={myStyles}>
      {label.length > 0 && (
        <Text style={isTitle ? styles.title : styles.text}>
          {label}
          {hasAsterisk && <Text style={styles.asterisk}>*</Text>}
        </Text>
      )}
      <Controller
        control={control}
        name={controllerName}
        render={({ field: { onChange, value } }) => (
          <Select defaultValue={defaultValue} fontSize="md">
            <Select.Item
              isDisabled
              label={userSelection}
              value={defaultValue}
            />
            <Checkbox.Group value={value} onChange={onChange}>
              {data.map((item) => (
                <Select.Item
                  key={item.id}
                  isDisabled
                  label={
                    <Checkbox size="md" value={item.id}>
                      {item.name}
                    </Checkbox>
                  }
                />
              ))}
            </Checkbox.Group>
          </Select>
        )}
      />
      {errors[controllerName]?.message && (
        <Text style={styles.error}>{errors[controllerName]?.message}</Text>
      )}
    </View>
  );
};

CheckboxSelectorComponent.propTypes = {
  label: PropTypes.string,
  isTitle: PropTypes.bool,
  hasAsterisk: PropTypes.bool,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  controllerName: PropTypes.string,
  myStyles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

CheckboxSelectorComponent.defaultProps = {
  label: "",
  isTitle: false,
  hasAsterisk: false,
  data: [],
  placeholder: "",
  controllerName: "",
  myStyles: {},
};

export default CheckboxSelectorComponent;
