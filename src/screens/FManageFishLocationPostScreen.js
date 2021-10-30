import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-elements";

import EventPostCard from "../components/EventPostCard";
import HeaderTab from "../components/HeaderTab";
import { goToPostEditScreen } from "../navigations";

const FLocationEventRoute = () => {
  const navigation = useNavigation();
  const [lakePostPage, setTotalPostPage] = useState(1);

  const getLocationPostListByPage = useStoreActions(
    (actions) => actions.FManageModel.getLocationPostListByPage,
  );
  const locationPostList = useStoreState(
    (states) => states.FManageModel.locationPostList,
  );

  useEffect(() => {
    getLocationPostListByPage({ pageNo: lakePostPage });
    setTotalPostPage(lakePostPage + 1);
  }, []);

  const loadMoreLakeCatchData = () => {
    getLocationPostListByPage({ pageNo: lakePostPage });
    setTotalPostPage(lakePostPage + 1);
  };

  const editPostHandler = () => {
    goToPostEditScreen(navigation);
  };

  const removePostHandler = () => {
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
          />
        </Box>
      )}
      onEndReached={() => {
        loadMoreLakeCatchData();
      }}
      keyExtractor={(item) => item.id}
    />
  );
};

const FManageFishLocationPostScreen = () => {
  const navigation = useNavigation();
  const onPress = () => {
    goToPostEditScreen(navigation);
  };
  return (
    <Box style={{ flex: 1 }}>
      <HeaderTab name="Hồ câu thuần việt" isVerified />
      <Divider />
      <Button colorScheme="blue" size="lg" onPress={onPress}>
        Tạo bài viết
      </Button>
      <FLocationEventRoute />
    </Box>
  );
};

export default FManageFishLocationPostScreen;
