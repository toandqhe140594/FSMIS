import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Box,
  Button,
  CheckIcon,
  FlatList,
  Modal,
  Select,
  Text,
} from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { goToCatchReportDetailScreen } from "../navigations";

const FManageCatchReportHistory = () => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const catchReportHistory = useStoreState(
    (states) => states.FManageModel.catchReportHistory,
  );
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

  const [modalVisible, setModalVisible] = useState(false);

  const selectedFilterHandler = (type) => {
    if (type === "BY_DATE") {
      setModalVisible(true);
    }
  };
  const submitDateFilterHandler = () => {
    dateChangeHandler();
    setModalVisible(false);
  };
  return (
    <Box>
      <HeaderTab name="Lịch sử báo cá" />
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
          accessibilityLabel="Chọn kiểu lọc"
          placeholder="Chọn kiểu lọc"
          _selectedItem={{
            bg: "teal.600",
          }}
          onValueChange={(itemValue) => selectedFilterHandler(itemValue)}
          backgroundColor="light.500"
        >
          <Select.Item label="Tất cả" value="All" />
          <Select.Item label="Theo Ngày" value="BY_DATE" />
        </Select>
        <FlatList
          data={catchReportHistory}
          renderItem={({ item }) => {
            const {
              id,
              userFullName,
              avatar,
              locationName,
              description,
              time,
              fishes,
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
                    goToCatchReportDetailScreen(navigation);
                  }}
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
                        <Text bold>Đã câu được :</Text>
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
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </Box>
  );
};

FManageCatchReportHistory.defaultProps = {
  angler: { id: "1", name: "Dat" },
};
FManageCatchReportHistory.propTypes = {
  angler: PropTypes.objectOf(PropTypes.string, PropTypes.string),
};
export default FManageCatchReportHistory;
