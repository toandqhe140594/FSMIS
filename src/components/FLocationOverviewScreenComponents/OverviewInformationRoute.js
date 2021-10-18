import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Card, Divider } from "react-native-elements";

import HeaderTab from "../HeaderTab";

const OverviewInformationRoute = () => {
  const [loading, setLoading] = useState(true);
  const locationOverview = useStoreState(
    (states) => states.LocationModel.locationOverview,
  );
  const getLocationOverview = useStoreActions(
    (actions) => actions.LocationModel.getLocationOverview,
  );
  const {
    name,
    verify,
    address,
    description,
    phone,
    rule,
    service,
    timetable,
  } = locationOverview;

  const serviceArr = service.split("\n");

  useEffect(() => {
    getLocationOverview();
  }, []);

  useEffect(() => {
    if (locationOverview) setLoading(false);
  }, [locationOverview]);

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
              <HeaderTab name={name} isVerified={verify} flagable />
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
                      <Text bold>Địa chỉ: </Text>
                      {address}
                    </Text>
                    <Text>
                      <Text bold>SĐT: </Text>
                      <Text underline>{phone}</Text>
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
                  {serviceArr.map((ser) => (
                    <Text key={ser}>&#8226;{ser}</Text>
                  ))}
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
      )}
    </>
  );
};

export default OverviewInformationRoute;
