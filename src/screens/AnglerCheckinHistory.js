import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center, FlatList } from "native-base";
import React, { useEffect, useState } from "react";
import { Text } from "react-native-elements";

import CheckInCard from "../components/CheckInCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import styles from "../config/styles";
import { KEY_EXTRACTOR } from "../constants";

const AnglerCheckInHistory = () => {
  // Destructure checkinHistoryCurrentPage and checkinReportHistory list from ProfileModel
  const { checkinHistoryCurrentPage, checkinHistoryList } = useStoreState(
    (states) => states.ProfileModel,
  );
  const { getCheckinHistoryList, resetCheckinHistory } = useStoreActions(
    (actions) => actions.ProfileModel,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the current page = 1 aka the list is empty then call api to init the list
    if (checkinHistoryCurrentPage === 1)
      getCheckinHistoryList()
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    return () => {
      resetCheckinHistory(); // Clear list data when screen unmount
    };
  }, []);

  const renderItem = ({ item }) => (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
      py={2}
      px={3}
    >
      <PressableCustomCard paddingX="2" paddingY="1">
        <CheckInCard timeIn={item.checkInTime} timeOut={item.checkOutTime}>
          <Text style={[styles.boldText, styles.mdText]}>
            {item.locationName}
          </Text>
        </CheckInCard>
      </PressableCustomCard>
    </Box>
  );

  const onEndReached = () => {
    getCheckinHistoryList();
  };

  if (loading)
    return (
      <Box flex={1}>
        <HeaderTab name="Lịch sử Check-in" />
        <SmallScreenLoadingIndicator />
      </Box>
    );

  return (
    <Box flex={1}>
      <HeaderTab name="Lịch sử Check-in" />
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
        flex={1}
      >
        {checkinHistoryList.length > 0 ? (
          <FlatList
            data={checkinHistoryList}
            renderItem={renderItem}
            keyExtractor={KEY_EXTRACTOR}
            onEndReached={onEndReached}
          />
        ) : (
          <Center flex={1}>
            <Text>Không có dữ liệu</Text>
          </Center>
        )}
      </Box>
    </Box>
  );
};
export default AnglerCheckInHistory;
