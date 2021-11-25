import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";

import styles from "../../config/styles";
import { goToAdvanceSearchScreen } from "../../navigations";
import { showToastMessage } from "../../utilities";
import FLocationCard from "../FLocationCard";

const ListViewRoute = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const { listLocationResult, pageNo, totaListLocationPage } = useStoreState(
    (states) => states.AdvanceSearchModel,
  );
  const { setPageNo, getListLocationNextPage } = useStoreActions(
    (actions) => actions.AdvanceSearchModel,
  );

  /**
   * Check if pageNo small then totalPage
   * then set incremented pageNo
   */
  const handleLoadMore = () => {
    if (pageNo < totaListLocationPage) {
      setPageNo(pageNo + 1);
      setIsLoading(true);
    }
  };
  // DucHM ADD_END 16/11/2021

  // Show/hide overlay
  const goToAdvanceSearchFilterScreen = () => {
    goToAdvanceSearchScreen(navigation);
  };

  const ItemSeparatorComponent = () => <View style={styles.mt2} />;

  const renderItem = ({ item: location }) => (
    <FLocationCard
      id={location.id}
      address={location.address}
      name={location.name}
      rate={location.score}
      isVerifed={location.verify}
      image={location.image}
      isClosed={location.closed}
      key={location.id}
    />
  );
  const memoizedValue = useMemo(() => renderItem, [listLocationResult]);

  const renderFooter = () => {
    return isLoading ? (
      <View style={{ marginVertical: 12, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#2089DC" />
      </View>
    ) : null;
  };

  const keyExtractor = (item) => item.id.toString();

  /**
   * Listen to when pageNo increases
   * and call the get list next page
   */
  useEffect(() => {
    if (isLoading) {
      getListLocationNextPage()
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          showToastMessage("Đã có lỗi xảy ra! Vui lòng thử lại sau");
        });
    }
  }, [isLoading]);

  // DucHM ADD_END 16/11/2021

  return (
    <View
      style={StyleSheet.compose(styles.centerBox, styles.flexBox, styles.wfull)}
    >
      <Button
        containerStyle={styles.mt3}
        icon={<Icon type="ionicons" name="search" color="white" />}
        onPress={goToAdvanceSearchFilterScreen}
        title="Tìm kiếm"
      />

      {/* Draft view only */}
      <View
        style={StyleSheet.compose(
          styles.wfull,
          styles.mt2,
          styles.mb1,
          styles.flexBox,
          { width: "90%" },
        )}
      >
        <FlatList
          style={{ height: "100%" }}
          data={listLocationResult}
          renderItem={memoizedValue}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparatorComponent}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          // DucHM ADD_START 16/11/2021
          bounces={false} // prevent onEndReach trigger twice
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          // DucHM ADD_END 16/11/2021
        />
      </View>
    </View>
  );
};

export default ListViewRoute;
