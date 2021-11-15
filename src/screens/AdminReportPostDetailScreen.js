import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Divider, FlatList, Text, VStack } from "native-base";
import React, { useEffect } from "react";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import EventPostCard from "../components/EventPostCard";
import styles from "../config/styles";

const AdminReportPostDetailScreen = () => {
  const postReportDetail = useStoreState(
    (states) => states.ReportModel.postReportDetail,
  );
  const getPostReportDetail = useStoreActions(
    (actions) => actions.ReportModel.getPostReportDetail,
  );

  const { locationName, reportTime, postDtoOut, reportDetailList } =
    postReportDetail;
  const listEvent = [{ name: "Xóa bài viết", onPress: () => {} }];

  let typeBadge = "";

  if (postDtoOut !== undefined) {
    switch (postDtoOut.postType) {
      case "STOCKING":
        typeBadge = "Bồi cá";
        break;
      case "REPORTING":
        typeBadge = "Báo cá";
        break;
      default:
        typeBadge = "Thông báo";
    }
  }
  const headerListComponent = () => (
    <>
      {postDtoOut !== undefined ? (
        <VStack space={3} mt={4} px={3}>
          <Box style={styles.textContentType}>
            <Text bold>Điểm câu bị báo cáo</Text>
            <Text>{locationName}</Text>
          </Box>
          <Divider />
          <Text style={styles.textContentType}>
            <Text bold>Thời gian báo cáo :</Text> {reportTime}
          </Text>
          <Divider />
          <EventPostCard
            id={postDtoOut.id}
            iconEvent={listEvent}
            iconName="ellipsis-vertical"
            postStyle="LAKE_POST"
            image={postDtoOut.uri}
            postTime={postDtoOut.postTime}
            edited={postDtoOut.edited}
            lakePost={{
              badge: typeBadge,
              content: postDtoOut.content,
            }}
          />
          <Text bold style={styles.textContentType}>
            Danh sách báo cáo :
          </Text>
        </VStack>
      ) : (
        <></>
      )}
    </>
  );
  const footerComponent = () => <Divider mt={20} />;
  const renderItem = ({ item }) => (
    <Box
      borderTopWidth="1"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
      backgroundColor="white"
      mt="0.5"
      mb="1"
      pl="2"
      py="1.5"
    >
      <AvatarCard
        avatarSize="md"
        nameUser={item.userFullName}
        images={item.userAvatar}
        subText={item.time}
      />
      <Box mt={2}>
        <Text italic style={styles.textContentType}>
          {item.description}
        </Text>
      </Box>
    </Box>
  );

  useEffect(() => {
    getPostReportDetail({ id: 5 });
  }, []);

  return (
    <AdminReport>
      <FlatList
        ListHeaderComponent={headerListComponent}
        ListFooterComponent={footerComponent}
        pt="0.5"
        data={reportDetailList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </AdminReport>
  );
};

export default AdminReportPostDetailScreen;
