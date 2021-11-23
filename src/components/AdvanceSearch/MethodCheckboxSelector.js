import { useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React from "react";

import CheckboxSelectorComponent from "../common/CheckboxSelectorComponent";

const MethodCheckboxSelector = ({
  label,
  isTitle,
  hasAsterisk,
  placeholder,
  controllerName,
  containerStyle,
}) => {
  const { fishingMethodList } = useStoreState(
    (state) => state.FishingMethodModel,
  );
  return (
    <CheckboxSelectorComponent
      label={label}
      isTitle={isTitle}
      hasAsterisk={hasAsterisk}
      myStyles={containerStyle}
      placeholder={placeholder}
      data={fishingMethodList}
      controllerName={controllerName}
    />
  );
};

MethodCheckboxSelector.propTypes = {
  label: PropTypes.string,
  isTitle: PropTypes.bool,
  hasAsterisk: PropTypes.bool,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
};

MethodCheckboxSelector.defaultProps = {
  label: "",
  isTitle: false,
  hasAsterisk: false,
  placeholder: "",
  controllerName: "",
  containerStyle: {},
};
export default MethodCheckboxSelector;
