import { useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React from "react";

import CheckboxSelectorComponent from "../common/CheckboxSelectorComponent";

const FishCheckboxSelector = ({
  containerStyle,
  label,
  placeholder,
  controllerName,
}) => {
  const { fishList } = useStoreState((state) => state.FishModel);
  return (
    <CheckboxSelectorComponent
      myStyles={containerStyle}
      label={label}
      placeholder={placeholder}
      data={fishList}
      controllerName={controllerName}
    />
  );
};

FishCheckboxSelector.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
};

FishCheckboxSelector.defaultProps = {
  label: "",
  placeholder: "",
  controllerName: "",
  containerStyle: {},
};
export default FishCheckboxSelector;
