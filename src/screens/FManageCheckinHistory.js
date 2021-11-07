import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Box,
  Button,
  CheckIcon,
  Divider,
  FlatList,
  Modal,
  Select,
} from "native-base";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

import AvatarCard from "../components/AvatarCard";
import CheckInCard from "../components/CheckInCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";

const FManageCheckinHistoryScreen = () => {
  const listCheckInModel = useStoreState(
    (actions) => actions.FManageModel.checkInHistoryList,
  );
  const getCheckinHistoryList = useStoreActions(
    (actions) => actions.FManageModel.getCheckinHistoryList,
  );
  const { checkinHistoryCurrentPage, checkinHistoryList } = useStoreState(
    (states) => states.FManageModel,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [listCheckIn, setListCheckIn] = useState(listCheckInModel);
  const selectedFilterHandler = (type) => {
    if (type === "BY_DATE") {
      setModalVisible(true);
    }
  };
  const dateChangeHandler = (date, type) => {
    if (type === "END_DATE") {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
    console.log(`startDate`, startDate);
    console.log(`endDate`, endDate);
  };

  const submitDateFilterHandler = () => {
    dateChangeHandler();
    setModalVisible(false);
  };
  return (
    <Box>
      <HeaderTab name="Lịch sử Check-in" />

      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          size="full"
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Chọn ngày</Modal.Header>
            <Modal.Body>
              <CalendarPicker
                allowRangeSelection
                scrollable
                todayBackgroundColor="#e6ffe6"
                selectedDayColor="#66ff33"
                selectedDayTextColor="#000000"
                scaleFactor={375}
                onDateChange={dateChangeHandler}
              />
              <Button size="lg" onPress={submitDateFilterHandler}>
                OK
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <Select
          //   selectedValue={dateFilter}
          minWidth="200"
          accessibilityLabel="Chọn chế độ lọc"
          placeholder="Chọn chế độ lọc"
          backgroundColor="white"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          mb={0.5}
          onValueChange={(itemValue) => selectedFilterHandler(itemValue)}
        >
          <Select.Item label="Tất cả" value="All" />
          <Select.Item label="Theo ngày" value="BY_DATE" />
        </Select>

        <FlatList
          data={listCheckIn}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pb="2"
              backgroundColor="white"
            >
              <PressableCustomCard paddingX="3" paddingY="1">
                <CheckInCard
                  timeIn={item.checkInTime}
                  timeOut={item.checkOutTime}
                >
                  <AvatarCard avatarSize="md" nameUser={item.name} />
                </CheckInCard>
              </PressableCustomCard>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Box my="10">
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default FManageCheckinHistoryScreen;
