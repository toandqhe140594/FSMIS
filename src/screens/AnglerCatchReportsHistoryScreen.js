import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center, FlatList, Text } from "native-base";
import React, { useEffect, useState } from "react";

import AvatarCard from "../components/AvatarCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { KEY_EXTRACTOR } from "../constants";
import { goToCatchReportDetailScreen } from "../navigations";

const AnglerCatchReportsHistoryScreen = () => {
  const navigation = useNavigation();
  // Destructure catchHistoryCurrentPage and catchReportHistory list from ProfileModel
  const { catchHistoryCurrentPage, catchReportHistory } = useStoreState(
    (states) => states.ProfileModel,
  );
  const { getCatchReportHistory, resetCatchReportHistory } = useStoreActions(
    (actions) => actions.ProfileModel,
  );

  const [loading, setLoading] = useState(true);

  const stopLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    // If the current page = 1 aka the list is empty then call api to init the list
    if (catchHistoryCurrentPage === 1)
      getCatchReportHistory().finally(stopLoading);
    return () => {
      resetCatchReportHistory(); // Clear list data when screen unmount
    };
  }, []);

  const viewCatchReportDetail = (id) => () => {
    goToCatchReportDetailScreen(navigation, {
      id,
    });
  };

  const renderItem = ({ item }) => (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
      backgroundColor="white"
      mb="0.5"
    >
      <PressableCustomCard
        paddingX="3"
        onPress={viewCatchReportDetail(item.id)}
      >
        <Box pl="2" pb="1">
          <AvatarCard
            avatarSize="md"
            nameUser={item.userFullName}
            subText={item.locationName}
            image={item.avatar}
            watermarkType={item.approved}
          />
          <Box>
            <Text numberOfLines={1} isTruncated>
              {item.time}
            </Text>
            <Text numberOfLines={1} isTruncated>
              <Text bold>Đã câu được: </Text>
              {item.fishes.join(", ").toString()}
            </Text>
          </Box>
        </Box>
      </PressableCustomCard>
    </Box>
  );

  const onEndReached = () => {
    getCatchReportHistory();
  };

  if (loading)
    return (
      <Box flex={1}>
        <HeaderTab name="Lịch sử báo cá" />
        <SmallScreenLoadingIndicator />
      </Box>
    );

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
        {catchReportHistory.length > 0 ? (
          <FlatList
            pt="0.5"
            data={catchReportHistory}
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

export default AnglerCatchReportsHistoryScreen;
