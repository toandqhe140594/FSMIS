import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import Swiper from "react-native-swiper";

import AvatarCard from "../components/AvatarCard";
import FishInformationCard from "../components/FishInformationCard";
import HeaderTab from "../components/HeaderTab";
import { goToFishingLocationOverviewScreen } from "../navigations";

const AnglerCatchReportDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const catchDetails = useStoreState(
    (state) => state.ProfileModel.catchReportDetail,
  );
  const getCatchReportDetailById = useStoreActions(
    (actions) => actions.ProfileModel.getCatchReportDetailById,
  );

  const [isLoading, setIsLoading] = useState(true);

  const openLocationOverviewScreen = () => {
    goToFishingLocationOverviewScreen(navigation, {
      id: catchDetails.locationId,
    });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    if (route.params) {
      const { id } = route.params;
      getCatchReportDetailById({ id, setIsLoading });
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const { avatar } = catchDetails;

  if (isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="blue" />
      </Box>
    );

  if (!catchDetails.id) {
    return (
      <>
        <HeaderTab name="Chi Tiết" />
        <Box flex={1} justifyContent="center" alignItems="center">
          Không có dữ liệu
        </Box>
      </>
    );
  }

  return (
    <ScrollView>
      <HeaderTab name="Chi Tiết" />
      {catchDetails.images && catchDetails.images.length > 0 && (
        <Swiper height="auto" loadMinimal>
          {catchDetails.images.map((imageUri, index) => (
            <Image
              key={index.toString()}
              source={{
                uri: imageUri,
              }}
              style={{ width: "100%", height: 450 }}
              resizeMode="contain"
            />
          ))}
        </Swiper>
      )}
      <Box
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        px="4"
        py="2"
      >
        {avatar !== undefined && (
          <AvatarCard
            avatarSize="lg"
            nameUser={catchDetails.userFullName}
            nameFontSize="lg"
            subText={catchDetails.time}
            image={avatar}
          />
        )}

        <VStack space={2} my={4}>
          <Text>
            <Text bold fontSize="16">
              Câu tại:{" "}
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
          <Text italic fontSize="md">
            &quot;{catchDetails.description}&quot;
          </Text>
        </VStack>
        <VStack space={1}>
          {catchDetails.fishes !== undefined &&
            catchDetails.fishes.map((item) => (
              <FishInformationCard
                key={item.name}
                image={item.image}
                name={item.name}
                amount={item.quantity}
                totalWeight={item.weight}
              />
            ))}
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default AnglerCatchReportDetailScreen;
