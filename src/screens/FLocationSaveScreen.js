import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import FLocationCard from "../components/FLocationCard";
import styles from "../config/styles";

const ItemSeparator = () => {
  return <View style={{ height: 6 }} />;
};

const FLocationSaveScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { savedLocationCurrentPage, savedLocationList } = useStoreState(
    (states) => states.ProfileModel,
  );

  const getSavedLocationList = useStoreActions(
    (actions) => actions.ProfileModel.getSavedLocationList,
  );

  useEffect(() => {
    if (savedLocationCurrentPage === 1)
      getSavedLocationList({ mode: "loadmore" });
  }, []);

  useEffect(() => {
    setRefreshing(false); // If the list is changed then hide refresh icon
  }, [savedLocationList]);

  const handleRefresh = () => {
    setRefreshing(true);
    getSavedLocationList({ mode: "refresh" });
    // If the list is not changed then hide refresh icon after 5 seconds
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  };

  /**
   * Render item function for flatlist
   * Leave outside for optimization
   */
  const renderItem = ({ item }) => (
    <FLocationCard
      id={item.id}
      address={item.address}
      isVerifed={item.verify}
      image={item.image}
      name={item.name}
      rate={item.score}
      key={item.id}
      isClosed={item.closed}
    />
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingVertical: 3,
        paddingHorizontal: "5%",
      }}
    >
      {savedLocationList && (
        <FlatList
          data={savedLocationList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={getSavedLocationList}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          initialNumToRender={5}
          style={styles.wfull}
        />
      )}
    </View>
  );
};

export default FLocationSaveScreen;
