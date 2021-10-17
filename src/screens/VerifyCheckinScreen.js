import { Box, Button, Center, VStack } from "native-base";
import React from "react";
import { Avatar, Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";

const AddEmployeeScreen = () => {
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
              uri: "https://picsum.photos/200",
            }}
          />
          <Text style={[styles.nameTextLg]}>Đào Quốc Toản</Text>
          <Text>Thời gian check in: 9:00 15/10/2021</Text>
        </VStack>
      </Box>
      <Box flex={1} />
      <Center mb={3}>
        <Button w="50%" size="md">
          Duyệt
        </Button>
      </Center>
    </Box>
  );
};

export default AddEmployeeScreen;
