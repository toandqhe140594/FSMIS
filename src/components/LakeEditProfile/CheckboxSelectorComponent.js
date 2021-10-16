import { Checkbox, Select } from "native-base";
import React, { useState } from "react";

const fishingMethods = ["Câu đài", "Câu đơn", "Câu lục"];

const CheckboxSelectorComponent = () => {
  const [groupValue, setGroupValue] = useState([]);

  /* Concat strings from selected checkbox value */
  const getSelectedGroupValue = () => {
    if (groupValue.length === 0) return "Chọn loại hình câu";
    const arrayString = groupValue.reduce(
      (accumulator, currentValue) => `${accumulator}, ${currentValue}`,
    );
    return `${arrayString}`;
  };

  return (
    <Select
      accessibilityLabel="Chọn loại hình câu"
      placeholder={getSelectedGroupValue()}
    >
      <Select.Item
        label={
          <Checkbox.Group
            colorScheme="green"
            defaultValue={groupValue}
            onChange={(values) => {
              setGroupValue(values || []);
            }}
            alignItems="flex-start"
          >
            {/* Display list of checkbox options */}
            {fishingMethods.map((method) => (
              <Checkbox value={method} my={1}>
                {method}
              </Checkbox>
            ))}
          </Checkbox.Group>
        }
      />
    </Select>
  );
};

export default CheckboxSelectorComponent;
