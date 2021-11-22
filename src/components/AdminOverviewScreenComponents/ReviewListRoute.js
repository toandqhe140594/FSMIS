import { useFocusEffect } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, FlatList } from "native-base";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Divider, Text } from "react-native-elements";
import { Rating } from "react-native-ratings";

import styles from "../../config/styles";
import ReviewFromAnglerSection from "../ReviewFromAnglerSection";

const FilterButton = ({ filterType, content, value, changeFilterAction }) => {
  const onPress = () => {
    changeFilterAction(value);
  };

  return (
    <Button onPress={onPress}>
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

const ReviewListRoute = () => {
  const [reviewPage, setReviewPage] = useState(1);
  const [filterType, setFilterType] = useState("newest");

  const { locationReviewScore, locationReviewList } = useStoreState(
    (states) => states.LocationModel,
  );

  const {
    getLocationReviewScore,
    getPersonalReview,
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
    }, []),
  );

  useEffect(() => {
    resetReviewData();
  }, [filterType]);

  const onEndReached = () => {
    loadMoreReviewData();
  };

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => {
    const { userVoteType } = item;
    return (
      <Box key={item.id}>
        <ReviewFromAnglerSection
          name={item.userFullName}
          content={item.description}
          isPositive={userVoteType === true}
          isNeutral={userVoteType === null}
          isDisabled
          date={item.time}
          positiveCount={item.upvote}
          negativeCount={item.downvote}
          rate={item.score}
          id={item.id}
          key={item.id}
          isAdminView
          userImage={item.userAvatar}
        />
        <Divider />
      </Box>
    );
  };

  const ListHeaderComponent = () => (
    <>
      <Center py={3} h={100}>
        {locationReviewScore.score && locationReviewScore.score % 1 !== 0 ? (
          <Text h2>{locationReviewScore.score.toFixed(1) || 0}</Text>
        ) : (
          <Text h2>{locationReviewScore.score || 0}</Text>
        )}
        <Rating
          imageSize={24}
          ratingCount={5}
          readonly
          showRating={false}
          startingValue={locationReviewScore.score || 0}
        />
        <Text>({locationReviewScore.totalReviews || 0} đánh giá)</Text>
      </Center>

      <Divider />
      <Box p={3}>
        <Text style={styles.boldText}>Đánh giá từ cộng đồng</Text>
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
    </>
  );

  return (
    <Box flex={1}>
      <Box flex={1}>
        <FlatList
          data={locationReviewList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          onEndReached={onEndReached}
        />
      </Box>
    </Box>
  );
};

export default ReviewListRoute;