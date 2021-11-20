import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Divider } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { goToAdminFLocationSuggestedDetailScreen } from "../navigations";

const keyExtractor = (item) => item.phone.toString();

const AdminSuggestedLocationManagementScreen = () => {
  const navigation = useNavigation();
  const suggestedLocationList = useStoreState(
    (states) => states.AdminFLocationModel.suggestedLocationList,
  );
  const getSuggestedLocationList = useStoreActions(
    (actions) => actions.AdminFLocationModel.getSuggestedLocationList,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [displayedList, setDisplayedList] = useState(suggestedLocationList);

  useEffect(() => {
    if (suggestedLocationList) {
      setDisplayedList(suggestedLocationList);
      setIsLoading(false);
    }
    if (suggestedLocationList === null) setIsLoading(false);
  }, [suggestedLocationList]);

  useEffect(() => {
    getSuggestedLocationList();
    setIsLoading(true);
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // Test
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const goToDetailScreenAction = (item) => () => {
    goToAdminFLocationSuggestedDetailScreen(navigation, {
      ...item,
    });
  };

  const renderItem = ({ item }) => (
    <PressableCustomCard onPress={goToDetailScreenAction(item)}>
      <Box py={2} px={3} flex={1} justifyContent="center">
        <Text bold fontSize="lg">
          {item.name}
        </Text>
        <Text flex={1} isTruncated numberOfLines={1}>
          Điện thoại chủ hồ: {item.phone}
        </Text>
      </Box>
    </PressableCustomCard>
  );

  const ListView = () => {
    if (isLoading)
      return (
        <>
          <Center flex={1}>
            <ActivityIndicator size="large" color="blue" />
          </Center>
        </>
      );
    if (suggestedLocationList === null || suggestedLocationList.length === 0)
      return (
        <Center flex={1}>
          <Text>Không có dữ liệu</Text>
        </Center>
      );

    return (
      <Box w="90%" flex={1} mb={12}>
        <FlatList
          data={displayedList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Divider}
        />
      </Box>
    );
  };

  return (
    <>
      <HeaderTab name="Danh sách" />
      <Center flex={1}>
        <Box w="100%" alignItems="center" flex={1}>
          <ListView />
        </Box>
      </Center>
    </>
  );
};

export default AdminSuggestedLocationManagementScreen;
