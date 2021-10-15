import { Box, FlatList, Text } from "native-base";
import React from "react";

import PressableCustomCard from "../components/PressableCustomCard";

const NotificationsScreen = () => {
  const dummyNotifications = [
    { id: 1, name: "Hồ thuần việt", event: "Bồi cá", time: "09:00 01/01/2021" },
    { id: 2, name: "Hồ thuần việt", event: "Bồi cá", time: "09:00 01/01/2021" },
    { id: 3, name: "Hồ thuần việt", event: "Bồi cá", time: "09:00 01/01/2021" },
  ];
  return (
    <>
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <FlatList
          data={dummyNotifications}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
            >
              <PressableCustomCard paddingX="2" paddingY="1">
                <Text style={{ whiteSpace: "nowrap" }} mb={1}>
                  <Text bold fontSize="md">
                    {item.name}
                  </Text>{" "}
                  đã đăng lên sự kiện
                  <Text bold fontSize="md">
                    {" "}
                    {item.event}
                  </Text>
                </Text>
                <Text>{item.time}</Text>
              </PressableCustomCard>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </>
  );
};
export default NotificationsScreen;
