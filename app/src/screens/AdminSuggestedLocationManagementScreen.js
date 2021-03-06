import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Divider } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";

import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { DEFAULT_TIMEOUT } from "../constants";
import { goToAdminFLocationSuggestedDetailScreen } from "../navigations";

const keyExtractor = (item, index) => item.phone.toString() + index.toString();

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
    }, DEFAULT_TIMEOUT);
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
          ??i???n tho???i ch??? h???: {item.phone}
        </Text>
        {item.helpful && (
          <Icon
            type="antdesign"
            name="check"
            color="green"
            containerStyle={{
              position: "absolute",
              right: 18,
            }}
          />
        )}
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
          <Text>Kh??ng c?? d??? li???u</Text>
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
      <HeaderTab name="Danh s??ch" />
      <Center flex={1}>
        <Box w="100%" alignItems="center" flex={1}>
          <ListView />
        </Box>
      </Center>
    </>
  );
};

export default AdminSuggestedLocationManagementScreen;
