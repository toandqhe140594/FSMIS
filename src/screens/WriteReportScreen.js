import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { Text, TextInput, ToastAndroid, View } from "react-native";
import { Button, Divider } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import { goBack } from "../navigations";
import { showToastMessage } from "../utilities";

const ReportScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [reportParams, setReportParams] = useState({});
  const [success, setSuccess] = useState(false);
  const [content, setContent] = useState("");

  const writeNewReport = useStoreActions(
    (actions) => actions.ProfileModel.writeNewReport,
  );

  const onSubmit = () => {
    const trimmedContent = content.trim();
    // If the content is empty or only contains blank characters
    if (!trimmedContent) {
      showToastMessage("Nội đung báo cáo không thể bỏ trống");
    }
    writeNewReport({
      id: reportParams.id,
      type: reportParams.type,
      content: trimmedContent,
      setSuccess,
    });
  };

  useEffect(() => {
    // If write report success, show toast
    if (success) {
      ToastAndroid.showWithGravityAndOffset(
        "Báo cáo thành công",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      goBack(navigation);
    }
  }, [success]);

  useEffect(() => {
    // If there are params pass through
    if (route.params.id) {
      const { id, type } = route.params;
      setReportParams({ id, type });
    }
  }, []);

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
            placeholder="Chia sẻ về trải nghiệm của bạn"
            style={{
              borderWidth: 1,
              textAlignVertical: "top",
              padding: 5,
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
