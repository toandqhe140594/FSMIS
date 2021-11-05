import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, FlatList, HStack, Text, VStack } from "native-base";
import React, { useEffect } from "react";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import { goToCatchReportVerifyDetailScreen } from "../navigations";

const VerifyCatchReportScreen = () => {
  const navigation = useNavigation();

  const unresolvedCatchReportList = useStoreState(
    (states) => states.FManageModel.unresolvedCatchReportList,
  );

  const getUnresolvedCatchReportList = useStoreActions(
    (actions) => actions.FManageModel.getUnresolvedCatchReportList,
  );

  const goToDetailHandler = (id) => {
    goToCatchReportVerifyDetailScreen(navigation, { id });
  };

  const onEndReached = () => {
    getUnresolvedCatchReportList({ status: "APPEND" });
  };

  useEffect(() => {
    getUnresolvedCatchReportList({ status: "OVERWRITE" });
  }, []);

  return (
    <Box>
      <HeaderTab name="Xác nhận báo cá" />
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <FlatList
          pt="0.5"
          data={unresolvedCatchReportList}
          renderItem={({ item }) => (
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
                    nameUser={item.name}
                    subText={item.postTime}
                    subTextFontSize="xs"
                    image={item.avatar}
                  />
                  <Box mt={2}>
                    <Text italic isTruncated numberOfLines={1}>
                      {item.description}
                    </Text>
                    <Text numberOfLines={2} isTruncated>
                      <Text bold>Đã câu được: </Text>
                      {item.fishList}
                    </Text>
                  </Box>
                </Box>
                <VStack justifyContent="center" space={2.5} mt="4" width="33%">
                  <Button colorScheme="tertiary">Đồng ý</Button>
                  <Button
                    onPress={() => {
                      goToDetailHandler(item.id);
                    }}
                  >
                    Chi tiết
                  </Button>
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={onEndReached}
        />
      </Box>
    </Box>
  );
};

export default VerifyCatchReportScreen;
