import { Checkbox, Select } from "native-base";
import PropTypes from "prop-types";
import React from "react";

const CheckboxSelectorComponent = ({
  groupValue,
  placeholder,
  handleOnSelect,
  data,
}) => {
  return (
    <Select
      accessibilityLabel="Chọn loại hình câu"
      placeholder={placeholder}
      fontSize="md"
    >
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
  );
};

CheckboxSelectorComponent.propTypes = {
  handleOnSelect: PropTypes.func,
  placeholder: PropTypes.string,
  groupValue: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.string),
};

CheckboxSelectorComponent.defaultProps = {
  groupValue: [],
  data: [],
  handleOnSelect: () => {},
  placeholder: "",
};

export default CheckboxSelectorComponent;
