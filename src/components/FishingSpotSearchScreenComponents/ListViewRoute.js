import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import React from "react";
import { FlatList, View } from "react-native";
import { Button, Icon } from "react-native-elements";

import styles from "../../config/styles";
import { goToAdvanceSearchScreen } from "../../navigations";
import FLocationCard from "../FLocationCard";

const ListViewRoute = () => {
  const navigation = useNavigation();
  const advancedLocationList = useStoreState(
    (states) => states.MapSearchModel.advancedLocationList,
  );

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

  const keyExtractor = (item) => item.id.toString();

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
          data={advancedLocationList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparatorComponent}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
        />
      </View>
    </View>
  );
};

export default ListViewRoute;
