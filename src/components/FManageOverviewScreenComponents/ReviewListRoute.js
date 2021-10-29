import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, ScrollView } from "native-base";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Divider, Text } from "react-native-elements";
import { Rating } from "react-native-ratings";

import styles from "../../config/styles";
import { goToWriteReviewScreen } from "../../navigations";
import ReviewFromAnglerSection from "../ReviewFromAnglerSection";

const FilterButton = ({ filterType, content, value, changeFilterAction }) => {
  const onPress = () => {
    changeFilterAction(value);
  };

  return (
    <Button
      onPress={() => {
        onPress();
      }}
    >
      <Text
        style={[
          styles.textwhite,
          filterType === value && styles.textBoldButton,
        ]}
      >
        {content}
      </Text>
    </Button>
  );
};
FilterButton.propTypes = {
  filterType: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  changeFilterAction: PropTypes.func.isRequired,
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

const ReviewListRoute = () => {
  const navigation = useNavigation();
  const [reviewPage, setReviewPage] = useState(1);
  const [filterType, setFilterType] = useState("newest");

  const { locationReviewScore, personalReview, locationReviewList, currentId } =
    useStoreState((states) => states.LocationModel);

  const {
    getLocationReviewScore,
    getPersonalReview,
    resetPersonalReview,
    getLocationReviewListByPage,
  } = useStoreActions((actions) => actions.LocationModel);

  const loadMoreReviewData = () => {
    getLocationReviewListByPage({ pageNo: reviewPage, filter: filterType });
    setReviewPage(reviewPage + 1);
  };

  const resetReviewData = () => {
    getLocationReviewListByPage({ pageNo: 1, filter: filterType });
    setReviewPage(2);
  };

  useFocusEffect(
    useCallback(() => {
      getLocationReviewScore();
      getPersonalReview();
      resetReviewData();
      return () => {
        resetPersonalReview();
      };
    }, []),
  );

  useEffect(() => {
    resetReviewData();
  }, [filterType]);

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          console.log("end reach"); // Test only
          loadMoreReviewData();
        }
      }}
    >
      <Box>
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
        <Box p={3}>
          <Text style={{ fontWeight: "bold" }}>Đánh giá từ cộng đồng</Text>
          <Button.Group mt={4}>
            <FilterButton
              filterType={filterType}
              content="Mới nhất"
              value="newest"
              changeFilterAction={setFilterType}
            />
            <FilterButton
              filterType={filterType}
              content="Cao nhất"
              value="highest"
              changeFilterAction={setFilterType}
            />
            <FilterButton
              filterType={filterType}
              content="Thấp nhất"
              value="lowest"
              changeFilterAction={setFilterType}
            />
          </Button.Group>
        </Box>
        <Divider />
        {locationReviewList &&
          locationReviewList.length > 0 &&
          locationReviewList.map((item) => {
            const { userVoteType } = item;
            return (
              <Box key={item.id}>
                <ReviewFromAnglerSection
                  name={item.userFullName}
                  content={item.description}
                  isPositive={userVoteType === true}
                  isNeutral={userVoteType === null}
                  date={item.time}
                  positiveCount={item.upvote}
                  negativeCount={item.downvote}
                  rate={item.score}
                  id={item.id}
                  key={item.id}
                />
                <Divider />
              </Box>
            );
          })}
      </Box>
    </ScrollView>
  );
};

export default ReviewListRoute;
