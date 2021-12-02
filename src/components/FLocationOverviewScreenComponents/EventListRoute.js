import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center, Divider, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { KEY_EXTRACTOR, VIEW_ROLE_ANGLER } from "../../constants";
import {
  goToCatchReportDetailScreen,
  goToWriteReportScreen,
} from "../../navigations";
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

  const locationCatchList = useStoreState(
    (states) => states.LocationModel.locationCatchList,
  );
  const { role } = useStoreState(
    (states) => states.LocationModel.locationOverview,
  );
  const getLocationCatchListByPage = useStoreActions(
    (actions) => actions.LocationModel.getLocationCatchListByPage,
  );

  const [lakeCatchPage, setLakeCatchPage] = useState(1);
  const [screenLoading, setScreenLoading] = useState(true);

  // Hide loading indicator
  const closeScreenLoadingIndicator = () => setScreenLoading(false);

  const loadMoreLakeCatchData = () => {
    getLocationCatchListByPage({ pageNo: lakeCatchPage });
    setLakeCatchPage(lakeCatchPage + 1);
  };

  const reportHandler = (id) => {
    goToWriteReportScreen(navigation, { id, type: "CATCH" });
  };
  const listEvent = [{ name: "Báo cáo bài viết", onPress: reportHandler }];

  useEffect(() => {
    getLocationCatchListByPage({ pageNo: lakeCatchPage })
      .then(closeScreenLoadingIndicator)
      .catch(closeScreenLoadingIndicator);
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
  const navigation = useNavigation();

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
  const [lakePostPage, setLakePostPage] = useState(1);
  const [screenLoading, setScreenLoading] = useState(true);

  // Hide loading indicator
  const closeScreenLoadingIndicator = () => setScreenLoading(false);

  const loadMoreLakePostData = () => {
    getLocationPostListByPage({ pageNo: lakePostPage });
    setLakePostPage(lakePostPage + 1);
  };
  const reportHandler = (id) => {
    goToWriteReportScreen(navigation, { id, type: "POST" });
  };

  useEffect(() => {
    getLocationPostListByPage({ pageNo: lakePostPage })
      .then(closeScreenLoadingIndicator)
      .catch(closeScreenLoadingIndicator);
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
            posterName: item.posterName,
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
                posterName: currentPinPost.posterName,
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

  if (screenLoading) return <SmallScreenLoadingIndicator />;

  return (
    <>
      {locationPostList.length > 0 ? (
        <FlatList
          ListHeaderComponent={pinPostComponent}
          ListFooterComponent={footerComponent}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          data={locationPostList}
          renderItem={renderItem}
          onEndReached={loadMoreLakePostData}
          keyExtractor={KEY_EXTRACTOR}
          nestedScrollEnabled
        />
      ) : (
        <Center flex={1} minHeight={600}>
          <Text>Chưa có bài đăng được tạo.</Text>
        </Center>
      )}
    </>
  );
};

const Tab = createMaterialTopTabNavigator();

const EventListRoute = () => {
  return (
    <Box flex={1}>
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
