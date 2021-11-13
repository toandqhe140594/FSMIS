import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { goToAdminPostReportDetailScreen } from "../../navigations";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const styles = StyleSheet.create({
  flatList: {
    marginTop: 12,
  },
});

const PostReportRoute = () => {
  const [filter, setFilter] = useState("");
  const reportListModel = useStoreState(
    (states) => states.ReportModel.listPostReport,
  );
  const [reportList, setReportList] = useState(reportListModel);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        goToAdminPostReportDetailScreen(navigation);
      }}
    >
      <ReportCard {...item} isPostReport />
    </TouchableOpacity>
  );
  useEffect(() => {
    const getFilteredList = () => {
      switch (filter) {
        case "Tất cả":
          return reportListModel;
        case "Chưa xử lý":
          return reportListModel.filter(({ isProcessed }) => !isProcessed);
        case "Đã xử lý":
          return reportListModel.filter(({ isProcessed }) => isProcessed);
        default:
          return reportList;
      }
    };
    setReportList(getFilteredList());
  }, [filter]);
  return (
    <>
      <HeaderTab name="Quản lý báo cáo" />
      <View>
        <Select
          w="90%"
          my={2}
          alignSelf="center"
          placeholder="Lọc hiển thị báo cáo"
          defaultValue="Tất cả"
          value={filter}
          onValueChange={setFilter}
          fontSize="md"
        >
          <Select.Item label="Tất cả" value="Tất cả" />
          <Select.Item label="Chưa xử lý" value="Chưa xử lý" />
          <Select.Item label="Đã xử lý" value="Đã xử lý" />
        </Select>

        <FlatList
          style={styles.flatList}
          data={reportList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

export default PostReportRoute;
