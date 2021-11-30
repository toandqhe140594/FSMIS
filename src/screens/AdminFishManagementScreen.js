import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Divider, SearchBar } from "react-native-elements";

import FishManagementCard from "../components/AdminFishManagement/FishManagementCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import { DEFAULT_TIMEOUT, KEY_EXTRACTOR } from "../constants";
import FishModel from "../models/FishModel";
import { goToAdminFishEditScreen } from "../navigations";
import store from "../utilities/Store";

store.addModel("FishModel", FishModel);

const ListView = React.memo(({ data }) => {
  const renderRow = ({ item }) => (
    <FishManagementCard
      id={item.id}
      name={item.name}
      image={item.image}
      active={item.active}
    />
  );
  return (
    <FlatList
      style={{ width: "100%" }}
      data={data}
      renderItem={renderRow}
      keyExtractor={KEY_EXTRACTOR}
      ItemSeparatorComponent={Divider}
    />
  );
});

ListView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const AdminFishManagementScreen = () => {
  const navigation = useNavigation();

  const adminFishList = useStoreState(
    (states) => states.FishModel.adminFishList,
  );
  const getAdminFishList = useStoreActions(
    (actions) => actions.FishModel.getAdminFishList,
  );

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedList, setDisplayedList] = useState(adminFishList);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onClear = () => {
    setDisplayedList(adminFishList);
  };

  const onEndEditing = () => {
    // If the list is empty
    if (!adminFishList) return;
    // Filter all element in the data list whose name includes search key
    const filteredList = adminFishList.filter((fish) =>
      fish.name.toUpperCase().includes(search.toUpperCase()),
    );
    setDisplayedList(filteredList);
  };

  useEffect(() => {
    setDisplayedList(adminFishList);
    if (adminFishList) setIsLoading(false);
  }, [adminFishList]);

  useEffect(() => {
    setIsLoading(true);
    getAdminFishList();
    // Hide the activity indicator after 10 seconds aka request timeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, DEFAULT_TIMEOUT);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const navigateToAddFishScreen = () => {
    goToAdminFishEditScreen(navigation, { id: null });
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
          <Button my={2} w="70%" onPress={navigateToAddFishScreen}>
            Thêm loại cá
          </Button>

          {isLoading ? (
            <SmallScreenLoadingIndicator />
          ) : (
            <ListView data={displayedList} />
          )}
        </Box>
      </Center>
    </>
  );
};

export default AdminFishManagementScreen;
