import { useStoreActions, useStoreState } from "easy-peasy";
import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SearchBar, Text } from "react-native-elements";

import FLocationCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";

const AdminFLocationManagementScreen = () => {
  const fishingLocationList = useStoreState(
    (states) => states.AdminFLocationModel.fishingLocationList,
  );
  const currentPage = useStoreState(
    (states) => states.AdminFLocationModel.currentPage,
  );
  const totalItem = useStoreState(
    (states) => states.AdminFLocationModel.totalItem,
  );
  const getFishingLocationList = useStoreActions(
    (actions) => actions.AdminFLocationModel.getFishingLocationList,
  );
  const getFishingLocationListOverwrite = useStoreActions(
    (actions) => actions.AdminFLocationModel.getFishingLocationListOverwrite,
  );

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (currentPage === 1) getFishingLocationListOverwrite();
  }, []);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onEndEditing = () => {
    getFishingLocationList({ keyword: search });
  };

  const onClear = () => {};

  const onValueChange = (value) => {
    if (value !== filter) {
      getFishingLocationListOverwrite({ filterType: value });
      setFilter(value);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.mt2} key={item.id}>
      <FLocationCard
        {...item}
        id={item.id}
        name={item.name}
        address={item.address}
        rate={item.rating}
        showImage={false}
        isAdmin
      />
    </View>
  );

  const onEndReached = () => {
    getFishingLocationList({ keyword: search, filterType: filter });
  };

  const keyExtractor = (item) => item.id.toString();

  return (
    <>
      <HeaderTab name="Quản lý xác thực Điểm câu" />
      <View style={[styles.centerBox, { marginBottom: 125 }]}>
        <SearchBar
          placeholder="Nhập số điện thoại"
          onChangeText={updateSearch}
          value={search}
          containerStyle={styles.searchBar}
          lightTheme
          blurOnSubmit
          onEndEditing={onEndEditing}
          onClear={onClear}
        />

        <View style={[{ width: "90%" }]}>
          <Select
            placeholder="Lọc danh sách"
            fontSize="md"
            onValueChange={onValueChange}
            defaultValue="all"
          >
            <Select.Item label="Tất cả" value="all" />
            <Select.Item label="Đã xác thực" value="active" />
            <Select.Item label="Chưa xác thực" value="inactive" />
          </Select>
          <Text style={[styles.mt1, styles.mb1]} key="totalItem">
            Tổng số: {totalItem}
          </Text>
        </View>
        <FlatList
          style={[styles.mt1, { width: "90%" }]}
          data={fishingLocationList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
        />
      </View>
    </>
  );
};

export default AdminFLocationManagementScreen;
