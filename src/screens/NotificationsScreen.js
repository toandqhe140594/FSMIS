import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, FlatList, Text } from "native-base";
import React, { useEffect } from "react";

import PressableCustomCard from "../components/PressableCustomCard";

const NotificationsScreen = () => {
  const { notificationCurrentPage, notificationList } = useStoreState(
    (states) => states.ProfileModel,
  );

  const getNotificationList = useStoreActions(
    (actions) => actions.ProfileModel.getNotificationList,
  );

  useEffect(() => {
    if (notificationCurrentPage === 1) getNotificationList();
  }, []);

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
          renderItem={({ item }) => (
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
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => {
            getNotificationList();
          }}
        />
      </Box>
    </>
  );
};
export default NotificationsScreen;
