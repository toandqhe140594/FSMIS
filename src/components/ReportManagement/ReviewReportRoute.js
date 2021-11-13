import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { goToAdminReviewReportDetailScreen } from "../../navigations";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const styles = StyleSheet.create({
  container: {},
});

const ReviewReportRoute = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [momentumScrollBegin, setMomentumScrollBegin] = useState(true);
  // const [filter, setFilter] = useState("");
  const { listReviewReport } = useStoreState((state) => state.ReportModel);
  const { getListReviewReport, resetReportList } = useStoreActions(
    (actions) => actions.ReportModel,
  );
  // const [reportList, setReportList] = useState(reportListModel);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        goToAdminReviewReportDetailScreen(navigation);
      }}
    >
      <ReportCard {...item} isReviewReport />
    </TouchableOpacity>
  );
  const renderFooter = () =>
    isLoading ? <ActivityIndicator size="large" color="#2089DC" /> : <></>;

  const handleLoadMore = () => {
    if (!momentumScrollBegin) {
      setPageNo(pageNo + 1);
      setIsLoading(true);
      setMomentumScrollBegin(true);
    }
  };
  useEffect(() => {
    getListReviewReport({ pageNo, setIsLoading });
    return () => {
      resetReportList({ type: "REVIEW" });
    };
  }, [pageNo]);
  // useEffect(() => {
  //   const getFilteredList = () => {
  //     switch (filter) {
  //       case "ALL":
  //         return reportListModel;
  //       case "UNTOUCHED":
  //         return reportListModel.filter(({ active }) => !active);
  //       case "TOUCHED":
  //         return reportListModel.filter(({ active }) => active);
  //       default:
  //         return reportList;
  //     }
  //   };
  //   setReportList(getFilteredList());
  // }, [filter]);
  return (
    <>
      <HeaderTab name="Quản lý báo cáo" />
      <View style={styles.container}>
        <Select
          w="90%"
          my={2}
          alignSelf="center"
          placeholder="Lọc hiển thị báo cáo"
          defaultValue="ALL"
          value="ALL"
          onValueChange={() => {}}
          fontSize="md"
        >
          <Select.Item label="Tất cả" value="ALL" />
          <Select.Item label="Chưa xử lý" value="UNTOUCHED" />
          <Select.Item label="Đã xử lý" value="TOUCHED" />
        </Select>

        <FlatList
          style={{ marginTop: 12 }}
          keyExtractor={(item) => `${item.id}`}
          data={listReviewReport}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onMomentumScrollBegin={() => {
            setMomentumScrollBegin(false);
          }}
          onEndReached={handleLoadMore}
        />
      </View>
    </>
  );
};

export default ReviewReportRoute;
