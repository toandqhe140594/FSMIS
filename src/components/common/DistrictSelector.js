import { useStoreActions, useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import SelectComponent from "./SelectComponent";

const DistrictSelector = ({ label, placeholder, controllerName }) => {
  const { control } = useFormContext();
  const watchDistrict = useWatch({ control, name: controllerName });
  const { districtList } = useStoreState((state) => state.AddressModel);
  const { getWardByDistrictId } = useStoreActions(
    (actions) => actions.AddressModel,
  );

  useEffect(() => {
    getWardByDistrictId({ id: watchDistrict });
  }, [watchDistrict]);

  return (
    <SelectComponent
      label={label}
      placeholder={placeholder}
      hasAsterisk
      controllerName={controllerName}
      data={districtList}
    />
  );
};

DistrictSelector.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
};

DistrictSelector.defaultProps = {
  label: "",
  placeholder: "",
  controllerName: "",
};

export default React.memo(DistrictSelector);
