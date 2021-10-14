import { Box, FlatList, Text } from "native-base";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustom from "../components/Pressable";

const dummyMenu = [
  { id: 1, name: "Quản" },
  { id: 2, name: "Quản" },
  { id: 3, name: "Quản" },
  { id: 4, name: "Quản" },
];
const AnglerCatchReportsHistory = () => {
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
          data={dummyMenu}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pb="1"
              // keyExtractor={(item.id) => item.index_id.toString()}
            >
              <PressableCustom paddingX="3" paddingY="1">
                <Box pl="2">
                  <AvatarCard avatarSize="md" name={item.name} />
                  <Box mt={2}>
                    <Text italic>"Ngôi cả sáng"</Text>
                    <Text>
                      <Text bold>Đã câu được :</Text>
                      cá chép, cá quả
                    </Text>
                  </Box>
                </Box>
              </PressableCustom>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </Box>
  );
};
export default AnglerCatchReportsHistory;
