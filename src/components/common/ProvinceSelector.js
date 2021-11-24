import { useStoreActions, useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import SelectComponent from "./SelectComponent";

const ProvinceSelector = ({
  containerStyle,
  label,
  placeholder,
  controllerName,
  hasAsterisk,
}) => {
  const { control, setValue } = useFormContext();
  const canIRunNow = useRef(false);
  const watchProvince = useWatch({ control, name: controllerName });
  const { provinceList } = useStoreState((state) => state.AddressModel);
  const { getDisctrictByProvinceId, resetDistrictList } = useStoreActions(
    (actions) => actions.AddressModel,
  );

  useEffect(() => {
    getDisctrictByProvinceId({ id: watchProvince })
      .then(() => {
        if (canIRunNow.current) {
          setValue("districtId", 0);
        } else canIRunNow.current = true;
      })
      .catch(() => {
        resetDistrictList();
      });
  }, [watchProvince]);

  return (
    <SelectComponent
      myStyles={containerStyle}
      label={label}
      placeholder={placeholder}
      hasAsterisk={hasAsterisk}
      controllerName={controllerName}
      data={provinceList}
    />
  );
};

ProvinceSelector.propTypes = {
  hasAsterisk: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
};

ProvinceSelector.defaultProps = {
  hasAsterisk: false,
  label: "",
  placeholder: "",
  controllerName: "",
  containerStyle: {},
};

export default React.memo(ProvinceSelector);
