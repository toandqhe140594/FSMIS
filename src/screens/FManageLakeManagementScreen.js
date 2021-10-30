import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Box, Button, Center, FlatList } from "native-base";
import React from "react";

import HeaderTab from "../components/HeaderTab";
import LakeCard from "../components/LakeCard";
import { goToLakeEditScreen } from "../navigations";

const LakeListManagementScreen = () => {
  const navigation = useNavigation();
  const listOfLake = useStoreState((states) => states.FManageModel.listOfLake);

  const Separator = () => {
    return <Box h={3} />;
  };

  return (
    <Box flex={1}>
      <HeaderTab name="Quản lý hồ câu" />
      <Box flex={1} alignItems="center">
        <Center w="80%" my={5}>
          <Button
            onPress={() => {
              goToLakeEditScreen(navigation, { id: null });
            }}
          >
            Thêm hồ câu
          </Button>
        </Center>
        <Center w="80%" h="80%">
          <FlatList
            data={listOfLake}
            renderItem={({ item }) => (
              <LakeCard
                name={item.name}
                image={item.image}
                isManaged
                id={item.id}
              />
            )}
            ItemSeparatorComponent={Separator}
            keyExtractor={(item) => item.id.toString()}
            w="100%"
          />
        </Center>
      </Box>
    </Box>
  );
};

export default LakeListManagementScreen;
