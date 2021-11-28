import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Divider, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { VIEW_ROLE_ANGLER } from "../../constants";
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

  const locationCatchList = useStoreState(
    (states) => states.LocationModel.locationCatchList,
  );
  const { role } = useStoreState(
    (states) => states.LocationModel.locationOverview,
  );

  const getLocationCatchListByPage = useStoreActions(
    (actions) => actions.LocationModel.getLocationCatchListByPage,
  );

  const loadMoreLakeCatchData = () => {
    getLocationCatchListByPage({ pageNo: lakeCatchPage });
    setLakeCatchPage(lakeCatchPage + 1);
  };

  const reportHandler = (id) => {
    goToWriteReportScreen(navigation, { id, type: "CATCH" });
  };
  const listEvent = [{ name: "Báo cáo bài viết", onPress: reportHandler }];

  useEffect(() => {
    getLocationCatchListByPage({ pageNo: lakeCatchPage });
    setLakeCatchPage(lakeCatchPage + 1);
  }, []);

  const goToCatchDetailScreen = (id) => () => {
    goToCatchReportDetailScreen(navigation, {
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
          typeUri="IMAGE"
          uri={item.images[0]}
          numberOfImages={item.images.length}
          iconName={role === VIEW_ROLE_ANGLER ? "flag" : ""}
          iconEvent={listEvent}
        />
      </PressableCustomCard>
    );
  };
  return (
    <>
      {locationCatchList.length > 0 && (
        <FlatList
          removeClippedSubviews
          initialNumToRender={5}
          updateCellsBatchingPeriod={10}
          maxToRenderPerBatch={20}
          data={locationCatchList}
          renderItem={renderItem}
          onEndReached={loadMoreLakeCatchData}
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
  const { role } = useStoreState(
    (states) => states.LocationModel.locationOverview,
  );
  const currentPinPost = useStoreState(
    (states) => states.LocationModel.currentPinPost,
  );
  const getLocationPostListByPage = useStoreActions(
    (actions) => actions.LocationModel.getLocationPostListByPage,
  );
  const getPinPost = useStoreActions(
    (actions) => actions.LocationModel.getPinPost,
  );

  const loadMoreLakePostData = () => {
    getLocationPostListByPage({ pageNo: lakePostPage });
    setLakePostPage(lakePostPage + 1);
  };
  const reportHandler = (id) => {
    goToWriteReportScreen(navigation, { id, type: "POST" });
  };

  useEffect(() => {
    getLocationPostListByPage({ pageNo: lakePostPage });
    setLakePostPage(lakePostPage + 1);
    getPinPost();
  }, []);

  const listEvent = [{ name: "Báo cáo bài viết", onPress: reportHandler }];

  const renderItem = ({ item }) => {
    let typeBadge = "";
    switch (item.postType) {
      case "STOCKING":
        typeBadge = "Bồi cá";
        break;
      case "REPORTING":
        typeBadge = "Báo cá";
        break;
      default:
        typeBadge = "Thông báo";
    }
    return (
      <Box backgroundColor="white" my="1">
        <EventPostCard
          postStyle="LAKE_POST"
          iconName={role === VIEW_ROLE_ANGLER ? "flag" : ""}
          iconEvent={listEvent}
          typeUri={item.attachmentType}
          id={item.id}
          uri={item.url}
          itemData={item}
          lakePost={{
            badge: typeBadge,
            content: item.content,
          }}
          postTime={item.postTime}
        />
      </Box>
    );
  };

  const pinPostComponent = () => (
    <>
      {currentPinPost.id !== undefined && (
        <>
          <Box
            backgroundColor="white"
            mb={5}
            flexDirection="column"
            style={{
              borderColor: "#88E0EF",
              borderWidth: 2,
              borderBottomWidth: 8,
            }}
          >
            <Text
              bold
              italic
              fontSize="15"
              pl={0.5}
              textAlign="center"
              style={{ color: "white", backgroundColor: "#88E0EF" }}
            >
              Bài ghim
            </Text>
            <EventPostCard
              postStyle="LAKE_POST"
              iconName={role === VIEW_ROLE_ANGLER ? "flag" : ""}
              iconEvent={listEvent}
              id={currentPinPost.id}
              uri={currentPinPost.url}
              typeUri={currentPinPost.attachmentType}
              itemData={currentPinPost}
              lakePost={{
                badge: currentPinPost.postType,
                content: currentPinPost.content,
              }}
              postTime={currentPinPost.postTime}
            />
          </Box>
          <Divider />
        </>
      )}
    </>
  );
  const footerComponent = () => <Divider mt={20} />;

  const keyExtractor = (item) => item.id.toString();

  return (
    <>
      {locationPostList.length > 0 && (
        <FlatList
          ListHeaderComponent={pinPostComponent}
          ListFooterComponent={footerComponent}
          removeClippedSubviews
          initialNumToRender={5}
          updateCellsBatchingPeriod={10}
          maxToRenderPerBatch={20}
          data={locationPostList}
          renderItem={renderItem}
          onEndReached={loadMoreLakePostData}
          keyExtractor={keyExtractor}
          nestedScrollEnabled
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
