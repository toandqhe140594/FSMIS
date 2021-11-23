import { useStoreActions, useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import SelectComponent from "./SelectComponent";

const ProvinceSelector = ({
  containerStyle,
  label,
  placeholder,
  controllerName,
  hasAsterisk,
}) => {
  const { control } = useFormContext();
  const watchProvince = useWatch({ control, name: controllerName });
  const { provinceList } = useStoreState((state) => state.AddressModel);
  const { getDisctrictByProvinceId } = useStoreActions(
    (actions) => actions.AddressModel,
  );

  useEffect(() => {
    getDisctrictByProvinceId({ id: watchProvince });
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
