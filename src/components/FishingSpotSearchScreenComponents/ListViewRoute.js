import { Ionicons } from "@expo/vector-icons";
import { useStoreState } from "easy-peasy";
import {
  Box,
  Button,
  Icon,
  Input,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Overlay } from "react-native-elements";

import FLocationCard from "../FLocationCard";

const ListViewOverlay = ({ visible, toggleOverlay }) => {
  const { control, handleSubmit, setValue } = useFormContext();

  // Reset data in the form
  const resetListFilter = () => {
    setValue("type", -1);
    setValue("rate", -1);
    setValue("city", -1);
    setValue("name", "");
  };

  const onSubmit = (data) => {
    console.log(data); // Test only
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <VStack w="300" space={2} padding={2}>
        <Box h={8}>
          {/* Input field for fishing spot name/phone number */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên hồ hoặc số điện thoại"
                size="sm"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Box>

        {/* City select box */}
        <Box flexDir="row">
          <Box flex={1} justifyContent="center">
            <Text bold>Thành phố</Text>
          </Box>
          <Box flex={2}>
            <Box height="8">
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <Select
                    accessibilityLabel="Chọn tỉnh, thành phố"
                    fontSize={10}
                    placeholder="Tất cả"
                    onValueChange={onChange}
                    selectedValue={value}
                  >
                    <Select.Item label="Hà Nội" value={5} />
                    <Select.Item label="Hồ Chí Minh" value={4} />
                    <Select.Item label="Đà Nẵng" value={3} />
                    <Select.Item label="Tất cả" value={-1} />
                  </Select>
                )}
              />
            </Box>
          </Box>
        </Box>

        {/* Fishing methods select box */}
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
                    <Select.Item label="Trên 4 sao" value={4} />
                    <Select.Item label="Trên 3 sao" value={3} />
                    <Select.Item label="Trên 2 sao" value={2} />
                    <Select.Item label="Trên 1 sao" value={1} />
                    <Select.Item label="Tất cả" value={-1} />
                  </Select>
                )}
              />
            </Box>
          </Box>
        </Box>

        {/* Reset and submit buttons */}
        <Box flexDir="row" justifyContent="space-between">
          <Button
            onPress={() => {
              resetListFilter();
            }}
          >
            Chọn lại
          </Button>
          <Button onPress={handleSubmit(onSubmit)}>Xác nhận</Button>
        </Box>
      </VStack>
    </Overlay>
  );
};

ListViewOverlay.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleOverlay: PropTypes.func.isRequired,
};

const ListViewRoute = () => {
  const advancedLocationList = useStoreState(
    (states) => states.MapSearchModel.advancedLocationList,
  );
  const [visible, setVisible] = useState(false);
  const methods = useForm();

  // Show/hide overlay
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <ScrollView>
      <Box
        flex={1}
        alignItems="center"
        w={{ base: "90%", md: "50%", lg: "30%" }}
        alignSelf="center"
      >
        <Button
          mt={5}
          leftIcon={<Icon as={Ionicons} name="search" size="sm" />}
          onPress={toggleOverlay}
        >
          Tìm kiếm
        </Button>

        {/* Draft view only */}
        <VStack mt={3} space={3} w="100%">
          {advancedLocationList.map((location) => (
            <FLocationCard
              id={location.id}
              address={location.address}
              name={location.name}
              rate={location.rate}
              isVerifed={location.isVerifed}
              image={location.mainImage}
              key={location.id}
            />
          ))}
        </VStack>
      </Box>
      <FormProvider {...methods}>
        <ListViewOverlay visible={visible} toggleOverlay={toggleOverlay} />
      </FormProvider>
    </ScrollView>
  );
};

export default ListViewRoute;
