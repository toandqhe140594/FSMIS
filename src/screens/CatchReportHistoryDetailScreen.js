import { Box, ScrollView, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Image } from "react-native-elements";

import AvatarCard from "../components/AvatarCard";
import FishCard from "../components/FishCard";
import HeaderTab from "../components/HeaderTab";

const CatchReportsHistoryDetailScreen = ({ catchDetails }) => (
  <ScrollView>
    <HeaderTab name="Chi Tiết" />

    <Image
      source={{
        uri: "https://picsum.photos/400",
      }}
      style={{ width: "100%", height: 200 }}
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
        name="Ngo"
        nameSize="lg"
        subText="(09:00 01/01/2021)"
      />
      {/* <Text textAlign="right">(09:00 01/01/2021)</Text> */}

      <Box flex="1" flexDirection="row" space={2} mt="4">
        <Text bold fontSize="lg">
          Câu tại :{" "}
        </Text>
        <Text fontSize="lg" underline>
          {catchDetails.lakeName}
        </Text>
      </Box>

      <VStack mt="2" space={2}>
        <Text italic>{catchDetails.message}</Text>
        <VStack space={1}>
          <FishCard />
          <FishCard />
          <FishCard />
          <FishCard />
        </VStack>
      </VStack>
    </Box>
  </ScrollView>
);
CatchReportsHistoryDetailScreen.defaultProps = {
  catchDetails: {
    lakeName: "Hồ thuần việt",
    message:
      "-Ngồi cả sáng, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga aliquid quam maxime voluptatibus assumenda vero ab eos. Ad maiores dolore explicabo, excepturi eius at quibusdam libero maxime animi deserunt recusandae?",
  },
};
CatchReportsHistoryDetailScreen.propTypes = {
  catchDetails: PropTypes.objectOf(PropTypes.string, PropTypes.string),
};
export default CatchReportsHistoryDetailScreen;
