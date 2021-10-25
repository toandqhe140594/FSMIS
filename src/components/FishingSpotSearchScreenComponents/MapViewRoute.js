import { Ionicons } from "@expo/vector-icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import * as Location from "expo-location";
import { Box, Button, Center, Select, Text, VStack, ZStack } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Overlay, Slider } from "react-native-elements";

import FLocationMapView from "../FLocationMapView";

const MapViewOverlay = ({ visible, toggleOverlay }) => {
  const currentLocation = useStoreState(
    (states) => states.MapSearchModel.currentLocation,
  );
  const getLocationListNearby = useStoreActions(
    (actions) => actions.MapSearchModel.getLocationListNearby,
  );
  const { control, handleSubmit, setValue } = useFormContext();
  const [sliderValue, setSliderValue] = useState(5);

  // Reset data in the form
  const resetMapFilter = () => {
    setSliderValue(5);
    setValue("type", -1);
    setValue("rate", -1);
  };

  // Submit search filter to api then reload list of fishing spot
  const onSubmit = (data) => {
    getLocationListNearby({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      distance: sliderValue,
      methodId: data.rate,
      minRating: data.type,
    });
    toggleOverlay();
  };

  useEffect(() => {
    setValue("type", -1);
    setValue("rate", -1);
  }, []);

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <VStack w="300" space={2} padding={2}>
        {/* Methods select box */}
        <Box flexDir="row">
          <Box flex={1} justifyContent="center">
            <Text bold>Loại hình câu</Text>
          </Box>
          <Box flex={2}>
            <Box height="8">
              <Controller
                control={control}
                name="type"
                render={({ field: { onChange, value } }) => (
                  <Select
                    accessibilityLabel="Chọn loại hình câu"
                    fontSize={10}
                    placeholder="Tất cả"
                    onValueChange={onChange}
                    selectedValue={value}
                  >
                    <Select.Item label="Câu đơn" value={1} />
                    <Select.Item label="Câu đài" value={2} />
                    <Select.Item label="Tất cả" value={-1} />
                  </Select>
                )}
              />
            </Box>
          </Box>
        </Box>

        {/* Rate select box */}
        <Box flexDir="row">
          <Box flex={1} justifyContent="center">
            <Text bold>Đánh giá</Text>
          </Box>
          <Box flex={2}>
            <Box height="8">
              <Controller
                control={control}
                name="rate"
                render={({ field: { onChange, value } }) => (
                  <Select
                    accessibilityLabel="Chọn số sao"
                    fontSize={10}
                    placeholder="Tất cả"
                    onValueChange={onChange}
                    selectedValue={value}
                  >
                    <Select.Item label="5 sao" value={5} />
                    <Select.Item label="Trên 4 sao" value={4} />
                    <Select.Item label="Trên 3 sao" value={3} />
                    <Select.Item label="Tất cả" value={-1} />
                  </Select>
                )}
              />
            </Box>
          </Box>
        </Box>

        {/* Search radius */}
        <Text>
          <Text bold>Bán kính:</Text> {sliderValue}km
        </Text>
        <Slider
          thumbStyle={{
            backgroundColor: "black",
            width: 15,
            height: 15,
          }}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumValue={5}
          maximumValue={50}
          step={5}
        />

        {/* Reset and submit buttons */}
        <Box flexDir="row" justifyContent="space-between">
          <Button
            onPress={() => {
              resetMapFilter();
            }}
          >
            Chọn lại
          </Button>
          <Button onPress={handleSubmit(onSubmit)}>Tìm kiếm</Button>
        </Box>
      </VStack>
    </Overlay>
  );
};

MapViewOverlay.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
};

const MapViewRoute = () => {
  const { locationList, currentLocation } = useStoreState(
    (states) => states.MapSearchModel,
  );
  const setCurrentLocation = useStoreActions(
    (actions) => actions.MapSearchModel.setCurrentLocation,
  );
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [visible, setVisible] = useState(false);
  const methods = useForm();

  // Show/hide overlay
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  /**
   * Check and request access to location service from user
   * If permission granted, set location to current location of user
   */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      setPermissionGranted(true);
      let location = await Location.getLastKnownPositionAsync({});
      if (!location) location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  return (
    <>
      {currentLocation && (
        <Center flex={1}>
          <ZStack>
            <FLocationMapView
              coordinates={currentLocation}
              locationList={locationList}
            />
            <Button
              colorScheme="muted"
              position="absolute"
              left={3}
              top={3}
              onPress={toggleOverlay}
            >
              <Center flexDir="row">
                <Ionicons name="options" size={24} color="white" />
                <Text ml={2} color="white">
                  Bộ lọc
                </Text>
              </Center>
            </Button>
          </ZStack>
          <FormProvider {...methods}>
            <MapViewOverlay visible={visible} toggleOverlay={toggleOverlay} />
          </FormProvider>
        </Center>
      )}
      {!currentLocation && (
        <Center flex={1}>
          <Text textAlign="center" w="80%">
            {permissionGranted
              ? "Đang lấy thông tin vị trí"
              : "Ứng dụng cần quyền truy cập vào vị trí để sử dụng chức năng này"}
          </Text>
        </Center>
      )}
    </>
  );
};

export default MapViewRoute;
