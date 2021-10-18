import { Box, CheckIcon, FlatList, Modal, Select } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import CalendarPicker from "react-native-calendar-picker";

import AvatarCard from "../components/AvatarCard";
import CheckInCard from "../components/CheckInCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";

const FManageCheckinHistoryScreen = ({ angler }) => {
  const dummyMenu = [
    { id: 1, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 2, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 3, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
    { id: 4, message: "Ngoi ca sang", caches: "Ro dong, Diec" },
  ];
  //   const [dateFilter, setDateFilter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const selectedFilterHandler = (type) => {
    if (type === "BY_DATE") {
      setModalVisible(true);
    }
  };

  return (
    <Box>
      <HeaderTab name="Lịch sử báo cá" />

      <Box
        w={{
          base: "100%",
          md: "25%",
        }}
      >
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          size="full"
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Chọn ngày</Modal.Header>
            <Modal.Body>
              <CalendarPicker scrollable />
            </Modal.Body>
          </Modal.Content>
        </Modal>

        <Select
          //   selectedValue={dateFilter}
          minWidth="200"
          accessibilityLabel="Chọn chế độ lọc"
          placeholder="Choose Service"
          backgroundColor="white"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => selectedFilterHandler(itemValue)}
        >
          <Select.Item label="Tất cả" value="All" />
          <Select.Item label="Theo ngày" value="BY_DATE" />
        </Select>

        <FlatList
          data={dummyMenu}
          renderItem={() => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pb="1"
            >
              <PressableCustomCard paddingX="3" paddingY="1">
                <CheckInCard>
                  <AvatarCard avatarSize="md" nameUser={angler.name} />
                </CheckInCard>
              </PressableCustomCard>
            </Box>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Box>
    </Box>
  );
};

FManageCheckinHistoryScreen.defaultProps = {
  angler: { id: "1", name: "Dat" },
};
FManageCheckinHistoryScreen.propTypes = {
  angler: PropTypes.objectOf(PropTypes.string, PropTypes.string),
};
export default FManageCheckinHistoryScreen;
