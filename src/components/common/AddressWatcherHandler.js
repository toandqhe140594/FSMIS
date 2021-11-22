import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const FieldWatcherHandler = ({ name, onValueChange }) => {
  const { control } = useFormContext();
  const watchValue = useWatch({
    control,
    name,
    defaultValue: 0,
  });
  useEffect(() => {
    onValueChange(watchValue);
  }, [watchValue]);
  return null;
};

FieldWatcherHandler.propTypes = {
  name: PropTypes.string,
  onValueChange: PropTypes.func,
  fieldDefaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
};

FieldWatcherHandler.defaultProps = {
  name: "",
  onValueChange: () => {},
  fieldDefaultValue: 0,
};

export default React.memo(FieldWatcherHandler);
