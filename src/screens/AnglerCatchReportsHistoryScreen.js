import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { goToCatchReportDetailScreen } from "../navigations";

const AnglerCatchReportsHistoryScreen = () => {
  const catchReportHistoryList = useStoreState(
    (state) => state.ProfileModel.catchReportHistoryList,
  );
  console.log(`catchReportHistoryList`, catchReportHistoryList);
  const navigation = useNavigation();
  const dummyMenu = [
    { id: 1, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 2, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 3, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
  ];

  return (
    <Box>
      <HeaderTab name="Lịch sử báo cá" />
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <FlatList
          pt="0.5"
          data={catchReportHistoryList}
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
                  goToCatchReportDetailScreen(navigation);
                }}
              >
                <Box pl="2" pb="1">
                  <AvatarCard avatarSize="md" nameUser={item.name} />
                  <Box mt={2}>
                    <Text italic>{item.message}</Text>
                    <Text>
                      <Text bold>Đã câu được :</Text>
                      {item.catch}
                    </Text>
                  </Box>
                </Box>
              </PressableCustomCard>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </Box>
  );
};

// AnglerCatchReportsHistoryScreen.defaultProps = {
//   angler: { id: "1", name: "Dat" },
// };
// AnglerCatchReportsHistoryScreen.propTypes = {
//   angler: PropTypes.objectOf(PropTypes.string, PropTypes.string),
// };
export default AnglerCatchReportsHistoryScreen;
