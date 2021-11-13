import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
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

  const goToAccountDetailScreen = (id) => () => {
    goToAdminAccountManagementDetailScreen(navigation, {
      id,
    });
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

  const renderItem = ({ item }) => {
    return (
      <PressableCustomCard onPress={goToAccountDetailScreen(item.id)}>
        <AvatarCard
          nameUser={item.name}
          subText={`SĐT: ${item.phone}`}
          image={item.image}
        />
      </PressableCustomCard>
    );
  };

  const keyExtractor = (item) => item.id.toString();

  return (
    <>
      <HeaderTab name="Quản lý tài khoản" />
      <View style={styles.flexBox}>
        <View style={[styles.flexBox, styles.wfull, { alignItems: "center" }]}>
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

          {isLoading ? (
            <View style={styles.centerBox}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          ) : (
            <View style={[styles.flexBox, { width: "90%" }]}>
              <FlatList
                data={displayedList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={Divider}
                onEndReached={loadMoreUserData}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default AdminAccountManagementScreen;
