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

export const FlightService = {
  airSearchAll: async function (
    originCode,
    destinationCode,
    startDate,
    endDate,
    travelClass = "ECONOMY",
    preferredAirline = [],
    tripType = "oneway",
    directFlight = false,
    pft = "REGULAR",
    adults = 1,
    children = 0,
    infants = 0
  ) {
    let onewayRoute = [
      {
        fromCityOrAirport: {
          code: originCode,
        },
        toCityOrAirport: {
          code: destinationCode,
        },
        travelDate: moment(startDate).format("YYYY-MM-DD"),
      },
    ];

    let roundRoute = [
      {
        fromCityOrAirport: {
          code: originCode,
        },
        toCityOrAirport: {
          code: destinationCode,
        },
        travelDate: moment(startDate).format("YYYY-MM-DD"),
      },
      {
        fromCityOrAirport: {
          code: destinationCode,
        },
        toCityOrAirport: {
          code: originCode,
        },
        travelDate: moment(endDate).format("YYYY-MM-DD"),
      },
    ];

    let requestBody = {
      searchQuery: {
        cabinClass: travelClass,
        preferredAirline: preferredAirline,
        searchModifiers: {
          isDirectFlight: directFlight,
          isConnectingFlight: directFlight ? false : true,
          pft: pft,
        },
        routeInfos: tripType === "oneway" ? onewayRoute : roundRoute,
        paxInfo: {
          ADULT: adults,
          CHILD: children,
          INFANT: infants,
        },
      },
    };

    const response = await axios.post(
      `${ApiUrl}air-search-all`,
      JSON.stringify(requestBody),
      {
        headers: headers,
      }
    );
    return response;
  },
  review: async function (priceIds) {
    return await axios.post(
      "https://rasatva.apponedemo.top/travel/api/request-send",
      {
        data: "fms/v1/review",
        priceIds,
      },
      phpConfig
    );
  },
  flightBooking: async function (data) {
    return axios.post(
      "https://rasatva.apponedemo.top/travel/api/request-send",
      {
        data: "oms/v1/air/book",
        ...data,
      },
      phpConfig
    );
  },
  flightBookingPHP: async function (data) {
    return axios.post(
      "https://rasatva.apponedemo.top/travel/api/flight-booking",
      data,
      phpConfig
    );
  },
  getBookingDetail: async function (bookingId) {
    return axios.post(
      "https://rasatva.apponedemo.top/travel/api/request-send",
      {
        data: "oms/v1/booking-details",
        bookingId,
      },
      phpConfig
    );
  },
  paymentPHP: async function (booking_id, type, pay_id, status, amount) {
    return axios.post(
      "https://rasatva.apponedemo.top/travel/api/payment-store",
      {
        booking_id,
        type,
        pay_id,
        currency: "INR",
        status,
        amount,
      },
      phpConfig
    );
  },
};
