import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center, Divider } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import styles from "../config/styles";
import { goToAdminAccountManagementDetailScreen } from "../navigations";

const AdminAccountManagementScreen = () => {
  const navigation = useNavigation();

  const userList = useStoreState(
    (states) => states.AccountManagementModel.userList,
  );
  const { setUserList, getUserList } = useStoreActions(
    (actions) => actions.AccountManagementModel,
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
    setDisplayedList(userList);
    if (userList) setIsLoading(false);
  }, [userList]);

  useEffect(() => {
    getUserList({ pageNo: 1 });
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Test
    return () => {
      clearTimeout(loadingTimeout);
      setUserList([]);
    };
  }, []);

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

          <Box w="90%">
            <FlatList
              data={displayedList}
              renderItem={({ item }) => (
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
              )}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={Divider}
              onEndReached={() => {
                loadMoreUserData();
              }}
            />
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default AdminAccountManagementScreen;
