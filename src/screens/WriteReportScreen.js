import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button, Divider } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import ReportModel from "../models/ReportModel";
import { goBack } from "../navigations";
import { showAlertAbsoluteBox, showToastMessage } from "../utilities";
import store from "../utilities/Store";

store.addModel("ReportModel", ReportModel);

const ReportScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [reportParams, setReportParams] = useState({});
  const [content, setContent] = useState("");

  const [sendStatus, setSendStatus] = useState(null);
  const sendReport = useStoreActions(
    (actions) => actions.ReportModel.sendReport,
  );

  const onSubmit = () => {
    const trimmedContent = content.trim();
    // If the content is empty or only contains blank characters
    if (!trimmedContent) {
      showToastMessage("Nội đung báo cáo không thể bỏ trống");
      return;
    }
    sendReport({
      id: reportParams.id,
      reportDtoIn: trimmedContent,
      type: reportParams.type,
      setSendStatus,
    });
  };

  useEffect(() => {
    // If there are params pass through
    if (route.params.id) {
      const { id, type } = route.params;
      setReportParams({ id, type });
    }
  }, []);

  useEffect(() => {
    if (sendStatus === true) {
      showAlertAbsoluteBox("Trạng thái", "Gửi Thành công", () => {
        goBack(navigation);
      });
    }
    if (sendStatus === false) {
      showToastMessage("Gửi thất bại");
    }
    setSendStatus(null);
  }, [sendStatus]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderTab name="Báo cáo vi phạm" />
      <Divider />
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ marginHorizontal: "10%", marginTop: "5%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            Bạn có thể miêu tả rõ được không?
          </Text>
          <TextInput
            multiline
            numberOfLines={6}
            maxLength={1000}
            placeholder="Nội dung vi phạm"
            style={{
              borderWidth: 0.5,
              textAlignVertical: "top",
              padding: 9,
              backgroundColor: "white",
            }}
            onChangeText={setContent}
          />
        </View>
        <Button
          containerStyle={{ margin: "10%" }}
          title="Báo cáo"
          onPress={() => {
            onSubmit();
          }}
        />
      </View>
    </View>
  );
};

export default ReportScreen;
