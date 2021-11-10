import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-elements";

import EventPostCard from "../components/EventPostCard";
import HeaderTab from "../components/HeaderTab";
import { goToPostCreateScreen, goToPostEditScreen } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const PostListContainerComponent = () => {
  const navigation = useNavigation();
  const {
    getLocationPostListByPage,
    setLakePostPageNo,
    setCurrentPost,
    deletePost,
    getLocationPostListFirstPage,
  } = useStoreActions((actions) => actions.FManageModel);

  const lakePostPageNo = useStoreState(
    (states) => states.FManageModel.lakePostPageNo,
  );
  const locationPostList = useStoreState(
    (states) => states.FManageModel.locationPostList,
  );

  const [deleteSuccess, setDeleteSuccess] = useState(null);

  const loadMoreLakeCatchData = () => {
    getLocationPostListByPage({ pageNo: lakePostPageNo });
    setLakePostPageNo(lakePostPageNo + 1);
  };

  const editPostHandler = (id, item) => {
    setCurrentPost(item);
    goToPostEditScreen(navigation, { id });
  };

  const removePostHandler = (id) => {
    showAlertConfirmBox("Thông báo", "Bài đăng sẽ bị xóa", async () => {
      await deletePost({ postId: id, setDeleteSuccess });
    });
  };

  useEffect(() => {
    getLocationPostListFirstPage();
  }, []);

  useEffect(() => {
    if (deleteSuccess === true) showToastMessage("Xóa thành công");
    if (deleteSuccess === false) showToastMessage("Xóa thành công");
    setDeleteSuccess(null);
  }, [deleteSuccess]);

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
      <Button colorScheme="blue" size="lg" onPress={onPress} borderRadius="0">
        Tạo bài viết
      </Button>
      <PostListContainerComponent />
    </Box>
  );
};

export default FManageFishLocationPostScreen;
