import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Divider, FlatList, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import styles from "../config/styles";
import { DEFAULT_TIMEOUT } from "../constants";
import { goBack, goToAdminFLocationOverviewScreen } from "../navigations";
import { showAlertAbsoluteBox, showToastMessage } from "../utilities";

const AdminFLocationReportDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isSuccess, setIsSuccess] = useState(null); // get data success
  const [isActive, setActive] = useState(true);
  const [isSolvedSuccess, setIsSolvedSuccess] = useState(null); // post solved report handler success
  const [isLoading, setIsLoading] = useState(null);
  const [screenLoading, setScreenLoading] = useState(true);
  const [reportId, setReportId] = useState();
  const locationReportDetail = useStoreState(
    (states) => states.ReportModel.locationReportDetail,
  );
  const { locationId, locationName, time, reportDetailList } =
    locationReportDetail;
  const getLocationReportDetail = useStoreActions(
    (actions) => actions.ReportModel.getLocationReportDetail,
  );
  const solvedReport = useStoreActions(
    (actions) => actions.ReportModel.solvedReport,
  );

  const solvedReportHandler = () => {
    setIsLoading(true);
    solvedReport({ id: reportId, setIsSuccess: setIsSolvedSuccess });
  };

  const goToFLocationDetailHandler = () => {
    goToAdminFLocationOverviewScreen(navigation, {
      id: locationId,
    });
  };

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
        <Text bold>Thời gian báo cáo :</Text> {time}
      </Text>
      <Divider />
      <Text bold style={styles.textContentType}>
        Danh sách báo cáo :
      </Text>
    </VStack>
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

  const clearScreenLoadingIndicator = () => setScreenLoading(false);

  useEffect(() => {
    if (route.params.id) {
      getLocationReportDetail({ id: route.params.id, setIsSuccess }).finally(
        clearScreenLoadingIndicator,
      );
      setReportId(route.params.id);
    }
    const screenTimeout = setTimeout(
      clearScreenLoadingIndicator,
      DEFAULT_TIMEOUT,
    );
    setIsLoading(true);
    setActive(route.params.isActive);
    return () => {
      clearTimeout(screenTimeout);
    };
  }, []);

  useEffect(() => {
    if (isSuccess === false) {
      showAlertAbsoluteBox(
        "Thông báo",
        "Xảy ra lỗi, vui lòng quay lại.",
        goBack(navigation),
      );
    }
    setIsLoading(false);
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

export default AdminFLocationReportDetailScreen;
