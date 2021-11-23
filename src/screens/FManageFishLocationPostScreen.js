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
  const [pinSuccess, setPinSuccess] = useState(null);
  const loadMoreLakeCatchData = () => {
    getLocationPostListByPage({ pageNo: lakePostPageNo });
    setLakePostPageNo(lakePostPageNo + 1);
  };

  const editPostHandler = (id, item) => {
    setCurrentPost(item);
    goToPostEditScreen(navigation, { id });
  };

  const pinFLocationPostHandler = (id, item) => {
    pinFLocationPost({ postId: id, item, setPinSuccess });
  };

  const unPinFLocationPostHandler = (id) => {
    pinFLocationPost({ postId: id, item: {}, setPinSuccess });
  };

  const removePostHandler = (id) => {
    showAlertConfirmBox("Thông báo", "Bài đăng sẽ bị xóa", async () => {
      await deletePost({ postId: id, setDeleteSuccess });
    });
  };

  const pinPostEvent = [
    { name: "Ghim bài viết", onPress: pinFLocationPostHandler },
  ];
  const unPinPostEvent = [
    { name: "Bỏ ghim bài viết", onPress: unPinFLocationPostHandler },
  ];
  const listEvent = [
    { name: "Chỉnh sửa bài đăng", onPress: editPostHandler },
    { name: "Xóa bài đăng", onPress: removePostHandler },
  ];

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
          iconName="ellipsis-vertical"
          iconEvent={[...pinPostEvent, ...listEvent]}
          id={item.id}
          typeUri={item.attachmentType}
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
        <Box
          backgroundColor="white"
          mb={5}
          mt={1}
          flexDirection="column"
          style={{
            borderColor: "#88E0EF",
            borderWidth: 3,
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
            iconName="ellipsis-vertical"
            iconEvent={[...unPinPostEvent, ...listEvent]}
            id={currentPinPost.id}
            typeUri={currentPinPost.attachmentType}
            uri={currentPinPost.url}
            itemData={currentPinPost}
            lakePost={{
              badge:
                currentPinPost.postType === "STOCKING" ? "Bồi cá" : "Thông báo",
              content: currentPinPost.content,
            }}
            postTime={currentPinPost.postTime}
          />
        </Box>
      )}
    </>
  );
  const footerComponent = () => <Divider mt={20} />;

  useEffect(() => {
    if (deleteSuccess === true) {
      showToastMessage("Xóa thành công");
    }
    if (deleteSuccess === false) showToastMessage("Xóa thất bại");
    setDeleteSuccess(null);
  }, [deleteSuccess]);

  useEffect(() => {
    if (pinSuccess === true) {
      showToastMessage("Xử lý thành công");
    }
    if (pinSuccess === false) {
      showToastMessage("Thất bại");
    }
    setPinSuccess(null);
  }, [pinSuccess]);

  useEffect(() => {
    getLocationPostListFirstPage();
    getPinPost();
  }, []);

  return (
    <Box>
      <FlatList
        ListHeaderComponent={pinPostComponent}
        ListFooterComponent={footerComponent}
        removeClippedSubviews
        initialNumToRender={5}
        updateCellsBatchingPeriod={10}
        maxToRenderPerBatch={20}
        data={locationPostList}
        renderItem={renderItem}
        onEndReached={loadMoreLakeCatchData}
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
