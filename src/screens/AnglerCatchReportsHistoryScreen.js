import { Box, FlatList, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";

const AnglerCatchReportsHistoryScreen = ({ angler }) => {
  const dummyMenu = [
    { id: 1, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 2, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 3, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
  ];

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
              <PressableCustomCard paddingX="3" paddingY="1">
                <Box pl="2">
                  <AvatarCard avatarSize="md" nameUser={angler.name} />
                  <Box mt={2}>
                    <Text italic>{item.message}</Text>
                    <Text>
                      <Text bold>Đã câu được :</Text>
                      {item.caches}
                    </Text>
                  </Box>
                </Box>
              </PressableCustomCard>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </Box>
  );
};

AnglerCatchReportsHistoryScreen.defaultProps = {
  angler: { id: "1", name: "Dat" },
};
AnglerCatchReportsHistoryScreen.propTypes = {
  angler: PropTypes.objectOf(PropTypes.string, PropTypes.string),
};
export default AnglerCatchReportsHistoryScreen;
