import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, FlatList, Modal, Select, Text } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

import AvatarCard from "../components/AvatarCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { DICTIONARY, KEY_EXTRACTOR, MONTHS, WEEKDAYS } from "../constants";
import { goToCatchReportDetailScreen } from "../navigations";
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

const FManageCatchReportHistory = () => {
  const navigation = useNavigation();
  const needRefresh = useRef(true);
  const queryData = useRef({ ...DEFAULT_STATE });
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState(
    DICTIONARY.SELECT_DATE_RANGE_PLACEHOLDER,
  );
  const { catchReportHistory, catchHistoryTotalPage } = useStoreState(
    (states) => states.FManageModel,
  );
  const { getCatchReportHistoryList, resetCatchReportHistory } =
    useStoreActions((actions) => actions.FManageModel);

  const closeModal = () => setModalVisible(false);

  /**
   * Invoke loading state to start loading
   * @param {Boolean} shouldRefresh should the func update needRefresh to true
   */
  const startLoading = (shouldRefresh = true) => {
    if (shouldRefresh) needRefresh.current = true;
    setIsLoading(true);
  };

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
      catchReportHistory && catchReportHistory.length > 0
        ? null
        : { flex: 1, justifyContent: "center" },
    [catchReportHistory && catchReportHistory.length > 0],
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
    if (currentPage < catchHistoryTotalPage) {
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

  const navigateToDetailScreen = (id) => () => {
    goToCatchReportDetailScreen(navigation, { id });
  };

  const renderItem = ({ item }) => {
    const { userFullName, avatar, description, time, fishes } = item;
    return (
      <Box
        borderBottomWidth="1"
        backgroundColor="white"
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
      >
        <PressableCustomCard
          paddingX="3"
          paddingY="1"
          onPress={navigateToDetailScreen(item.id)}
        >
          <Box pl="2">
            <AvatarCard
              avatarSize="md"
              nameUser={userFullName}
              image={avatar}
              subText={time}
            />
            <Box mt={2}>
              <Text italic>{description}</Text>
              <Text>
                <Text bold>Đã câu được: </Text>
                {fishes.map((fish) => (
                  <Text key={fish}>{fish}. </Text>
                ))}
              </Text>
            </Box>
          </Box>
        </PressableCustomCard>
      </Box>
    );
  };

  const memoizedRender = useMemo(() => renderItem, [catchReportHistory]);

  const renderHeader = () =>
    isLoading && needRefresh.current ? (
      <SmallScreenLoadingIndicator containerStyle={{ marginVertical: 12 }} />
    ) : null;

  const renderEmpty = () =>
    !isLoading && (
      <Text color="gray.400" alignSelf="center">
        Lịch sử báo cá đang trống
      </Text>
    );

  const renderFooter = () =>
    isLoading && !needRefresh.current ? (
      <SmallScreenLoadingIndicator containerStyle={{ marginVertical: 12 }} />
    ) : null;

  useEffect(() => {
    return () => {
      resetCatchReportHistory();
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      getCatchReportHistoryList({ ...queryData.current }).finally(stopLoading);
    }
  }, [isLoading]);

  return (
    <Box flex={1}>
      <HeaderTab name="Lịch sử báo cá" />
      <Box w={{ base: "100%", md: "25%" }} flex={1}>
        <Modal isOpen={modalVisible} onClose={closeModal} size="full">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Chọn ngày</Modal.Header>
            <Modal.Body>
              <CalendarPicker
                startFromMonday
                months={MONTHS}
                weekdays={WEEKDAYS}
                allowRangeSelection
                onDateChange={handleDateChange}
                nextTitle={DICTIONARY.NEXT_BUTTON_LABEL}
                previousTitle={DICTIONARY.PREVIOUS_BUTTON_LABEL}
                todayBackgroundColor={DICTIONARY.TODAY_BACKGROUND_COLOR}
                selectedDayColor={DICTIONARY.SELECTED_DAY_COLOR}
                selectedDayTextColor={DICTIONARY.SELECTED_DAY_TEXT_COLOR}
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
          data={catchReportHistory}
          renderItem={memoizedRender}
          keyExtractor={KEY_EXTRACTOR}
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

export default FManageCatchReportHistory;
