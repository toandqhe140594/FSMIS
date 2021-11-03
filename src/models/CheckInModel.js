import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  checkInState: true,
  fishingLocationInfo: {
    id: 2,
    name: "Hồ Câu Định Công",
    lastEditedDate: "18/10/2021 21:40:57",
    website: "https://www.facebook.com/hocaudinhcong.nkct",
    longitude: 105.831116,
    latitude: 20.97807,
    address: "Hồ Định Công",
    addressFromWard: {
      ward: "Định Công",
      wardId: 307,
      district: "Hoàng Mai",
      districtId: 8,
      province: "Hà Nội",
      provinceId: 1,
    },
    phone: "0968607368",
    description: "Nơi giải trí cho anh em cần thủ",
    service: "Ăn uống\nChụp ảnh\nBao móm",
    timetable: "Từ 8h đến 22h hàng ngày, trừ thứ 3 và thứ 6",
    rule: "Cần <5.4M",
    image: ["https://cdn.kinhtedothi.vn/545/2020/11/23/hodinhcong1.JPG"],
    verify: true,
    saved: true,
    role: "ANGLER",
  },
  lakeList: [
    {
      id: 2,
      name: "Hồ thường 1",
      image: "https://picsum.photos/500",
      fishingMethodList: ["Câu đơn", "Câu đài"],
      fishList: ["Cá diếc", "Cá chép", "Cá trắm đen"],
    },
  ],
  fishList: [
    {
      id: 2,
      fishList: [
        {
          id: 6,
          name: "Cá diếc",
          image:
            "https://tepbac.com/upload/species/ge_image/ca-diec-Carassius-gibelio.jpg",
        },
        {
          id: 7,
          name: "Cá trắm đen",
          image:
            "https://tepbac.com/upload/news/ge_image/2018/07/ca-tram-den_1532339843.jpg",
        },
      ],
    },
    {
      id: 1,
      fishList: [
        {
          id: 8,
          name: "Cá chép",
          image: "https://tepbac.com/upload/news/ge_image/ca-chep_5.jpg",
        },
        {
          id: 9,
          name: "Cá lăng",
          image:
            "https://vuahaisanxanh.com/thumb/540x405/1/upload/product/ca-lang-kg1600222424.jpg",
        },
      ],
    },
  ],
  currentLakeId: null,
  catchReportDetail: {
    catchesDetailList: [
      {
        fishSpeciesId: 0,
        quantity: 0,
        returnToOwner: true,
        weight: 0,
      },
    ],
    description: "string",
    hidden: true,
    images: ["string"],
    lakeId: 0,
  },

  setCheckInState: action((state, payload) => {
    state.checkInState = payload;
  }),
  getCheckInState: "",

  setLakeList: action((state, payload) => {
    state.lakeList = payload;
  }),
  getLakeListByLocationId: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().fishingLocationInfo.id}/${
        API_URL.LOCATION_LAKE_ALL
      }`,
    );
    actions.setLakeList(data);
  }),
  setCurrentLakeId: action((state, payload) => {
    state.currentLakeId = payload;
  }),

  setCatchReportDetail: action((state, payload) => {
    state.catchReportDetail = payload;
  }),
  submitCatchReport: thunk(async (actions, payload) => {
    const { description, lakeId, catchesDetailList, images } = payload;
    const { status, data } = await http.post(`${API_URL.SEND_CATCH_REPORT}`, {
      lakeId,
      description,
      catchesDetailList,
      images,
    });
    if (status === 200) {
      actions.setCatchReportDetail({ ...data, id: null });
      console.log(`status`, status);
    }
    return status;
  }),
};
export default model;
