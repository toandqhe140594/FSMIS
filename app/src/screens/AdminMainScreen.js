import { Box, VStack } from "native-base";
import React from "react";
import { Image } from "react-native";

import DefaultImage from "../assets/images/admin-image.png";
import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";
import colors from "../config/colors";
import { MENU_ADMIN, MENU_LOGOUT } from "../constants";

const DEFAULT_IMAGE = Image.resolveAssetSource(DefaultImage).uri;
const AdminMainScreen = () => {
  return (
    <>
      <Box bg={colors.defaultBackground}>
        <Box pl="4" pt="2">
          <AvatarCard
            avatarSize="xl"
            nameFontSize="21"
            nameUser="Admin"
            image={DEFAULT_IMAGE}
          />
        </Box>
        <VStack>
          <MenuScreen menuListItem={MENU_ADMIN} />
          <MenuScreen menuListItem={MENU_LOGOUT} />
        </VStack>
      </Box>
    </>
  );
};

export default AdminMainScreen;
