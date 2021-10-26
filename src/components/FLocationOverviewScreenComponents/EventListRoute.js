import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import AvatarCard from "../AvatarCard";
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

const CatchReportRoute = () => {
  const [img, setImage] = useState("");
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
    // setImage(locationCatchList[0].avatar);
  }, []);
  const loadMoreLakeCatchData = () => {
    getLocationCatchListByPage({ pageNo: lakeCatchPage });
    setLakeCatchPage(lakeCatchPage + 1);
  };

  // console.log(`locationCatchList`, locationCatchList[0]);
  const setAvtImage = (imgAvatar) => {
    setImage(imgAvatar);
  };
  return (
    <>
      {locationCatchList.length > 0 && (
        <FlatList
          data={locationCatchList}
          renderItem={({ item }) => (
            <PressableCustomCard
              paddingX="1"
              onPress={() => {
                setImage(item.avatar);
                console.log("img :>> ", img.length);
              }}
            >
              {/* <EventPostCard
                // image={item.url}
                postStyle="ANGLER_POST"
                anglerName={item.userFullName}
                anglerContent={item.description}
                postTime={item.time}
                fishList={item.fishes}
                id={item.id}
                imageAvatar={item.avatar}
              /> */}
              {img.length > 10000 ? (
                <AvatarCard
                  avatarSize="lg"
                  image={img}
                  nameUser={item.userFullName}
                />
              ) : (
                setAvtImage(item.avatar)
              )}
            </PressableCustomCard>
          )}
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
  return (
    <>
      {locationPostList.length > 0 && (
        <FlatList
          data={locationPostList}
          renderItem={({ item }) => (
            <PressableCustomCard
              paddingX="1"
              onPress={() => {
                console.log(item.id);
              }}
            >
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
              />
            </PressableCustomCard>
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
  const locationShortInformation = useStoreState(
    (states) => states.LocationModel.locationShortInformation,
  );

  const { id, name, isVerified } = locationShortInformation;

  return (
    <Box style={{ flex: 1 }}>
      <HeaderTab id={id} name={name} isVerified={isVerified} flagable />
      <Divider />
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
        initialRouteName="Lịch sử báo cá"
      >
        <Tab.Screen name="Lịch sử báo cá" component={CatchReportRoute} />
        <Tab.Screen name="Bài viết" component={FLocationEventRoute} />
      </Tab.Navigator>
    </Box>
  );
};

export default EventListRoute;
