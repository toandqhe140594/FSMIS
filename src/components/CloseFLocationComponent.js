import { useNavigation } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Alert, ToastAndroid, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";

import styles from "../config/styles";
import { goToFManageSelectScreen } from "../navigations";

const CloseFLocationComponent = ({ name }) => {
  const navigation = useNavigation();

  const closeFishingLocation = useStoreActions(
    (actions) => actions.FManageModel.closeFishingLocation,
  );

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const closeAction = () => {
    Alert.alert(
      "Bạn muốn đóng cửa khu hồ này?",
      `"${name}" sẽ bị đóng. Bạn không thể hoàn tác hành động này\nBạn cần xóa hết nhân viên khỏi hồ để đóng`,
      [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: () => {
            closeFishingLocation({ setDeleteSuccess });
          },
        },
      ],
    );
  };

  useEffect(() => {
    if (deleteSuccess) {
      ToastAndroid.showWithGravityAndOffset(
        "Đóng cửa khu hồ thành công",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      goToFManageSelectScreen(navigation);
    }
  }, [deleteSuccess]);

  return (
    <View style={styles.menuScreenListItemView}>
      <ListItem
        onPress={() => {
          closeAction();
        }}
      >
        <Icon name="cancel" size={26} type="material" />
        <ListItem.Content style={{ height: 40 }}>
          <ListItem.Title>Đóng cửa khu hồ</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};
CloseFLocationComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CloseFLocationComponent;
