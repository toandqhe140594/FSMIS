import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import {
  goToCatchReportDetailScreen,
  goToWriteReportScreen,
} from "../../navigations";
import EventPostCard from "../EventPostCard";
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

const CatchReportRoute = () => {
  const navigation = useNavigation();
  const [lakeCatchPage, setLakeCatchPage] = useState(1);

  const getLocationCatchListByPage = useStoreActions(
    (actions) => actions.LocationModel.getLocationCatchListByPage,
  );
  const locationCatchList = useStoreState(
    (states) => states.LocationModel.locationCatchList,
  );

  useEffect(() => {
    getLocationCatchListByPage({ pageNo: lakeCatchPage });
    setLakeCatchPage(lakeCatchPage + 1);
  }, []);
  const loadMoreLakeCatchData = () => {
    getLocationCatchListByPage({ pageNo: lakeCatchPage });
    setLakeCatchPage(lakeCatchPage + 1);
  };

  return (
    <>
      {locationCatchList.length > 0 && (
        <FlatList
          data={locationCatchList}
          renderItem={({ item }) => {
            return (
              <PressableCustomCard
                paddingX="1"
                onPress={() => {
                  goToCatchReportDetailScreen(navigation, {
                    id: item.id,
                  });
                }}
              >
                <EventPostCard
                  postStyle="ANGLER_POST"
                  anglerName={item.userFullName}
                  anglerContent={item.description}
                  postTime={item.time}
                  fishList={item.fishes}
                  id={item.id}
                  imageAvatar={item.avatar}
                  image={item.images[0]}
                  numberOfImages={item.images.length}
                />
              </PressableCustomCard>
            );
          }}
          onEndReached={() => {
            loadMoreLakeCatchData();
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
};

const FLocationEventRoute = () => {
  const navigation = useNavigation();
  const [lakePostPage, setLakePostPage] = useState(1);
  const locationPostList = useStoreState(
    (states) => states.LocationModel.locationPostList,
  );
  const getLocationPostListByPage = useStoreActions(
    (actions) => actions.LocationModel.getLocationPostListByPage,
  );

  useEffect(() => {
    getLocationPostListByPage({ pageNo: lakePostPage });
    setLakePostPage(lakePostPage + 1);
  }, []);

  const loadMoreLakePostData = () => {
    getLocationPostListByPage({ pageNo: lakePostPage });
    setLakePostPage(lakePostPage + 1);
  };
  const reportHandler = (id, type) => {
    goToWriteReportScreen(navigation, { id, type });
  };
  const listEvent = [{ name: "Báo cáo bài viết", onPress: reportHandler }];
  return (
    <>
      {locationPostList.length > 0 && (
        <FlatList
          data={locationPostList}
          renderItem={({ item }) => (
            <EventPostCard
              lakePost={{
                badge: item.postType === "STOCKING" ? "Bồi cá" : "Thông báo",
                content: item.content,
              }}
              image={item.url}
              postStyle="LAKE_POST"
              edited={item.edited}
              postTime={item.postTime}
              id={item.id}
              iconName="flag"
              iconEvent={listEvent}
            />
          )}
          onEndReached={() => {
            loadMoreLakePostData();
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
};

const Tab = createMaterialTopTabNavigator();

const EventListRoute = () => {
  return (
    <Box style={{ flex: 1 }}>
      <Divider />
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
        initialRouteName="Bài viết"
      >
        <Tab.Screen name="Bài viết" component={FLocationEventRoute} />
        <Tab.Screen name="Lịch sử báo cá" component={CatchReportRoute} />
      </Tab.Navigator>
    </Box>
  );
};

export default EventListRoute;
