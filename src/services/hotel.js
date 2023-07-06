import axios from "axios";

const phpConfig = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

export const HotelService = {
  review: async function (hotelId, optionId) {
    return await axios.post(
      "https://rasatva.apponedemo.top/travel/api/request-send",
      {
        data: "hms/v1/hotel-review",
        hotelId,
        optionId,
      },
      phpConfig
    );
  },
  hotelBooking: async function (data) {
    return axios.post(
      "https://rasatva.apponedemo.top/travel/api/request-send",
      {
        data: "oms/v1/air/book",
        ...data,
      },
      phpConfig
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
