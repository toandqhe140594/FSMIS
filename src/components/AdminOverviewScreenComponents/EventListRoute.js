import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { KEY_EXTRACTOR } from "../../constants";
import { goToAdminCatchDetail } from "../../navigations";
import SmallScreenLoadingIndicator from "../common/SmallScreenLoadingIndicator";
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

  const getLocationCatchListByPage = useStoreActions(
    (actions) => actions.LocationModel.getLocationCatchListByPage,
  );
  const locationCatchList = useStoreState(
    (states) => states.LocationModel.locationCatchList,
  );

  const [lakeCatchPage, setLakeCatchPage] = useState(1);
  const [screenLoading, setScreenLoading] = useState(true);

  // Hide loading indicator
  const closeScreenLoadingIndicator = () => setScreenLoading(false);

  useEffect(() => {
    getLocationCatchListByPage({ pageNo: lakeCatchPage })
      .then(closeScreenLoadingIndicator)
      .catch(closeScreenLoadingIndicator);
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

  if (screenLoading) return <SmallScreenLoadingIndicator />;

  return (
    <>
      {locationCatchList.length > 0 ? (
        <FlatList
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          data={locationCatchList}
          renderItem={renderItem}
          onEndReached={loadMoreLakeCatchData}
          keyExtractor={KEY_EXTRACTOR}
        />
      ) : (
        <Center flex={1} minHeight={600}>
          <Text>Không có báo cá </Text>
        </Center>
      )}
    </>
  );
};

const FLocationEventRoute = () => {
  const locationPostList = useStoreState(
    (states) => states.LocationModel.locationPostList,
  );
  const getLocationPostListByPage = useStoreActions(
    (actions) => actions.LocationModel.getLocationPostListByPage,
  );

  const [lakePostPage, setLakePostPage] = useState(1);
  const [screenLoading, setScreenLoading] = useState(true);

  // Hide loading indicator
  const closeScreenLoadingIndicator = () => setScreenLoading(false);

  useEffect(() => {
    getLocationPostListByPage({ pageNo: lakePostPage })
      .then(closeScreenLoadingIndicator)
      .catch(closeScreenLoadingIndicator);
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
          posterName: item.posterName,
        }}
        typeUri={item.attachmentType}
        uri={item.url}
        postStyle="LAKE_POST"
        edited={item.edited}
        postTime={item.postTime}
        id={item.id}
      />
    );
  };

  if (screenLoading) return <SmallScreenLoadingIndicator />;

  return (
    <>
      {locationPostList.length > 0 ? (
        <FlatList
          nestedScrollEnabled
          data={locationPostList}
          renderItem={renderItem}
          onEndReached={loadMoreLakePostData}
          keyExtractor={KEY_EXTRACTOR}
          maxToRenderPerBatch={3}
          initialNumToRender={3}
        />
      ) : (
        <Center flex={1} minHeight={600}>
          <Text>Không có bài viết </Text>
        </Center>
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
