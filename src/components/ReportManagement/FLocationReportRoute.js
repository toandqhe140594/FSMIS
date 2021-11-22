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
import { Overlay } from "react-native-elements";

import { goToAdminFLocationReportDetailScreen } from "../../navigations";
import HeaderTab from "../HeaderTab";
import ReportCard from "./ReportCard";

const OFF_SET = 100;
const FILTER_TOUCHED_LABEL = "Đã xử lý";
const FILTER_TOUCHED_VALUE = "ACTIVE";
const FILTER_UNTOUCHED_LABEL = "Chưa xử lý";
const FILTER_UNTOUCHED_VALUE = "INACTIVE";

const FLocationReportRoute = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const isFocusedRef = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [bigLoading, setBigLoading] = useState(false);
  const [getStatus, setGetStatus] = useState(null);
  const [mode, setMode] = useState("DEFAULT");
  const [query, setQuery] = useState({ pageNo: 1, active: true });
  const [filter, setFilter] = useState(FILTER_UNTOUCHED_VALUE);
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
          goToAdminFLocationReportDetailScreen(navigation, {
            id: item.id,
            isActive: item.active,
          });
        }}
      >
        <ReportCard {...item} isFLocationReport />
      </TouchableOpacity>
    );
  };
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
      setIsLoading(true);
      setBigLoading(true);
      setFilter(value);
      setQuery({ pageNo: 1, active: value !== FILTER_UNTOUCHED_VALUE });
      setMode("NEW");
    }
  };
  /**
   * When FlatList scroll to bottom,
   * process to the next location report page
   */
  const handleLoadMore = () => {
    if (query.pageNo < totalLocationReportPage) {
      setIsLoading(true);
      setMode("DEFAULT");
      setQuery((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
    }
  };
  /**
   * Use only to reset list when unmount
   */
  useEffect(() => {
    // useIsFocus here
    return () => {
      resetReportList({ type: "LOCATION" });
    };
  }, []);
  /**
   * When pageNo or active changed, get next location report page
   */
  useEffect(() => {
    if (isLoading) {
      getListLocationReportLocation({ mode, query, setGetStatus });
    }
  }, [isLoading]);

  /**
   * Trigger whenever screen focus state changes
   */
  useEffect(() => {
    if (!isFocusedRef.current) {
      setIsLoading(true);
      setBigLoading(true);
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
      setBigLoading(false);
      setGetStatus(null);
    } else if (getStatus === "FAILED") {
      setIsLoading(false);
      setBigLoading(false);
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
            label={FILTER_TOUCHED_LABEL}
            value={FILTER_TOUCHED_VALUE}
          />
          <Select.Item
            label={FILTER_UNTOUCHED_LABEL}
            value={FILTER_UNTOUCHED_VALUE}
          />
        </Select>
        <FlatList
          height="100%"
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
