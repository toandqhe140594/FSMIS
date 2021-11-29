import { useFocusEffect } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import React, { useCallback } from "react";

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

  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      getNotificationListOverwrite();
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
        />
      </Box>
    </>
  );
};
export default NotificationsScreen;
