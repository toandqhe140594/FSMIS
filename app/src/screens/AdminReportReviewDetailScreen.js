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
      "X??c nh???n x??a review.",
      `Review c???a ${reviewDtoOut.userFullName} t???i h??? ${locationName} s??? b??? x??a.`,
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
              G??? review
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
              <Text bold>??i???m c??u</Text>
              <Text>{locationName}</Text>
            </Box>
            <Button onPress={goToFLocationDetailHandler}>??i t???i trang</Button>
          </Box>
          <Divider />
          <Text style={styles.textContentType}>
            <Text bold>Th???i gian b??o c??o :</Text> {reportTime}
          </Text>
          <Divider />
          <Text bold style={styles.textContentType}>
            Danh s??ch b??o c??o :
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
        "Th??ng b??o",
        "X???y ra l???i, vui l??ng quay l???i.",
        () => {
          navigation.goBack();
        },
        "X??c nh???n",
      );
    }
    setIsSuccess(null);
  }, [isSuccess]);

  useEffect(() => {
    if (isSolvedSuccess === true) {
      showToastMessage("X??? l?? th??nh c??ng");
      setActive(false);
    }
    if (isSolvedSuccess === false) {
      showToastMessage("???? x???y ra l???i, vui l??ng th??? l???i");
    }
    setIsLoading(false);
    setIsSolvedSuccess(null);
  }, [isSolvedSuccess]);

  useEffect(() => {
    if (isDeleteSuccess === true) {
      showAlertBox(
        "Thao t??c th??nh c??ng",
        `Review c???a ${reviewDtoOut.userFullName} ???? ???????c x??a`,
      );
    }
    if (isDeleteSuccess === false) {
      showToastMessage("???? x???y ra l???i, vui l??ng th??? l???i");
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
