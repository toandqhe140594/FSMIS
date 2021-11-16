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

const OFF_SET = 120;
const FILTER_TOUCHED_LABEL = "Đã xử lý";
const FILTER_TOUCHED_VALUE = "ACTIVE";
const FILTER_UNTOUCHED_LABEL = "Chưa xử lý";
const FILTER_UNTOUCHED_VALUE = "INACTIVE";

const ReviewReportRoute = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [bigLoading, setBigLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [active, setActive] = useState(true);
  const [filter, setFilter] = useState(FILTER_TOUCHED_VALUE);
  const [getStatus, setGetStatus] = useState("");
  const { listReviewReport, totalReviewReportPage } = useStoreState(
    (state) => state.ReportModel,
  );
  const { getListReviewReport, resetReportList } = useStoreActions(
    (actions) => actions.ReportModel,
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        goToAdminReviewReportDetailScreen(navigation, { id: item.id });
      }}
    >
      <ReportCard {...item} isReviewReport />
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
      setActive(value !== FILTER_UNTOUCHED_VALUE); // Change active based on list type
      setPageNo(1); // Reset pageNo to 1 for new list
      setBigLoading(true); // When change between each list type, use bigLoading
    }
  };
  const handleLoadMore = () => {
    if (pageNo < totalReviewReportPage) {
      setIsLoading(true);
      setPageNo(pageNo + 1);
    }
  };
  /**
   * Use only to reset list when unmount
   */
  useEffect(() => {
    return () => {
      resetReportList({ type: "REVIEW" });
    };
  }, []);
  /**
   * When pageNo or active changed, get next location report page
   */
  useEffect(() => {
    getListReviewReport({ pageNo, setGetStatus, active });
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
          defaultValue={FILTER_TOUCHED_VALUE}
          onValueChange={handleValueChange}
          fontSize="md"
        >
          <Select.Item
            label={FILTER_TOUCHED_LABEL}
            value={FILTER_TOUCHED_VALUE}
          />
          <Select.Item
            label={FILTER_UNTOUCHED_LABEL}
            value={FILTER_UNTOUCHED_VALUE}
          />
        </Select>

        <FlatList
          style={{ marginTop: 8 }}
          keyExtractor={(item) => `${item.id}`}
          data={listReviewReport}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          bounces={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
        />
      </View>
    </>
  );
};

export default ReviewReportRoute;
