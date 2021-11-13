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

import { goToAdminFLocationReportDetailScreen } from "../../navigations";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const styles = StyleSheet.create({
  flatList: { marginTop: 12 },
});

const FLocationReportRoute = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [momentumScrollBegin, setMomentumScrollBegin] = useState(true);
  // const [filter, setFilter] = useState("");
  const { listLocationReport } = useStoreState((state) => state.ReportModel);
  const { getListLocationReportLocation, resetReportList } = useStoreActions(
    (actions) => actions.ReportModel,
  );
  // const [reportList, setReportList] = useState(listLocationReport);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          goToAdminFLocationReportDetailScreen(navigation);
        }}
      >
        <ReportCard {...item} isFLocationReport />
      </TouchableOpacity>
    );
  };
  const renderFooter = () =>
    isLoading ? <ActivityIndicator size="large" color="#2089DC" /> : <></>;
  /**
   * When FlatList scroll to bottom,
   * process to the next location report page
   */
  const handleLoadMore = () => {
    if (!momentumScrollBegin) {
      setPageNo(pageNo + 1);
      setIsLoading(true);
      setMomentumScrollBegin(true);
    }
  };
  /**
   * When pageCurrent change, get next location report page
   */
  useEffect(() => {
    getListLocationReportLocation({ pageNo, setIsLoading });
    return () => {
      resetReportList({ type: "LOCATION" });
    };
  }, [pageNo]);
  /**
   * Listen to isLoading state
   * When the loading stops, set new location report list
   * to report list state
   */
  // useEffect(() => {
  //   if (!isLoading) {
  //     setReportList(listLocationReport);
  //   }
  // }, [isLoading]);
  /**
   * Filter list based on select option
   */
  // useEffect(() => {
  //   const getFilteredList = () => {
  //     switch (filter) {
  //       case "ALL":
  //         return reportList;
  //       case "UNTOUCHED":
  //         return reportList.filter(({ active }) => !active);
  //       case "TOUCHED":
  //         return reportList.filter(({ active }) => active);
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
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          data={listLocationReport}
          onMomentumScrollBegin={() => {
            setMomentumScrollBegin(false);
          }}
          onEndReached={handleLoadMore}
        />
      </View>
    </>
  );
};

export default FLocationReportRoute;
