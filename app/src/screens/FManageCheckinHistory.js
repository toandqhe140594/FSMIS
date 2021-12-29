import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, FlatList, Modal, Select, Text } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

import AvatarCard from "../components/AvatarCard";
import CheckInCard from "../components/CheckInCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { DICTIONARY, MONTHS, WEEKDAYS } from "../constants";
import { convertDateDisplayFormat } from "../utilities";

const DEFAULT_STATE = { pageNo: 1, startDate: null, endDate: null };

/**
 * Concate start date and end date to display format
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns string concate start and end date in DD/MM/YYYY format
 */
const getDateRangeDisplay = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return DICTIONARY.SELECT_DATE_RANGE_PLACEHOLDER;
  }
  if (startDate && endDate && startDate.toString() === endDate.toString()) {
    return `Trong ngày ${convertDateDisplayFormat(startDate).split("T")[0]}`;
  }
  const fromDisplay = `Từ ${convertDateDisplayFormat(startDate).split("T")[0]}`;
  const toDisplay = endDate
    ? `đến ${convertDateDisplayFormat(endDate).split("T")[0]}`
    : "trở đi";
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
  const queryData = useRef({ ...DEFAULT_STATE });
  const [dateRange, setDateRange] = useState(
    DICTIONARY.SELECT_DATE_RANGE_PLACEHOLDER,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { checkinHistoryList, checkinHistoryTotalPage } = useStoreState(
    (states) => states.FManageModel,
  );
  const { getCheckinHistoryList, resetCheckinHistory } = useStoreActions(
    (actions) => actions.FManageModel,
  );

  const closeModal = () => setModalVisible(false);

  /**
   * Invoke loading state to start loading
   * @param {Boolean} shouldRefresh should the func update needRefresh to true
   */
  const startLoading = (shouldRefresh = true) => {
    if (shouldRefresh) needRefresh.current = true;
    setIsLoading(true);
  };

  /**
   * Handle side tasks accordings to selected value
   * @param {String} value value from select dropdown
   */
  const handleValueChange = (value) => {
    if (value === "BY_DATE") {
      setModalVisible(true);
    } else {
      queryData.current = { ...DEFAULT_STATE };
      setDateRange(DICTIONARY.SELECT_DATE_RANGE_PLACEHOLDER);
      startLoading();
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

  /**
   * Handle when list need to load more on end reached
   */
  const handleLoadMore = () => {
    const currentPage = queryData.current.pageNo;
    if (currentPage < checkinHistoryTotalPage) {
      queryData.current.pageNo = currentPage + 1;
      startLoading(false);
    }
  };

  /**
   * Store user's selected date
   * @param {Date} date date object from selected date
   * @param {String} type type of selected date
   */
  const handleDateChange = (date, type) => {
    if (type === "END_DATE") {
      queryData.current.endDate = date;
    } else {
      queryData.current.startDate = date;
      queryData.current.endDate = null;
    }
  };

  /**
   * Hanlde display date range selected
   * and close date range selector
   * and start loading
   */
  const handleSubmitDate = () => {
    setModalVisible(false);
    const { startDate, endDate } = queryData.current;
    setDateRange(getDateRangeDisplay(startDate, endDate));
    queryData.current.pageNo = 1;
    startLoading();
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
      getCheckinHistoryList({ ...queryData.current }).finally(stopLoading);
    }
  }, [isLoading]);

  return (
    <Box>
      <HeaderTab name={DICTIONARY.FMANAGE_CHECK_IN_HISTORY_HEADER} />
      <Box w={{ base: "100%", md: "25%" }}>
        <Modal isOpen={modalVisible} onClose={closeModal} size="full">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Chọn ngày</Modal.Header>
            <Modal.Body>
              <CalendarPicker
                months={MONTHS}
                weekdays={WEEKDAYS}
                allowRangeSelection
                onDateChange={handleDateChange}
                allowBackwardRangeSelect
                previousTitle={DICTIONARY.PREVIOUS_BUTTON_LABEL}
                nextTitle={DICTIONARY.NEXT_BUTTON_LABEL}
                todayBackgroundColor={DICTIONARY.TODAY_BACKGROUND_COLOR}
                selectedDayColor={DICTIONARY.SELECTED_DAY_COLOR}
                selectedDayTextColor={DICTIONARY.SELECTED_DAY_TEXT_COLOR}
                selectMonthTitle={DICTIONARY.SELECT_MONTH_BUTTON_LABEL}
                selectYearTitle={DICTIONARY.SELECT_YEAR_BUTTON_LABEL}
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
          <Select.Item label={dateRange} value="BY_DATE" />
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
