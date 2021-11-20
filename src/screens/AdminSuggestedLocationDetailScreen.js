import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Button, Input } from "native-base";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import { goBack } from "../navigations";
import { showToastMessage } from "../utilities";

const AdminSuggestedLocationDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const goBackAfterSuccess = () => {
    goBack(navigation);
  };
  const removeSuggestedLocation = useStoreActions(
    (actions) => actions.AdminFLocationModel.removeSuggestedLocation,
  );

  const removeSuggestedRecord = () => {
    setLoading(true);
    removeSuggestedLocation({ id: route.params?.id, setSuccess });
  };

  useEffect(() => {
    if (success) {
      showToastMessage("Xóa bản ghi thành công");
      goBackAfterSuccess();
    } else if (success === false) {
      showToastMessage("Có lỗi xảy ra");
      setLoading(false);
    }
    setSuccess(null);
  }, [success]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderTab name={route.params?.name} />
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8 }}>
          Số điện thoại người gửi: {route.params?.senderPhone}
        </Text>
        <View style={{ width: "80%", marginTop: 40 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8 }}>
            Tên địa điểm câu
          </Text>
          <Input value={route.params?.name} fontSize="md" isDisabled />
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8 }}>
            Số điện thoại chủ hồ
          </Text>
          <Input value={route.params?.phone} fontSize="md" isDisabled />
          <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8 }}>
            Thông tin thêm
          </Text>
          <Input
            value={`${route.params?.description}`}
            fontSize="md"
            isDisabled
            multiline
            numberOfLines={6}
            style={{
              textAlignVertical: "top",
            }}
          />

          <Button
            colorScheme="error"
            mt={5}
            onPress={removeSuggestedRecord}
            isLoading={loading}
            isDisabled={loading}
          >
            Xóa
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AdminSuggestedLocationDetailScreen;
