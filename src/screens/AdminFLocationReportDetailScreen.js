import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Divider, FlatList, Text, VStack } from "native-base";
import React, { useEffect } from "react";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import styles from "../config/styles";

const AdminFLocationReportDetailScreen = () => {
  const locationReportDetail = useStoreState(
    (states) => states.ReportModel.locationReportDetail,
  );
  const { locationName, time, reportDetailList } = locationReportDetail;
  const getLocationReportDetail = useStoreActions(
    (actions) => actions.ReportModel.getLocationReportDetail,
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
        subTextFontSize="sm"
      />
      <Box mt={2}>
        <Text italic style={styles.textContentType}>
          {item.description}
        </Text>
      </Box>
    </Box>
  );
  useEffect(() => {
    getLocationReportDetail({ id: 2 });
  }, []);
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

export default AdminFLocationReportDetailScreen;
