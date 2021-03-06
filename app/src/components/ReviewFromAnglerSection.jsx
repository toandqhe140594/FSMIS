import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Box, Button, Menu, Pressable } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { Rating } from "react-native-ratings";

import { goToWriteReportScreen } from "../navigations";
import { showAlertConfirmBox } from "../utilities";

const styles = StyleSheet.create({
  buttonText: { color: "white" },
  selectedButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ReviewFromAnglerSection = ({
  content,
  date,
  isDisabled,
  isPositive,
  isNeutral,
  name,
  negativeCount,
  positiveCount,
  rate,
  userImage,
  id,
  isAdminView,
}) => {
  const navigation = useNavigation();

  const { voteReview, deletePersonalReview, getLocationReviewScore } =
    useStoreActions((actions) => actions.LocationModel);

  const onPressVoteActtion = (vote) => {
    voteReview({ reviewId: id, vote });
  };

  const goToWriteReportScreenAction = () => {
    goToWriteReportScreen(navigation, { id, type: "REVIEW" });
  };

  const upvoteReview = () => {
    onPressVoteActtion(1);
  };

  const downvoteReview = () => {
    onPressVoteActtion(0);
  };

  const deletePersonalReviewAction = () => {
    showAlertConfirmBox(
      "Bạn muốn xóa bài đánh giá?",
      "Bài đánh giá sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này",
      async () => {
        await deletePersonalReview();
        getLocationReviewScore();
      },
    );
  };

  return (
    <Box flex={1} m={3} pos="relative">
      {isDisabled && !isAdminView && (
        <>
          <Box style={{ position: "absolute", top: 0, right: 0 }}>
            <Menu
              w="190"
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <MaterialCommunityIcons
                      color="black"
                      name="dots-vertical"
                      size={24}
                    />
                  </Pressable>
                );
              }}
            >
              <Menu.Item onPress={deletePersonalReviewAction}>
                Xóa đánh giá
              </Menu.Item>
            </Menu>
          </Box>
        </>
      )}
      {!isDisabled && !isAdminView && (
        <Ionicons
          color="black"
          name="flag"
          size={24}
          style={{ position: "absolute", top: 0, right: 0 }}
          onPress={goToWriteReportScreenAction}
        />
      )}

      <Box flexDirection="row">
        <Avatar
          rounded
          size="medium"
          source={{
            uri: userImage,
          }}
          containerStyle={{
            margin: 10,
            marginLeft: 0,
            marginTop: 0,
          }}
          key={userImage}
        />
        <Box justifyContent="center" marginTop={-2}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>{name}</Text>
          <Box
            flexDirection="row"
            justifyContent="center"
            alignItems="baseline"
          >
            <Rating
              imageSize={16}
              ratingCount={5}
              showRating={false}
              readonly
              startingValue={rate}
              style={{ marginRight: 10, position: "relative", top: -1.3 }}
            />
            <Text style={{ fontSize: 13 }}>{`(${date})`}</Text>
          </Box>
        </Box>
      </Box>
      <Text>{content}</Text>
      {isDisabled ? (
        <Button.Group mt={2}>
          <Button isDisabled>
            <Text>
              Hữu ích{" "}
              {positiveCount ? positiveCount > 0 && `(${positiveCount})` : ""}
            </Text>
          </Button>
          <Button isDisabled>
            <Text>
              Không hữu ích{" "}
              {negativeCount ? negativeCount > 0 && `(${negativeCount})` : ""}
            </Text>
          </Button>
        </Button.Group>
      ) : (
        <Button.Group mt={2}>
          <Button onPress={upvoteReview}>
            <Text
              style={[
                styles.buttonText,
                !isNeutral && isPositive && styles.selectedButtonText,
              ]}
            >
              Hữu ích{" "}
              {positiveCount ? positiveCount > 0 && `(${positiveCount})` : ""}
            </Text>
          </Button>
          <Button onPress={downvoteReview}>
            <Text
              style={[
                styles.buttonText,
                !isNeutral && !isPositive && styles.selectedButtonText,
              ]}
            >
              Không hữu ích{" "}
              {negativeCount ? negativeCount > 0 && `(${negativeCount})` : ""}
            </Text>
          </Button>
        </Button.Group>
      )}
    </Box>
  );
};
ReviewFromAnglerSection.propTypes = {
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isPositive: PropTypes.bool,
  isNeutral: PropTypes.bool,
  name: PropTypes.string.isRequired,
  negativeCount: PropTypes.number,
  positiveCount: PropTypes.number,
  rate: PropTypes.number.isRequired,
  isAdminStyle: PropTypes.bool,
  userImage: PropTypes.string,
  id: PropTypes.number.isRequired,
  isAdminView: PropTypes.bool,
};
ReviewFromAnglerSection.defaultProps = {
  isDisabled: false,
  isPositive: false,
  isNeutral: true,
  negativeCount: 0,
  positiveCount: 0,
  isAdminStyle: false,
  userImage: "https://picsum.photos/200",
  isAdminView: false,
};
export default ReviewFromAnglerSection;
