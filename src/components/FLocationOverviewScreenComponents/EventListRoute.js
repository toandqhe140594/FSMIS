import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import EventPostCard from "../EventPostCard";
import HeaderTab from "../HeaderTab";
import PressableCustomCard from "../PressableCustomCard";

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
const dummyMenu = [
  { id: 1, name: "Hồ thuần việt" },
  { id: 2, name: "Hồ không thuần việt" },
  { id: 3, name: "Hồ Quản" },
];

const CatchReportRoute = () => {
  return (
    <FlatList
      data={dummyMenu}
      renderItem={() => (
        <PressableCustomCard paddingX="1">
          <EventPostCard
            postStyle="ANGLER_POST"
            image="https://picsum.photos/500"
          />
        </PressableCustomCard>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const FLocationEventRoute = () => {
  const [lakePostPage, setLakePostPage] = useState(0);
  const locationPostList = useStoreState(
    (states) => states.LocationModel.locationPostList,
  );
  const getLocationPostListByPage = useStoreActions(
    (actions) => actions.LocationModel.getLocationPostListByPage,
  );

  useEffect(() => {
    getLocationPostListByPage({ page: lakePostPage });
    setLakePostPage(lakePostPage + 1);
  }, []);

  const loadMoreLakePostData = () => {
    getLocationPostListByPage({ page: lakePostPage });
    setLakePostPage(lakePostPage + 1);
  };

  return (
    <>
      {locationPostList.length > 0 && (
        <FlatList
          data={locationPostList}
          renderItem={({ item }) => (
            <PressableCustomCard paddingX="1">
              <EventPostCard
                lakePost={{
                  badge: item.postType === "STOCKING" ? "Bồi cá" : "Thông báo",
                  content: item.content,
                }}
                image={item.url}
                postStyle="LAKE_POST"
                edited={item.edited}
                postTime={item.postTime}
              />
            </PressableCustomCard>
          )}
          onEndReached={() => {
            loadMoreLakePostData();
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </>
  );
};

const Tab = createMaterialTopTabNavigator();

const EventListRoute = () => {
  return (
    <Box style={{ flex: 1 }}>
      <HeaderTab name="Hồ câu thuần việt" isVerified flagable />
      <Divider />
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      >
        <Tab.Screen name="Bài viết" component={FLocationEventRoute} />
        <Tab.Screen name="Lịch sử báo cá" component={CatchReportRoute} />
      </Tab.Navigator>
    </Box>
  );
};

export default EventListRoute;
