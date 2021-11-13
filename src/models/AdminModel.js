import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  verifyFishingLocation: thunk(async (actions, payload) => {}),
};

export default model;
