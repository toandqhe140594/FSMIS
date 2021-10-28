import { useNavigation } from "@react-navigation/native";
import { Box, Button, FlatList, HStack, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";
import { goToCatchReportVerifyDetailScreen } from "../navigations";

const VerifyCatchReportScreen = ({ angler }) => {
  const navigation = useNavigation();

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
  const goToDetailHandler = () => {
    goToCatchReportVerifyDetailScreen(navigation);
  };
  return (
    <Box>
      <HeaderTab name="Xác báo cá" />
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
              mb="0.5"
            >
              <PressableCustomCard
                paddingX="3"
                paddingY="1"
                onPress={goToDetailHandler}
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
                    <Button onPress={goToDetailHandler}>Chi tiết</Button>
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
