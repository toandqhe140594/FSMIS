import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const DependentFieldWatcher = ({ name, dependentField, data }) => {
  const { control, setValue } = useFormContext();
  const watchFishInLakeIdField = useWatch({ control, name, defaultValue: 0 });
  /**
   * Listen to update its dependent field
   */
  useEffect(() => {
    if (watchFishInLakeIdField !== 0 && data.length > 0) {
      // .find() return the first element match the return statement
      const fishItem = data.find((item) => {
        return item.fishInLakeId === watchFishInLakeIdField;
      });
      if (fishItem !== undefined) {
        setValue(dependentField, fishItem.id);
      }
    }
  }, [watchFishInLakeIdField]);
  /**
   * Listen to data changes and reset field and its dependent field
   */
  useEffect(() => {
    setValue(name, 0);
    setValue(dependentField, 0);
  }, [JSON.stringify(data)]);
  return <></>;
};

DependentFieldWatcher.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  dependentField: PropTypes.string,
};
DependentFieldWatcher.defaultProps = {
  name: "",
  data: [],
  dependentField: "",
};

export default DependentFieldWatcher;
