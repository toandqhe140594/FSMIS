import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Input } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import MiniMapView from "../components/MiniMapView";
import { goBack } from "../navigations";
import { showToastMessage } from "../utilities";

const styles = StyleSheet.create({
  labelStyle: { fontSize: 16, fontWeight: "bold", marginVertical: 8 },
});

const InputDataView = ({ label, value }) => {
  return (
    <>
      {value ? (
        <>
          <Text style={styles.labelStyle}>{label}</Text>
          <Input
            value={value}
            fontSize="md"
            isDisabled
            style={{ backgroundColor: "white" }}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
InputDataView.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
InputDataView.defaultProps = {
  value: "",
};

const AdminSuggestedLocationDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const goBackAfterSuccess = () => {
    goBack(navigation);
  };

  const removeSuggestedRecord = () => {
    setLoading(true);
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
    <ScrollView style={{ backgroundColor: "white" }}>
      <HeaderTab name={route.params?.name} />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingTop: 20,
          borderBottomWidth: 0,
        }}
      >
        <Text style={styles.labelStyle}>
          Số điện thoại người gửi: {route.params?.senderPhone}
        </Text>
        <View
          style={{
            width: "80%",
            marginTop: 10,
          }}
        >
          <InputDataView label="Tên địa điểm câu" value={route.params?.name} />
          <InputDataView
            label="Số điện thoại chủ hồ"
            value={route.params?.phone}
          />
          <InputDataView label="Website" value={route.params?.website} />
          <InputDataView label="Địa chỉ" value={route.params?.address} />
          {route.params?.latitude ? (
            <>
              <Text style={styles.labelStyle}>Vị trí</Text>
              <View style={{ height: 150, marginTop: 10 }}>
                <MiniMapView
                  latitude={route.params.latitude}
                  longitude={route.params.longitude}
                />
              </View>
            </>
          ) : (
            <></>
          )}
          {route.params?.description ? (
            <>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8 }}
              >
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
            </>
          ) : (
            <></>
          )}
          <Button.Group direction="column" mt={5} mb={5}>
            <Button
              onPress={removeSuggestedRecord}
              isLoading={loading}
              isDisabled={loading}
            >
              Tạo điểm câu với thông tin
            </Button>
            <Button
              colorScheme="emerald"
              onPress={removeSuggestedRecord}
              isLoading={loading}
              isDisabled={loading}
            >
              Đánh dấu hữu ích
            </Button>
          </Button.Group>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminSuggestedLocationDetailScreen;
