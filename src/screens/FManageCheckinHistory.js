import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Box,
  Button,
  CheckIcon,
  Divider,
  FlatList,
  Modal,
  Select,
  Text,
} from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

import AvatarCard from "../components/AvatarCard";
import CheckInCard from "../components/CheckInCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";

const renderItem = ({ item }) => (
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
      <CheckInCard timeIn={item.checkInTime} timeOut={item.checkOutTime}>
        <AvatarCard avatarSize="md" nameUser={item.name} image={item.avatar} />
      </CheckInCard>
    </PressableCustomCard>
  </Box>
);

const FManageCheckinHistoryScreen = () => {
  const { checkinHistoryCurrentPage, checkinHistoryList } = useStoreState(
    (states) => states.FManageModel,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {
    getCheckinHistoryList,
    getCheckinHistoryListByDate,
    resetCheckinHistory,
  } = useStoreActions((actions) => actions.FManageModel);

  const selectedFilterHandler = (type) => {
    if (type === "BY_DATE") {
      setModalVisible(true);
    }
  };

  const memoizedStyle = useMemo(
    () =>
      checkinHistoryList && checkinHistoryList.length > 0
        ? null
        : { flex: 1, justifyContent: "center" },
    [checkinHistoryList && checkinHistoryList.length > 0],
  );

  const dateChangeHandler = (date, type) => {
    if (type === "END_DATE") {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const onLoadMore = () => {
    const objParams = {};
    if (startDate !== null) {
      if (endDate !== null) {
        objParams.endDate = endDate;
      }
      objParams.startDate = startDate;
      getCheckinHistoryListByDate(objParams);
    } else {
      getCheckinHistoryList();
    }
  };

  const submitDateFilterHandler = () => {
    setModalVisible(false);
    resetCheckinHistory();
    onLoadMore();
  };

  const handleFilterChange = (itemValue) => selectedFilterHandler(itemValue);

  const closeModal = () => setModalVisible(false);

  const renderEmpty = () => (
    <Text color="gray.400" alignSelf="center">
      Lịch sử check-in đang trống
    </Text>
  );

  const keyExtractor = (item, index) => index.toString();

  useEffect(() => {
    // If the current page = 1 aka the list is empty then call api to init the list
    if (checkinHistoryCurrentPage === 1) {
      getCheckinHistoryList();
    }
    return () => {
      resetCheckinHistory(); // Clear list data when screen unmount
    };
  }, []);

  return (
    <Box>
      <HeaderTab name="Lịch sử Check-in" />
      <Box w={{ base: "100%", md: "25%" }}>
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
                onDateChange={dateChangeHandler}
              />
              <Button size="lg" onPress={submitDateFilterHandler}>
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
          onValueChange={handleFilterChange}
          fontSize="md"
          _selectedItem={{
            bg: "primary.200",
            endIcon: <CheckIcon size="5" />,
          }}
        >
          <Select.Item label="Tất cả" value="All" />
          <Select.Item label="Theo ngày" value="BY_DATE" />
        </Select>

        <FlatList
          h="82%"
          data={checkinHistoryList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onLoadMore}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={memoizedStyle}
        />
        <Box mt="10">
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default FManageCheckinHistoryScreen;
