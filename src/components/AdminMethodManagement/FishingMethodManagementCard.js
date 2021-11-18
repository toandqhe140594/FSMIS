import { useNavigation } from "@react-navigation/native";
import { Box } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Pressable } from "react-native";
import { Badge, Text } from "react-native-elements";

import Colors from "../../config/colors";
import { goToAdminFishingMethodEditScreen } from "../../navigations";
// import { showAlertConfirmBox } from "../utilities";

const FishingMethodManagementCard = ({ id, name, active }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    goToAdminFishingMethodEditScreen(navigation, { id, name });
  };

  // const showDeleteAlert = () => {
  //   showAlertConfirmBox(
  //     "Bạn muốn xóa loại hình câu này?",
  //     `"${name}" sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này`,
  //     () => {},
  //   );
  // };
  return (
    <Pressable onPress={handleOnPress}>
      <Box
        flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginHorizontal={12}
      >
        <Box flex={1} justifyContent="center" my={4}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }} numberOfLines={2}>
            {name}
          </Text>
        </Box>
        <Badge
          value={active ? "Đang hoạt động" : "Đang ẩn"}
          containerStyle={{
            flex: 0.5,
          }}
          badgeStyle={{
            width: "100%",
            height: "60%",
            borderRadius: 4,
            backgroundColor: active
              ? Colors.defaultSuccess
              : Colors.defaultDanger,
          }}
        />
      </Box>
    </Pressable>
  );
};

FishingMethodManagementCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

FishingMethodManagementCard.defaultProps = {
  active: false,
};

export default FishingMethodManagementCard;
