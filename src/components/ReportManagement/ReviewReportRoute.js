import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const styles = StyleSheet.create({
  container: {},
});

const APIList = [
  {
    id: "1",
    reportTarget: "Nguyễn Văn A",
    isProcessed: true,
  },
  {
    id: "2",
    reportTarget: "Nguyễn Văn A",
    isProcessed: true,
  },
  {
    id: "3",
    reportTarget: "Nguyễn Văn A",
    isProcessed: false,
  },
  {
    id: "4",
    reportTarget: "Nguyễn Văn A",
    isProcessed: true,
  },
  {
    id: "5",
    reportTarget: "Nguyễn Văn A",
    isProcessed: false,
  },
];

const renderItem = ({ item }) => <ReportCard {...item} isReviewReport />;

const ReviewReportRoute = () => {
  const [filter, setFilter] = useState("");
  const [reportList, setReportList] = useState(APIList);
  useEffect(() => {
    const getFilteredList = () => {
      switch (filter) {
        case "Tất cả":
          return APIList;
        case "Chưa xử lý":
          return APIList.filter(({ isProcessed }) => !isProcessed);
        case "Đã xử lý":
          return APIList.filter(({ isProcessed }) => isProcessed);
        default:
          return reportList;
      }
    };
    setReportList(getFilteredList());
  }, [filter]);
  return (
    <>
      <HeaderTab name="Quản lý báo cáo" />
      <View style={styles.container}>
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
          style={{ marginTop: 12 }}
          data={reportList}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default ReviewReportRoute;
