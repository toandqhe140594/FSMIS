import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, Divider, Text } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";

const BlacklistPhoneComponent = ({ phone, description }) => {
  return (
    <PressableCustomCard onPress={() => {}}>
      <Box py={2} px={3} flex={1} flexDir="row">
        <Box flex={2} justifyContent="center">
          <Text bold fontSize="lg">
            {phone}
          </Text>
          {description ? (
            <Text flex={1} isTruncated numberOfLines={1}>
              {description}{" "}
            </Text>
          ) : (
            <></>
          )}
        </Box>
        <Box justifyContent="center">
          <Button>Xóa</Button>
        </Box>
      </Box>
    </PressableCustomCard>
  );
};
BlacklistPhoneComponent.propTypes = {
  phone: PropTypes.string.isRequired,
  description: PropTypes.string,
};
BlacklistPhoneComponent.defaultProps = {
  description: "",
};

const renderItem = ({ item }) => (
  <BlacklistPhoneComponent phone={item.phone} description={item.description} />
);

const AdminAccountManagementScreen = () => {
  const blacklist = useStoreState(
    (states) => states.AccountManagementModel.blacklist,
  );
  const { setBlacklist, getBlacklist } = useStoreActions(
    (actions) => actions.AccountManagementModel,
  );

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [displayedList, setDisplayedList] = useState(blacklist);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const loadMoreUserData = () => {
    getBlacklist({ pageNo: page });
    setPage(page + 1);
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

  useEffect(() => {
    setDisplayedList(blacklist);
    if (blacklist) setIsLoading(false);
  }, [blacklist]);

  useEffect(() => {
    getBlacklist({ pageNo: 1 });
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Test
    return () => {
      clearTimeout(loadingTimeout);
      setBlacklist([]);
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
            placeholder="Nhập số điện thoại"
            onChangeText={updateSearch}
            value={search}
            containerStyle={{
              width: "100%",
              marginTop: 12,
              backgroundColor: "white",
              paddingHorizontal: 12,
            }}
            lightTheme
            blurOnSubmit
            onEndEditing={onEndEditing}
            onClear={onClear}
          />
          <Button size="lg" my={3}>
            Chặn số điện thoại
          </Button>

          <Box w="90%">
            <FlatList
              data={displayedList}
              renderItem={renderItem}
              keyExtractor={(item) => item.phone.toString()}
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
