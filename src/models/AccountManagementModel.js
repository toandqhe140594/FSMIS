import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

// initial state for test purpose only since there wasnot api for get userlist
const initialUserList = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0987654321",
    image:
      "https://cdns-images.dzcdn.net/images/artist/4099da261a61666f58bb3598f0c4c37f/264x264.jpg",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    phone: "0987654322",
    image:
      "https://i.zoomtventertainment.com/story/Lisa_0.png?tr=w-400,h-300,fo-auto",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
    phone: "0987654323",
    image:
      "http://pm1.narvii.com/7145/8e99f6f6f2e12a708ea03fcbe8264f311d859842r1-409-512v2_uhq.jpg",
  },
];

// initial state for test purpose only since there wasnot api for get account information
const initialAccountInformation = {
  id: 1,
  name: "Nguyễn Tài Khoản",
  dob: "01/01/2021",
  phone: "098765433",
  gender: true,
  address: "Số 1 hồ Hoàn Kiếm Việt Nam Hà Nội Châu Đại Dương",
  status: true,
};

const model = {
  userList: [...initialUserList],
  accountInformation: {},
  totalPage: 1,
  setUserList: action((state, payload) => {
    state.userList = payload;
  }),
  setAccountInformation: action((state, payload) => {
    state.accountInformation = payload;
  }),
  setTotalPage: action((state, payload) => {
    state.totalPage = payload < 1 ? 1 : payload;
  }),
  // Test
  getUserList: thunk(async (actions) => {
    // const { data } = await http.get(`${API_URL.ADMIN_ACCOUNT_LIST}`);
    actions.setUserList(initialUserList);
  }),
  getAccountInformation: thunk(async (actions) => {
    // const { data } = await http.get(`${API_URL.ADMIN_ACCOUNT_INFORMATION}`);
    actions.setAccountInformation({ ...initialAccountInformation });
  }),
};
export default model;
