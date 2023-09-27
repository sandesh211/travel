import axios from "axios";
import { ApiKey, APIBaseURLLocal } from "../config/Config";

const headers = {
  "Content-Type": "application/json",
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
  hotelBooking: async function (data, token) {
    return axios.post(
      "https://apitest.tripjack.com/oms/v1/hotel/book",
      data,
      { headers }
    );
  },
  getBookingDetail: async function (bookingId) {
    return axios.post(
      "https://apitest.tripjack.com/oms/v1/hotel/booking-details",
      {
        // data: "oms/v1/booking-details",
        bookingId,
      },
      { headers }
    );
  },
  hotelBookingPHP: async function (data) {
    return axios.post(
      `${APIBaseURLLocal}/hotel-booking`,
      data,
      phpConfig
    );
  },
};
