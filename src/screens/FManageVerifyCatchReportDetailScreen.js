import { Box, Button, HStack, ScrollView, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Image } from "react-native-elements";

import AvatarCard from "../components/AvatarCard";
import FishCard from "../components/FishCard";
import HeaderTab from "../components/HeaderTab";

const VerifyCatchReportDetailScreen = ({ catchDetails }) => (
  <>
    <ScrollView>
      <HeaderTab name="Chi Tiết" />

      <Image
        source={{
          uri: "https://picsum.photos/400",
        }}
        style={{ width: "100%", height: 450 }}
      />
      <Box
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pl="4"
        pr="4"
        py="2"
      >
        <AvatarCard
          avatarSize="lg"
          nameUser="Ngo"
          nameFontSize="lg"
          subText="(09:00 01/01/2021)"
        />
        {/* <Text textAlign="right">(09:00 01/01/2021)</Text> */}

        <VStack space={2} mb={3} mt={4}>
          <Text>
            <Text bold fontSize="16">
              Câu tại :{" "}
            </Text>
            <Text fontSize="18" underline>
              {catchDetails.lakeName}
            </Text>
          </Text>
          <Text italic>{catchDetails.message}</Text>
        </VStack>
        <VStack mt="4" space={2}>
          <VStack space={1}>
            <FishCard />
            <FishCard />
            <FishCard />
            <FishCard />
          </VStack>
        </VStack>
      </Box>
    </ScrollView>

    <HStack justifyContent="space-around" h="60" opacity="100">
      <Button w="49%" borderRadius="0" colorScheme="danger">
        Hủy
      </Button>
      <Button w="49%" borderRadius="0" colorScheme="tertiary">
        Xác nhận
      </Button>
    </HStack>
  </>
);
VerifyCatchReportDetailScreen.defaultProps = {
  catchDetails: {
    lakeName: "Hồ thuần việt",
    message:
      " Ngồi cả sáng, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga aliquid quam maxime voluptatibus assumenda vero ab eos. Ad maiores dolore explicabo, excepturi eius at quibusdam libero maxime animi deserunt recusandae?",
  },
};
VerifyCatchReportDetailScreen.propTypes = {
  catchDetails: PropTypes.objectOf(PropTypes.string, PropTypes.string),
};
export default VerifyCatchReportDetailScreen;
