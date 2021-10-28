import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import React, { useEffect } from "react";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { goToCatchReportDetailScreen } from "../navigations";

const AnglerCatchReportsHistoryScreen = () => {
  const navigation = useNavigation();
  const getCatchReportHistory = useStoreActions(
    (actions) => actions.ProfileModel.getCatchReportHistory,
  );

  // Destructure catchHistoryCurrentPage and catchReportHistory list from ProfileModel
  const { catchHistoryCurrentPage, catchReportHistory } = useStoreState(
    (states) => states.ProfileModel,
  );
  useEffect(() => {
    // If the current page = 1 aka the list is empty then call api to init the list
    if (catchHistoryCurrentPage === 1) getCatchReportHistory();
  }, []);
  return (
    <Box>
      <HeaderTab name="Lịch sử báo cá" />
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        {catchReportHistory.length !== 0 && (
          <FlatList
            pt="0.5"
            data={catchReportHistory}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                backgroundColor="white"
                mb="0.5"
                // keyExtractor={(item.id) => item.index_id.toString()}
              >
                <PressableCustomCard
                  paddingX="3"
                  onPress={() => {
                    goToCatchReportDetailScreen(navigation, {
                      id: item.id,
                    });
                  }}
                >
                  <Box pl="2" pb="1">
                    <AvatarCard
                      avatarSize="md"
                      nameUser={item.userFullName}
                      subText={item.locationName}
                      image={item.avatar}
                    />
                    <Box mt={2}>
                      <Text italic>{item.description}</Text>
                    </Box>
                  </Box>
                </PressableCustomCard>
              </Box>
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
              getCatchReportHistory(0);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default AnglerCatchReportsHistoryScreen;