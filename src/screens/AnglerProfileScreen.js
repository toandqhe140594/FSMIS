import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, VStack, Spacer } from "native-base";
import MenuScreen from "../components/MenuScreen";
import AvatarCard from "../components/AvatarCard";
const AnglerProfileScreen = () => {
  const dummyMenu = [
    { key: "1", id: 1, text: "Quản lý điểm câu" },
    { key: "2", id: 2, text: "Quản lý nhân viên" },
    { key: "3", id: 2, text: "Quản lý hồ câu" },
  ];
  return (
    <SafeAreaView>
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
          <AvatarCard avatarSize="xl" name="Thanh" />
        </VStack>

        <VStack>
          <MenuScreen menuListItem={dummyMenu} />
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default AnglerProfileScreen;
