import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, ScrollView, Text, VStack } from "native-base";
import React, { useEffect } from "react";
import { Image } from "react-native-elements";
import Swiper from "react-native-swiper";

import AvatarCard from "../components/AvatarCard";
import FishCard from "../components/FishCard";
import HeaderTab from "../components/HeaderTab";
import { goToFishingLocationOverviewScreen } from "../navigations";

const AnglerCatchReportDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const getCatchReportDetailById = useStoreActions(
    (actions) => actions.ProfileModel.getCatchReportDetailById,
  );

  const catchDetails = useStoreState(
    (state) => state.ProfileModel.catchReportDetail,
  );

  useEffect(() => {
    if (route.params) {
      const { id } = route.params;
      getCatchReportDetailById({ id });
    }
  }, [catchDetails]);

  const openLocationOverviewScreen = () => {
    goToFishingLocationOverviewScreen(navigation, {
      id: catchDetails.locationId,
    });
  };

  return (
    <ScrollView>
      <HeaderTab name="Chi Tiết" />
      <Swiper height="auto" loadMinimal>
        {catchDetails.images !== undefined ? (
          catchDetails.images.map((imageUri) => (
            <Image
              key={imageUri}
              source={{
                uri: imageUri,
              }}
              style={{ width: "100%", height: 450 }}
            />
          ))
        ) : (
          <Image
            key="1"
            source={{
              uri: "https://everythingisviral.com/wp-content/uploads/2020/10/polite-cat.png",
            }}
            style={{ width: "100%", height: 450 }}
          />
        )}
      </Swiper>
      <Box
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pl="4"
        pr="4"
        py="2"
      >
        <AvatarCard
          avatarSize="lg"
          nameUser={catchDetails.userFullName}
          nameFontSize="lg"
          subText={catchDetails.time}
        />

        <VStack space={2} my={4}>
          <Text>
            <Text bold fontSize="16">
              Câu tại :{" "}
            </Text>
            <Text
              fontSize="18"
              underline
              onPress={() => {
                openLocationOverviewScreen();
              }}
            >
              {catchDetails.locationName}
            </Text>
          </Text>
          <Text italic>{catchDetails.description}</Text>
        </VStack>
        <VStack mt="4" space={2}>
          <VStack space={1}>
            {catchDetails.fishes !== undefined &&
              catchDetails.fishes.map((item) => (
                <FishCard
                  image={item.image}
                  key={item.name}
                  fishType={item.name.toString()}
                  quantity={item.quantity.toString()}
                  totalWeight={item.weight.toString()}
                />
              ))}
          </VStack>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default AnglerCatchReportDetailScreen;
