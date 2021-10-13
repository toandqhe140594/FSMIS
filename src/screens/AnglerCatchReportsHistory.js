import { Box, FlatList, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";

const AnglerCatchReportsHistory = () => {
  const dummyMenu = [
    { id: 1, name: "Quản" },
    { id: 2, name: "Quản" },
    { id: 3, name: "Quản" },
  ];

  return (
    <ScrollView>
      <SafeAreaView>
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
                pl="4"
                pr="5"
                py="2"
                // keyExtractor={(item.id) => item.index_id.toString()}
              >
                <AvatarCard avatarSize="md" name={item.name} />
                <Box mt={2}>
                  <Text italic>"Ngôi cả sáng"</Text>
                  <Text>
                    <Text bold>Đã câu được :</Text>
                    cá chép, cá quả
                  </Text>
                </Box>
              </Box>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Box>
      </SafeAreaView>
    </ScrollView>
  );
};
export default AnglerCatchReportsHistory;
