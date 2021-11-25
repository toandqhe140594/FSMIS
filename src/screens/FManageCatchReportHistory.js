import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, FlatList, Modal, Select, Text } from "native-base";
import React, { useEffect, useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { goToCatchReportDetailScreen } from "../navigations";

const FManageCatchReportHistory = () => {
  const navigation = useNavigation();

  const catchReportHistory = useStoreState(
    (states) => states.FManageModel.catchReportHistory,
  );

  const { getCatchReportHistoryOverwrite } = useStoreActions(
    (actions) => actions.FManageModel,
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [shouldReload, setShouldReload] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dateChangeHandler = (date, type) => {
    if (type === "END_DATE") {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
    setShouldReload(true);
  };

  const selectedFilterHandler = (type) => {
    if (type === "BY_DATE") {
      setModalVisible(true);
    } else {
      getCatchReportHistoryOverwrite({
        startDate: null,
        endDate: null,
        status: "OVERWRITE",
      });
    }
  };

  const submitDateFilterHandler = () => {
    dateChangeHandler();
    if (shouldReload === true) {
      getCatchReportHistoryOverwrite({
        startDate: startDate ? startDate.toJSON() : null,
        endDate: endDate ? endDate.toJSON() : null,
        status: "OVERWRITE",
      });
      setShouldReload(false);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    getCatchReportHistoryOverwrite({
      startDate: null,
      endDate: null,
      status: "OVERWRITE",
    });
  }, []);

  return (
    <Box flex={1}>
      <HeaderTab name="Lịch sử báo cá" />
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
        flex={1}
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
                todayBackgroundColor="#00e673"
                selectedDayColor="#00ccff"
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
          accessibilityLabel="Chọn kiểu lọc"
          placeholder="Chọn kiểu lọc"
          _selectedItem={{
            bg: "primary.200",
          }}
          onValueChange={(itemValue) => selectedFilterHandler(itemValue)}
          backgroundColor="#ffffff"
        >
          <Select.Item label="Tất cả" value="All" />
          <Select.Item label="Theo Ngày" value="BY_DATE" />
        </Select>
        <Box flex={1}>
          <FlatList
            data={catchReportHistory}
            renderItem={({ item }) => {
              const {
                userFullName,
                avatar,
                description,
                time,
                fishes,
                approved,
              } = item;
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
                    onPress={() => {
                      goToCatchReportDetailScreen(navigation, { id: item.id });
                    }}
                  >
                    <Box pl="2">
                      <AvatarCard
                        avatarSize="md"
                        nameUser={userFullName}
                        image={avatar}
                        subText={time}
                        watermarkType={approved}
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
            }}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => {
              getCatchReportHistoryOverwrite({
                startDate: startDate ? startDate.toJSON() : null,
                endDate: endDate ? endDate.toJSON() : null,
                status: "APPEND",
              });
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FManageCatchReportHistory;
