import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import React, { useEffect } from "react";

import CheckInCard from "../components/CheckInCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";

const AnglerCheckInHistory = () => {
  const getCheckinHistoryList = useStoreActions(
    (actions) => actions.ProfileModel.getCheckinHistoryList,
  );

  // Destructure checkinHistoryCurrentPage and checkinReportHistory list from ProfileModel
  const { checkinHistoryCurrentPage, checkinHistoryList } = useStoreState(
    (states) => states.ProfileModel,
  );

  useEffect(() => {
    // If the current page = 1 aka the list is empty then call api to init the list
    if (checkinHistoryCurrentPage === 1) getCheckinHistoryList();
  }, []);

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
                    timeOut={item.checkoutTime}
                  >
                    <Text bold fontSize="md">
                      {item.locationName}
                    </Text>
                  </CheckInCard>
                </PressableCustomCard>
              </Box>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </Box>
    </>
  );
};
export default AnglerCheckInHistory;
