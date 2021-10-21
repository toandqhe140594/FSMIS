import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import React, { useEffect } from "react";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { goToCatchReportDetailScreen } from "../navigations";

const AnglerCatchReportsHistoryScreen = () => {
  const getCatchReportHistory = useStoreActions(
    (state) => state.ProfileModel.getCatchReportHistory,
  );
  const catchReportHistory = useStoreState(
    (state) => state.ProfileModel.catchReportHistory,
  );

  useEffect(() => {
    getCatchReportHistory();
  }, [catchReportHistory, getCatchReportHistory]);

  const navigation = useNavigation();
  console.log(catchReportHistory);
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
                      id: item.catchId,
                    });
                  }}
                >
                  <Box pl="2" pb="1">
                    <AvatarCard
                      avatarSize="md"
                      nameUser={item.userFullName}
                      subText={item.locationName}
                    />
                    <Box mt={2}>
                      <Text italic>{item.description}</Text>
                    </Box>
                  </Box>
                </PressableCustomCard>
              </Box>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </Box>
    </Box>
  );
};

export default AnglerCatchReportsHistoryScreen;
