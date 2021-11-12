import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Divider, FlatList, Text } from "native-base";
import React, { useEffect, useState } from "react";

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
    pinFLocationPost,
    getPinPost,
  } = useStoreActions((actions) => actions.FManageModel);

  const lakePostPageNo = useStoreState(
    (states) => states.FManageModel.lakePostPageNo,
  );
  const locationPostList = useStoreState(
    (states) => states.FManageModel.locationPostList,
  );

  const currentPinPost = useStoreState(
    (states) => states.FManageModel.currentPinPost,
  );
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  const [pinPost, setPinPost] = useState({});
  const loadMoreLakeCatchData = () => {
    getLocationPostListByPage({ pageNo: lakePostPageNo });
    setLakePostPageNo(lakePostPageNo + 1);
  };

  const editPostHandler = (id, item) => {
    setCurrentPost(item);
    goToPostEditScreen(navigation, { id });
  };
  const pinFLocationPostHandler = (id, item) => {
    pinFLocationPost({ postId: id });
    setPinPost(item);
  };

  const removePostHandler = (id) => {
    showAlertConfirmBox("Thông báo", "Bài đăng sẽ bị xóa", async () => {
      await deletePost({ postId: id, setDeleteSuccess });
    });
  };

  useEffect(() => {
    getLocationPostListFirstPage();
    getPinPost();
    setPinPost(currentPinPost);
  }, []);

  useEffect(() => {
    if (deleteSuccess === true) showToastMessage("Xóa thành công");
    if (deleteSuccess === false) showToastMessage("Xóa thất bại");
    setDeleteSuccess(null);
  }, [deleteSuccess]);

  const pinPostEvent = [
    { name: "Ghim bài viết", onPress: pinFLocationPostHandler },
  ];
  const unPinPostEvent = [
    { name: "Ghim bài viết", onPress: pinFLocationPostHandler },
  ];
  const listEvent = [
    { name: "Chỉnh sửa bài đăng", onPress: editPostHandler },
    { name: "Xóa bài đăng", onPress: removePostHandler },
  ];

  const renderItem = ({ item }) => (
    <Box backgroundColor="white" my="1">
      <EventPostCard
        postStyle="LAKE_POST"
        iconName="ellipsis-vertical"
        iconEvent={[...unPinPostEvent, ...listEvent]}
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
  );

  return (
    <Box>
      <FlatList
        ListHeaderComponent={() => (
          <>
            {pinPost.id !== undefined && (
              <Box backgroundColor="white" mb={5}>
                <Text>Bài được ghim </Text>
                <EventPostCard
                  postStyle="LAKE_POST"
                  iconName="ellipsis-vertical"
                  iconEvent={[...pinPostEvent, ...listEvent]}
                  id={pinPost.id}
                  image={pinPost.url}
                  itemData={pinPost}
                  lakePost={{
                    badge:
                      pinPost.postType === "STOCKING" ? "Bồi cá" : "Thông báo",
                    content: pinPost.content,
                  }}
                  postTime={pinPost.postTime}
                />
              </Box>
            )}
          </>
        )}
        removeClippedSubviews
        initialNumToRender={5}
        updateCellsBatchingPeriod={10}
        maxToRenderPerBatch={20}
        data={locationPostList}
        renderItem={renderItem}
        onEndReached={() => {
          loadMoreLakeCatchData();
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
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
