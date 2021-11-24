import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const AdvanceSearchFieldWatcher = React.memo(({ name, onValueChange }) => {
  const { control } = useFormContext();
  const watchValue = useWatch({ control, name, defaultValue: [] });
  useEffect(() => {
    onValueChange(watchValue);
  }, [watchValue]);
  return <></>;
});

AdvanceSearchFieldWatcher.propTypes = {
  name: PropTypes.string,
  onValueChange: PropTypes.func,
};

AdvanceSearchFieldWatcher.defaultProps = {
  name: "",
  onValueChange: () => {},
};

export default AdvanceSearchFieldWatcher;
