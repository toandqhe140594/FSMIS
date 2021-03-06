import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useStoreActions } from "easy-peasy";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import ListViewRoute from "../components/FishingSpotSearchScreenComponents/ListViewRoute";
import MapViewRoute from "../components/FishingSpotSearchScreenComponents/MapViewRoute";
import AdvanceSearchModel from "../models/AdvanceSearchModel";
import MapSearchModel from "../models/MapSearchModel";
import store from "../utilities/Store";

store.addModel("MapSearchModel", MapSearchModel);
store.addModel("AdvanceSearchModel", AdvanceSearchModel);

const Tab = createMaterialTopTabNavigator();
const styles = StyleSheet.create({
  tabBarStyle: {
    height: 40,
    justifyContent: "center",
  },
  tabBarLabelStyle: {
    fontSize: 13,
    marginTop: 0,
  },
});

export default function FishingSpotSearchScreen() {
  const resetMapSearchModel = useStoreActions(
    (actions) => actions.MapSearchModel.reset,
  );
  const resetAdvanceSearchModel = useStoreActions(
    (actions) => actions.AdvanceSearchModel.reset,
  );

  useEffect(() => {
    return () => {
      resetMapSearchModel();
      resetAdvanceSearchModel();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
    >
      <Tab.Screen name="Hồ câu gần đây" component={MapViewRoute} />
      <Tab.Screen name="Tìm kiếm nâng cao" component={ListViewRoute} />
    </Tab.Navigator>
  );
}
