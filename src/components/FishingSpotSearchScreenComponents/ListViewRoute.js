import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Button, Icon } from "react-native-elements";

import styles from "../../config/styles";
import { goToAdvanceSearchScreen } from "../../navigations";
import { showToastMessage } from "../../utilities";
import FLocationCard from "../FLocationCard";

const ListViewRoute = () => {
  const navigation = useNavigation();
  // DucHM ADD_START 16/11/2021
  const [isLoading, setIsLoading] = useState(false);
  const [getStatus, setGetStatus] = useState(null);
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
      setIsLoading(true);
      setPageNo(pageNo + 1);
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

  // DucHM ADD_START 16/11/2021
  const renderFooter = () => {
    return isLoading ? (
      <View style={{ marginVertical: 12, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#2089DC" />
      </View>
    ) : null;
  };
  // DucHM ADD_END 16/11/2021

  const keyExtractor = (item) => item.id.toString();

  // DucHM ADD_START 16/11/2021
  /**
   * Listen to when pageNo increases
   * and call the get list next page
   */
  useEffect(() => {
    getListLocationNextPage({ setGetStatus });
  }, [pageNo]);

  /**
   * Trigger when get status returns
   */
  useEffect(() => {
    if (getStatus === "SUCCESS") {
      setIsLoading(false);
      setGetStatus(null);
    } else if (getStatus === "FAILED") {
      setIsLoading(false);
      showToastMessage("Đã có lỗi xảy ra!");
      setGetStatus(null);
      // handle error
    }
  }, [getStatus]);
  // DucHM ADD_END 16/11/2021

  return (
    <View style={[styles.centerBox, styles.flexBox, styles.wfull]}>
      <Button
        containerStyle={styles.mt3}
        icon={<Icon type="ionicons" name="search" color="white" />}
        onPress={goToAdvanceSearchFilterScreen}
        title="Tìm kiếm"
      />

      {/* Draft view only */}
      <View
        style={[
          styles.wfull,
          styles.mt2,
          styles.mb1,
          styles.flexBox,
          { width: "90%" },
        ]}
      >
        <FlatList
          style={{ height: "100%" }}
          data={listLocationResult}
          renderItem={renderItem}
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
