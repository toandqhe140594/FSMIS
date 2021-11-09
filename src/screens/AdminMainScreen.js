import { Box, VStack } from "native-base";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";
import { MENU_ADMIN, MENU_LOGOUT } from "../constants";

const AdminMainScreen = () => {
  return (
    <Box>
      <VStack
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        pt="2"
      >
        <AvatarCard avatarSize="xl" nameFontSize="21" nameUser="Admin" />
      </VStack>
      <Box maxHeight="80%">
        <VStack mt="4">
          <MenuScreen menuListItem={MENU_ADMIN} />
          <MenuScreen menuListItem={MENU_LOGOUT} />
        </VStack>
      </Box>
    </Box>
  );
};

export default AdminMainScreen;
