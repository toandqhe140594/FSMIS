import { useStoreActions, useStoreState } from "easy-peasy";
import { Center, Select } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SearchBar, Text } from "react-native-elements";

import FLocationCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";
import colors from "../config/colors";
import styles from "../config/styles";
import { KEY_EXTRACTOR } from "../constants";

const AdminFLocationManagementScreen = () => {
  const fishingLocationList = useStoreState(
    (states) => states.AdminFLocationModel.fishingLocationList,
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
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  const searchFishingLocation = (keyword, filterType) => {
    setLoading(true);
    getFishingLocationListOverwrite({
      keyword,
      filterType,
      setSuccess,
    });
  };

  useEffect(() => {
    getFishingLocationListOverwrite({ setSuccess });
  }, []);

  useEffect(() => {
    if (success !== null) {
      setLoading(false);
      setSuccess(null);
    }
  }, [success]);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onEndEditing = () => {
    searchFishingLocation(search, filter);
  };

  const onClear = () => {
    setSearch("");
    searchFishingLocation("", filter);
  };

  const onValueChange = (value) => {
    if (value !== filter) {
      searchFishingLocation(search, value);
      setFilter(value);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.mt2,
        {
          borderColor: item.active
            ? colors.defaultSuccess
            : colors.defaultDanger,
          borderWidth: 1,
        },
      ]}
      key={item.id}
    >
      <FLocationCard
        {...item}
        id={item.id}
        name={item.name}
        address={item.address}
        rate={item.rating}
        showImage={false}
        isAdmin
        isVerifed={item.verified}
      />
    </View>
  );

  const onEndReached = () => {
    getFishingLocationList({ keyword: search, filterType: filter });
  };

  return (
    <>
      <HeaderTab name="Qu???n l?? ??i???m c??u" />
      <View style={[styles.centerBox, { marginBottom: 125 }]}>
        <SearchBar
          placeholder="Nh???p t??n ??i???m c??u"
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
            placeholder="L???c danh s??ch"
            fontSize="md"
            onValueChange={onValueChange}
            defaultValue="all"
          >
            <Select.Item label="T???t c???" value="all" />
            <Select.Item label="Ho???t ?????ng" value="active" />
            <Select.Item label="Kh??ng ho???t ?????ng" value="inactive" />
            <Select.Item label="???? x??c th???c" value="verified" />
            <Select.Item label="Ch??a x??c th???c" value="notverified" />
          </Select>
          <Text style={[styles.mt1, styles.mb1]} key="totalItem">
            T???ng s???: {totalItem}
          </Text>
        </View>
        {loading ? (
          <Center flex={1}>
            <ActivityIndicator size="large" color="#2089DC" />
          </Center>
        ) : (
          <FlatList
            style={[styles.mt1, { width: "90%" }]}
            data={fishingLocationList}
            renderItem={renderItem}
            keyExtractor={KEY_EXTRACTOR}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
          />
        )}
      </View>
    </>
  );
};

export default AdminFLocationManagementScreen;
