import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const APIList = [
  {
    id: "1",
    userName: "Hồ câu Thuần Việt",
    postType: "Báo cá",
    isProcessed: true,
  },
  {
    id: "2",
    userName: "Hồ câu Thuần Việt",
    postType: "Thông báo",
    isProcessed: true,
  },
  {
    id: "3",
    userName: "Hồ câu Thuần Việt",
    postType: "Bồi cá",
    isProcessed: false,
  },
  {
    id: "4",
    userName: "Hồ câu Thuần Việt",
    postType: "Báo cá",
    isProcessed: true,
  },
  {
    id: "5",
    userName: "Hồ câu Thuần Việt",
    postType: "Báo cá",
    isProcessed: false,
  },
];

const styles = StyleSheet.create({
  flatList: {
    marginTop: 12,
  },
});

const renderItem = ({ item }) => <ReportCard {...item} isPostReport />;

const PostReportRoute = () => {
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
