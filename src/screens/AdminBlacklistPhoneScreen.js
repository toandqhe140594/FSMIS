import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Divider, FlatList, Text } from "react-native";
import { SearchBar } from "react-native-elements";

import BlacklistPhoneCard from "../components/BlacklistPhoneCard";
import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import { DEFAULT_TIMEOUT } from "../constants";
import { goToAdminBlacklistPhoneAddScreen } from "../navigations";

const renderItem = ({ item }) => (
  <BlacklistPhoneCard
    phone={item.phone}
    description={item.description}
    image={item.image}
    key={item.phone}
  />
);

const keyExtractor = (item) => item.phone.toString();

const AdminBlacklistManagementScreen = () => {
  const navigation = useNavigation();
  const blacklist = useStoreState(
    (states) => states.AccountManagementModel.blacklist,
  );
  const getBlacklist = useStoreActions(
    (actions) => actions.AccountManagementModel.getBlacklist,
  );
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedList, setDisplayedList] = useState(blacklist);

  const memoizedStyle = useMemo(
    () =>
      blacklist && blacklist.length > 0
        ? null
        : {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
    [blacklist && blacklist.length > 0],
  );

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onClear = () => {
    setDisplayedList(blacklist);
  };

  const onEndEditing = () => {
    if (!blacklist) return;
    const filteredList = blacklist.filter((user) =>
      user.phone.includes(search),
    );
    setDisplayedList(filteredList);
  };

  const goToAddPhoneToBlacklistScreen = () => {
    goToAdminBlacklistPhoneAddScreen(navigation);
  };

  const renderFooter = () =>
    isLoading && (
      <ActivityIndicator
        style={{ marginVertical: 12 }}
        size="large"
        color="#2089DC"
      />
    );
  const renderEmtpy = () =>
    !isLoading && (
      <Text style={{ color: "gray", alignSelf: "center" }}>
        Danh sách đang trống
      </Text>
    );

  useEffect(() => {
    if (blacklist) {
      setDisplayedList(blacklist);
      setIsLoading(false);
    }
  }, [blacklist]);

  useEffect(() => {
    getBlacklist();
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, DEFAULT_TIMEOUT);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <>
      <HeaderTab name="Quản lý danh sách đen" />
      <Center flex={1}>
        <Box w="100%" alignItems="center" flex={1}>
          <SearchBar
            placeholder="Nhập số điện thoại"
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchBar}
            lightTheme
            blurOnSubmit
            onEndEditing={onEndEditing}
            onClear={onClear}
            keyboardType="numeric"
          />
          <Button size="lg" my={3} onPress={goToAddPhoneToBlacklistScreen}>
            Chặn số điện thoại
          </Button>
          <Box w="90%" flex={1} mb={12}>
            <FlatList
              data={displayedList}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ItemSeparatorComponent={Divider}
              ListEmptyComponent={renderEmtpy}
              ListFooterComponent={renderFooter}
              contentContainerStyle={memoizedStyle}
            />
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default AdminBlacklistManagementScreen;
