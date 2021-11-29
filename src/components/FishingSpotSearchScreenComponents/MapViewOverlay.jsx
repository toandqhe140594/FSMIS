import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Select, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Overlay, Slider } from "react-native-elements";

const MapViewOverlay = ({ visible, toggleOverlay }) => {
  const currentLocation = useStoreState(
    (states) => states.MapSearchModel.currentLocation,
  );
  const getLocationListNearby = useStoreActions(
    (actions) => actions.MapSearchModel.getLocationListNearby,
  );
  const fishingMethodList = useStoreState(
    (states) => states.UtilModel.fishingMethodList,
  );
  const getFishingMethodList = useStoreActions(
    (actions) => actions.UtilModel.getFishingMethodList,
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
      methodId: data.type,
      minRating: data.rate,
    });
    toggleOverlay();
  };

  useEffect(() => {
    setValue("type", -1);
    setValue("rate", -1);
    if (!fishingMethodList || fishingMethodList.length === 0)
      getFishingMethodList();
  }, []);

  const sliderOnValueChange = (value) => {
    setSliderValue(value);
  };

  const renderFishingMethodSelectBox = ({ field: { onChange, value } }) => (
    <Select
      accessibilityLabel="Chọn loại hình câu"
      fontSize={10}
      placeholder="Tất cả"
      onValueChange={onChange}
      selectedValue={value}
    >
      {fishingMethodList &&
        fishingMethodList.map((method) => (
          <Select.Item label={method.name} value={method.id} key={method.id} />
        ))}
      <Select.Item label="Tất cả" value={-1} />
    </Select>
  );

  const renderMinRateSelectBox = ({ field: { onChange, value } }) => (
    <Select
      accessibilityLabel="Chọn số sao"
      fontSize={10}
      placeholder="Tất cả"
      onValueChange={onChange}
      selectedValue={value}
    >
      <Select.Item label="Trên 4 sao" value={4} />
      <Select.Item label="Trên 3 sao" value={3} />
      <Select.Item label="Trên 2 sao" value={2} />
      <Select.Item label="Trên 1 sao" value={1} />
      <Select.Item label="Tất cả" value={-1} />
    </Select>
  );

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
                render={renderFishingMethodSelectBox}
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
                render={renderMinRateSelectBox}
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
          onValueChange={sliderOnValueChange}
          minimumValue={5}
          maximumValue={50}
          step={5}
        />

        {/* Reset and submit buttons */}
        <Box flexDir="row" justifyContent="space-between">
          <Button onPress={resetMapFilter}>Chọn lại</Button>
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
export default MapViewOverlay;
