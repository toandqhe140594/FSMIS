import PropTypes from "prop-types";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const FishCardFieldWatcher = ({ name }) => {
  const { control, setValue, clearErrors } = useFormContext();
  const watchField = useWatch({
    control,
    name,
    defaultValue: 0,
  });
  /**
   * Listen to changes of the field,
   * reset field to 0 and clear field's error
   */
  useEffect(() => {
    if (watchField === "") {
      setValue(name, 0);
      clearErrors(name);
    }
  }, [watchField]);
  return null;
};

FishCardFieldWatcher.propTypes = {
  name: PropTypes.string,
};
FishCardFieldWatcher.defaultProps = {
  name: "",
};

export default FishCardFieldWatcher;
