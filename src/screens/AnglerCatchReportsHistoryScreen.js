import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";

import AvatarCard from "../components/AvatarCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { KEY_EXTRACTOR } from "../constants";
import { goToCatchReportDetailScreen } from "../navigations";

const AnglerCatchReportsHistoryScreen = () => {
  const navigation = useNavigation();
  // Destructure catchHistoryCurrentPage and catchReportHistory list from ProfileModel
  const { catchReportHistory } = useStoreState((states) => states.ProfileModel);
  const { getCatchReportHistory, resetCatchReportHistory } = useStoreActions(
    (actions) => actions.ProfileModel,
  );
  const [loading, setLoading] = useState(true);
  const needRefresh = useRef(false);
  const nextPage = useRef(true);

  const memoizedStyle = useMemo(
    () =>
      catchReportHistory.length > 0
        ? null
        : { flex: 1, alignItems: "center", justifyContent: "center" },
    [catchReportHistory.length > 0],
  );

  const startLoading = (shouldRefresh = true) => {
    if (shouldRefresh) needRefresh.current = true;
    setLoading(true);
  };

  const stopLoading = () => {
    if (needRefresh.current) needRefresh.current = false;
    nextPage.current = true;
    setLoading(false);
  };

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

  const renderFooter = () =>
    loading &&
    !needRefresh.current && (
      <SmallScreenLoadingIndicator containerStyle={{ marginVertical: 12 }} />
    );

  const renderEmpty = () =>
    !loading && <Text color="gray.400">Không có dữ liệu</Text>;

  const onEndReached = () => {
    startLoading(false);
  };

  const handleOnRefresh = () => {
    nextPage.current = false;
    startLoading();
  };

  useEffect(() => {
    return () => {
      resetCatchReportHistory(); // Clear list data when screen unmount
    };
  }, []);

  useEffect(() => {
    if (loading)
      getCatchReportHistory({ nextPage: nextPage.current }).finally(
        stopLoading,
      );
  }, [loading]);

  return (
    <Box flex={1}>
      <HeaderTab name="Lịch sử báo cá" />
      <Box w={{ base: "100%", md: "25%" }} flex={1}>
        <FlatList
          pt="0.5"
          data={catchReportHistory}
          renderItem={renderItem}
          keyExtractor={KEY_EXTRACTOR}
          onEndReached={onEndReached}
          onRefresh={handleOnRefresh}
          onEndReachedThreshold={0.2}
          refreshing={loading && needRefresh.current}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={memoizedStyle}
        />
      </Box>
    </Box>
  );
};

export default AnglerCatchReportsHistoryScreen;
