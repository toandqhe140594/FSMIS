import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Card, Divider } from "react-native-elements";

import FishInformationCard from "../components/FishInformationCard";
import HeaderTab from "../components/HeaderTab";

const LakeDetailScreen = () => {
  const route = useRoute();
  const lakeDetail = useStoreState((states) => states.LocationModel.lakeDetail);

  const getLakeDetailByLakeId = useStoreActions(
    (actions) => actions.LocationModel.getLakeDetailByLakeId,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLakeDetailByLakeId({ id: route.params.id });
  }, []);

  useEffect(() => {
    if (lakeDetail) setLoading(false);
  }, [lakeDetail]);

  const {
    id,
    name,
    length,
    width,
    depth,
    lastEditTime,
    price,
    imageUrl,
    fishInLake,
  } = lakeDetail;

  return (
    <ScrollView>
      {loading && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="blue" />
        </Box>
      )}
      {!loading && (
        <Box>
          <HeaderTab name={name && name} id={id} />
          <Card containerStyle={{ width: "100%", margin: 0, padding: 0 }}>
            <Card.Image source={{ uri: imageUrl }} />
            <Divider />
            <Box m={3}>
              <Text>
                <Text bold fontSize="md">
                  Cập nhật lần cuối:{" "}
                </Text>
                {lastEditTime}
              </Text>
            </Box>
            <Divider />
            <Box m={3}>
              <Text>
                <Text bold fontSize="md">
                  Loại hình:{" "}
                </Text>
                Câu đơn, câu đài
              </Text>
            </Box>
            <Divider />
            <Box m={3}>
              <Text bold fontSize="md">
                Giá vé
              </Text>
              {price &&
                price.split("\n").map((item) => (
                  <Box flexDirection="row" key={item}>
                    &#8226;
                    <Text>{item}</Text>
                  </Box>
                ))}
            </Box>
            <Divider />
            <Box m={3}>
              <Text bold fontSize="md">
                Thông số
              </Text>
              <Box flexDirection="row">
                &#8226;
                <Text>Độ sâu: {depth}m</Text>
              </Box>
              <Box flexDirection="row">
                &#8226;
                <Text>Chiều dài: {length}m</Text>
              </Box>
              <Box flexDirection="row">
                &#8226;
                <Text>Chiều rộng: {width}m</Text>
              </Box>
            </Box>
            <Divider />
            <Box m={3}>
              <Text bold fontSize="md">
                Các loại cá
              </Text>
              <VStack space={2}>
                {fishInLake &&
                  fishInLake.map((fish) => (
                    <FishInformationCard
                      currentAmount={fish.quantity}
                      currentWeight={fish.totalWeight}
                      image={fish.imageUrl}
                      name={fish.name}
                      overview
                      weightRange={`${fish.minWeight}-${fish.maxWeight}`}
                      key={fish.id}
                    />
                  ))}
              </VStack>
            </Box>
          </Card>
        </Box>
      )}
    </ScrollView>
  );
};

export default LakeDetailScreen;
