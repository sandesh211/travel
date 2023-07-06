import axios from "axios";
import moment from "moment";
import { ApiUrl, ApiKey } from "../config/Config";

const headers = {
  "Content-Type": "application/json ",
  apikey: ApiKey,
};
const phpConfig = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

export const HotelService = {
  // review: async function (hotelId, optionId) {
  //   return await axios.post(
  //     "https://rasatva.apponedemo.top/travel/api/request-send",
  //     {
  //       data: "hms/v1/hotel-review",
  //       hotelId,
  //       optionId,
  //     },
  //     phpConfig
  //   );
  // },
  review: async function (hotelId, optionId) {
    return await axios.post(
      "https://apitest.tripjack.com/hms/v1/hotel-review",
      {
        hotelId,
        optionId,
      },
      { headers }
    );
  },
  // hotelBooking: async function (data) {
  //   return axios.post(
  //     "https://rasatva.apponedemo.top/travel/api/request-send",
  //     {
  //       data: "oms/v1/hotel/book",
  //       ...data,
  //     },
  //     phpConfig
  //   );
  // },
  hotelBooking: async function (data) {
    return axios.post(
      "https://apitest.tripjack.com/hms/v1/hotel/book",
      data,
      { headers }
    );
  },
  hotelBookingPHP: async function (data) {
    return axios.post(
      "https://rasatva.apponedemo.top/travel/api/hotel-booking",
      data,
      phpConfig
    );
  },
};
