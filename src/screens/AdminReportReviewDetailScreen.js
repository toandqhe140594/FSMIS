import { Box, Divider, FlatList, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import ReviewFromAnglerSection from "../components/ReviewFromAnglerSection";

const reportData = [
  { userName: "Cưởng", content: "Hồ thả lân ,tôi đã căng" },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
  {
    userName: "Cưởng 1",
    content:
      "Hồ vẫn thả lân ,tôi lại căng  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quam nihil vel adipisci facere? Cupiditate fugit ratione facilis atque ullam minus provident, velit quia, dolor corporis, laborum ipsa laboriosam doloribus. ",
  },
];
const styles = StyleSheet.create({
  text: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonStyle: {
    backgroundColor: "#fc454e",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
});
const AdminReportReviewDetailScreen = () => {
  return (
    <AdminReport>
      <ScrollView>
        <VStack space={3} mt={4} px={3}>
          <ReviewFromAnglerSection
            name="Dao Quoc Toan"
            content="Rất tốt, ae hãy đến"
            isPositive={false}
            date="01/01/2022"
            isDisabled
            rate={5}
          />
          <Divider />
          <Box style={styles.text}>
            <Text bold>Diem cau </Text>
            <Text>Thuan Viet</Text>
          </Box>
          <Divider />
          <Text style={styles.text}>
            <Text bold>Thời gian báo cáo :</Text> 0/0/0
          </Text>
          <Divider />
          <Text bold style={styles.text}>
            Danh sách báo cáo :
          </Text>
          <FlatList
            pt="0.5"
            data={reportData}
            renderItem={({ item }) => (
              <Box
                borderTopWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                backgroundColor="white"
                mt="0.5"
                mb="1"
                // keyExtractor={(item.id) => item.index_id.toString()}
                pl="2"
                pb="1"
              >
                <AvatarCard avatarSize="md" nameUser={item.userName} />
                <Box mt={2}>
                  <Text italic style={styles.text}>
                    {item.content}
                  </Text>
                </Box>
              </Box>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Box my="9">
            <Divider />
          </Box>
        </VStack>
      </ScrollView>
    </AdminReport>
  );
};
export default AdminReportReviewDetailScreen;
