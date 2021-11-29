import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { KEY_EXTRACTOR } from "../../constants";
import { goToAdminCatchDetail } from "../../navigations";
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

  const goToCatchDetailScreen = (id) => () => {
    goToAdminCatchDetail(navigation, {
      id,
    });
  };

  const renderItem = ({ item }) => {
    return (
      <PressableCustomCard
        paddingX="1"
        onPress={goToCatchDetailScreen(item.id)}
      >
        <EventPostCard
          postStyle="ANGLER_POST"
          anglerName={item.userFullName}
          anglerContent={item.description}
          postTime={item.time}
          fishList={item.fishes}
          id={item.id}
          imageAvatar={item.avatar}
          uri={item.images[0]}
          typeUri="IMAGE"
          numberOfImages={item.images.length}
          isApproved={item.approved}
        />
      </PressableCustomCard>
    );
  };

  return (
    <>
      {locationCatchList.length > 0 && (
        <FlatList
          data={locationCatchList}
          renderItem={renderItem}
          onEndReached={loadMoreLakeCatchData()}
          keyExtractor={KEY_EXTRACTOR}
        />
      )}
    </>
  );
};

const FLocationEventRoute = () => {
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

  const renderItem = ({ item }) => {
    return (
      <EventPostCard
        lakePost={{
          badge: item.postType,
          content: item.content,
        }}
        typeUri={item.attachmentType}
        uri={item.url}
        postStyle="LAKE_POST"
        edited={item.edited}
        postTime={item.postTime}
        id={item.id}
        iconName="flag"
      />
    );
  };

  return (
    <>
      {locationPostList.length > 0 && (
        <FlatList
          nestedScrollEnabled
          data={locationPostList}
          renderItem={renderItem}
          onEndReached={loadMoreLakePostData}
          keyExtractor={KEY_EXTRACTOR}
        />
      )}
    </>
  );
};

const Tab = createMaterialTopTabNavigator();

const EventListRoute = () => {
  return (
    <Box style={{ flex: 1 }}>
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
