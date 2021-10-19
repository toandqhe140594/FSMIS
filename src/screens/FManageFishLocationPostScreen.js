import { useNavigation } from "@react-navigation/native";
import { Box } from "native-base";
import React from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-elements";

import EventPostCard from "../components/EventPostCard";
import HeaderTab from "../components/HeaderTab";
import { goToPostEditScreen } from "../navigations";

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
  const navigation = useNavigation();

  const editPostHandler = () => {
    goToPostEditScreen(navigation);
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
      renderItem={({ item }) => (
        <Box backgroundColor="white" my="1">
          <EventPostCard
            postStyle="LAKE_POST"
            iconName="ellipsis-vertical"
            iconEvent={listEvent}
          />
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const FManageFishLocationPostScreen = () => {
  return (
    <Box style={{ flex: 1 }}>
      <HeaderTab name="Hồ câu thuần việt" isVerified />
      <Divider />
      <FLocationEventRoute />
    </Box>
  );
};

export default FManageFishLocationPostScreen;
