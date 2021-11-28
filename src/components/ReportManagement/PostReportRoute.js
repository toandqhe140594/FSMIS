import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Select } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";

import { goToAdminPostReportDetailScreen } from "../../navigations";
import OverlayLoading from "../common/OverlayLoading";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const OFF_SET = 100;
const FILTER_TOUCHED_LABEL = "Đã xử lý";
const FILTER_TOUCHED_VALUE = "ACTIVE";
const FILTER_UNTOUCHED_LABEL = "Chưa xử lý";
const FILTER_UNTOUCHED_VALUE = "INACTIVE";

const PostReportRoute = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const isFocusedRef = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [bigLoading, setBigLoading] = useState(false);
  const [getStatus, setGetStatus] = useState(null);
  const [mode, setMode] = useState("DEFAULT");
  const [query, setQuery] = useState({ pageNo: 1, active: true });
  const [filter, setFilter] = useState(FILTER_UNTOUCHED_VALUE);
  const { listPostReport, totalPostReportPage } = useStoreState(
    (state) => state.ReportModel,
  );
  const { getListPostReport, resetReportList } = useStoreActions(
    (actions) => actions.ReportModel,
  );

  const handleReportPostDetailNavigate = (id, active) => () => {
    goToAdminPostReportDetailScreen(navigation, {
      isActive: active,
      id,
    });
  };

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={handleReportPostDetailNavigate(item.id, item.active)}
    >
      <ReportCard {...item} isPostReport />
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
      setQuery({ pageNo: 1, active: value === FILTER_UNTOUCHED_VALUE });
      setMode("NEW");
      setFilter(value);
      setIsLoading(true);
      setBigLoading(true);
    }
  };
  /**
   * When FlatList scroll to bottom,
   * process to the next post report page
   */
  const handleLoadMore = () => {
    if (query.pageNo < totalPostReportPage) {
      setQuery((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      setMode("DEFAULT");
      setIsLoading(true);
    }
  };
  /**
   * Use only to reset list when unmount
   */
  useEffect(() => {
    return () => {
      resetReportList({ type: "POST" });
    };
  }, []);
  /**
   * When pageNo or active changed, get next location report page
   */
  useEffect(() => {
    if (isLoading) getListPostReport({ mode, query, setGetStatus });
  }, [isLoading]);

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
          keyExtractor={keyExtractor}
          data={listPostReport}
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

export default PostReportRoute;
