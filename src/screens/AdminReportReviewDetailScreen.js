import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Divider, FlatList, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import ReviewFromAnglerSection from "../components/ReviewFromAnglerSection";
import styles from "../config/styles";
import { goToAdminFLocationOverviewScreen } from "../navigations";
import { showAlertAbsoluteBox } from "../utilities";

const AdminReportReviewDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isSuccess, setIsSuccess] = useState(null);
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
  const getReviewReportDetail = useStoreActions(
    (actions) => actions.ReportModel.getReviewReportDetail,
  );
  const goToFLocationDetailHandler = () => {
    goToAdminFLocationOverviewScreen(navigation, { id: locationId });
  };
  const headerListComponent = () => (
    <>
      {reviewDtoOut !== undefined ? (
        <VStack space={3} mt={4} px={3} pb={2}>
          <Box backgroundColor="white" paddingTop={2} paddingBottom={2}>
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
        images={item.userAvatar}
        subText={item.time}
        subTextFontSize="12"
      />
      <Box mt={0.5} ml={2}>
        <Text style={styles.textContentType}>{item.description}</Text>
      </Box>
    </Box>
  );
  useEffect(() => {
    if (route.params.id) {
      getReviewReportDetail({ id: route.params.id, setIsSuccess });
    }
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
  return (
    <AdminReport>
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
