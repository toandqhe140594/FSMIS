import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  checkInState: true,
  fishingLocationInfo: {
    id: 2,
    name: "Hồ Câu Định Công",
    address: "Hồ Định Công",
    description: "Nơi giải trí cho anh em cần thủ",
    image: ["https://cdn.kinhtedothi.vn/545/2020/11/23/hodinhcong1.JPG"],
    verify: true,
    score: 3,
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

  /**
   * Set data to fishing location short display
   */
  setFishingLocationInfo: action((state, payload) => {
    state.fishingLocationInfo = payload;
  }),
  /**
   * Set checkin status
   */
  setCheckInState: action((state, payload) => {
    state.checkInState = payload;
  }),

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
    }
    return status;
  }),

  /**
   * Get checkin status
   */
  getCheckInState: thunk(async (actions) => {
    try {
      const { data, status } = await http.post(`${API_URL.CHECKIN_STATUS}`);
      if (status === 200) {
        actions.setCheckInState(!data.available);
        actions.setFishingLocationInfo(data.fishingLocation);
      }
    } catch (error) {
      actions.setCheckInState(false);
      actions.setFishingLocationInfo({});
    }
  }),

  /**
   * Checkout from fishing location if currently checkin
   */
  personalCheckout: thunk(async (actions) => {
    try {
      const { status } = await http.post(`${API_URL.CHECKOUT}`);
      if (status === 200) {
        actions.setCheckInState(false);
        actions.setFishingLocationInfo({});
      }
    } catch (error) {
      actions.setCheckInState(false);
      actions.setFishingLocationInfo({});
    }
  }),
};
export default model;
