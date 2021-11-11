import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { goToAdminFLocationReportDetailScreen } from "../../navigations";
import HeaderTab from "../HeaderTab";
import ReviewReportCard from "./ReportCard";

const styles = StyleSheet.create({
  flatList: { marginTop: 12 },
});

const FLocationReportRoute = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("");
  const reportListModel = useStoreState(
    (states) => states.ReportModel.listLocationReport,
  );
  const [reportList, setReportList] = useState(reportListModel);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          goToAdminFLocationReportDetailScreen(navigation);
        }}
      >
        <ReviewReportCard {...item} isFLocationReport />
      </TouchableOpacity>
    );
  };
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
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          data={reportList}
        />
      </View>
    </>
  );
};

export default FLocationReportRoute;
