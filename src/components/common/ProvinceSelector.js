import { useStoreActions, useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import SelectComponent from "./SelectComponent";

const RESET_VALUE = 0;

const ProvinceSelector = ({
  containerStyle,
  label,
  isTitle,
  placeholder,
  controllerName,
  hasAsterisk,
  dependentField,
}) => {
  const { control, setValue } = useFormContext();
  const canBeReset = useRef(false);
  const watchProvince = useWatch({ control, name: controllerName });
  const { provinceList } = useStoreState((state) => state.AddressModel);
  const { getDisctrictByProvinceId, resetDistrictList } = useStoreActions(
    (actions) => actions.AddressModel,
  );

  useEffect(() => {
    getDisctrictByProvinceId({ id: watchProvince })
      .then(() => {
        if (canBeReset.current) {
          setValue(dependentField, RESET_VALUE);
        } else canBeReset.current = true;
      })
      .catch(() => {
        resetDistrictList();
      });
  }, [watchProvince]);

  return (
    <SelectComponent
      isTitle={isTitle}
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
  isTitle: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
  dependentField: PropTypes.string,
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
};

ProvinceSelector.defaultProps = {
  hasAsterisk: false,
  isTitle: false,
  label: "",
  placeholder: "",
  controllerName: "",
  dependentField: "districtId",
  containerStyle: {},
};

export default React.memo(ProvinceSelector);
