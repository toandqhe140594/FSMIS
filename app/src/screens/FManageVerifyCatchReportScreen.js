import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, FlatList, HStack, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useRef, useState } from "react";

import AvatarCard from "../components/AvatarCard";
import SmallScreenLoadingIndicator from "../components/common/SmallScreenLoadingIndicator";
import HeaderTab from "../components/HeaderTab";
import { DEFAULT_TIMEOUT, KEY_EXTRACTOR } from "../constants";
import { goToCatchReportVerifyDetailScreen } from "../navigations";

const UnresolvedCatchReportComponent = ({
  name,
  postTime,
  avatar,
  description,
  fishList,
  id,
}) => {
  const navigation = useNavigation();

  let timeOut = null;

  const approveCatchReport = useStoreActions(
    (actions) => actions.FManageModel.approveCatchReport,
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const goToDetailHandler = () => {
    goToCatchReportVerifyDetailScreen(navigation, { id });
  };

  const approveHandler = () => {
    setLoading(true);
    timeOut = setTimeout(() => {
      setLoading(false);
    }, DEFAULT_TIMEOUT);
    approveCatchReport({ id, isApprove: true, setSuccess });
  };

  useEffect(() => {
    return () => {
      if (timeOut !== null) clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    if (success === false) {
      setLoading(false);
      setSuccess(null);
    }
  }, [success]);

  return (
    <Box
      borderBottomWidth="1"
      backgroundColor="white"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
      mb={1}
      px={3}
      pb={1}
    >
      <HStack pl="2" justifyContent="space-between">
        <Box width="65%">
          <AvatarCard
            avatarSize="md"
            nameUser={name}
            subText={postTime}
            subTextFontSize="xs"
            image={avatar}
          />
          <Box mt={2}>
            <Text italic isTruncated numberOfLines={1}>
              {description}
            </Text>
            <Text numberOfLines={2} isTruncated>
              <Text bold>Đã câu được: </Text>
              {fishList.join(", ")}
            </Text>
          </Box>
        </Box>
        <VStack justifyContent="center" space={2.5} mt="4" width="33%">
          <Button
            colorScheme="emerald"
            isLoading={loading}
            onPress={approveHandler}
          >
            Đồng ý
          </Button>
          <Button disabled={loading} onPress={goToDetailHandler}>
            Chi tiết
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
};
UnresolvedCatchReportComponent.propTypes = {
  name: PropTypes.string.isRequired,
  postTime: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fishList: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};

const VerifyCatchReportScreen = () => {
  const pageNo = useRef(1);
  const needRefresh = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const { unresolvedCatchReportList, unresolvedCatchReportTotalPage } =
    useStoreState((states) => states.FManageModel);
  const { getUnresolvedCatchReportList, clearUnresolvedCatchReportList } =
    useStoreActions((actions) => actions.FManageModel);

  /**
   * Start loading to run getCatchReport function
   * @param {Boolean} shouldRefresh flag to set needRefresh variable to true
   */
  const startLoading = (shouldRefresh = true) => {
    if (shouldRefresh) needRefresh.current = true;
    setIsLoading(true);
  };

  /**
   * Stop loading when get is finished
   */
  const stopLoading = () => {
    if (needRefresh.current) needRefresh.current = false;
    setIsLoading(false);
  };

  const memoizedStyle = useMemo(
    () =>
      unresolvedCatchReportList && unresolvedCatchReportList.length > 0
        ? null
        : { flex: 1, justifyContent: "center" },
    [unresolvedCatchReportList && unresolvedCatchReportList.length > 0],
  );

  /**
   * Handle go to next page to get list item
   */
  const handleLoadMore = () => {
    if (pageNo.current < unresolvedCatchReportTotalPage) {
      pageNo.current += 1;
      startLoading(false);
    }
  };

  /**
   * Handle get the list starting from page 1
   */
  const handleOnRefresh = () => {
    pageNo.current = 1;
    startLoading();
  };

  const renderEmtpy = () =>
    !isLoading && (
      <Text color="gray.500" alignSelf="center">
        Chưa có báo cá nào cần duyệt
      </Text>
    );

  const renderFooter = () =>
    isLoading &&
    !needRefresh.current && (
      <SmallScreenLoadingIndicator containerStyle={{ marginVertical: 12 }} />
    );

  const renderItem = ({ item }) => <UnresolvedCatchReportComponent {...item} />;

  const memoizedRender = useMemo(() => renderItem, [unresolvedCatchReportList]);

  useEffect(() => {
    return () => {
      clearUnresolvedCatchReportList();
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      getUnresolvedCatchReportList({ pageNo: pageNo.current }).finally(
        stopLoading,
      );
    }
  }, [isLoading]);

  return (
    <Box>
      <HeaderTab name="Xác nhận báo cá" />
      <Box w={{ base: "100%", md: "25%" }}>
        <FlatList
          pt="0.5"
          height="92%"
          contentContainerStyle={memoizedStyle}
          data={unresolvedCatchReportList}
          renderItem={memoizedRender}
          ListEmptyComponent={renderEmtpy}
          ListFooterComponent={renderFooter}
          keyExtractor={KEY_EXTRACTOR}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          onRefresh={handleOnRefresh}
          refreshing={isLoading && needRefresh.current}
        />
      </Box>
    </Box>
  );
};

export default VerifyCatchReportScreen;
