import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Divider, FlatList, Text } from "native-base";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import AvatarCard from "../components/AvatarCard";
import CheckInCard from "../components/CheckInCard";
import DateRangeModalSelector from "../components/common/DateRangeModalSelector";
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {
    getCheckinHistoryList,
    getCheckinHistoryListByDate,
    resetCheckinHistory,
  } = useStoreActions((actions) => actions.FManageModel);

  const memoizedStyle = useMemo(
    () =>
      checkinHistoryList && checkinHistoryList.length > 0
        ? null
        : { flex: 1, justifyContent: "center" },
    [checkinHistoryList && checkinHistoryList.length > 0],
  );

  const dateChangeHandler = useCallback(
    (date, type) => {
      if (type === "END_DATE") {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    },
    [startDate, endDate],
  );

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

  const submitDateFilterHandler = useCallback(() => {
    resetCheckinHistory();
    onLoadMore();
  }, [startDate, endDate]);

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
        <DateRangeModalSelector
          handleDatePickerChange={dateChangeHandler}
          onSubmitDate={submitDateFilterHandler}
        />
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
