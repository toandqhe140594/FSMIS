import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Divider, SearchBar } from "react-native-elements";

import FishManagementCard from "../components/AdminFishManagement/FishManagementCard";
import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import FishModel from "../models/FishModel";
import { goToAdminFishEditScreen } from "../navigations";
import store from "../utilities/Store";

store.addModel("FishModel", FishModel);

const AdminFishManagementScreen = () => {
  const navigation = useNavigation();

  const fishList = useStoreState((states) => states.FishModel.fishList);
  const getFishList = useStoreActions(
    (actions) => actions.FishModel.getFishList,
  );

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedList, setDisplayedList] = useState(fishList);

  // DucHM ADD_START 18/11/2021
  const renderRow = ({ item }) => (
    <FishManagementCard
      id={item.id}
      name={item.name}
      image={item.image}
      active
    />
  );
  // DucHM ADD_END 18/11/2021

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onClear = () => {
    setDisplayedList(fishList);
  };

  const onEndEditing = () => {
    // If the list is empty
    if (!fishList) return;
    // Filter all element in the data list whose name includes search key
    const filteredList = fishList.filter((fish) =>
      fish.name.toUpperCase().includes(search.toUpperCase()),
    );
    setDisplayedList(filteredList);
  };

  useEffect(() => {
    setDisplayedList(fishList);
    if (fishList) setIsLoading(false);
  }, [fishList]);

  useEffect(() => {
    setIsLoading(true);
    getFishList();
    // Hide the activity indicator after 5 seconds aka request timeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const ListView = () => {
    if (isLoading)
      return (
        <Center flex={1}>
          <ActivityIndicator size="large" color="blue" />
        </Center>
      );

    return (
      <Box flex={1} w="100%">
        <FlatList
          data={displayedList}
          renderItem={renderRow}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={Divider}
        />
      </Box>
    );
  };

  return (
    <>
      <HeaderTab name="Quản lý loại cá" />
      <Center flex={1} alignItems="center">
        <Box w="100%" alignItems="center" flex={1}>
          <SearchBar
            placeholder="Tìm kiếm theo tên"
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchBar}
            lightTheme
            blurOnSubmit
            onEndEditing={onEndEditing}
            onClear={onClear}
          />
          <Button
            my={2}
            w="70%"
            onPress={() => {
              goToAdminFishEditScreen(navigation, { id: null });
            }}
          >
            Thêm loại cá
          </Button>

          <ListView />
        </Box>
      </Center>
    </>
  );
};

export default AdminFishManagementScreen;
