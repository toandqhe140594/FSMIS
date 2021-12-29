import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Button, Icon, Input } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import MiniMapView from "../components/MiniMapView";
import { goToAdminCreateSuggestLocation } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";
// import { showToastMessage } from "../utilities";

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
  const data = useRef(null);

  const markHelpfulSuggested = useStoreActions(
    (actions) => actions.AdminFLocationModel.markHelpfulSuggested,
  );

  const [loading, setLoading] = useState(false);
  const [, setForceUpdate] = useState(Date.now());

  const markRecordAsHelpfulCall = () => {
    setLoading(true);
    markHelpfulSuggested({ id: data.current?.id })
      .then(() => {
        data.current.helpful = true;
        setForceUpdate();
        setLoading(false);
        showToastMessage("Đánh dấu hữu ích thành công");
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const markAsHelpfulAction = () => {
    showAlertConfirmBox(
      "Đánh dấu bản ghi này là hữu ích?",
      "Cần thủ sẽ nhận được thông báo cảm ơn vì đóng góp của họ",
      markRecordAsHelpfulCall,
    );
  };

  const navigateToAdminCreateSuggestLocation = () => {
    goToAdminCreateSuggestLocation(navigation, { suggestData: data.current });
  };

  useEffect(() => {
    if (route.params) {
      data.current = route.params;
    }
    setForceUpdate();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <HeaderTab name={data.current?.name} />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingTop: 20,
          borderBottomWidth: 0,
        }}
      >
        <Text style={styles.labelStyle}>
          Số điện thoại người gửi: {data.current?.senderPhone}
        </Text>
        <View
          style={{
            width: "80%",
            marginTop: 10,
          }}
        >
          <InputDataView label="Tên địa điểm câu" value={data.current?.name} />
          <InputDataView
            label="Số điện thoại chủ hồ"
            value={data.current?.phone}
          />
          <InputDataView label="Website" value={data.current?.website} />
          <InputDataView label="Địa chỉ" value={data.current?.address} />
          {data.current?.latitude ? (
            <>
              <Text style={styles.labelStyle}>Vị trí</Text>
              <View style={{ height: 150, marginTop: 10 }}>
                <MiniMapView
                  latitude={data.current.latitude}
                  longitude={data.current.longitude}
                />
              </View>
            </>
          ) : (
            <></>
          )}
          {data.current?.additionalInformation ? (
            <>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginVertical: 8 }}
              >
                Thông tin thêm
              </Text>
              <Input
                value={`${data.current?.additionalInformation}`}
                fontSize="md"
                isDisabled
                multiline
                numberOfLines={6}
                style={{
                  textAlignVertical: "top",
                  backgroundColor: "white",
                }}
              />
            </>
          ) : (
            <></>
          )}
          <Button.Group direction="column" mt={5} mb={5}>
            <Button
              onPress={navigateToAdminCreateSuggestLocation}
              isDisabled={loading}
            >
              Tạo điểm câu với thông tin
            </Button>
            {data.current?.helpful ? (
              <Button
                colorScheme="emerald"
                disabled
                leftIcon={<Icon as={AntDesign} name="check" size={5} />}
              >
                Hữu ích
              </Button>
            ) : (
              <Button
                onPress={markAsHelpfulAction}
                isLoading={loading}
                isDisabled={loading}
              >
                Đánh dấu hữu ích
              </Button>
            )}
          </Button.Group>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminSuggestedLocationDetailScreen;
