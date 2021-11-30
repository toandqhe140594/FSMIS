import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import AvatarCard from "../components/AvatarCard";
import CheckInCard from "../components/CheckInCard";
import DateRangeModalSelector from "../components/common/DateRangeModalSelector";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { DICTIONARY } from "../constants";

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
  const needRefresh = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
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

  const stopLoading = () => {
    if (needRefresh.current) needRefresh.current = false;
    setIsLoading(false);
  };

  const loadAllList = () => {
    setIsLoading(true);
    needRefresh.current = false;
    getCheckinHistoryList().finally(stopLoading);
  };

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
    setIsLoading(true);
    const objParams = {};
    if (startDate !== null) {
      if (endDate !== null) {
        objParams.endDate = endDate;
      }
      objParams.startDate = startDate;
      getCheckinHistoryListByDate(objParams).finally(stopLoading);
    } else {
      getCheckinHistoryList().finally(stopLoading);
    }
  };

  const submitDateFilterHandler = useCallback(() => {
    needRefresh.current = true;
    resetCheckinHistory();
    onLoadMore();
  }, [startDate, endDate]);

  const renderHeader = () =>
    isLoading && needRefresh.current ? <SmallScreenLoadingIndicator /> : null;

  const renderEmpty = () =>
    !isLoading && (
      <Text color="gray.400" alignSelf="center">
        Lịch sử check-in đang trống
      </Text>
    );

  const renderFooter = () =>
    isLoading && !needRefresh.current ? (
      <SmallScreenLoadingIndicator containerStyle={{ marginVertical: 12 }} />
    ) : null;

  const keyExtractor = (item, index) => index.toString();

  useEffect(() => {
    // If the current page = 1 aka the list is empty then call api to init the list
    if (checkinHistoryCurrentPage === 1) {
      getCheckinHistoryList().finally(stopLoading);
    }
    return () => {
      resetCheckinHistory(); // Clear list data when screen unmount
    };
  }, []);

  return (
    <Box>
      <HeaderTab name={DICTIONARY.FMANAGE_CHECK_IN_HISTORY_HEADER} />
      <Box w={{ base: "100%", md: "25%" }}>
        <DateRangeModalSelector
          doExtraOnSelectValue={loadAllList}
          handleDatePickerChange={dateChangeHandler}
          onSubmitDate={submitDateFilterHandler}
        />
        <FlatList
          h="87%"
          data={checkinHistoryList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onLoadMore}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          contentContainerStyle={memoizedStyle}
          onEndReachedThreshold={0.1}
        />
      </Box>
    </Box>
  );
};

export default FManageCheckinHistoryScreen;
