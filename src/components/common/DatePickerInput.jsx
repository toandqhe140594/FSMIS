import { Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon, Input, Text } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TouchableOpacity } from "react-native";

import moment from "../../config/moment";

const CalendarIcon = () => (
  <Icon as={<Entypo name="calendar" />} size={5} mr={1} color="muted.500" />
);

const DatePickerInput = ({ label, placeholder, controllerName }) => {
  const [visible, setVisible] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(null);
  const {
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const watchDob = watch(controllerName);
  /**
   * Toggle DateTimePicker visibility
   */
  const toggleDatePicker = () => {
    setVisible(true);
  };
  /**
   * Handler date picker on value changed
   * @param {*} event
   * @param {Date} selectedDate
   */
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || getValues(controllerName);
    setVisible(false);
    setValue(controllerName, currentDate);
  };
  /**
   * Trigger when dob value changed, set
   * displayedDate for date in DD/MM/YYYY format
   */
  useEffect(() => {
    if (watchDob) {
      setDisplayedDate(moment(watchDob).format("DD/MM/YYYY").toString());
    }
  }, [watchDob]);
  return (
    <>
      {visible && (
        <DateTimePicker
          display="default"
          is24Hour
          mode="date"
          value={getValues(controllerName) || new Date()}
          onChange={onDateChange}
        />
      )}
      {label.length > 0 && (
        <Text fontSize="md" mb={1}>
          {label}
        </Text>
      )}
      <TouchableOpacity onPress={toggleDatePicker}>
        <Input
          InputRightElement={<CalendarIcon />}
          placeholder={placeholder}
          size="lg"
          value={displayedDate ? displayedDate.toString() : ""}
          isDisabled
        />
      </TouchableOpacity>
      {errors[controllerName]?.message && (
        <Text color="red.500" fontSize="xs" italic>
          {errors[controllerName]?.message}
        </Text>
      )}
    </>
  );
};

DatePickerInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
};
DatePickerInput.defaultProps = {
  label: "",
  placeholder: "",
  controllerName: "",
};

export default DatePickerInput;
