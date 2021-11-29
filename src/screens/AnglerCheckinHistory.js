import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList } from "native-base";
import React, { useEffect } from "react";
import { Text } from "react-native-elements";

import CheckInCard from "../components/CheckInCard";
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

  useEffect(() => {
    // If the current page = 1 aka the list is empty then call api to init the list
    if (checkinHistoryCurrentPage === 1) getCheckinHistoryList();
    return () => {
      resetCheckinHistory(); // Clear list data when screen unmount
    };
  }, []);

  const onEndReached = () => {
    getCheckinHistoryList();
  };

  return (
    <>
      <HeaderTab name="Lịch sử Check-in" />
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
        pb="10%"
      >
        {checkinHistoryList && (
          <FlatList
            data={checkinHistoryList}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                py={2}
                pl={3}
              >
                <PressableCustomCard paddingX="2" paddingY="1">
                  <CheckInCard
                    timeIn={item.checkInTime}
                    timeOut={item.checkOutTime}
                  >
                    <Text style={[styles.boldText, styles.mdText]}>
                      {item.locationName}
                    </Text>
                  </CheckInCard>
                </PressableCustomCard>
              </Box>
            )}
            keyExtractor={KEY_EXTRACTOR}
            onEndReached={onEndReached}
          />
        )}
      </Box>
    </>
  );
};
export default AnglerCheckInHistory;
