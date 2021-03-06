import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, FlatList } from "native-base";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Divider, Text } from "react-native-elements";
import { Rating } from "react-native-ratings";

import styles from "../../config/styles";
import { KEY_EXTRACTOR } from "../../constants";
import { goToWriteReviewScreen } from "../../navigations";
import SmallScreenLoadingIndicator from "../common/SmallScreenLoadingIndicator";
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

const PersonalReviewSection = ({ personalReview, currentLocationId }) => {
  const navigation = useNavigation();
  const {
    id: reviewId,
    userFullName,
    description,
    time,
    upvote,
    downvote,
    score,
    userAvatar,
  } = personalReview;

  const goToWriteReviewScreenAction = () => {
    goToWriteReviewScreen(navigation, { id: currentLocationId });
  };

  return (
    <>
      {reviewId && (
        <ReviewFromAnglerSection
          name={userFullName}
          content={description}
          isPositive={false}
          date={time}
          isDisabled
          positiveCount={upvote}
          negativeCount={downvote}
          rate={score}
          userImage={userAvatar}
          id={reviewId}
        />
      )}
      <Divider />
      {!reviewId && (
        <Box w="90%" h={10} alignSelf="center" mt={4}>
          <Button
            variant="outline"
            colorScheme="dark"
            onPress={goToWriteReviewScreenAction}
          >
            ????ng ????nh gi??
          </Button>
        </Box>
      )}
    </>
  );
};
PersonalReviewSection.propTypes = {
  currentLocationId: PropTypes.number.isRequired,
  personalReview: PropTypes.shape({
    id: PropTypes.number,
    userFullName: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.string,
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    score: PropTypes.number,
    userAvatar: PropTypes.string,
  }).isRequired,
};

const ReviewListRoute = () => {
  const {
    checkinStatus,
    currentId,
    locationReviewScore,
    locationReviewList,
    personalReview,
  } = useStoreState((states) => states.LocationModel);

  const {
    getLocationReviewScore,
    getPersonalReview,
    getLocationReviewListByPage,
  } = useStoreActions((actions) => actions.LocationModel);

  const [reviewPage, setReviewPage] = useState(1);
  const [filterType, setFilterType] = useState("newest");
  const [loading, setLoading] = useState(true);

  // Hide loading indicator
  const closeLoadingIndicator = () => setLoading(false);

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
      Promise.all([
        getLocationReviewScore(),
        getPersonalReview(),
        resetReviewData(),
      ])
        .then(closeLoadingIndicator)
        .catch(closeLoadingIndicator);
    }, []),
  );

  useEffect(() => {
    resetReviewData();
  }, [filterType]);

  const onEndReached = () => {
    loadMoreReviewData();
  };

  const renderItem = ({ item }) => {
    const { userVoteType } = item;
    return (
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
        userImage={item.userAvatar}
      />
    );
  };

  const ListHeaderComponent = () => (
    <>
      <Center py={3}>
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
        <Text>({locationReviewScore.totalReviews || 0} ????nh gi??)</Text>
      </Center>

      <Divider />
      <Text style={{ fontWeight: "bold", marginTop: 12, marginLeft: 12 }}>
        ????nh gi?? c???a b???n
      </Text>
      {checkinStatus === "true" ? (
        <PersonalReviewSection
          personalReview={personalReview}
          currentLocationId={currentId}
        />
      ) : (
        <Box w="100%" px={3} mt={2}>
          <Text>B???n c???n checkin ????? ????ng ????nh gi?? ??? h??? n??y</Text>
        </Box>
      )}
      <Box my={2} />
      <Divider />
      <Box p={3}>
        <Text style={styles.boldText}>????nh gi?? t??? c???ng ?????ng</Text>
        <Button.Group mt={4}>
          <FilterButton
            filterType={filterType}
            content="M???i nh???t"
            value="newest"
            changeFilterAction={setFilterType}
          />
          <FilterButton
            filterType={filterType}
            content="Cao nh???t"
            value="highest"
            changeFilterAction={setFilterType}
          />
          <FilterButton
            filterType={filterType}
            content="Th???p nh???t"
            value="lowest"
            changeFilterAction={setFilterType}
          />
        </Button.Group>
      </Box>
      <Divider />
    </>
  );

  const ListEmptyComponent = () => (
    <Center flex={1} minHeight={300}>
      <Text>Kh??ng c?? ????nh gi?? </Text>
    </Center>
  );

  if (loading) return <SmallScreenLoadingIndicator />;

  return (
    <Box flex={1}>
      <FlatList
        data={locationReviewList}
        renderItem={renderItem}
        keyExtractor={KEY_EXTRACTOR}
        ListHeaderComponent={ListHeaderComponent}
        onEndReached={onEndReached}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={Divider}
      />
    </Box>
  );
};

export default ReviewListRoute;
