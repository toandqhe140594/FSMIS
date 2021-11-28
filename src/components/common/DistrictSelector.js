import { useStoreActions, useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import SelectComponent from "./SelectComponent";

const RESET_VALUE = 0;

const DistrictSelector = ({
  label,
  hasAsterisk,
  placeholder,
  controllerName,
  dependentField,
}) => {
  const { control, setValue } = useFormContext();
  const canBeReset = useRef(false);
  const watchDistrict = useWatch({ control, name: controllerName });
  const { districtList } = useStoreState((state) => state.AddressModel);
  const { getWardByDistrictId, resetWardList } = useStoreActions(
    (actions) => actions.AddressModel,
  );

  useEffect(() => {
    getWardByDistrictId({ id: watchDistrict })
      .then(() => {
        if (canBeReset.current) {
          setValue(dependentField, RESET_VALUE);
        } else canBeReset.current = true;
      })
      .catch(() => {
        resetWardList();
      });
  }, [watchDistrict]);

  return (
    <SelectComponent
      label={label}
      placeholder={placeholder}
      hasAsterisk={hasAsterisk}
      controllerName={controllerName}
      data={districtList}
    />
  );
};

DistrictSelector.propTypes = {
  label: PropTypes.string,
  hasAsterisk: PropTypes.bool,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
  dependentField: PropTypes.string,
};

DistrictSelector.defaultProps = {
  label: "",
  hasAsterisk: false,
  placeholder: "",
  controllerName: "",
  dependentField: "wardId",
};

export default React.memo(DistrictSelector);
