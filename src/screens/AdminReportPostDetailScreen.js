import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Divider, FlatList, Text, VStack } from "native-base";
import React, { useEffect } from "react";

import AdminReport from "../components/AdminReport";
import AvatarCard from "../components/AvatarCard";
import EventPostCard from "../components/EventPostCard";
import styles from "../config/styles";

const AdminReportPostDetailScreen = () => {
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

  const postReportDetail = useStoreState(
    (states) => states.ReportModel.postReportDetail,
  );
  const getPostReportDetail = useStoreActions(
    (actions) => actions.ReportModel.getPostReportDetail,
  );
  useEffect(() => {
    getPostReportDetail({ id: 33 });
  }, []);
  console.log(`reviewReportDetail`, postReportDetail);
  const listEvent = [{ name: "Xóa bài viết", onPress: () => {} }];
  const renderItem = ({ item }) => (
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
        <Text italic style={styles.textContentType}>
          {item.content}
        </Text>
      </Box>
    </Box>
  );
  const headerListComponent = () => (
    <VStack space={3} mt={4} px={3}>
      <Box style={styles.textContentType}>
        <Text bold>Điểm câu bị báo cáo</Text>
        <Text>Ho thuan viet</Text>
      </Box>
      <Divider />
      <Text style={styles.textContentType}>
        <Text bold>Thời gian báo cáo :</Text> 0/0/0
      </Text>
      <Divider />
      <EventPostCard
        id={1}
        iconEvent={listEvent}
        iconName="ellipsis-vertical"
      />
      <Text bold style={styles.textContentType}>
        Danh sách báo cáo :
      </Text>
    </VStack>
  );
  const footerComponent = () => <Divider mt={20} />;

  return (
    <AdminReport>
      <FlatList
        ListHeaderComponent={headerListComponent}
        ListFooterComponent={footerComponent}
        pt="0.5"
        data={reportData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </AdminReport>
  );
};

export default AdminReportPostDetailScreen;
