import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Divider, SearchBar } from "react-native-elements";

import FishingMethodManagementCard from "../components/AdminMethodManagement/FishingMethodManagementCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import { DEFAULT_TIMEOUT, KEY_EXTRACTOR } from "../constants";
import FishingMethodModel from "../models/FishingMethodModel";
import { goToAdminFishingMethodEditScreen } from "../navigations";
import store from "../utilities/Store";

store.addModel("FishingMethodModel", FishingMethodModel);

const ListView = React.memo(({ data }) => {
  const renderRow = ({ item }) => (
    <FishingMethodManagementCard
      id={item.id}
      name={item.name}
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

const AdminFishingMethodManagementScreen = () => {
  const navigation = useNavigation();

  const adminFishingMethodList = useStoreState(
    (states) => states.FishingMethodModel.adminFishingMethodList,
  );
  const getAdminFishingMethodList = useStoreActions(
    (actions) => actions.FishingMethodModel.getAdminFishingMethodList,
  );

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedList, setDisplayedList] = useState(adminFishingMethodList);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onClear = () => {
    setDisplayedList(adminFishingMethodList);
  };

  const onEndEditing = () => {
    // If the list is empty
    if (!adminFishingMethodList) return;
    // Filter all element in the data list whose name includes search key
    const filteredList = adminFishingMethodList.filter((method) =>
      method.name.toUpperCase().includes(search.toUpperCase()),
    );
    setDisplayedList(filteredList);
  };

  useEffect(() => {
    getAdminFishingMethodList();
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, DEFAULT_TIMEOUT);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    setDisplayedList(adminFishingMethodList);
    if (adminFishingMethodList) setIsLoading(false);
  }, [adminFishingMethodList]);

  const goToAddFishingMethodScreen = () => {
    goToAdminFishingMethodEditScreen(navigation, {
      id: null,
      name: null,
    });
  };

  return (
    <>
      <HeaderTab name="Quản lý loại hình câu" />
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
          <Button my={2} w="70%" onPress={goToAddFishingMethodScreen}>
            Thêm loại hình câu
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

export default AdminFishingMethodManagementScreen;
