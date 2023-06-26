import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import flighticon from "../../images/flight-icon.png";
import flighticon2 from "../../images/flight-icon2.png";
import flighticon3 from "../../images/flight-icon3.png";
import plane from "../../images/plane.svg";
import { ApiUrl, ApiKey } from "../../config/Config";
import ReturnPriceBar from "./PriceBar";
import { FlightService } from "../../services/flight";

// Go First "G8"
// IndiGo  "6E"
// Vistara "UK"
// Air India "AI"
// AirAsia India "I5"
// AkasaAir "QP"

const FlightDetail = (props) => {
  const navigate = useNavigate();

  const [reviewResponse, setReviewResponse] = useState();

  const { state } = useLocation();
  const [topReviewResponse, setTopReviewResponse] = useState(
    state?.data?.ONWARD[0]?.sI
  );
  const [travelClass, setTravelClass] = useState(state?.info?.travelClass);
  const [preferdAirLine, setPreferdAirLine] = useState([]);
  let preferdAirLineArray = [];
  const [directFlight, setDirectFlight] = useState(state?.info?.directFlight);

  const [LocationData, setLocationData] = useState(state?.data?.ONWARD);
  const [LocationDataReturn, setLocationDataReturn] = useState(
    state?.data?.RETURN
  );

  const [selectedFlight, setSelectedFlight] = useState({
    flight: LocationData && LocationData[0],
    fare: LocationData && LocationData[0].totalPriceList[0]?.fd?.ADULT?.fC?.TF,
    index: 0,
  });
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(
    LocationDataReturn
      ? {
          flight: LocationDataReturn[0],
          fare: LocationDataReturn[0].totalPriceList[0]?.fd?.ADULT?.fC?.TF,
          index: 0,
        }
      : undefined
  );

  const [TotalPriceId, setTotalPriceID] = useState([
    LocationData && LocationData[0]?.totalPriceList[0]?.id,
  ]);

  const convertTime = (data) => {
    const dateString = data;
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const calculateTimeDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = Math.abs(end - start);
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60));
    return `${diffInDays} hr`;
  };

  const getDate = (data) => {
    const dateString = data;
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}-${month}-${day}`;
  };

  const BookOneWayFlight = (data, index, isReturnFlight) => {
    setTotalPriceID([data?.totalPriceList[0]?.id]);

    setSelectedFlight({
      data,
      fare: data?.totalPriceList[0]?.fd?.ADULT?.fC?.TF,
      index,
    });
  };

  const SelectTwoWayFlight = (flight, index, isReturnFlight) => {
    if (!isReturnFlight) {
      setSelectedFlight({
        flight,
        fare: flight?.totalPriceList[0]?.fd?.ADULT?.fC?.TF,
        index,
      });
    }
    if (isReturnFlight) {
      setSelectedReturnFlight({
        flight,
        fare: flight?.totalPriceList[0]?.fd?.ADULT?.fC?.TF,
        index,
      });
    }
  };

  useEffect(() => {
    let ApiData = {
      priceIds: TotalPriceId,
    };

    const headers = {
      "Content-Type": "application/json ",
      apikey: ApiKey,
    };
    axios
      .post(`${ApiUrl}review`, ApiData, {
        headers: headers,
      })
      .then((res) => {
        // reviewResponse?.data?.tripInfos[0]?.sI?.
        setReviewResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [TotalPriceId]);

  const BookNowReturn = async () => {
    const response = await FlightService.review([
      selectedFlight?.flight?.totalPriceList[0]?.id,
      selectedReturnFlight?.flight?.totalPriceList[0]?.id,
    ]);

    if (response.status === 200) {
      navigate("/confirm-booking", {
        state: { data: response?.data?.tripInfos[0], review: response.data },
      });
    }
  };

  const BookNow = () => {
    if (reviewResponse) {
      navigate("/confirm-booking", {
        state: {
          data: reviewResponse?.data?.tripInfos[0],
          review: reviewResponse.data,
        },
      });
    }
  };

  const searchFlights = async () => {
    const response = await FlightService.airSearchAll(
      state?.info?.originCode,
      state?.info?.destinationCode,
      state?.info?.startDate,
      state?.info?.endDate,
      travelClass,
      preferdAirLine,
      state?.info?.tripType,
      directFlight,
      state?.info?.pft,
      state?.info?.adults,
      state?.info?.children,
      state?.info?.infants
    );
    setLocationData(response?.data?.searchResult?.tripInfos?.ONWARD);
    setLocationDataReturn(response?.data?.searchResult?.tripInfos?.RETURN);
  };

  useEffect(() => {
    searchFlights();
    // console.log("preferdAirLine", preferdAirLine.includes("G8"));
    // console.log("preferdAirLineArray", preferdAirLine);
  }, [directFlight, travelClass, preferdAirLine]);

  console.log("LocationDataLocationData", LocationData);
  return (
    <div>
      <main>
        <section className="pt-30 layout-pb-md bg-light-2">
          <div className="container">
            <div className="row y-gap-30">
              {/* Filters */}
              <div className="col-xl-3 col-lg-4">
                <aside className="sidebar py-20 px-20 bg-white">
                  <div className="row y-gap-40">
                    {/* Stops Filter */}
                    <div className="sidebar__item -no-border">
                      <h5 className="text-18 fw-500 mb-10">Stops</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={directFlight}
                                  onChange={(e) => {
                                    setDirectFlight(e.target.checked);
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Nonstop</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Cabin Filter */}
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Cabin</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={travelClass === "ECONOMY"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setTravelClass("ECONOMY");
                                    } else {
                                      setTravelClass("");
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Economy</div>
                            </div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={travelClass === "PREMIUM_ECONOMY"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setTravelClass("PREMIUM_ECONOMY");
                                    } else {
                                      setTravelClass("");
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">
                                Premium Economy
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={travelClass === "BUSINESS"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setTravelClass("BUSINESS");
                                    } else {
                                      setTravelClass("");
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Business</div>
                            </div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={travelClass === "FIRST"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setTravelClass("FIRST");
                                    } else {
                                      setTravelClass("");
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">First</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* airline filter   */}

                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Airline</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={preferdAirLine[0]?.code === "G8"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setPreferdAirLine([{ code: "G8" }]);
                                    } else {
                                      setPreferdAirLine([]);
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Go First</div>
                            </div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={preferdAirLine[0]?.code === "6E"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setPreferdAirLine([{ code: "6E" }]);
                                    } else {
                                      setPreferdAirLine([]);
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">IndiGo</div>
                            </div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={preferdAirLine[0]?.code === "UK"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setPreferdAirLine([{ code: "UK" }]);
                                    } else {
                                      setPreferdAirLine([]);
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Vistara</div>
                            </div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={preferdAirLine[0]?.code === "AI"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setPreferdAirLine([{ code: "AI" }]);
                                    } else {
                                      setPreferdAirLine([]);
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Air India</div>
                            </div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={preferdAirLine[0]?.code === "I5"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setPreferdAirLine([{ code: "I5" }]);
                                    } else {
                                      setPreferdAirLine([]);
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">AirAsia India</div>
                            </div>
                          </div>
                        </div>

                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input
                                  type="checkbox"
                                  name="name"
                                  checked={preferdAirLine[0]?.code === "QP"}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setPreferdAirLine([{ code: "QP" }]);
                                    } else {
                                      setPreferdAirLine([]);
                                    }
                                  }}
                                />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">AkasaAir</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              {/* Flight List */}
              <div className="col-xl-9 col-lg-8">
                <div className="row y-gap-10 justify-between items-center position-relative">
                  <div className="col-auto">
                    <div className="text-18">
                      <span className="fw-500">3,269 Flights</span> in India
                    </div>
                  </div>
                </div>

                <div className="row">
                  {LocationData?.map((item, idx) => {
                    return (
                      <Accordion
                        className="col-12 col-md-12 col-lg-6 mb-3"
                        defaultKey="0"
                      >
                        <Accordion.Item
                          eventKey="0"
                          className="accordion-hide"
                          style={
                            LocationData && selectedFlight?.index === idx
                              ? { border: "solid blue" }
                              : {}
                          }
                        >
                          <div className="px-20 py-20 justify-between">
                            <div className="col-12 my-auto p-0 gap-2">
                              {item?.sI?.map((item2, idx) => {
                                return (
                                  <div className="row y-gap-10 mb-3 items-center">
                                    <div className="col-sm-auto">
                                      <img
                                        className="size-30 me-2"
                                        src={flighticon2}
                                        alt=""
                                      />
                                      <span className="text-14">
                                        {item2?.fD?.aI?.name}
                                        {item2?.fD?.aI?.code}
                                      </span>
                                    </div>
                                    <div className="col p-0">
                                      <div className="row x-gap-20 items-end">
                                        <div className="col-auto">
                                          <div className="lh-13 fw-500 text-13">
                                            {convertTime(item2?.dt)}
                                          </div>
                                          <div className="text-13 lh-15 text-light-1">
                                            {item2?.da?.code}
                                          </div>
                                        </div>
                                        <div className="col text-center">
                                          <div className="flightLine">
                                            <div />
                                            <div />
                                          </div>
                                          <div className="text-13 lh-15 text-light-1 mt-10">
                                            {item?.sI?.length === 1
                                              ? "Nonstop"
                                              : `${item?.sI?.length - 1} stop`}
                                          </div>
                                        </div>
                                        <div className="col-auto">
                                          <div className="lh-15 text-13 fw-500">
                                            {convertTime(item2?.at)}
                                          </div>
                                          <div className="text-13 lh-15 text-light-1">
                                            {item2?.aa?.code}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-auto p-0">
                                      <div className="text-13 text-light-1 px-20 md:px-0">
                                        {calculateTimeDifference(
                                          item2?.dt,
                                          item2?.at
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="col-12 p-0">
                              <div className="items-center h-full">
                                <div className="d-flex gap-3 justify-between border-top pt-10">
                                  <div className="text-right md:text-left d-flex my-auto">
                                    <div className="text-14 lh-16 fw-500">
                                      INR:
                                      {
                                        item?.totalPriceList[0]?.fd?.ADULT?.fC
                                          ?.TF
                                      }
                                    </div>
                                  </div>
                                  {!LocationDataReturn && (
                                    <button
                                      onClick={() => {
                                        BookOneWayFlight(item, idx, true);
                                      }}
                                      className=" button btn text-sm -dark-1 px-10 h-40 bg-blue-1 text-white"
                                    >
                                      Book Flight{" "}
                                    </button>
                                  )}
                                  {LocationDataReturn && (
                                    <button
                                      onClick={() => {
                                        // BookOneWayFlight(item);
                                        SelectTwoWayFlight(item, idx);
                                      }}
                                      className=" button btn text-sm -dark-1 px-10 h-40 bg-blue-1 text-white"
                                    >
                                      Select Flight{" "}
                                    </button>
                                  )}
                                  <div className="accordion__button">
                                    <Accordion.Header>
                                      <button
                                        className="button btn text-sm -dark-1 px-10 h-40 bg-blue-1 text-white"
                                        data-x-click="flight-item-1"
                                      >
                                        View Detail{" "}
                                      </button>
                                    </Accordion.Header>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <Accordion.Body className="pt-0">
                            <div className="accordion__contents">
                              <div className="border-light">
                                {item?.sI?.map((item2) => {
                                  return (
                                    <>
                                      <div className="py-10 px-10">
                                        <div className="row justify-between items-center">
                                          <div className="col-auto">
                                            <div className="fw-500 text-14 text-dark-1">
                                              Depart • {getDate(item2?.dt)}
                                            </div>
                                          </div>
                                          <div className="col-auto">
                                            <div className="text-14 text-light-1">
                                              {calculateTimeDifference(
                                                item2?.dt,
                                                item2?.at
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="py-10 px-10 border-top-light">
                                        <div className="rowd y-gap-10 justify-between">
                                          <div className="col-auto">
                                            <div className="d-flex items-center mb-15">
                                              <div className="w-28 d-flex justify-center mr-15">
                                                <img
                                                  src={flighticon3}
                                                  alt="image"
                                                />
                                              </div>
                                              <div className="text-13 text-light-1">
                                                {item2?.fD?.aI?.name}{" "}
                                                {item2?.fD?.aI?.code}
                                              </div>
                                            </div>
                                            <div className="relative z-0">
                                              <div className="border-line-2" />
                                              <div className="d-flex items-center">
                                                <div className="w-28 d-flex justify-center mr-15">
                                                  <div className="size-10 border-light rounded-full bg-white" />
                                                </div>
                                                <div className="row">
                                                  <div className="col-auto">
                                                    <div className="lh-14 text-14 fw-500">
                                                      {convertTime(item2?.dt)}
                                                    </div>
                                                  </div>
                                                  <div className="col-auto">
                                                    <div className="lh-14 text-14 fw-500">
                                                      {item2?.da?.name}(
                                                      {item2?.da?.code})
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="d-flex items-center mt-15">
                                                <div className="w-28 d-flex justify-center mr-15">
                                                  <img
                                                    src={plane}
                                                    alt="image"
                                                  />
                                                </div>
                                                <div className="text-14 text-light-1">
                                                  {calculateTimeDifference(
                                                    item2?.dt,
                                                    item2?.at
                                                  )}
                                                </div>
                                              </div>
                                              <div className="d-flex items-center mt-15">
                                                <div className="w-28 d-flex justify-center mr-15">
                                                  <div className="size-10 border-light rounded-full bg-border" />
                                                </div>
                                                <div className="row">
                                                  <div className="col-auto">
                                                    <div className="lh-14 text-14 fw-500">
                                                      {convertTime(item2?.at)}
                                                    </div>
                                                  </div>
                                                  <div className="col-auto">
                                                    <div className="lh-14 text-14 fw-500">
                                                      {item2?.aa?.name}(
                                                      {item2?.aa?.code})
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    );
                  })}

                  <div className="accordion__item base-tr">
                    {LocationDataReturn?.map((item, idx) => {
                      return (
                        <Accordion defaultKey="0">
                          <Accordion.Item
                            eventKey="0"
                            className="accordion-hide"
                            style={
                              selectedReturnFlight?.index === idx
                                ? { border: "solid blue" }
                                : {}
                            }
                          >
                            <div className="px-20 py-20 justify-between">
                              <div className="col-12 my-auto p-0 gap-2">
                                {item?.sI?.map((item2) => {
                                  return (
                                    <div className="row y-gap-10 mb-3 items-center">
                                      <div className="col-sm-auto">
                                        <img
                                          className="size-30 me-2"
                                          src={flighticon}
                                          alt="image"
                                        />
                                        <span className="text-14">
                                          {item2?.fD?.aI?.name}
                                          {item2?.fD?.aI?.code}
                                        </span>
                                      </div>
                                      <div className="col p-0">
                                        <div className="row x-gap-20 items-end">
                                          <div className="col-auto">
                                            <div className="lh-13 fw-500 text-13">
                                              {convertTime(item2?.dt)}
                                            </div>
                                            <div className="text-13 lh-15 text-light-1">
                                              {item2?.da?.code}
                                            </div>
                                          </div>
                                          <div className="col text-center">
                                            <div className="flightLine">
                                              <div />
                                              <div />
                                            </div>
                                            <div className="text-13 lh-15 text-light-1 mt-10">
                                              {item?.sI?.length === 1
                                                ? "Nonstop"
                                                : `${
                                                    item?.sI?.length - 1
                                                  } stop`}
                                            </div>
                                          </div>
                                          <div className="col-auto">
                                            <div className="lh-15 text-13 fw-500">
                                              {convertTime(item2?.at)}
                                            </div>
                                            <div className="text-13 lh-15 text-light-1">
                                              {item2?.aa?.code}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-auto p-0">
                                        <div className="text-13 text-light-1 px-20 md:px-0">
                                          {calculateTimeDifference(
                                            item2?.dt,
                                            item2?.at
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="col-12 p-0">
                                <div className="items-center h-full">
                                  <div className="d-flex gap-3 justify-between border-top pt-10">
                                    <div className="text-right md:text-left d-flex my-auto">
                                      <div className="text-14 lh-16 fw-500">
                                        INR:
                                        {
                                          item?.totalPriceList[0]?.fd?.ADULT?.fC
                                            ?.TF
                                        }
                                      </div>
                                    </div>
                                    {LocationDataReturn && (
                                      <button
                                        onClick={() => {
                                          // BookOneWayFlight(item);
                                          SelectTwoWayFlight(item, idx, true);
                                        }}
                                        className=" button btn text-sm -dark-1 px-10 h-40 bg-blue-1 text-white"
                                      >
                                        Select Flight{" "}
                                      </button>
                                    )}
                                    <div className="accordion__button">
                                      <Accordion.Header>
                                        <button
                                          className="button btn text-sm -dark-1 px-10 h-40 bg-blue-1 text-white"
                                          data-x-click="flight-item-1"
                                        >
                                          View Detail{" "}
                                        </button>
                                      </Accordion.Header>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Accordion.Body className="pt-0">
                              <div className="accordion__contents">
                                <div className="border-light">
                                  {item?.sI?.map((item2) => {
                                    return (
                                      <>
                                        <div className="py-10 px-10">
                                          <div className="row justify-between items-center">
                                            <div className="col-auto">
                                              <div className="fw-500 text-14 text-dark-1">
                                                Depart • {getDate(item2?.dt)}
                                              </div>
                                            </div>
                                            <div className="col-auto">
                                              <div className="text-14 text-light-1">
                                                {calculateTimeDifference(
                                                  item2?.dt,
                                                  item2?.at
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="py-10 px-10 border-top-light">
                                          <div className="rowd y-gap-10 justify-between">
                                            <div className="col-auto">
                                              <div className="d-flex items-center mb-15">
                                                <div className="w-28 d-flex justify-center mr-15">
                                                  <img
                                                    src={flighticon3}
                                                    alt="image"
                                                  />
                                                </div>
                                                <div className="text-13 text-light-1">
                                                  {item2?.fD?.aI?.name}{" "}
                                                  {item2?.fD?.aI?.code}
                                                </div>
                                              </div>
                                              <div className="relative z-0">
                                                <div className="border-line-2" />
                                                <div className="d-flex items-center">
                                                  <div className="w-28 d-flex justify-center mr-15">
                                                    <div className="size-10 border-light rounded-full bg-white" />
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-auto">
                                                      <div className="lh-14 text-14 fw-500">
                                                        {convertTime(item2?.dt)}
                                                      </div>
                                                    </div>
                                                    <div className="col-auto">
                                                      <div className="lh-14 text-14 fw-500">
                                                        {item2?.da?.name}(
                                                        {item2?.da?.code})
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="d-flex items-center mt-15">
                                                  <div className="w-28 d-flex justify-center mr-15">
                                                    <img
                                                      src={plane}
                                                      alt="image"
                                                    />
                                                  </div>
                                                  <div className="text-14 text-light-1">
                                                    {calculateTimeDifference(
                                                      item2?.dt,
                                                      item2?.at
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="d-flex items-center mt-15">
                                                  <div className="w-28 d-flex justify-center mr-15">
                                                    <div className="size-10 border-light rounded-full bg-border" />
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-auto">
                                                      <div className="lh-14 text-14 fw-500">
                                                        {convertTime(item2?.at)}
                                                      </div>
                                                    </div>
                                                    <div className="col-auto">
                                                      <div className="lh-14 text-14 fw-500">
                                                        {item2?.aa?.name}(
                                                        {item2?.aa?.code})
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      );
                    })}
                  </div>

                  {reviewResponse && (
                    <div className="additional-detail">
                      <div className="fixedbottom position-fixed bottom-0 rounded">
                        <div className="row w-100 bg-dark text-white p-3">
                          {reviewResponse?.data?.tripInfos[0]?.sI?.map(
                            (item2) => {
                              return (
                                <div className="col-6 col-md-4 col-lg-4 y-gap-10 items-center">
                                  <div className="col-sm-auto">
                                    <img
                                      className="size-30 me-2"
                                      src={flighticon2}
                                      alt="image"
                                    />
                                    <span className="text-14">
                                      {item2?.fD?.aI?.name}
                                      {item2?.fD?.aI?.code}
                                    </span>
                                  </div>
                                  <div className="col p-0">
                                    <div className="row x-gap-20 items-end">
                                      <div className="col-auto">
                                        <div className="lh-13 fw-500 text-13">
                                          {convertTime(item2?.dt)}
                                        </div>
                                        <div className="text-13 lh-15 text-light-1">
                                          {item2?.da?.code}
                                        </div>
                                      </div>
                                      <div className="col text-center">
                                        <div className="flightLine">
                                          <div />
                                          <div />
                                        </div>
                                        <div className="text-13 lh-15 text-light-1 mt-10">
                                          {reviewResponse?.data?.tripInfos[0]
                                            ?.sI?.length === 1
                                            ? "Nonstop"
                                            : `${
                                                reviewResponse?.data
                                                  ?.tripInfos[0]?.sI?.length - 1
                                              } stop`}
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="lh-15 text-13 fw-500">
                                          {convertTime(item2?.at)}
                                        </div>
                                        <div className="text-13 lh-15 text-light-1">
                                          {item2?.aa?.code}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-auto p-0">
                                    <div className="text-13 text-light-1 px-20 md:px-0">
                                      {calculateTimeDifference(
                                        item2?.dt,
                                        item2?.at
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                          <div className="text-end col-12 col-md-4 col-lg-4">
                            <h6>
                              ₹{" "}
                              {
                                reviewResponse?.data?.tripInfos[0]
                                  ?.totalPriceList[0]?.fd?.ADULT?.fC?.TF
                              }
                              <small className="text-10">Per Traveller</small>
                            </h6>
                            <div className="d-flex justify-content-end gap-4 mt-3">
                              <button
                                className=" button btn text-sm -dark-1 px-10 h-40 bg-blue-1 text-white"
                                onClick={(e) => {
                                  e.preventDefault();
                                  BookNow();
                                }}
                              >
                                Book Now
                              </button>
                              {/* <button className=" button btn -outline-blue-1 text-sm -dark-1 px-10 h-40  text-blue-1">
                                Lock Price
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {LocationDataReturn && (
                    <ReturnPriceBar
                      airlineDeparture={
                        selectedFlight.flight?.sI[0]?.fD?.aI?.name
                      }
                      startTimeDeparture={
                        selectedFlight.flight?.sI[0]?.dt?.split("T")[1]
                      }
                      endTimeDeparture={
                        selectedFlight.flight?.sI[
                          selectedFlight.flight?.sI.length - 1
                        ]?.at?.split("T")[1]
                      }
                      airlineReturn={
                        selectedReturnFlight.flight?.sI[0]?.fD?.aI?.name
                      }
                      startTimeReturn={
                        selectedReturnFlight.flight?.sI[0]?.dt?.split("T")[1]
                      }
                      endTimeReturn={
                        selectedReturnFlight.flight?.sI[
                          selectedReturnFlight.flight?.sI.length - 1
                        ]?.at?.split("T")[1]
                      }
                      price={selectedFlight.fare + selectedReturnFlight.fare}
                      onAction={BookNowReturn}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FlightDetail;
