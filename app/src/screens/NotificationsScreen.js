import { useFocusEffect } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import PressableCustomCard from "../components/PressableCustomCard";
import { KEY_EXTRACTOR } from "../constants";

const NotificationsScreen = () => {
  const notificationList = useStoreState(
    (states) => states.ProfileModel.notificationList,
  );

  const getNotificationList = useStoreActions(
    (actions) => actions.ProfileModel.getNotificationList,
  );
  const getNotificationListOverwrite = useStoreActions(
    (actions) => actions.ProfileModel.getNotificationListOverwrite,
  );

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    // useCallback will call when navigate back to screen
    useCallback(() => {
      getNotificationListOverwrite()
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []),
  );

  const renderItem = ({ item }) => (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
    >
      <PressableCustomCard paddingX="2" paddingY="1">
        <Box pl={5} py={3}>
          <Text numberOfLines={2} mb={1} isTruncated>
            {item.description}
          </Text>
          <Text>{item.time}</Text>
        </Box>
      </PressableCustomCard>
    </Box>
  );

  const onEndReached = () => {
    getNotificationList();
  };

  const ListEmptyComponent = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Không có dữ liệu</Text>
      </View>
    );
  };

  if (loading) return <SmallScreenLoadingIndicator />;

  return (
    <>
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <FlatList
          data={notificationList}
          renderItem={renderItem}
          keyExtractor={KEY_EXTRACTOR}
          onEndReached={onEndReached}
          ListEmptyComponent={ListEmptyComponent}
        />
      </Box>
    </>
  );
};
export default NotificationsScreen;
