// eslint-disable-next-line import/no-unresolved
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Box, Button, Text } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
import { Card, Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import LakeListViewRoute from "../components/FLocationOverviewScreenComponents/LakeListViewRoute";
import ReviewListRoute from "../components/FLocationOverviewScreenComponents/ReviewListRoute";
import HeaderTab from "../components/HeaderTab";

const InformationRoute = () => {
  return (
    <Box>
      <ScrollView>
        <SafeAreaView>
          <Box>
            <HeaderTab name="Hồ câu thuần việt" isVerified flagable />
            <Card containerStyle={{ width: "100%", margin: 0, padding: 0 }}>
              <Card.Image source={{ uri: "https://picsum.photos/200" }} />
              <Button my={4} mx={10}>
                Lưu điểm câu
              </Button>
              <Card.Divider />
              <Box>
                <Text bold ml={3} fontSize="md">
                  Thông tin liên hệ
                </Text>
                <Box my={2} ml={8}>
                  <Text>
                    <Text bold>Địa chỉ: </Text>Gần Chùa Núi Lá, Thủ Sỹ, Tiên Lữ,
                    Hưng Yên
                  </Text>
                  <Text>
                    <Text bold>SĐT: </Text>
                    <Text underline>0985043311</Text>
                  </Text>
                  <Text>
                    <Text bold>Website </Text>
                    <Text underline>https://www.facebook.com/</Text>
                  </Text>
                  <Text>
                    <Text bold>Cập nhật lần cuối: </Text>01/10/2021
                  </Text>
                </Box>
              </Box>
              <Card.Divider />
              <Text bold ml={3} fontSize="md">
                Bản đồ
              </Text>
              <Box m={3}>
                <Card.Image source={{ uri: "https://picsum.photos/200" }} />
              </Box>
              <Divider />
              <Box m={3}>
                <Text bold fontSize="md">
                  Mô tả khu hồ
                </Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante
                  fringilla quis varius pharetra lacinia neque turpis. Ac nunc,
                  ut vel in arcu, sed feugiat. Vitae est duis ac, et imperdiet
                  tristique fermentum. Tellus semper sit lectus molestie vivamus
                  enim, eleifend duis.
                </Text>
              </Box>
              <Divider />
              <Box m={3}>
                <Text bold fontSize="md">
                  Thời gian hoạt động
                </Text>
                <Text>Từ 0h đến 12h</Text>
              </Box>
              <Divider />
              <Box m={3}>
                <Text bold fontSize="md">
                  Dịch vụ
                </Text>
                <Text>&#8226;Nhà hàng</Text>
                <Text>&#8226;Hỗ trợ gắp cá</Text>
                <Text>&#8226;Sửa cần</Text>
              </Box>
              <Divider />
              <Box m={3}>
                <Text bold fontSize="md">
                  Nội quy
                </Text>
                <Box flexDirection="row">
                  &#8226;
                  <Text>
                    Nhà hồ mua lại cá của cần thủ có nhu cầu bán giá theo thỏa
                    thuận
                  </Text>
                </Box>
                <Box flexDirection="row">
                  &#8226;
                  <Text>
                    Mỗi cần thủ chỉ được sử dụng 1 cần tay, thẻo đôi lưỡi to
                    không quá 8 và có dây bảo hiểm.
                  </Text>
                </Box>
                <Box flexDirection="row">
                  &#8226;
                  <Text>
                    Không câu lăng xê, không câu lục, không câu cần đơn gắn máy,
                    không đi vòng quanh mang cá.
                  </Text>
                </Box>
                <Box flexDirection="row">
                  &#8226;<Text>Nhà hồ có phục vụ cơm nước.</Text>
                </Box>
                <Box flexDirection="row">
                  &#8226;<Text>Không vác bát, cần câu chạy quanh hồ.</Text>
                </Box>
              </Box>
            </Card>
          </Box>
        </SafeAreaView>
      </ScrollView>
    </Box>
  );
};

const Tab = createBottomTabNavigator();

const FishingSpotDetailScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "white" }}
        screenOptions={{
          tabBarLabelPosition: "beside-icon",
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIconStyle: { display: "none" },
        }}
      >
        <Tab.Screen name="Thông tin" component={InformationRoute} />
        <Tab.Screen name="Loại hồ" component={LakeListViewRoute} />
        <Tab.Screen name="Đánh giá" component={ReviewListRoute} />
        <Tab.Screen name="Sự kiện" component={InformationRoute} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default FishingSpotDetailScreen;
