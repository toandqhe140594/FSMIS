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

import { goToAdminFLocationReportDetailScreen } from "../../navigations";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const OFF_SET = 105;
const FILTER_TOUCHED_TYPE = "Đã xử lý";
const FILTER_UNTOUCHED_TYPE = "Chưa xử lý";

const FLocationReportRoute = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [bigLoading, setBigLoading] = useState(false);
  const [getStatus, setGetStatus] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [active, setActive] = useState(true);
  const [filter, setFilter] = useState(FILTER_TOUCHED_TYPE);
  const { listLocationReport, totalLocationReportPage } = useStoreState(
    (state) => state.ReportModel,
  );
  const { getListLocationReportLocation, resetReportList } = useStoreActions(
    (actions) => actions.ReportModel,
  );
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
    isLoading && !bigLoading ? (
      <ActivityIndicator size={30} color="#2089DC" />
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
   * process to the next location report page
   */
  const handleLoadMore = () => {
    if (pageNo < totalLocationReportPage) {
      setIsLoading(true);
      setPageNo(pageNo + 1);
    }
  };
  /**
   * Use only to reset list when unmount
   */
  useEffect(() => {
    return () => {
      resetReportList({ type: "LOCATION" });
    };
  }, []);
  /**
   * When pageNo or active changed, get next location report page
   */
  useEffect(() => {
    getListLocationReportLocation({ pageNo, setGetStatus, active });
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
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          bounces={false}
          data={listLocationReport}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
        />
      </View>
    </>
  );
};

export default FLocationReportRoute;
