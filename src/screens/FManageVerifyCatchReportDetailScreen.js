import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import Swiper from "react-native-swiper";

import AvatarCard from "../components/AvatarCard";
import FishInformationCard from "../components/FishInformationCard";
import HeaderTab from "../components/HeaderTab";
import ImageResizeMode from "../components/ImageResizeMode";
import { DEFAULT_TIMEOUT } from "../constants";
import { goToFishingLocationOverviewScreen } from "../navigations";

const AnglerCatchReportDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  let verifyTimeout = null;

  const catchDetails = useStoreState(
    (state) => state.ProfileModel.catchReportDetail,
  );
  const getCatchReportDetailById = useStoreActions(
    (actions) => actions.ProfileModel.getCatchReportDetailById,
  );
  const approveCatchReport = useStoreActions(
    (actions) => actions.FManageModel.approveCatchReport,
  );

  const [isLoading, setIsLoading] = useState(true); // Loading state of the screen
  const [success, setSuccess] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false); // Loading state when call api to verify catch report

  const openLocationOverviewScreen = () => {
    goToFishingLocationOverviewScreen(navigation, {
      id: catchDetails.locationId,
    });
  };

  /**
   * Verify catch report button action
   * @param {boolean} isApprove value indicate accept or denied catch report
   */
  const verifyHandler = (isApprove) => () => {
    setButtonLoading(true);
    verifyTimeout = setTimeout(() => {
      setButtonLoading(false);
    }, DEFAULT_TIMEOUT);
    approveCatchReport({ id: catchDetails.id, isApprove, setSuccess });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsLoading(false);
    }, DEFAULT_TIMEOUT);
    if (route.params) {
      const { id } = route.params;
      getCatchReportDetailById({ id, setIsLoading });
    }
    return () => {
      clearTimeout(timeOut);
      // If user leave screen before timeout end
      if (verifyTimeout !== null) clearTimeout(verifyTimeout);
    };
  }, []);

  useEffect(() => {
    // If verify report false
    if (success === false) {
      setButtonLoading(false);
      setSuccess(null);
    }
    // If verify catch report success
    if (success === true) {
      setButtonLoading(false);
    }
  }, [success]);

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
    <>
      <ScrollView>
        <HeaderTab name="Chi Tiết" />
        {/* Image section */}
        {catchDetails.images && catchDetails.images.length > 0 && (
          <Swiper height="auto" loadMinimal>
            {catchDetails.images.map((imageUri, index) => (
              <ImageResizeMode
                imgUri={imageUri}
                height={400}
                key={index.toString()}
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
                onPress={openLocationOverviewScreen}
              >
                {catchDetails.locationName}
              </Text>
            </Text>
            <Text pl={0.5}>
              <Text bold fontSize="16">
                Vị trí:{" "}
              </Text>
              <Text fontSize="16" onPress={openLocationOverviewScreen}>
                Hồ thường
              </Text>
            </Text>
            <Text italic fontSize="md">
              &quot;{catchDetails.description}&quot;
            </Text>
            <Divider />
          </VStack>
          <VStack space={1}>
            {catchDetails.fishes !== undefined &&
              catchDetails.fishes.map((item, index) => (
                <React.Fragment key={`${item.name}${index.toString()}`}>
                  <Text
                    bold
                    italic
                    fontSize="15"
                    pl={0.5}
                    textAlign="center"
                    style={{
                      color: "white",
                      backgroundColor: item.returnToOwner
                        ? "#88E0EF"
                        : "#6ee7b7",
                    }}
                  >
                    {item.returnToOwner ? "Đã gửi lại cho hồ" : "Mang về"}
                  </Text>
                  <FishInformationCard
                    key={item.name}
                    image={item.image}
                    name={item.name}
                    amount={item.quantity}
                    totalWeight={item.weight}
                  />
                </React.Fragment>
              ))}
          </VStack>
        </Box>
      </ScrollView>
      {/* Verify buttons */}
      <HStack justifyContent="space-around" opacity="100" mb={3}>
        {success === true ? (
          <Button
            disabled
            w="100%"
            size="lg"
            colorScheme="tertiary"
            endIcon={<Icon as={Ionicons} name="checkmark-sharp" size="sm" />}
          >
            Đã duyệt
          </Button>
        ) : (
          <>
            <Button
              w="40%"
              borderRadius="0"
              colorScheme="danger"
              size="lg"
              isLoading={buttonLoading}
              onPress={verifyHandler(false)}
            >
              Từ chối
            </Button>
            <Button
              w="40%"
              borderRadius="0"
              colorScheme="teal"
              size="lg"
              isLoading={buttonLoading}
              onPress={verifyHandler(true)}
            >
              Xác nhận
            </Button>
          </>
        )}
      </HStack>
    </>
  );
};

export default AnglerCatchReportDetailScreen;
