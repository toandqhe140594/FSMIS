import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Divider, FlatList, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import EventPostCard from "../components/EventPostCard";
import styles from "../config/styles";
import { showAlertAbsoluteBox } from "../utilities";

const AdminReportCatchDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isSuccess, setIsSuccess] = useState(null);
  const catchReportDetail = useStoreState(
    (states) => states.ReportModel.catchReportDetail,
  );
  const getCatchReportDetail = useStoreActions(
    (actions) => actions.ReportModel.getCatchReportDetail,
  );

  const {
    locationName,
    reportTime,
    catchesOverviewNoImageDtoOut,
    reportDetailList,
  } = catchReportDetail;

  const listEvent = [{ name: "Xóa bài viết", onPress: () => {} }];

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
  const headerListComponent = () => (
    <VStack space={3} mt={4} px={3}>
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
        <Button>Đi tới trang</Button>
      </Box>

      <Divider />
      <Text style={styles.textContentType}>
        <Text bold>Thời gian báo cáo :</Text> {reportTime}
      </Text>
      <Divider />
      {catchesOverviewNoImageDtoOut !== undefined && (
        <EventPostCard
          id={catchesOverviewNoImageDtoOut.id}
          iconEvent={listEvent}
          iconName="ellipsis-vertical"
          postStyle="ANGLER_POST"
          fishList={catchesOverviewNoImageDtoOut.fishes}
          anglerName={catchesOverviewNoImageDtoOut.userFullName}
          postTime={catchesOverviewNoImageDtoOut.time}
          imageAvatar={catchesOverviewNoImageDtoOut.avatar}
          image="https://picsum.photos/400"
          anglerContent={catchesOverviewNoImageDtoOut.description}
          isApproved={catchesOverviewNoImageDtoOut.approved}
        />
      )}

      <Text bold style={styles.textContentType}>
        Danh sách báo cáo :
      </Text>
    </VStack>
  );
  const footerComponent = () => <Divider mt={20} />;

  useEffect(() => {
    if (route.params.id) {
      getCatchReportDetail({ id: route.params.id, setIsSuccess });
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
