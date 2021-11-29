import { Button, CheckIcon, Modal, Select } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

const DateRangeModalSelector = ({ handleDatePickerChange, onSubmitDate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);
  const handleValueChange = (value) => {
    if (value === "BY_DATE") {
      setModalVisible(true);
    }
  };
  const handleOnSubmitDate = () => {
    setModalVisible(false);
    onSubmitDate();
  };
  return (
    <>
      <Modal isOpen={modalVisible} onClose={closeModal} size="full">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Chọn ngày</Modal.Header>
          <Modal.Body>
            <CalendarPicker
              allowRangeSelection
              scrollable
              todayBackgroundColor="#00e673"
              selectedDayColor="#00ccff"
              selectedDayTextColor="#000000"
              onDateChange={handleDatePickerChange}
            />
            <Button size="lg" onPress={handleOnSubmitDate}>
              OK
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Select
        mt={1}
        mb={0.5}
        minWidth="200"
        accessibilityLabel="Chọn chế độ lọc"
        placeholder="Chọn chế độ lọc"
        backgroundColor="#ffffff"
        onValueChange={handleValueChange}
        fontSize="md"
        _selectedItem={{
          bg: "primary.200",
          endIcon: <CheckIcon size="5" />,
        }}
      >
        <Select.Item label="Tất cả" value="All" />
        <Select.Item label="Theo ngày" value="BY_DATE" />
      </Select>
    </>
  );
};

DateRangeModalSelector.propTypes = {
  handleDatePickerChange: PropTypes.func.isRequired,
  onSubmitDate: PropTypes.func.isRequired,
};

export default DateRangeModalSelector;
