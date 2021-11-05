import { useStoreState } from "easy-peasy";
import { Box, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Card, Divider } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import Swiper from "react-native-swiper";

const OverviewInformationRoute = () => {
  const [loading, setLoading] = useState(true);
  const locationOverview = useStoreState(
    (states) => states.FManageModel.locationDetails,
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
  } = locationOverview;

  useEffect(() => {
    if (locationOverview && locationOverview.id) setLoading(false);
  }, [locationOverview]);

  if (loading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="blue" />
      </Box>
    );

  return (
    <>
      <Box>
        <ScrollView>
          <Box>
            <Card containerStyle={{ width: "100%", margin: 0, padding: 0 }}>
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
                  <Card.Image source={{ uri: "https://picsum.photos/400" }} />
                )}
              </Swiper>

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
                  <Text>
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
                  <MapView
                    initialRegion={{
                      latitude,
                      longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    style={{ height: 150, width: "100%" }}
                    liteMode
                  >
                    <Marker coordinate={{ latitude, longitude }} />
                  </MapView>
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
                    .map((ser) => <Text key={ser}>&#8226;{ser}</Text>)}
              </Box>
              <Divider />
              <Box m={3}>
                <Text bold fontSize="md">
                  Nội quy
                </Text>
                <Box flexDirection="row">
                  &#8226;
                  <Text>{rule}</Text>
                </Box>
              </Box>
            </Card>
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default OverviewInformationRoute;