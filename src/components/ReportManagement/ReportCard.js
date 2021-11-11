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
  badgeWrapper: {
    marginLeft: 10,
  },
  badgeStyle: {
    borderRadius: 4,
    width: "100%",
    height: "60%",
  },
  bold: { fontWeight: "bold" },
  error: { backgroundColor: "#f87171" },
  success: { backgroundColor: "#4ade80" },
});

const ReportCard = ({
  reportTarget,
  isReviewReport,
  isFLocationReport,
  isPostReport,
  postType,
  isProcessed,
}) => {
  const getBadgeText = () => (isProcessed ? "Đã xử lý" : "Chưa xử lý");
  const getBadgeStatus = () => (isProcessed ? "success" : "error");
  return (
    <View style={styles.container}>
      {isReviewReport && (
        <View style={styles.avatarWrapper}>
          <Avatar
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/41.jpg",
            }}
            size="medium"
          />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.textWrapper}>
          {isReviewReport && (
            <Text>
              Đánh giá của <Text style={styles.bold}>{reportTarget}</Text> là
              thông tin sai lệch
            </Text>
          )}
          {isFLocationReport && (
            <Text>
              <Text style={styles.bold}>{reportTarget}</Text> đã bị báo cáo về
              thông tin sai lệch
            </Text>
          )}
          {isPostReport && (
            <Text>
              Bài đăng sự kiện <Text style={styles.bold}>{postType}</Text> của{" "}
              <Text style={styles.bold}>{reportTarget}</Text> là thông tin sai
              lệch
            </Text>
          )}
        </Text>
        <Text>09:00 01/10/2021</Text>
      </View>
      <Badge
        status={getBadgeStatus()}
        value={getBadgeText()}
        containerStyle={[
          styles.badgeWrapper,
          { flex: isReviewReport ? 1.3 : 1 },
        ]}
        badgeStyle={[
          styles.badgeStyle,
          isProcessed ? styles.success : styles.error,
        ]}
      />
    </View>
  );
};

ReportCard.propTypes = {
  isFLocationReport: PropTypes.bool,
  isPostReport: PropTypes.bool,
  reportTarget: PropTypes.string,
  isProcessed: PropTypes.bool,
  isReviewReport: PropTypes.bool,
  postType: PropTypes.string,
};

ReportCard.defaultProps = {
  reportTarget: "",
  isProcessed: false,
  isFLocationReport: false,
  isPostReport: false,
  isReviewReport: false,
  postType: "",
};

export default ReportCard;
