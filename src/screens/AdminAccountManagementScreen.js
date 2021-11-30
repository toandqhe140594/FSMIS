import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Badge, Divider, SearchBar } from "react-native-elements";

import AvatarCard from "../components/AvatarCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import styles from "../config/styles";
import { DEFAULT_TIMEOUT, KEY_EXTRACTOR } from "../constants";
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
  const [firstPageLastItemView, setFirstPageLastItemView] = useState(-1);

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
              image={item.avatar}
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

  const onViewRef = React.useRef((viewableItems) => {
    const foundIndex = viewableItems.changed.findIndex(
      (item) => item.index === 9,
    );
    if (firstPageLastItemView !== null && foundIndex !== -1) {
      setFirstPageLastItemView(foundIndex);
    }
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  useEffect(() => {
    getUserList({ pageNo: 1, setIsLoading });
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, DEFAULT_TIMEOUT);
    return () => {
      clearTimeout(loadingTimeout);
      clearAccountList();
    };
  }, []);

  const ListView = () => {
    return (
      <FlatList
        style={{ width: "90%" }}
        data={userList}
        renderItem={renderItem}
        keyExtractor={KEY_EXTRACTOR}
        ItemSeparatorComponent={Divider}
        onEndReached={loadMoreUserData}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        onEndReachedThreshold={0.1}
      />
    );
  };

  useEffect(() => {
    if (userList) setIsLoading(false);
  }, [userList]);

  useEffect(() => {
    if (firstPageLastItemView === null) return;
    if (firstPageLastItemView !== -1 && page === 2) {
      getUserList({ pageNo: 2, keyword: search, setIsLoading });
      setPage(3);
      setFirstPageLastItemView(null);
    }
  }, [firstPageLastItemView]);

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

          {isLoading ? <SmallScreenLoadingIndicator /> : <ListView />}
        </View>
      </View>
    </>
  );
};

export default AdminAccountManagementScreen;
