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

import { goToAdminPostReportDetailScreen } from "../../navigations";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const styles = StyleSheet.create({
  flatList: {
    marginTop: 12,
  },
});

const PostReportRoute = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [momentumScrollBegin, setMomentumScrollBegin] = useState(true);
  // const [filter, setFilter] = useState("");
  const { listPostReport } = useStoreState((state) => state.ReportModel);
  const { getListPostReport, resetReportList } = useStoreActions(
    (actions) => actions.ReportModel,
  );
  // const [reportList, setReportList] = useState(reportListModel);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        goToAdminPostReportDetailScreen(navigation);
      }}
    >
      <ReportCard {...item} isPostReport />
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
    getListPostReport({ pageNo, setIsLoading });
    return () => {
      resetReportList({ type: "CATCH" });
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
      <View>
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
          style={styles.flatList}
          keyExtractor={(item) => `${item.id}`}
          data={listPostReport}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onMomentumScrollBegin={() => {}}
          onEndReached={handleLoadMore}
        />
      </View>
    </>
  );
};

export default PostReportRoute;
