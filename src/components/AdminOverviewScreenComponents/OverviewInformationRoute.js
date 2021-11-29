import { useStoreState } from "easy-peasy";
import { Box, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ScrollView } from "react-native";
import { Badge, Card, Divider } from "react-native-elements";
import Swiper from "react-native-swiper";

import { showToastMessage } from "../../utilities";
import MiniMapView from "../MiniMapView";

const OverviewInformationRoute = () => {
  const [loading, setLoading] = useState(true);
  const locationOverview = useStoreState(
    (states) => states.LocationModel.locationOverview,
  );

  const {
    address,
    description,
    phone,
    rule,
    service,
    timetable,
    website,
    lastEditedDate,
    longitude,
    latitude,
    image,
    pending,
    closed,
  } = locationOverview;

  useEffect(() => {
    if (locationOverview.name) setLoading(false);
  }, [locationOverview]);

  const openUrl = (url) => () => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
      else showToastMessage("Không thể mở đường dẫn");
    });
  };

  return (
    <>
      {loading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="blue" />
        </Box>
      ) : (
        <Box>
          <ScrollView>
            <Box>
              <Card containerStyle={{ width: "100%", margin: 0, padding: 0 }}>
                <Box>
                  <Swiper height="auto">
                    {image && image.length > 0 ? (
                      image.map((item) => (
                        <Card.Image
                          source={{ uri: item }}
                          key={item}
                          style={{ height: 270 }}
                        />
                      ))
                    ) : (
                      <Card.Image
                        source={{ uri: "https://picsum.photos/400" }}
                      />
                    )}
                  </Swiper>
                  {pending ? (
                    <Badge
                      containerStyle={{ position: "absolute", top: 4, left: 4 }}
                      badgeStyle={{
                        borderRadius: 0,
                        paddingVertical: 10,
                        paddingHorizontal: 8,
                      }}
                      value="Thiếu thông tin"
                      status="warning"
                    />
                  ) : (
                    <Badge
                      containerStyle={{ position: "absolute", top: 4, left: 4 }}
                      badgeStyle={{
                        borderRadius: 0,
                        paddingVertical: 10,
                        paddingHorizontal: 8,
                      }}
                      value={closed ? "Đóng cửa" : "Mở cửa"}
                      status={closed ? "error" : "success"}
                    />
                  )}
                </Box>

                <Card.Divider />
                <Box>
                  <Text bold ml={3} fontSize="md">
                    Thông tin liên hệ
                  </Text>
                  <Box my={2} ml={8} mr={2}>
                    <Text>
                      <Text bold>Địa chỉ: </Text>
                      {address}
                    </Text>
                    <Text onPress={openUrl(`tel:${phone}`)}>
                      <Text bold>SĐT: </Text>
                      <Text underline>{phone}</Text>
                    </Text>
                    <Text>
                      <Text bold>Website: </Text>
                      <Text underline>{website}</Text>
                    </Text>
                    <Text>
                      <Text bold>Cập nhật lần cuối: </Text>
                      {lastEditedDate}
                    </Text>
                  </Box>
                </Box>
                <Card.Divider />
                <Text bold ml={3} fontSize="md">
                  Bản đồ
                </Text>
                <Box m={3}>
                  {latitude && (
                    <MiniMapView latitude={latitude} longitude={longitude} />
                  )}
                </Box>
                <Divider />
                <Box m={3}>
                  <Text bold fontSize="md">
                    Mô tả khu hồ
                  </Text>
                  <Text>{description}</Text>
                </Box>
                <Divider />
                <Box m={3}>
                  <Text bold fontSize="md">
                    Thời gian hoạt động
                  </Text>
                  <Text>{timetable}</Text>
                </Box>
                <Divider />
                <Box m={3}>
                  <Text bold fontSize="md">
                    Dịch vụ
                  </Text>
                  {service &&
                    service
                      .split("\n")
                      .map((ser) => <Text key={ser}>&#8226; {ser}</Text>)}
                </Box>
                <Divider />
                <Box m={3}>
                  <Text bold fontSize="md">
                    Nội quy
                  </Text>
                  {rule &&
                    rule
                      .split("\n")
                      .map((rul) => <Text key={rul}>&#8226; {rul}</Text>)}
                </Box>
              </Card>
            </Box>
          </ScrollView>
        </Box>
      )}
    </>
  );
};

export default OverviewInformationRoute;
