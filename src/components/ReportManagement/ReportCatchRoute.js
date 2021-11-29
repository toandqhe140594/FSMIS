import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Select } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { goToAdminCatchReportDetail } from "../../navigations";
import OverlayLoading from "../common/OverlayLoading";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const OFF_SET = 100;
const FILTER_TOUCHED_LABEL = "Đã xử lý";
const FILTER_TOUCHED_VALUE = "ACTIVE";
const FILTER_UNTOUCHED_LABEL = "Chưa xử lý";
const FILTER_UNTOUCHED_VALUE = "INACTIVE";

const ReportCatchRoute = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const isFocusedRef = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [bigLoading, setBigLoading] = useState(false);
  const [getStatus, setGetStatus] = useState(null);
  const [mode, setMode] = useState("DEFAULT");
  const [query, setQuery] = useState({ pageNo: 1, active: true });
  const [filter, setFilter] = useState(FILTER_UNTOUCHED_VALUE);
  const { listCatchReport, totalCatchReportPage } = useStoreState(
    (state) => state.ReportModel,
  );
  const { getListReportCatch, resetReportList } = useStoreActions(
    (actions) => actions.ReportModel,
  );

  const memoizedStyle = useMemo(
    () =>
      !listCatchReport.length
        ? { flex: 1, justifyContent: "center", alignItem: "center" }
        : null,
    [listCatchReport.length > 0],
  );

  const handleCatchReportDetailNavigate = (id, active) => () => {
    goToAdminCatchReportDetail(navigation, {
      isActive: active,
      id,
    });
  };

  const keyExtractor = (item) => item.id.toString();

  const renderEmpty = () => (
    <Text style={{ color: "gray" }}>Chưa có báo cáo nào</Text>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={handleCatchReportDetailNavigate(item.id, item.active)}
    >
      <ReportCard {...item} isCatchReportType />
    </TouchableOpacity>
  );

  const renderFooter = () =>
    isLoading && !bigLoading ? (
      <View margin={12}>
        <ActivityIndicator size="large" color="#2089DC" />
      </View>
    ) : null;
  /**
   * Change to new list
   * @param {String} value selected value
   */
  const handleValueChange = (value) => {
    if (value !== filter) {
      setFilter(value);
      setQuery({ pageNo: 1, active: value === FILTER_UNTOUCHED_VALUE });
      setMode("NEW");
      setBigLoading(true); // When change between each list type, use bigLoading
      setIsLoading(true);
    }
  };

  /**
   * When FlatList scroll to bottom,
   * process to the next catch report page
   */
  const handleLoadMore = () => {
    if (query.pageNo < totalCatchReportPage) {
      setMode("DEFAULT");
      setQuery((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      setIsLoading(true);
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
    if (isLoading) getListReportCatch({ mode, query, setGetStatus });
  }, [isLoading]);
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

  /**
   * Trigger whenever screen focus state changes
   */
  useEffect(() => {
    if (!isFocusedRef.current) {
      setIsLoading(true);
      setMode("NEW");
      setQuery((prev) => ({ ...prev, pageNo: 1 }));
    }
    isFocusedRef.current = isFocused;
  }, [isFocused]);
  return (
    <>
      <HeaderTab name="Quản lý báo cáo" />
      <OverlayLoading loading={isLoading && bigLoading} />
      <View marginBottom={OFF_SET}>
        <Select
          w="90%"
          my={2}
          alignSelf="center"
          placeholder="Lọc hiển thị báo cáo"
          defaultValue={FILTER_UNTOUCHED_VALUE}
          onValueChange={handleValueChange}
          fontSize="md"
        >
          <Select.Item
            label={FILTER_UNTOUCHED_LABEL}
            value={FILTER_UNTOUCHED_VALUE}
          />
          <Select.Item
            label={FILTER_TOUCHED_LABEL}
            value={FILTER_TOUCHED_VALUE}
          />
        </Select>

        <FlatList
          height="100%"
          contentContainerStyle={memoizedStyle}
          keyExtractor={keyExtractor}
          data={listCatchReport}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
        />
      </View>
    </>
  );
};

export default ReportCatchRoute;
