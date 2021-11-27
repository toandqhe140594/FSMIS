import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import OverlayLoading from "../components/common/OverlayLoading";
import FLocationCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";
import FishingMethodModel from "../models/FishingMethodModel";
import FishModel from "../models/FishModel";
import {
  goToFManageAddNewScreen,
  goToFManageSuggestScreen,
} from "../navigations";
import store from "../utilities/Store";

store.addModel("FishModel", FishModel);
store.addModel("FishingMethodModel", FishingMethodModel);
const styles = StyleSheet.create({
  flatList: {
    width: "90%",
    height: "90%",
    marginTop: 16,
  },
  addButton: {
    width: 110,
    height: 110,
    marginBottom: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

const FManageSelectScreen = () => {
  const navigation = useNavigation();
  const [getSuccess, setGetSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const listOfFishingLocations = useStoreState(
    (states) => states.FManageModel.listOfFishingLocations,
  );
  const getListOfFishingLocations = useStoreActions(
    (actions) => actions.FManageModel.getListOfFishingLocations,
  );

  const navigateToSuggestionScreen = () => {
    goToFManageSuggestScreen(navigation);
  };

  const goToAddLocationScreen = () => {
    goToFManageAddNewScreen(navigation);
  };

  useEffect(() => {
    // setLoading(true);
    getListOfFishingLocations({ setGetSuccess });
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (getSuccess !== null) {
      setGetSuccess(null);
      setLoading(false);
    }
  }, [getSuccess]);

  /**
   * Center the add button
   * when there isn't any fishing location owned
   */
  const getEmptyListStyling = useMemo(
    () =>
      !listOfFishingLocations.length
        ? { flex: 1, justifyContent: "center" }
        : null,
    [listOfFishingLocations.length > 0],
  );

  /**
   * Hide the add button if angler role is STAFF
   */
  const isStaffStyle = useMemo(
    () =>
      listOfFishingLocations.length &&
      listOfFishingLocations[0].role === "STAFF"
        ? { display: "none" }
        : null,
    [
      listOfFishingLocations.length &&
        listOfFishingLocations[0].role === "STAFF",
    ],
  );

  const renderHeader = () => (
    <Pressable onPress={goToAddLocationScreen}>
      <View style={StyleSheet.compose(styles.addButton, isStaffStyle)}>
        <Text style={{ fontSize: 12 }}>Thêm điểm câu</Text>
      </View>
    </Pressable>
  );

  const ItemSeparator = () => {
    return <View style={{ height: 8 }} />;
  };

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => (
    <FLocationCard
      id={item.id}
      name={item.name}
      image={item.image}
      isVerifed={item.verify}
      rate={item.score}
      address={item.address}
      role={item.role}
      isManaged
      isClosed={item.closed}
      pending={item.pending}
      key={item.id}
    />
  );

  if (loading) return <OverlayLoading coverScreen />;
  return (
    <>
      <HeaderTab
        name="Chọn điểm câu làm việc"
        customIcon={{
          name: "info-outline",
          color: "blue",
          type: "material",
          onPress: navigateToSuggestionScreen,
        }}
      />
      <View style={{ alignItems: "center" }}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={getEmptyListStyling}
          renderItem={renderItem}
          data={listOfFishingLocations}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
        />
      </View>
    </>
  );
};

export default FManageSelectScreen;
