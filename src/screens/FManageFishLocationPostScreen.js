<<<<<<< HEAD
=======
import { useNavigation } from "@react-navigation/native";
>>>>>>> app-toan
import { Box } from "native-base";
import React from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-elements";

import EventPostCard from "../components/EventPostCard";
import HeaderTab from "../components/HeaderTab";
<<<<<<< HEAD
=======
import { goToPostEditScreen } from "../navigations";
>>>>>>> app-toan

// const styles = StyleSheet.create({
//   tabBarStyle: {
//     height: 40,
//     justifyContent: "center",
//   },
//   tabBarLabelStyle: {
//     fontSize: 13,
//     marginTop: 0,
//   },
// });
const dummyMenu = [
  { id: 1, name: "Hồ thuần việt" },
  { id: 2, name: "Hồ không thuần việt" },
  { id: 3, name: "Hồ Quản" },
];

const FLocationEventRoute = () => {
<<<<<<< HEAD
  const editPostHandler = () => {
    console.log("chinh sua bai");
=======
  const navigation = useNavigation();

  const editPostHandler = () => {
    goToPostEditScreen(navigation);
>>>>>>> app-toan
  };
  const removePostHandler = () => {
    console.log("xoa bai");
  };

  const listEvent = [
    { name: "Chỉnh sửa bài đăng", onPress: editPostHandler },
    { name: "Xóa bài đăng", onPress: removePostHandler },
  ];

  return (
    <FlatList
      data={dummyMenu}
<<<<<<< HEAD
      renderItem={() => (
=======
      renderItem={({ item }) => (
>>>>>>> app-toan
        <Box backgroundColor="white" my="1">
          <EventPostCard
            postStyle="LAKE_POST"
            iconName="ellipsis-vertical"
            iconEvent={listEvent}
          />
        </Box>
      )}
<<<<<<< HEAD
      keyExtractor={(item, index) => index.toString()}
=======
      keyExtractor={(item) => item.id}
>>>>>>> app-toan
    />
  );
};

<<<<<<< HEAD
const ManageFishLocationPostScreen = () => {
=======
const FManageFishLocationPostScreen = () => {
>>>>>>> app-toan
  return (
    <Box style={{ flex: 1 }}>
      <HeaderTab name="Hồ câu thuần việt" isVerified />
      <Divider />
      <FLocationEventRoute />
    </Box>
  );
};

<<<<<<< HEAD
export default ManageFishLocationPostScreen;
=======
export default FManageFishLocationPostScreen;
>>>>>>> app-toan
