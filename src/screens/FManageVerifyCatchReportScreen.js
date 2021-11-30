import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, FlatList, HStack, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";

import AvatarCard from "../components/AvatarCard";
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
  const unresolvedCatchReportList = useStoreState(
    (states) => states.FManageModel.unresolvedCatchReportList,
  );

  const memoizedStyle = useMemo(
    () =>
      unresolvedCatchReportList && unresolvedCatchReportList.length > 0
        ? null
        : { flex: 1, justifyContent: "center" },
    [unresolvedCatchReportList && unresolvedCatchReportList.length > 0],
  );

  const getUnresolvedCatchReportList = useStoreActions(
    (actions) => actions.FManageModel.getUnresolvedCatchReportList,
  );

  const onEndReached = () => {
    getUnresolvedCatchReportList({ status: "APPEND" });
  };

  useEffect(() => {
    getUnresolvedCatchReportList({ status: "OVERWRITE" });
  }, []);

  const renderEmtpy = () => (
    <Text color="gray.500" alignSelf="center">
      Chưa có báo cá nào cần duyệt
    </Text>
  );

  const renderItem = ({ item }) => <UnresolvedCatchReportComponent {...item} />;

  return (
    <Box>
      <HeaderTab name="Xác nhận báo cá" />
      <Box w={{ base: "100%", md: "25%" }}>
        <FlatList
          pt="0.5"
          height="90%"
          contentContainerStyle={memoizedStyle}
          data={unresolvedCatchReportList}
          renderItem={renderItem}
          ListEmptyComponent={renderEmtpy}
          keyExtractor={KEY_EXTRACTOR}
          onEndReached={onEndReached}
        />
      </Box>
    </Box>
  );
};

export default VerifyCatchReportScreen;
