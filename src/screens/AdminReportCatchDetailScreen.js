import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Divider, FlatList, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import OverlayLoading from "../components/common/OverlayLoading";
import EventPostCard from "../components/EventPostCard";
import styles from "../config/styles";
import { goToAdminFLocationOverviewScreen } from "../navigations";
import {
  showAlertAbsoluteBox,
  showAlertBox,
  showAlertConfirmBox,
} from "../utilities";

// View report about angler catch.
const AdminReportCatchDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isSuccess, setIsSuccess] = useState(null);
  const [isActive, setActive] = useState(true);
  const [isSolvedSuccess, setIsSolvedSuccess] = useState(null); // post solved report handler success
  const [isLoading, setIsLoading] = useState(null);
  const [reportId, setReportId] = useState();
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(null);
  const catchReportDetail = useStoreState(
    (states) => states.ReportModel.catchReportDetail,
  );

  const { solvedReport, getCatchReportDetail, deleteCatch, reset } =
    useStoreActions((actions) => actions.ReportModel);
  const {
    locationId,
    locationName,
    reportTime,
    catchesOverviewDtoOut,
    reportDetailList,
  } = catchReportDetail;

  const goToFLocationDetailHandler = () => {
    goToAdminFLocationOverviewScreen(navigation, { id: locationId });
  };
  const deleteCatchHandler = () => {
    deleteCatch({
      id: catchesOverviewDtoOut.id,
      setIsSuccess: setIsDeleteSuccess,
    });
    setIsLoading(true);
  };
  const onPressHandler = () => {
    showAlertConfirmBox(
      "Xác nhận xóa báo cá.",
      `Báo cá đăng tại hồ ${locationName} của ${catchesOverviewDtoOut.userFullName} sẽ bị xóa.`,
      deleteCatchHandler,
    );
  };
  const solvedReportHandler = () => {
    solvedReport({ id: reportId, setIsSuccess: setIsSolvedSuccess });
    setIsLoading(true);
  };
  const listEvent = [{ name: "Xóa bài viết", onPress: onPressHandler }];

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
  const headerListComponent = () => (
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
      {catchesOverviewDtoOut !== undefined && (
        <Box backgroundColor="white" px={1.5} pb={2}>
          <EventPostCard
            id={catchesOverviewDtoOut.id}
            iconEvent={listEvent}
            iconName="ellipsis-vertical"
            postStyle="ANGLER_POST"
            fishList={catchesOverviewDtoOut.fishes}
            anglerName={catchesOverviewDtoOut.userFullName}
            postTime={catchesOverviewDtoOut.time}
            imageAvatar={catchesOverviewDtoOut.avatar}
            uri={catchesOverviewDtoOut.images[0]}
            typeUri="IMAGE"
            anglerContent={catchesOverviewDtoOut.description}
            isApproved={catchesOverviewDtoOut.approved}
          />
        </Box>
      )}

      <Text bold style={styles.textContentType}>
        Danh sách báo cáo :
      </Text>
    </VStack>
  );
  const footerComponent = () => <Divider mt={20} />;

  useEffect(() => {
    reset();
    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, 300);
    if (route.params.id) {
      getCatchReportDetail({ id: route.params.id, setIsSuccess });
      setReportId(route.params.id);
    }
    setIsLoading(true);
    setActive(route.params.isActive);
    return () => clearTimeout(timeout);
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
        `Báo cáo đã được chuyển sang mục "Đã sử lý".`,
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
        `Bài viết đã được gỡ khỏi trang báo cá của hồ ${locationName}.`,
      );
    }
    if (isDeleteSuccess === false) {
      showAlertBox("Lỗi", `Đã xảy ra lỗi, vui lòng thử lại.`);
    }
    setIsLoading(false);
    setIsDeleteSuccess(null);
  }, [isDeleteSuccess]);
  if (isLoading) {
    return <OverlayLoading coverScreen />;
  }
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

export default AdminReportCatchDetailScreen;
