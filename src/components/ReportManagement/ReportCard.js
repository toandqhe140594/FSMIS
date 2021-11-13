import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Badge } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 5,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    marginHorizontal: 10,
    marginBottom: 10,
    paddingBottom: 10,
  },
  textContainer: {
    flex: 3,
    fontSize: 16,
  },
  avatarWrapper: { marginRight: 10 },
  textWrapper: { flexWrap: "wrap" },
  badgeWrapperSmall: {
    flex: 1,
    marginLeft: 10,
  },
  badgeWrapperMedium: {
    flex: 1.3,
    marginLeft: 10,
  },
  badgeSuccess: {
    backgroundColor: "#4ade80",
    borderRadius: 4,
    width: "100%",
    height: "60%",
  },
  badgeError: {
    backgroundColor: "#f87171",
    borderRadius: 4,
    width: "100%",
    height: "60%",
  },
  bold: { fontWeight: "bold" },
});

const ReportCard = ({
  time,
  name,
  avatar,
  isReviewReport,
  isFLocationReport,
  isPostReport,
  isCatchReportType,
  postType,
  active,
}) => {
  const getBadgeText = () => (active ? "Đã xử lý" : "Chưa xử lý");
  const getBadgeStatus = () => (active ? "success" : "error");
  const getPostTypeName = (value) => {
    switch (value) {
      case "ANNOUNCING":
        return "Thông báo";
      case "STOCKING":
        return "Bồi cá";
      case "REPORTING":
        return "Báo cá";
      default:
        return "";
    }
  };
  return (
    <View style={styles.container}>
      {(isReviewReport || isCatchReportType) && (
        <View style={styles.avatarWrapper}>
          <Avatar
            rounded
            source={{
              uri: avatar || "https://randomuser.me/api/portraits/men/41.jpg",
            }}
            size="medium"
          />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.textWrapper}>
          {isReviewReport && (
            <Text>
              Đánh giá của <Text style={styles.bold}>{name}</Text> bị báo cáo
              sai lệch
            </Text>
          )}
          {isFLocationReport && (
            <Text>
              <Text style={styles.bold}>{name}</Text> đã bị báo cáo về thông tin
              sai lệch
            </Text>
          )}
          {isPostReport && (
            <Text>
              Bài đăng sự kiện{" "}
              <Text style={styles.bold}>{getPostTypeName(postType)}</Text> của{" "}
              <Text style={styles.bold}>{name}</Text> bị báo cáo sai lệch
            </Text>
          )}
          {isCatchReportType && (
            <Text>
              Bài báo cá của <Text style={styles.bold}>{name}</Text> đã bị báo
              cáo sai lệch
            </Text>
          )}
        </Text>
        <Text>{time}</Text>
      </View>
      <Badge
        status={getBadgeStatus()}
        value={getBadgeText()}
        badgeStyle={active ? styles.badgeSuccess : styles.badgeError}
        containerStyle={
          isReviewReport || isCatchReportType
            ? styles.badgeWrapperMedium
            : styles.badgeWrapperSmall
        }
      />
    </View>
  );
};

ReportCard.propTypes = {
  isFLocationReport: PropTypes.bool,
  isPostReport: PropTypes.bool,
  name: PropTypes.string,
  active: PropTypes.bool,
  isReviewReport: PropTypes.bool,
  postType: PropTypes.string,
  isCatchReportType: PropTypes.bool,
  time: PropTypes.string,
  avatar: PropTypes.string,
};

ReportCard.defaultProps = {
  name: "",
  active: false,
  isFLocationReport: false,
  isPostReport: false,
  isReviewReport: false,
  postType: "",
  isCatchReportType: false,
  time: "",
  avatar: "",
};

export default ReportCard;
