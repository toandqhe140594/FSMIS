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
      // await http.post(`${requestUrl}`, null, {
      //   params: {
      //     phone,
      //   },
      // });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
  /**
   * Validate the otp corresponding with the phone number
   * @param {object} payload - params pass to function
   * @param {string} payload.phone - the corresponding phone number
   * @param {string} payload.otp - the otp that need to be validate with corresponding phone number
   * @param {Function} [payload.setSuccess] - function indicate otp is valid
   */
  validateOtp: thunk(async (actions, payload) => {
    const { phone, otp } = payload;
    const setSuccess = payload.setSuccess || (() => {});
    try {
      // await http.post(`${API_URL.OTP_VALIDATE}`, {
      //   phone,
      //   otp,
      // });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
  /**
   * Reset password of a phone number
   * @param {object} payload - params pass to function
   * @param {string} payload.phone - the corresponding phone number
   * @param {string} payload.password - new password
   * @param {Function} [payload.setSuccess] - function indicate reset success
   */
  resetPassword: thunk(async (actions, payload) => {
    const { phone, password } = payload;
    const setSuccess = payload.setSuccess || (() => {});
    try {
      await http.post(`${API_URL.AUTHENTICATION_PASSWORD_RESET}`, {
        phone,
        password,
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
};
export default model;
