import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";

import { goToFManageStaffDetailScreen } from "../navigations";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "35%",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 4,
  },
  imageContainer: { padding: 10, margin: 5 },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
  },
  text: { fontWeight: "bold", fontSize: 16 },
});

const EmployeeCard = ({ employee }) => {
  const navigation = useNavigation();

  const goToDetailScreen = () => {
    goToFManageStaffDetailScreen(navigation, { id: employee.id });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.infoContainer}>
        <Avatar
          rounded
          size="large"
          source={{
            uri: employee.image || "https://picsum.photos/200",
          }}
          containerStyle={styles.imageContainer}
          key={employee.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2}>
            {employee.name}
          </Text>
          <Text>SĐT: {employee.phoneNumber}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={goToDetailScreen} title="Chi tiết" />
      </View>
    </View>
  );
};
EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default EmployeeCard;
