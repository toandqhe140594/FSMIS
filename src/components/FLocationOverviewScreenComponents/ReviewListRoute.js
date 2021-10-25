import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, ScrollView } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Divider, Text } from "react-native-elements";
import { Rating } from "react-native-ratings";

import styles from "../../config/styles";
import { goToWriteReviewScreen } from "../../navigations";
import HeaderTab from "../HeaderTab";
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

const ReviewListRoute = () => {
  const navigation = useNavigation();
  const [reviewPage, setReviewPage] = useState(1);
  const [filterType, setFilterType] = useState("newest");

  const {
    locationShortInformation,
    locationReviewScore,
    personalReview,
    locationReviewList,
    currentId,
  } = useStoreState((states) => states.LocationModel);

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

  useEffect(() => {
    getLocationReviewScore();
    getPersonalReview();
    loadMoreReviewData();
    return () => {
      resetPersonalReview();
    };
  }, []);

  useEffect(() => {
    resetReviewData();
  }, [filterType]);

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
        {personalReview.id && (
          <ReviewFromAnglerSection
            name={personalReview.userFullName}
            content={personalReview.description}
            isPositive={false}
            date={personalReview.time}
            isDisabled
            positiveCount={personalReview.upvote}
            negativeCount={personalReview.downvote}
            rate={personalReview.score}
            userImage={personalReview.userAvatar}
            id={personalReview.id}
          />
        )}
        <Divider />
        {!personalReview.id && (
          <Box w="90%" h={10} alignSelf="center" mt={4}>
            <Button
              variant="outline"
              colorScheme="dark"
              onPress={() => {
                goToWriteReviewScreen(navigation, { id: currentId });
              }}
            >
              Đăng đánh giá
            </Button>
          </Box>
        )}
        <Box my={2} />
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
        <FlatList
          data={locationReviewList}
          renderItem={({ item }) => {
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
              />
            );
          }}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => {
            console.log("end reach");
            loadMoreReviewData();
          }}
        />
        {/* {locationReviewList &&
          locationReviewList.map((item) => {
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
              />
            );
          })} */}
      </Box>
    </ScrollView>
  );
};

export default ReviewListRoute;
