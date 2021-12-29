import { useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React from "react";

import SelectComponent from "./SelectComponent";

const WardSelector = ({ label, placeholder, hasAsterisk, controllerName }) => {
  const { wardList } = useStoreState((state) => state.AddressModel);

  return (
    <SelectComponent
      label={label}
      placeholder={placeholder}
      hasAsterisk={hasAsterisk}
      controllerName={controllerName}
      data={wardList}
    />
  );
};

WardSelector.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
  hasAsterisk: PropTypes.bool,
};

WardSelector.defaultProps = {
  label: "",
  placeholder: "",
  controllerName: "",
  hasAsterisk: false,
};

export default React.memo(WardSelector);
