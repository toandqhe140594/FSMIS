import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { Overlay } from "react-native-elements";

import { goToAdminReviewReportDetailScreen } from "../../navigations";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const OFF_SET = 105;
const FILTER_TOUCHED_TYPE = "Đã xử lý";
const FILTER_UNTOUCHED_TYPE = "Chưa xử lý";

const ReportCatchRoute = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [bigLoading, setBigLoading] = useState(false);
  const [getStatus, setGetStatus] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [active, setActive] = useState(true);
  const [filter, setFilter] = useState(FILTER_TOUCHED_TYPE);
  const { listCatchReport, totalCatchReportPage } = useStoreState(
    (state) => state.ReportModel,
  );
  const { getListReportCatch, resetReportList } = useStoreActions(
    (actions) => actions.ReportModel,
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        goToAdminReviewReportDetailScreen(navigation);
      }}
    >
      <ReportCard {...item} isCatchReportType />
    </TouchableOpacity>
  );
  const renderFooter = () =>
    isLoading && !bigLoading ? (
      <ActivityIndicator size="large" color="#2089DC" />
    ) : null;
  /**
   * Change to new list
   * @param {String} value selected value
   */
  const handleValueChange = (value) => {
    if (value !== filter) {
      setIsLoading(true);
      setFilter(value);
      setActive(value !== FILTER_UNTOUCHED_TYPE); // Change active based on list type
      setPageNo(1); // Reset pageNo to 1 for new list
      setBigLoading(true); // When change between each list type, use bigLoading
    }
  };
  /**
   * When FlatList scroll to bottom,
   * process to the next catch report page
   */
  const handleLoadMore = () => {
    if (pageNo < totalCatchReportPage) {
      setIsLoading(true);
      setPageNo(pageNo + 1);
    }
  };
  /**
   * Use only to reset list when unmount
   */
  useEffect(() => {
    return () => {
      resetReportList({ type: "CATCH" });
    };
  }, []);
  useEffect(() => {
    getListReportCatch({ pageNo, setGetStatus, active });
  }, [pageNo, active]);
  /**
   * Trigger on getStatus return
   */
  useEffect(() => {
    if (getStatus === "SUCCESS") {
      setIsLoading(false);
      if (bigLoading) setBigLoading(false);
      setGetStatus(null);
    } else if (getStatus === "FAILED") {
      setIsLoading(false);
      if (bigLoading) setBigLoading(false);
      setGetStatus(null);
    }
  }, [getStatus]);
  return (
    <>
      <HeaderTab name="Quản lý báo cáo" />
      <Overlay
        isVisible={isLoading && bigLoading}
        fullScreen
        overlayStyle={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <ActivityIndicator size={60} color="#2089DC" />
      </Overlay>
      <View style={{ marginBottom: OFF_SET }}>
        <Select
          w="90%"
          my={2}
          alignSelf="center"
          placeholder="Lọc hiển thị báo cáo"
          defaultValue={FILTER_TOUCHED_TYPE}
          onValueChange={handleValueChange}
          fontSize="md"
        >
          <Select.Item
            label={FILTER_TOUCHED_TYPE}
            value={FILTER_TOUCHED_TYPE}
          />
          <Select.Item
            label={FILTER_UNTOUCHED_TYPE}
            value={FILTER_UNTOUCHED_TYPE}
          />
        </Select>

        <FlatList
          style={{ marginTop: 8 }}
          keyExtractor={(item) => `${item.id}`}
          data={listCatchReport}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
        />
      </View>
    </>
  );
};

export default ReportCatchRoute;
