import { useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React from "react";

import CheckboxSelectorComponent from "../common/CheckboxSelectorComponent";

const MethodCheckboxSelector = ({
  containerStyle,
  label,
  placeholder,
  controllerName,
}) => {
  const { fishingMethodList } = useStoreState(
    (state) => state.FishingMethodModel,
  );
  return (
    <CheckboxSelectorComponent
      myStyles={containerStyle}
      label={label}
      placeholder={placeholder}
      data={fishingMethodList}
      controllerName={controllerName}
    />
  );
};

MethodCheckboxSelector.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
};

MethodCheckboxSelector.defaultProps = {
  label: "",
  placeholder: "",
  controllerName: "",
  containerStyle: {},
};
export default MethodCheckboxSelector;
