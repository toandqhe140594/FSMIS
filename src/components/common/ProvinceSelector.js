import { useStoreActions, useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import SelectComponent from "./SelectComponent";

const ProvinceSelector = ({ label, placeholder, controllerName }) => {
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
      label={label}
      placeholder={placeholder}
      hasAsterisk
      controllerName={controllerName}
      data={provinceList}
    />
  );
};

ProvinceSelector.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
};

ProvinceSelector.defaultProps = {
  label: "",
  placeholder: "",
  controllerName: "",
};

export default React.memo(ProvinceSelector);
