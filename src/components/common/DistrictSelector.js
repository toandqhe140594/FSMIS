import { useStoreActions, useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import SelectComponent from "./SelectComponent";

const DistrictSelector = ({ label, placeholder, controllerName }) => {
  const { control, setValue } = useFormContext();
  const canIRunNow = useRef(false);
  const watchDistrict = useWatch({ control, name: controllerName });
  const { districtList } = useStoreState((state) => state.AddressModel);
  const { getWardByDistrictId, resetWardList } = useStoreActions(
    (actions) => actions.AddressModel,
  );

  useEffect(() => {
    getWardByDistrictId({ id: watchDistrict })
      .then(() => {
        if (canIRunNow.current) {
          setValue("wardId", 0);
        } else canIRunNow.current = true;
      })
      .catch(() => {
        resetWardList();
      });
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
