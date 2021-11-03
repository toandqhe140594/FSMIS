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

  const dummyMenu = [
    {
      id: 1,
      userFullName: "Lê Tuấn Anh",
      message: "Ngoi ca sang",
      caches: "Ro dong, Diec",
      time: "09:00 01/01/2021",
    },
    {
      id: 2,
      userFullName: "Lê Tuấn Anh",
      message: "Ngoi ca sang",
      caches: "Ro dong, Diec",
      time: "09:00 01/02/2021",
    },
    {
      id: 3,
      userFullName: "Lê Tuấn Anh",
      message: "Ngoi ca sang",
      caches: "Ro dong, Diec",
      time: "09:00 01/03/2021",
    },
    {
      id: 4,
      userFullName: "Lê Tuấn Anh",
      message: "Ngoi ca sang",
      caches: "Ro dong, Diec",
      time: "09:00 01/04/2021",
    },
  ];

  const goToDetailHandler = (id) => {
    goToCatchReportVerifyDetailScreen(navigation, { id });
  };

  const onEndReached = () => {
    console.log("end reach, load more");
    getUnresolvedCatchReportList({ status: "APPEND" });
  };

  useEffect(() => {
    if (unresolvedCatchReportList.length === 0)
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
          data={dummyMenu}
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
                    nameUser={item.userFullName}
                    subText={item.time}
                    subTextFontSize="xs"
                  />
                  <Box mt={2}>
                    <Text italic isTruncated numberOfLines={1}>
                      {item.message}
                    </Text>
                    <Text numberOfLines={2} isTruncated>
                      <Text bold>Đã câu được: </Text>
                      {item.caches}
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
