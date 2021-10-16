import { Box, FlatList, Text } from "native-base";
import React from "react";

import CheckInCard from "../components/CheckInCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";

const AnglerCheckInHistory = () => {
  const dummyMenu = [
    { id: 1, name: "Hồ thuần việt" },
    { id: 2, name: "Hồ không thuần việt" },
    { id: 3, name: "Hồ Quản" },
  ];
  return (
    <>
      <HeaderTab name="Lịch sử Check-in" />
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <FlatList
          data={dummyMenu}
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
                <CheckInCard>
                  <Text bold fontSize="md">
                    {item.name}
                  </Text>
                </CheckInCard>
              </PressableCustomCard>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </>
  );
};
export default AnglerCheckInHistory;