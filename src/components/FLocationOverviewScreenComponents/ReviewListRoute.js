import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, ScrollView } from "native-base";
import React, { useEffect } from "react";
import { Divider, Text } from "react-native-elements";
import { Rating } from "react-native-ratings";

import HeaderTab from "../HeaderTab";
import ReviewFromAnglerSection from "../ReviewFromAnglerSection";

const ReviewListRoute = () => {
  const { locationShortInformation, locationReviewScore } = useStoreState(
    (states) => states.LocationModel,
  );

  const getLocationReviewScore = useStoreActions(
    (actions) => actions.LocationModel.getLocationReviewScore,
  );

  useEffect(() => {
    getLocationReviewScore();
  }, []);

  const { id, name, isVerified } = locationShortInformation;

  return (
    <ScrollView>
      <Box>
        <HeaderTab id={id} name={name} isVerified={isVerified} flagable />
        <Divider />
        <Center flex={1} py={3}>
          <Text h2>{locationReviewScore.score || 0}</Text>
          <Rating
            imageSize={24}
            ratingCount={5}
            readonly
            showRating={false}
            startingValue={locationReviewScore.score || 0}
          />
          <Text>({locationReviewScore.totalReviews || 0} đánh gía)</Text>
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
      </Box>
    </ScrollView>
  );
};

export default ReviewListRoute;
