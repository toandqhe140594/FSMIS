import { Box, VStack } from "native-base";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";

const AnglerProfileScreen = () => {
  const dummyMenu = [
    { key: "1", id: 1, text: "Quản lý điểm câu" },
    { key: "2", id: 2, text: "Quản lý nhân viên" },
    { key: "3", id: 2, text: "Quản lý hồ câu" },
  ];
  return (
    <Box>
      <VStack
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        py="2"
        mb="4"
      >
        <AvatarCard
          avatarSize="xl"
          name="Thanh"
          subText="Số lượng lên cần :99"
        />
      </VStack>

      <VStack>
        <MenuScreen menuListItem={dummyMenu} />
      </VStack>
    </Box>
  
  );
};

export default AnglerProfileScreen;
