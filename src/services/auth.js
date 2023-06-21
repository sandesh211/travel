import axios from "axios";
import moment from "moment";
import { ApiUrl, ApiKey, APIBaseURL } from "../config/Config";

const headers = {
  "Content-Type": "application/json ",
  apikey: ApiKey,
};

export const AuthService = {
  login: async function (email, password) {
    const requestBody = {
      email,
      password,
    };
    const response = await axios.post(`${APIBaseURL}/login`, requestBody);
    return response;
  },
  isUserLoggedIn: function () {
    return !!localStorage.getItem("access_token");
  },
  register: async function (name, email, password, confirm_password) {
    const requestBody = {
      name,
      email,
      password,
      confirm_password,
    };
    const response = await axios.post(`${APIBaseURL}/register`, requestBody);
    return response;
  },
};
