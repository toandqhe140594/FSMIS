import { Box, FlatList, ScrollView, Text } from "native-base";
import React from "react";

import CheckInCard from "../components/CheckInCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustom from "../components/Pressable";

const AnglerCheckInHistory = () => {
  const dummyMenu = [
    { id: 1, name: "Hồ thuần việt" },
    { id: 2, name: "Hồ không thuần việt" },
    { id: 3, name: "Hồ Quản" },
  ];
  return (
    <ScrollView>
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

              // keyExtractor={(item.id) => item.index_id.toString()}
            >
              <PressableCustom paddingX="2" paddingY="1">
                <CheckInCard>
                  <Text bold fontSize="md">
                    {item.name}
                  </Text>
                </CheckInCard>
              </PressableCustom>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </ScrollView>
  );
};
export default AnglerCheckInHistory;
