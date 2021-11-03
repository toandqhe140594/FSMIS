import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, ScrollView, Text, VStack } from "native-base";
import React, { useEffect } from "react";
import { Image } from "react-native-elements";
import Swiper from "react-native-swiper";

import AvatarCard from "../components/AvatarCard";
import FishInformationCard from "../components/FishInformationCard";
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
  }, [catchDetails.avatar]);

  const openLocationOverviewScreen = () => {
    goToFishingLocationOverviewScreen(navigation, {
      id: catchDetails.locationId,
    });
  };
  const { avatar } = catchDetails;
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
              resizeMode="contain"
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
