import { useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React from "react";

import SelectComponent from "./SelectComponent";

const WardSelector = ({ label, placeholder, controllerName }) => {
  const { wardList } = useStoreState((state) => state.AddressModel);

  return (
    <SelectComponent
      label={label}
      placeholder={placeholder}
      hasAsterisk
      controllerName={controllerName}
      data={wardList}
    />
  );
};

WardSelector.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
};

WardSelector.defaultProps = {
  label: "",
  placeholder: "",
  controllerName: "",
};

export default React.memo(WardSelector);
