import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Badge, Divider, SearchBar } from "react-native-elements";

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

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const loadMoreUserData = () => {
    getUserList({ pageNo: page, keyword: search, setIsLoading });
    setPage(page + 1);
  };

  const onClear = () => {
    setIsLoading(true);
    getUserList({ pageNo: 1, setIsLoading });
    setPage(2);
  };

  const onEndEditing = () => {
    setIsLoading(true);
    getUserList({ keyword: search, pageNo: 1, setIsLoading });
    setPage(2);
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
    if (userList) setIsLoading(false);
  }, [userList]);

  const goToAccountDetailScreen = (id) => () => {
    goToAdminAccountManagementDetailScreen(navigation, {
      id,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <PressableCustomCard onPress={goToAccountDetailScreen(item.id)}>
        <View
          style={[
            styles.flexBox,
            { justifyContent: "space-between", flexDirection: "row" },
          ]}
        >
          <View style={{ flex: 3 }}>
            <AvatarCard
              nameUser={item.name}
              subText={`SĐT: ${item.phone}`}
              image={item.image}
            />
          </View>
          <View style={[styles.centerBox, styles.flexBox]}>
            <Badge
              value={item.active ? "Hoạt động" : "Bị vô hiệu"}
              status={item.active ? "success" : "error"}
              badgeStyle={{ borderRadius: 0 }}
            />
          </View>
        </View>
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
                data={userList}
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
