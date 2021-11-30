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
  const pageNo = useRef(1);
  const needRefresh = useRef(true);
  const dateRange = useRef({ startDate: null, endDate: null });
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
      // Reset lại mọi thứ khi bấm tất cả
      // Và cho loading chạy
      pageNo.current = 1;
      dateRange.current = { startDate: null, endDate: null };
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
    // So sánh pageNo với totalPage, nếu còn bé hơn thì tăng lên
    // Lúc này chỉ tăng thêm pageNo,
    // Sử dụng nguyên data startDate và endDate đã có
    // Và cho loading chạy
    if (pageNo.current < checkinHistoryTotalPage) {
      pageNo.current += 1;
      setIsLoading(true);
    }
  };

  const handleDateChange = (date, type) => {
    if (type === "END_DATE") {
      dateRange.current = { ...dateRange.current, endDate: date };
    } else {
      dateRange.current = { startDate: date, endDate: null };
    }
  };

  const handleSubmitDate = () => {
    // Đóng modal lại và đặt loading để chạy api
    // Đặt lại ngày bằng 1
    pageNo.current = 1;
    needRefresh.current = true;
    setModalVisible(false);
    setIsLoading(true);
  };

  const keyExtractor = (item, index) => index.toString();

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
      // cleanup xóa sạch list khi thoát ra
      resetCheckinHistory();
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      getCheckinHistoryList({
        pageNo: pageNo.current,
        ...dateRange.current,
      }).finally(stopLoading);
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
          renderItem={renderItem}
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
