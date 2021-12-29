import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Box, Button, Center, VStack } from "native-base";
import React from "react";
import { Avatar, Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import { goBack } from "../navigations";

const FManageVerifyCheckinScreen = () => {
  const navigation = useNavigation();

  const anglerCheckinOverviewInfor = useStoreState(
    (states) => states.FManageModel.anglerCheckinOverviewInfor,
  );

  const goBackToScanQRCodeScreen = () => {
    goBack(navigation);
  };

  const goToManagementScreen = () => {
    navigation.pop(2);
  };

  return (
    <Box flex={1}>
      <HeaderTab name="Thông tin" />
      <Box flex={1} alignItems="center" justifyContent="flex-end">
        <VStack space={2} alignItems="center">
          <Avatar
            rounded
            size="xlarge"
            icon={{ name: "user", type: "font-awesome" }}
            source={{
              uri: anglerCheckinOverviewInfor.avatar,
            }}
          />
          <Text style={[styles.nameTextLg]}>
            {anglerCheckinOverviewInfor.name}
          </Text>
          <Text>
            Thời gian check in: {anglerCheckinOverviewInfor.checkInTime}
          </Text>
        </VStack>
      </Box>
      <Box flex={1} />
      <Center mb={3}>
        <Button w="50%" size="md" mb={2} onPress={goBackToScanQRCodeScreen}>
          Tiếp tục
        </Button>
        <Button w="50%" size="md" onPress={goToManagementScreen}>
          Màn hình quản lý
        </Button>
      </Center>
    </Box>
  );
};

export default FManageVerifyCheckinScreen;
