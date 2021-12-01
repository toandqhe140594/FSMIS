import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, FlatList, Modal, Select, Text } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

import AvatarCard from "../components/AvatarCard";
import CheckInCard from "../components/CheckInCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { DICTIONARY } from "../constants";
import { convertDateFormat } from "../utilities";

const DEFAULT_STATE = { pageNo: 1, startDate: null, endDate: null };
const DATE_RANGE_PLACEHOLDER = "Chọn ngày";

const shouldListUpdate = (prevState, currentState) => {
  if (JSON.stringify(prevState) !== JSON.stringify(currentState)) {
    Object.assign(prevState, currentState);
    return true;
  }
  return false;
};

const getDateRangeDisplay = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return DATE_RANGE_PLACEHOLDER;
  }
  // Cái nào ko trống thì hiện thị ra (ko null)
  const fromDisplay = startDate
    ? `Từ ${convertDateFormat(startDate).split("T")[0]}`
    : "";
  const toDisplay = endDate
    ? `đến ${convertDateFormat(endDate).split("T")[0]}`
    : "";
  return `${fromDisplay} ${toDisplay}`;
};

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
  const needRefresh = useRef(true);
  const prevQueryData = useRef({});
  const queryData = useRef({ ...DEFAULT_STATE });
  const [dateRange, setDateRange] = useState(DATE_RANGE_PLACEHOLDER);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { checkinHistoryList, checkinHistoryTotalPage } = useStoreState(
    (states) => states.FManageModel,
  );
  const { getCheckinHistoryList, resetCheckinHistory } = useStoreActions(
    (actions) => actions.FManageModel,
  );

  const closeModal = () => setModalVisible(false);

  const handleValueChange = (value) => {
    if (value === "BY_DATE") {
      setModalVisible(true);
    } else {
      queryData.current = { ...DEFAULT_STATE };
      setDateRange(DATE_RANGE_PLACEHOLDER);
      setIsLoading(true);
    }
  };

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

  const handleLoadMore = () => {
    const currentPage = queryData.current.pageNo;
    if (currentPage < checkinHistoryTotalPage) {
      queryData.current.pageNo = currentPage + 1;
      setIsLoading(true);
    }
  };

  const handleDateChange = (date, type) => {
    if (type === "END_DATE") {
      queryData.current.endDate = date;
    } else {
      queryData.current.startDate = date;
      queryData.current.endDate = null;
    }
  };

  const handleSubmitDate = () => {
    const { startDate, endDate } = queryData.current;
    setDateRange(getDateRangeDisplay(startDate, endDate));
    queryData.current.pageNo = 1;
    needRefresh.current = true;
    setModalVisible(false);
    setIsLoading(true);
  };

  const keyExtractor = (item, index) => index.toString();

  const memoizedRender = useMemo(() => renderItem, [checkinHistoryList]);

  const renderHeader = () =>
    isLoading && needRefresh.current ? (
      <SmallScreenLoadingIndicator containerStyle={{ marginVertical: 12 }} />
    ) : null;

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

  useEffect(() => {
    return () => {
      resetCheckinHistory();
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      if (shouldListUpdate(prevQueryData.current, queryData.current)) {
        getCheckinHistoryList({ ...queryData.current }).finally(stopLoading);
      } else stopLoading();
    }
  }, [isLoading]);

  return (
    <Box>
      <HeaderTab name={DICTIONARY.FMANAGE_CHECK_IN_HISTORY_HEADER} />
      <Box w={{ base: "100%", md: "25%" }}>
        <Modal isOpen={modalVisible} onClose={closeModal} size="full">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>{dateRange}</Modal.Header>
            <Modal.Body>
              <CalendarPicker
                allowRangeSelection
                scrollable
                todayBackgroundColor="#fafafa"
                selectedDayColor="#00ccff"
                selectedDayTextColor="#000000"
                onDateChange={handleDateChange}
              />
              <Button size="lg" onPress={handleSubmitDate}>
                OK
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <Select
          fontSize="md"
          accessibilityLabel="Chọn chế độ lọc"
          placeholder="Chọn chế độ lọc"
          onValueChange={handleValueChange}
        >
          <Select.Item label="Tất cả" value="All" />
          <Select.Item label="Theo ngày" value="BY_DATE" />
        </Select>
        <FlatList
          h="87%"
          data={checkinHistoryList}
          renderItem={memoizedRender}
          keyExtractor={keyExtractor}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          contentContainerStyle={memoizedStyle}
        />
      </Box>
    </Box>
  );
};

export default FManageCheckinHistoryScreen;
