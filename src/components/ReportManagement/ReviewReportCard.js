import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Badge } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    marginBottom: 4,
    paddingBottom: 4,
  },
  textContainer: {
    flex: 3,
    marginHorizontal: 5,
    fontSize: 16,
  },
  avatarWrapper: {
    marginHorizontal: 4,
  },
  textWrapper: {
    flexWrap: "wrap",
  },
  badgeWrapper: {
    flex: 1,
    marginRight: 4,
  },
  badgeText: { fontSize: 14 },
  badgeStyle: {
    borderRadius: 4,
    width: "100%",
    height: "50%",
  },
  bold: { fontWeight: "bold" },
});

const ReviewReportCard = ({ userName, avatarImage, isProcessed }) => {
  const getBadgeText = () => (isProcessed ? "Đã Xử lý" : "Chưa xử lý");
  const getBadgeStatus = () => (isProcessed ? "success" : "error");
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        source={{
          uri: "https://randomuser.me/api/portraits/men/41.jpg",
        }}
        size="medium"
        containerStyle={styles.avatarWrapper}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textWrapper}>
          Đánh giá của <Text style={styles.bold}>{userName}</Text> là thông tin
          sai lệch
        </Text>
        <Text>09:00 01/10/2021</Text>
      </View>
      <Badge
        status={getBadgeStatus()}
        value={getBadgeText()}
        textStyle={styles.badgeText}
        containerStyle={styles.badgeWrapper}
        badgeStyle={styles.badgeStyle}
      />
    </View>
  );
};

ReviewReportCard.propTypes = {
  userName: PropTypes.string,
  avatarImage: PropTypes.string,
  isProcessed: PropTypes.bool,
};

ReviewReportCard.defaultProps = {
  userName: "",
  avatarImage: "https://randomuser.me/api/portraits/men/41.jpg",
  isProcessed: false,
};

export default ReviewReportCard;
