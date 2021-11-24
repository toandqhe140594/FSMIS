import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, VStack } from "native-base";
import React, { useEffect } from "react";

import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";
import { MENU_ANGLER, MENU_LOGOUT } from "../constants";
import AddressModel from "../models/AddressModel";
import store from "../utilities/Store";

store.addModel("AddressModel", AddressModel);

const AnglerProfileScreen = () => {
  const getUserInfo = useStoreActions(
    (actions) => actions.ProfileModel.getUserInfo,
  );

  const userInfo = useStoreState((state) => state.ProfileModel.userInfo);

  useEffect(() => {
    getUserInfo();
  }, []);

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
        <AvatarCard
          avatarSize="xl"
          nameFontSize="21"
          subText={`Số lần báo cá: ${userInfo.catchesCount} lần`}
          nameUser={userInfo.fullName}
          image={userInfo.avatarUrl}
        />
      </VStack>
      <Box maxHeight="80%">
        <VStack mt="2">
          <MenuScreen menuListItem={MENU_ANGLER} />
          <MenuScreen menuListItem={MENU_LOGOUT} />
        </VStack>
      </Box>
    </Box>
  );
};

export default AnglerProfileScreen;
