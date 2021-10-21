// To install uuid, installs react-native-random-value pkg first
import "react-native-get-random-values";

import { action } from "easy-peasy";
import { v4 as uuidv4 } from "uuid";
// import http from "../utilities/Http";

const model = {
  initFishCard: {
    id: "",
    fish: "",
    weightDescription: "",
    amount: "",
    totalWeight: "",
  },
  initCatchCard: {
    id: "",
    fishType: "",
    catches: "",
    totalWeight: "",
  },
  cardList: [],
  initCardList: action((state, payload) => {}),
  addFishCard: action((state, payload) => {}),
  addCatchCard: action((state, payload) => {}),
  deleteCard: action((state, payload) => {}),
  updateCard: action((state, payload) => {}),
};
