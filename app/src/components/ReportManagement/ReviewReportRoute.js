import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Select } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { KEY_EXTRACTOR } from "../../constants";
import { goToAdminReviewReportDetailScreen } from "../../navigations";
import SmallScreenLoadingIndicator from "../common/SmallScreenLoadingIndicator";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const OFF_SET = 100;
const FILTER_TOUCHED_LABEL = "Đã xử lý";
const FILTER_TOUCHED_VALUE = "ACTIVE";
const FILTER_UNTOUCHED_LABEL = "Chưa xử lý";
const FILTER_UNTOUCHED_VALUE = "INACTIVE";

const ReviewReportRoute = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const isFocusedRef = useRef(true);
  const needRefresh = useRef(true);
  const mode = useRef("DEFAULT");
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState({ pageNo: 1, active: true });
  const [filter, setFilter] = useState(FILTER_UNTOUCHED_VALUE);
  const [getStatus, setGetStatus] = useState(null);
  const { listReviewReport, totalReviewReportPage } = useStoreState(
    (state) => state.ReportModel,
  );
  const { getListReviewReport, resetReportList } = useStoreActions(
    (actions) => actions.ReportModel,
  );

  const startLoading = (shouldRefresh = true) => {
    if (shouldRefresh) needRefresh.current = true;
    setIsLoading(true);
  };

  const stopLoading = () => {
    if (needRefresh.current) needRefresh.current = false;
    setIsLoading(false);
  };

  const memoizedStyle = useMemo(
    () =>
      !listReviewReport.length ? { flex: 1, justifyContent: "center" } : null,
    [listReviewReport.length > 0],
  );

  const handleReportReviewDetailNavigate = (id, active) => () => {
    goToAdminReviewReportDetailScreen(navigation, {
      isActive: active,
      id,
    });
  };

  const renderEmpty = () =>
    !isLoading && (
      <Text style={{ color: "gray", alignSelf: "center" }}>
        Chưa có báo cáo nào
      </Text>
    );

  const renderHeader = () =>
    needRefresh.current && isLoading ? (
      <SmallScreenLoadingIndicator containerStyle={{ marginBottom: 12 }} />
    ) : null;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={handleReportReviewDetailNavigate(item.id, item.active)}
    >
      <ReportCard {...item} isReviewReport />
    </TouchableOpacity>
  );

  const renderFooter = () =>
    isLoading && !needRefresh.current ? (
      <SmallScreenLoadingIndicator containerStyle={{ marginVertical: 12 }} />
    ) : null;
  /**
   * Change to new list
   * @param {String} value selected value
   */
  const handleValueChange = (value) => {
    if (value !== filter) {
      setQuery({ pageNo: 1, active: value === FILTER_UNTOUCHED_VALUE });
      setFilter(value);
      mode.current = "NEW";
      startLoading();
    }
  };
  const handleLoadMore = () => {
    if (query.pageNo < totalReviewReportPage) {
      setQuery((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      mode.current = "DEFAULT";
      startLoading(false);
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
    if (isLoading) {
      getListReviewReport({ mode: mode.current, query, setGetStatus });
    }
  }, [isLoading]);

  /**
   * Trigger whenever screen focus state changes
   */
  useEffect(() => {
    if (!isFocusedRef.current) {
      setQuery((prev) => ({ ...prev, pageNo: 1 }));
      mode.current = "NEW";
      startLoading();
    }
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  /**
   * Trigger on getStatus return
   */
  useEffect(() => {
    if (getStatus === "SUCCESS") {
      stopLoading();
      setGetStatus(null);
    } else if (getStatus === "FAILED") {
      stopLoading();
      setGetStatus(null);
    }
  }, [getStatus]);
  return (
    <>
      <HeaderTab name="Quản lý báo cáo" />
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
          keyExtractor={KEY_EXTRACTOR}
          data={listReviewReport}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
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
