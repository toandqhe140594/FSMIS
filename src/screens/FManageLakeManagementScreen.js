import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Box, Button, Center, FlatList } from "native-base";
import React, { useMemo } from "react";
import { Text } from "react-native";

import HeaderTab from "../components/HeaderTab";
import LakeCard from "../components/LakeCard";
import { goToFManageLakeAddNewScreen } from "../navigations";

const LakeListManagementScreen = () => {
  const navigation = useNavigation();
  const listOfLake = useStoreState((states) => states.FManageModel.listOfLake);

  const memoizedStyle = useMemo(
    () =>
      listOfLake && listOfLake.length > 0
        ? null
        : { flex: 1, justifyContent: "center" },
    [listOfLake && listOfLake.length > 0],
  );

  const Separator = () => {
    return <Box h={3} />;
  };

  const renderItem = ({ item }) => (
    <LakeCard name={item.name} image={item.image} isManaged id={item.id} />
  );

  const renderEmpty = () => (
    <Text style={{ color: "gray", alignSelf: "center" }}>
      Điểm câu chưa có hồ nào
    </Text>
  );

  const keyExtractor = (item) => item.id.toString();

  const addNewLakeAction = () => {
    goToFManageLakeAddNewScreen(navigation);
  };

  return (
    <Box flex={1}>
      <HeaderTab name="Quản lý hồ câu" />
      <Box flex={1} alignItems="center">
        <Center w="80%" my={5}>
          <Button onPress={addNewLakeAction}>Thêm hồ câu</Button>
        </Center>
        <Center w="80%" h="80%">
          <FlatList
            w="100%"
            data={listOfLake}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={renderEmpty}
            ItemSeparatorComponent={Separator}
            contentContainerStyle={memoizedStyle}
          />
        </Center>
      </Box>
    </Box>
  );
};

export default LakeListManagementScreen;
