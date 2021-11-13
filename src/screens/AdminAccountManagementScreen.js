import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Divider, SearchBar } from "react-native-elements";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import styles from "../config/styles";
import { goToAdminAccountManagementDetailScreen } from "../navigations";

const AdminAccountManagementScreen = () => {
  const navigation = useNavigation();

  const userList = useStoreState(
    (states) => states.AccountManagementModel.accountList,
  );

  const clearAccountList = useStoreActions(
    (actions) => actions.AccountManagementModel.clearAccountList,
  );
  const getUserList = useStoreActions(
    (actions) => actions.AccountManagementModel.getAccountList,
  );

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [displayedList, setDisplayedList] = useState(userList);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const loadMoreUserData = () => {
    getUserList({ pageNo: page });
    setPage(page + 1);
  };

  const onClear = () => {
    setDisplayedList(userList);
  };

  const onEndEditing = () => {
    if (!userList) return;
    const filteredList = userList.filter(
      (user) =>
        user.name.toUpperCase().includes(search.toUpperCase()) ||
        user.phone.includes(search),
    );
    setDisplayedList(filteredList);
  };

  useEffect(() => {
    getUserList({ pageNo: 1, setIsLoading });
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Test
    return () => {
      clearTimeout(loadingTimeout);
      clearAccountList();
    };
  }, []);

  useEffect(() => {
    setDisplayedList(userList);
    if (userList) setIsLoading(false);
  }, [userList]);

  const renderItem = ({ item }) => (
    <PressableCustomCard
      onPress={() => {
        goToAdminAccountManagementDetailScreen(navigation, {
          id: item.id,
        });
      }}
    >
      <AvatarCard
        nameUser={item.name}
        subText={`SĐT: ${item.phone}`}
        image={item.image}
      />
    </PressableCustomCard>
  );

  const keyExtractor = (item) => item.id.toString();

  if (isLoading)
    return (
      <Center flex={1}>
        <ActivityIndicator size="large" color="blue" />
      </Center>
    );

  return (
    <>
      <HeaderTab name="Quản lý tài khoản" />
      <Center flex={1} alignItems="center">
        <Box w="100%" alignItems="center" flex={1}>
          <SearchBar
            placeholder="Nhập tên hoặc số điện thoại"
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchBar}
            lightTheme
            blurOnSubmit
            onEndEditing={onEndEditing}
            onClear={onClear}
          />

          <Box w="90%" flex={1}>
            <FlatList
              data={displayedList}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ItemSeparatorComponent={Divider}
              onEndReached={loadMoreUserData}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default AdminAccountManagementScreen;
