import { Box, Button, Center, ScrollView } from "native-base";
import React from "react";
import { Divider, Text } from "react-native-elements";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderTab from "../HeaderTab";
import ReviewFromAnglerSection from "../ReviewFromAnglerSection";

const ReviewListRoute = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <HeaderTab name="Hồ câu thuần việt" isVerified flagable />
        <Divider />
        <Center flex={1} py={3}>
          <Text h2>4.9</Text>
          <Rating
            imageSize={24}
            ratingCount={5}
            readonly
            showRating={false}
            startingValue={4.9}
          />
          <Text>(9 đánh gía)</Text>
        </Center>
        <Divider />
        <Text style={{ fontWeight: "bold", marginTop: 12, marginLeft: 12 }}>
          Đánh giá của bạn
        </Text>
        <ReviewFromAnglerSection
          name="Dao Quoc Toan"
          content="Rất tốt, ae hãy đến"
          isPositive={false}
          date="01/01/2022"
          isDisabled
          positiveCount={5}
          negativeCount={1}
          rate={5}
        />
        <Divider />
        <Box my={2} />
        <Divider />
        <Box p={3}>
          <Text style={{ fontWeight: "bold" }}>Đánh giá từ cộng đồng</Text>
          <Button.Group mt={4}>
            <Button>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "white" }}
              >
                Mới nhất
              </Text>
            </Button>
            <Button>Hữu ích nhất</Button>
            <Button>Không hữu ích nhất</Button>
          </Button.Group>
        </Box>
        <Divider />
        <ReviewFromAnglerSection
          name="Thuần Việt"
          content="Câu vui, tôi rất hài lòng nhưng hơi căng"
          isPositive
          isNeutral
          date="01/01/2022"
          positiveCount={5}
          negativeCount={1}
          rate={5}
        />
        <Divider />
        <ReviewFromAnglerSection
          name="Le Tuan Anh"
          content="Câu không vui, tôi đã căng"
          isPositive
          date="01/01/2022"
          positiveCount={5}
          negativeCount={1}
          rate={5}
        />
        <Divider />
        <ReviewFromAnglerSection
          name="Tran Quoc Toan"
          content="Rất tốt, ae hãy đừng đến"
          isPositive={false}
          date="01/01/2022"
          isDisabled={false}
          positiveCount={5}
          negativeCount={1}
          rate={5}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default ReviewListRoute;
