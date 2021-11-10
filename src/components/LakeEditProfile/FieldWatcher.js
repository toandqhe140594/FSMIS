import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";

const FieldWatcher = ({ control, name, onDeleteField }) => {
  const watchField = useWatch({
    control,
    name,
    defaultValue: 0,
  });
  useEffect(() => {
    if (watchField === "") {
      onDeleteField(name, 0);
    }
  }, [watchField]);
  return <></>;
};

FieldWatcher.propTypes = {
  control: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  ),
  name: PropTypes.string,
  onDeleteField: PropTypes.func,
};
FieldWatcher.defaultProps = {
  control: {},
  name: "",
  onDeleteField: () => {},
};

export default FieldWatcher;
