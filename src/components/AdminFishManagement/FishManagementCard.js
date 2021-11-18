import { useNavigation } from "@react-navigation/native";
import { Box } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Pressable } from "react-native";
import { Avatar, Badge, Text } from "react-native-elements";

import Colors from "../../config/colors";
import { goToAdminFishEditScreen } from "../../navigations";

const FishManagementCard = ({ id, name, image, active }) => {
  const navigation = useNavigation();

  // const deleteFish = useStoreActions((actions) => actions.FishModel.deleteFish);
  // const [deleteSuccess, setDeleteSuccess] = useState(null);
  // const [deleteLoading, setDeleteLoading] = useState(false);

  // DucHM ADD_START 18/11/2021
  const handleOnPress = () => {
    goToAdminFishEditScreen(navigation, { id, name, image, active });
  };
  // DucHM ADD_END 18/11/2021

  // const showDeleteAlert = () => {
  //   showAlertConfirmBox(
  //     "Bạn muốn xóa loài cá này?",
  //     `"${name}" sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này`,
  //     () => {
  //       setDeleteLoading(true);
  //     },
  //   );
  // };

  // useEffect(() => {
  //   return () => {
  //     if (deleteSuccess) {
  //       showToastMessage("Xóa thành công");
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (deleteLoading === true) deleteFish({ id, setDeleteSuccess });
  // }, [deleteLoading]);

  // useEffect(() => {
  //   if (deleteSuccess === false) {
  //     showToastMessage("Xóa thất bại");
  //   }
  //   setDeleteLoading(false);
  //   setDeleteSuccess(null);
  // }, [deleteSuccess]);
  return (
    <Pressable onPress={handleOnPress}>
      <Box
        flex={1}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box flex={1} flexDirection="row">
          <Avatar
            size="large"
            source={{
              uri: image,
            }}
            containerStyle={{ padding: 10, margin: 5 }}
            imageProps={{
              resizeMode: "contain",
            }}
          />
          <Box flex={1} justifyContent="center" pr={1}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16 }}
              numberOfLines={2}
            >
              {name}
            </Text>
          </Box>
        </Box>
        <Badge
          value={active ? "Đang hoạt động" : "Đang ẩn"}
          textStyle={{ fontSize: active ? 12 : 16 }}
          containerStyle={{
            flex: 0.5,
            justifyContent: "center",
            alignItems: "flex-end",
            marginRight: 20,
          }}
          badgeStyle={{
            width: "100%",
            height: "40%",
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

FishManagementCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  active: PropTypes.bool,
};

FishManagementCard.defaultProps = {
  image: "https://picsum.photos/200",
  active: false,
};

export default FishManagementCard;
