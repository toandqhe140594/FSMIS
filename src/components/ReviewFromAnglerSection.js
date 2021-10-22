import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Button, Menu, Pressable } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { Rating } from "react-native-ratings";

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
}) => {
  return (
    <Box flex={1} m={3} pos="relative">
      {isDisabled ? (
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
              <Menu.Item>Chỉnh sửa đánh giá</Menu.Item>
              <Menu.Item>Xóa đánh giá</Menu.Item>
            </Menu>
          </Box>
        </>
      ) : (
        <Ionicons
          color="black"
          name="flag"
          size={24}
          style={{ position: "absolute", top: 0, right: 0 }}
        />
      )}

      <Box flexDirection="row">
        <Avatar
          rounded
          size="medium"
          source={{
            uri: "https://picsum.photos/200",
          }}
          containerStyle={{
            margin: 10,
            marginLeft: 0,
            marginTop: 0,
          }}
        />
        <Box justifyContent="center">
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
          <Box flexDirection="row" justifyContent="center">
            <Rating
              imageSize={14}
              ratingCount={5}
              showRating={false}
              readonly
              startingValue={rate}
              style={{ marginRight: 10 }}
            />
            <Text>{`(${date})`}</Text>
          </Box>
        </Box>
      </Box>
      <Text>{content}</Text>
      {isDisabled ? (
        <Button.Group mt={2}>
          <Button isDisabled>
            <Text>Hữu ích {positiveCount && `(${positiveCount})`}</Text>
          </Button>
          <Button isDisabled>
            <Text>Không hữu ích {negativeCount && `(${negativeCount})`}</Text>
          </Button>
        </Button.Group>
      ) : (
        <Button.Group mt={2}>
          <Button>
            <Text
              style={[
                styles.buttonText,
                !isNeutral && isPositive && styles.selectedButtonText,
              ]}
            >
              Hữu ích {positiveCount && `(${positiveCount})`}
            </Text>
          </Button>
          <Button>
            <Text
              style={[
                styles.buttonText,
                !isNeutral && !isPositive && styles.selectedButtonText,
              ]}
            >
              Không hữu ích
              {negativeCount && `(${negativeCount})`}
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
};
ReviewFromAnglerSection.defaultProps = {
  isDisabled: false,
  isPositive: false,
  isNeutral: true,
  negativeCount: 0,
  positiveCount: 0,
  isAdminStyle: false,
};
export default ReviewFromAnglerSection;
