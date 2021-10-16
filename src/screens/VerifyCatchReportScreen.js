import { Box, Button, FlatList, HStack, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";

const VerifyCatchReportScreen = ({ angler }) => {
  const dummyMenu = [
    {
      id: 1,
      message: "Ngoi ca sang",
      caches: "Ro dong, Diec",
      time: "09:00 01/01/2021",
    },
    {
      id: 2,
      message: "Ngoi ca sang",
      caches: "Ro dong, Diec",
      time: "09:00 01/02/2021",
    },
    {
      id: 3,
      message: "Ngoi ca sang",
      caches: "Ro dong, Diec",
      time: "09:00 01/03/2021",
    },
    {
      id: 4,
      message: "Ngoi ca sang",
      caches: "Ro dong, Diec",
      time: "09:00 01/04/2021",
    },
  ];
  const onPressHandler = () => {
    console.log("ahhh, you press me");
  };
  return (
    <Box>
      <HeaderTab name="Lịch sử báo cá" />
      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <FlatList
          data={dummyMenu}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pb="1"
              // keyExtractor={(item.id) => item.index_id.toString()}
            >
              <PressableCustomCard
                paddingX="3"
                paddingY="1"
                onPress={onPressHandler}
              >
                <HStack pl="2" justifyContent="space-between">
                  <Box width="65%">
                    <AvatarCard
                      avatarSize="md"
                      nameUser={angler.name}
                      subText={item.time}
                      subTextFontSize="xs"
                    />
                    <Box mt={2}>
                      <Text italic>{item.message}</Text>
                      <Text>
                        <Text bold>Đã câu được :</Text>
                        {item.caches}
                      </Text>
                    </Box>
                  </Box>
                  <VStack
                    justifyContent="center"
                    space={2.5}
                    mt="4"
                    width="33%"
                  >
                    <Button colorScheme="tertiary">Đồng ý</Button>
                    <Button>Chi tiết</Button>
                  </VStack>
                </HStack>
              </PressableCustomCard>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </Box>
  );
};

VerifyCatchReportScreen.defaultProps = {
  angler: { id: "1", name: "Dat" },
};
VerifyCatchReportScreen.propTypes = {
  angler: PropTypes.objectOf(PropTypes.string, PropTypes.string),
};
export default VerifyCatchReportScreen;
