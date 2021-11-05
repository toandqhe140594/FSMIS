import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-elements";

import EventPostCard from "../components/EventPostCard";
import HeaderTab from "../components/HeaderTab";
import { goToPostCreateScreen, goToPostEditScreen } from "../navigations";

const PostListContainerComponent = () => {
  const navigation = useNavigation();
  const [lakePostPage, setTotalPostPage] = useState(1);

  const getLocationPostListByPage = useStoreActions(
    (actions) => actions.FManageModel.getLocationPostListByPage,
  );
  const locationPostList = useStoreState(
    (states) => states.FManageModel.locationPostList,
  );
  const setCurrentPost = useStoreActions(
    (actions) => actions.FManageModel.setCurrentPost,
  );

  useEffect(() => {
    getLocationPostListByPage({ pageNo: lakePostPage });
    setTotalPostPage(lakePostPage + 1);
  }, []);

  const loadMoreLakeCatchData = () => {
    getLocationPostListByPage({ pageNo: lakePostPage });
    setTotalPostPage(lakePostPage + 1);
  };
  const editPostHandler = (id, item) => {
    setCurrentPost(item);
    goToPostEditScreen(navigation, { id });
  };

  const removePostHandler = (id) => {
    console.log(id);
    console.log("xoa bai");
  };

  const listEvent = [
    { name: "Chỉnh sửa bài đăng", onPress: editPostHandler },
    { name: "Xóa bài đăng", onPress: removePostHandler },
  ];

  return (
    <FlatList
      data={locationPostList}
      renderItem={({ item }) => (
        <Box backgroundColor="white" my="1">
          <EventPostCard
            postStyle="LAKE_POST"
            iconName="ellipsis-vertical"
            iconEvent={listEvent}
            id={item.id}
            image={item.url}
            itemData={item}
            lakePost={{
              badge: item.postType === "STOCKING" ? "Bồi cá" : "Thông báo",
              content: item.content,
            }}
            postTime={item.postTime}
          />
        </Box>
      )}
      onEndReached={() => {
        loadMoreLakeCatchData();
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const FManageFishLocationPostScreen = () => {
  const navigation = useNavigation();

  const locationDetails = useStoreState(
    (states) => states.FManageModel.locationDetails,
  );

  const onPress = () => {
    goToPostCreateScreen(navigation);
  };

  const { id, name, verify } = locationDetails;

  return (
    <Box style={{ flex: 1 }}>
      <HeaderTab id={id} name={name} isVerified={verify} />
      <Divider />
      <Button colorScheme="blue" size="lg" onPress={onPress}>
        Tạo bài viết
      </Button>
      <PostListContainerComponent />
    </Box>
  );
};

export default FManageFishLocationPostScreen;
