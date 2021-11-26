import { useNavigation } from "@react-navigation/native";
import { Box } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Pressable } from "react-native";
import { Badge, Text } from "react-native-elements";

import Colors from "../../config/colors";
import { goToAdminFishingMethodEditScreen } from "../../navigations";

const FishingMethodManagementCard = ({ id, name, active }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    goToAdminFishingMethodEditScreen(navigation, { id, name, active });
  };

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
          <Text style={{ fontWeight: "bold", fontSize: 20 }} numberOfLines={2}>
            {name}
          </Text>
        </Box>
        {/* // DucHM ADD_START 18/11/2021 */}
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
        {/* // DucHM ADD_END 18/11/2021 */}
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
