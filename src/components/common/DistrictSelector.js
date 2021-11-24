import { useStoreActions, useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import SelectComponent from "./SelectComponent";

const DistrictSelector = ({ label, placeholder, controllerName }) => {
  const { control, setValue } = useFormContext();
  const [getStatus, setGetStatus] = useState(null);
  const watchDistrict = useWatch({ control, name: controllerName });
  const { districtList } = useStoreState((state) => state.AddressModel);
  const { getWardByDistrictId, resetWardList } = useStoreActions(
    (actions) => actions.AddressModel,
  );

  useEffect(() => {
    getWardByDistrictId({ id: watchDistrict, setGetStatus });
  }, [watchDistrict]);

  useEffect(() => {
    if (getStatus === "SUCCESS") {
      setValue(controllerName, 0);
      setGetStatus(null);
    } else if (getStatus === "FAILED") {
      resetWardList();
      setGetStatus(null);
    }
  }, [getStatus]);

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
