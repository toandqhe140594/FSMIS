import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import AvatarCard from "../components/AvatarCard";
import DateRangeModalSelector from "../components/common/DateRangeModalSelector";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { KEY_EXTRACTOR } from "../constants";
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

  const memoizedStyle = useMemo(
    () =>
      catchReportHistory && catchReportHistory.length > 0
        ? null
        : { flex: 1, justifyContent: "center" },
    [catchReportHistory && catchReportHistory.length > 0],
  );

  const dateChangeHandler = useCallback(
    (date, type) => {
      if (type === "END_DATE") {
        setEndDate(date);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
      setShouldReload(true);
    },
    [startDate, endDate],
  );

  const selectedFilterHandler = useCallback((type) => {
    if (type !== "BY_DATE") {
      getCatchReportHistoryOverwrite({
        startDate: null,
        endDate: null,
        status: "OVERWRITE",
      });
    }
  }, []);

  const submitDateFilterHandler = useCallback(() => {
    dateChangeHandler();
    if (shouldReload === true) {
      getCatchReportHistoryOverwrite({
        startDate: startDate ? startDate.toJSON() : null,
        endDate: endDate ? endDate.toJSON() : null,
        status: "OVERWRITE",
      });
      setShouldReload(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    getCatchReportHistoryOverwrite({
      startDate: null,
      endDate: null,
      status: "OVERWRITE",
    });
  }, []);

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

  const renderEmpty = () => (
    <Text color="gray.400" alignSelf="center">
      Lịch sử check-in đang trống
    </Text>
  );

  const onEndReached = () => {
    getCatchReportHistoryOverwrite({
      startDate: startDate ? startDate.toJSON() : null,
      endDate: endDate ? endDate.toJSON() : null,
      status: "APPEND",
    });
  };

  return (
    <Box flex={1}>
      <HeaderTab name="Lịch sử báo cá" />
      <Box w={{ base: "100%", md: "25%" }} flex={1}>
        <DateRangeModalSelector
          doExtraOnSelectValue={selectedFilterHandler}
          handleDatePickerChange={dateChangeHandler}
          onSubmitDate={submitDateFilterHandler}
        />
        <Box flex={1}>
          <FlatList
            data={catchReportHistory}
            renderItem={renderItem}
            keyExtractor={KEY_EXTRACTOR}
            onEndReached={onEndReached}
            contentContainerStyle={memoizedStyle}
            ListEmptyComponent={renderEmpty}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FManageCatchReportHistory;
