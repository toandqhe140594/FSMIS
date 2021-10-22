import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import HeaderTab from "../HeaderTab";
import ReviewReportCard from "./ReportCard";

const styles = StyleSheet.create({
  flatList: { marginTop: 12 },
});

const APIList = [
  {
    id: "1",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: true,
  },
  {
    id: "2",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: true,
  },
  {
    id: "3",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: false,
  },
  {
    id: "4",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: true,
  },
  {
    id: "5",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: false,
  },
];

const renderItem = ({ item }) => (
  <ReviewReportCard {...item} isFLocationReport />
);

const FLocationReportRoute = () => {
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
      <View>
        <Select
          w="90%"
          my={2}
          alignSelf="center"
          placeholder="Lọc hiển thị báo cáo"
          defaultValue={<Select.Item label="Tất cả" value="Tất cả" />}
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
