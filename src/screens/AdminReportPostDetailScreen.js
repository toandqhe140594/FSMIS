import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Divider, FlatList, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import EventPostCard from "../components/EventPostCard";
import styles from "../config/styles";
import { goToAdminFLocationOverviewScreen } from "../navigations";
import {
  showAlertAbsoluteBox,
  showAlertBox,
  showAlertConfirmBox,
} from "../utilities";

const AdminReportPostDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isSuccess, setIsSuccess] = useState(null);
  const [isActive, setActive] = useState(true);
  const [isLoading, setIsLoading] = useState(null);
  const [isSolvedSuccess, setIsSolvedSuccess] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(null);
  // const [reportId, setReportId] = useState(null);
  // const [postId, setPostId] = useState(null);
  const postReportDetail = useStoreState(
    (states) => states.ReportModel.postReportDetail,
  );

  const { solvedReport, deletePost, getPostReportDetail } = useStoreActions(
    (actions) => actions.ReportModel,
  );

  const { locationId, locationName, reportTime, postDtoOut, reportDetailList } =
    postReportDetail;

  const solvedReportHandler = () => {
    solvedReport({ id: postDtoOut.id, setIsSuccess: setIsSolvedSuccess });
    setIsLoading(true);
  };

  const deletePostHandler = () => {
    deletePost({ id: postDtoOut.id, setIsSuccess: setIsDeleteSuccess });
    setIsLoading(true);
  };

  const onPressHandler = () => {
    showAlertConfirmBox(
      "Xác nhận xóa bài đăng.",
      `Bài đăng tại hồ ${locationName} sẽ bị xóa.`,
      deletePostHandler,
    );
  };
  const listEvent = [{ name: "Xóa bài viết", onPress: onPressHandler }];
  const goToFLocationDetailHandler = () => {
    goToAdminFLocationOverviewScreen(navigation, { id: locationId });
  };
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
        <VStack space={3} mt={4} px={3} pb={2}>
          <Box
            style={styles.textContentType}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Text bold>Điểm câu bị báo cáo</Text>
              <Text>{locationName}</Text>
            </Box>
            <Button onPress={goToFLocationDetailHandler}>Đi tới trang</Button>
          </Box>
          <Divider />
          <Text style={styles.textContentType}>
            <Text bold>Thời gian báo cáo :</Text> {reportTime}
          </Text>
          <Divider />
          <Box backgroundColor="white" px={1.5} pb={2}>
            <EventPostCard
              id={postDtoOut.id}
              iconEvent={listEvent}
              iconName="ellipsis-vertical"
              postStyle="LAKE_POST"
              uri={postDtoOut.uri}
              typeUri={postDtoOut.attachmentType}
              postTime={postDtoOut.postTime}
              edited={postDtoOut.edited}
              lakePost={{
                badge: typeBadge,
                content: postDtoOut.content,
              }}
            />
          </Box>
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
      mt={0.5}
      mb={1}
      pl={3}
      pt={1}
      pb={2}
      mx={2}
    >
      <AvatarCard
        avatarSize="md"
        nameUser={item.userFullName}
        image={item.userAvatar}
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
    if (route.params.id) {
      getPostReportDetail({ id: route.params.id, setIsSuccess });
      // setReportId(route.params.id);
    }
    setActive(route.params.isActive);
  }, []);

  useEffect(() => {
    if (isSuccess === false) {
      showAlertAbsoluteBox(
        "Thông báo",
        "Xảy ra lỗi, vui lòng quay lại.",
        () => {
          navigation.goBack();
        },
        "Xác nhận",
      );
    }
    setIsSuccess(null);
  }, [isSuccess]);
  useEffect(() => {
    if (isSolvedSuccess === true) {
      showAlertAbsoluteBox(
        "Xử lý thành công",
        ``,
        () => {
          navigation.goBack();
        },
        "Xác nhận",
      );
    }
    if (isSolvedSuccess === false) {
      showAlertAbsoluteBox(
        "Lỗi",
        `Đã xảy ra lỗi, vui lòng thử lại.`,
        () => {},
        "Xác nhận",
      );
    }
    setIsLoading(false);
    setIsSolvedSuccess(null);
  }, [isSolvedSuccess]);

  useEffect(() => {
    if (isDeleteSuccess === true) {
      showAlertBox(
        "Thành công",
        `Bài viết đã được gỡ khỏi trang sự kiện của hồ ${locationName}.`,
      );
    }
    if (isDeleteSuccess === false) {
      showAlertBox("Lỗi", `Đã xảy ra lỗi, vui lòng thử lại.`);
    }
    setIsLoading(false);
    setIsDeleteSuccess(null);
  }, [isDeleteSuccess]);

  return (
    <AdminReport
      isActive={isActive}
      eventPress={solvedReportHandler}
      isLoading={isLoading}
    >
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
