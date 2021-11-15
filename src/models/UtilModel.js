import { thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  /**
   * Send otp to any phone number
   * @param {object} payload - params pass to function
   * @param {string} payload.phone - phone number that need to receive otp
   * @param {Function} [payload.setSuccess] - set success state after send otp
   * @param {string} [payload.existedStatus] - status indicate send otp to existed or non existed phone in the system
   */
  sendOtp: thunk(async (actions, payload = {}) => {
    const { phone, existedStatus } = payload;
    const setSuccess = payload.setSuccess || (() => {});
    let requestUrl = API_URL.OTP_SEND_ANY;
    // Change request url base on existed status string
    if (existedStatus === "EXISTED") requestUrl = API_URL.OTP_SEND_EXISTED;
    else if (existedStatus === "NONEXISTED")
      requestUrl = API_URL.OTP_SEND_NONEXISTED;
    try {
      await http.post(`${requestUrl}`, {
        phone,
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
};
export default model;
