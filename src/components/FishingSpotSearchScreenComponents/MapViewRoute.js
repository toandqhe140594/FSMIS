import { Ionicons } from "@expo/vector-icons";
import { Box, Button, Center, Select, Text, VStack, ZStack } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Overlay, Slider } from "react-native-elements";

import { DEFAULT_LATLNG } from "../../config/constants";
import SpotMapView from "../FLocationMapView";

const MapViewOverlay = ({ visible, toggleOverlay }) => {
  const { control, handleSubmit, setValue } = useFormContext();
  const [sliderValue, setSliderValue] = useState(5);

  // Reset data in the form
  const resetMapFilter = () => {
    setSliderValue(5);
    setValue("type", -1);
    setValue("rate", 5);
  };

  // Submit search filter to api then reload list of fishing spot
  const onSubmit = (data) => {
    console.log(data); // Test only
  };

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
  const [visible, setVisible] = useState(false);
  const methods = useForm();

  // Show/hide overlay
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <Center flex={1}>
      <ZStack>
        <SpotMapView coordinates={DEFAULT_LATLNG} />
        <Button
          colorScheme="muted"
          position="absolute"
          right={7}
          top={5}
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
  );
};

export default MapViewRoute;
