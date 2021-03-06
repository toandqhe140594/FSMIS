import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Divider, FlatList, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import ReviewFromAnglerSection from "../components/ReviewFromAnglerSection";
import styles from "../config/styles";
import { DEFAULT_TIMEOUT } from "../constants";
import { goToAdminFLocationOverviewScreen } from "../navigations";
import {
  showAlertAbsoluteBox,
  showAlertBox,
  showAlertConfirmBox,
  showToastMessage,
} from "../utilities";

const AdminReportReviewDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isActive, setActive] = useState(true);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isSolvedSuccess, setIsSolvedSuccess] = useState(null); // post solved report handler success
  const [isLoading, setIsLoading] = useState(null);
  const [screenLoading, setScreenLoading] = useState(true);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(null);
  const [reportId, setReportId] = useState();

  const reviewReportDetail = useStoreState(
    (states) => states.ReportModel.reviewReportDetail,
  );
  const {
    locationId,
    locationName,
    reportTime,
    reviewDtoOut,
    reportDetailList,
  } = reviewReportDetail;
  const { getReviewReportDetail, solvedReport, deleteReview } = useStoreActions(
    (actions) => actions.ReportModel,
  );

  const deleteReviewHandler = () => {
    deleteReview({ id: reviewDtoOut.id, setIsSuccess: setIsDeleteSuccess });
    setIsLoading(true);
  };

  const goToFLocationDetailHandler = () => {
    goToAdminFLocationOverviewScreen(navigation, { id: locationId });
  };
  const solvedReportHandler = () => {
    solvedReport({ id: reportId, setIsSuccess: setIsSolvedSuccess });
    setIsLoading(true);
  };
  const onPressHandler = () => {
    showAlertConfirmBox(
      "Xác nhận xóa review.",
      `Review của ${reviewDtoOut.userFullName} tại hồ ${locationName} sẽ bị xóa.`,
      deleteReviewHandler,
    );
  };

  const headerListComponent = () => (
    <>
      {reviewDtoOut !== undefined ? (
        <VStack space={3} mt={4} px={3} pb={2}>
          <Box
            backgroundColor="white"
            paddingTop={2}
            paddingBottom={2}
            flexDirection="row"
          >
            <ReviewFromAnglerSection
              id={reviewDtoOut.id}
              name={reviewDtoOut.userFullName}
              content={reviewDtoOut.description}
              date={reviewDtoOut.time}
              isDisabled
              rate={reviewDtoOut.score}
              negativeCount={reviewDtoOut.upvote}
              positiveCount={reviewDtoOut.downvote}
              userImage={reviewDtoOut.userAvatar}
              isAdminView
            />
            <Button
              alignSelf="flex-end"
              style={{ position: "relative", bottom: 11, right: 10 }}
              colorScheme="danger"
              onPress={onPressHandler}
              isDisabled={!isActive}
            >
              Gỡ review
            </Button>
          </Box>
          <Divider />
          <Box
            style={styles.textContentType}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Text bold>Điểm câu</Text>
              <Text>{locationName}</Text>
            </Box>
            <Button onPress={goToFLocationDetailHandler}>Đi tới trang</Button>
          </Box>
          <Divider />
          <Text style={styles.textContentType}>
            <Text bold>Thời gian báo cáo :</Text> {reportTime}
          </Text>
          <Divider />
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
        subTextFontSize="12"
      />
      <Box mt={0.5} ml={2}>
        <Text style={styles.textContentType}>{item.description}</Text>
      </Box>
    </Box>
  );

  const clearScreenLoadingIndicator = () => setScreenLoading(false);

  useEffect(() => {
    if (route.params.id) {
      getReviewReportDetail({ id: route.params.id, setIsSuccess }).finally(
        clearScreenLoadingIndicator,
      );
      setReportId(route.params.id);
    }
    setActive(route.params.isActive);
    const screenTimeout = setTimeout(
      clearScreenLoadingIndicator,
      DEFAULT_TIMEOUT,
    );
    return () => clearTimeout(screenTimeout);
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
      showToastMessage("Xử lý thành công");
      setActive(false);
    }
    if (isSolvedSuccess === false) {
      showToastMessage("Đã xảy ra lỗi, vui lòng thử lại");
    }
    setIsLoading(false);
    setIsSolvedSuccess(null);
  }, [isSolvedSuccess]);

  useEffect(() => {
    if (isDeleteSuccess === true) {
      showAlertBox(
        "Thao tác thành công",
        `Review của ${reviewDtoOut.userFullName} đã được xóa`,
      );
    }
    if (isDeleteSuccess === false) {
      showToastMessage("Đã xảy ra lỗi, vui lòng thử lại");
    }
    setIsLoading(false);
    setIsDeleteSuccess(null);
  }, [isDeleteSuccess]);

  return (
    <AdminReport
      isActive={isActive}
      eventPress={solvedReportHandler}
      isLoading={isLoading}
      screenLoading={screenLoading}
    >
      <FlatList
        pt="0.5"
        data={reportDetailList}
        ListHeaderComponent={headerListComponent}
        ListFooterComponent={footerComponent}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </AdminReport>
  );
};
export default AdminReportReviewDetailScreen;
