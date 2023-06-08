import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import flighticon from "../../images/flight-icon.png";
import flighticon2 from "../../images/flight-icon2.png";
import flighticon3 from "../../images/flight-icon3.png";
import plane from "../../images/plane.svg";
import axios from "axios";
import { ApiUrl, ApiKey } from "../../config/Config";
const FlightDetail = (props) => {
  const navigate = useNavigate();
  const [stateData, setStateData] = useState();
  const [reviewResponse, setReviewResponse] = useState();
  const [TotalPriceId, setTotalPriceID] = useState([]);
  const [selectedOnwardFlight, setSelectedOnwardFlight] = useState();
  const [selectedReturnFlight, setSelectedReturnFlight] = useState();
  const [selectedRouteInfo, setSelectedRouteInfo] = useState();
  const [showConfirmPage, setShowConfirmPage] = useState(false);
  const { state } = useLocation();
  const LocationData = state?.data?.ONWARD;
  const LocationDataReturn = state?.data?.RETURN;

  // console.log("LocationData", LocationData);

  useEffect(() => {
    setShowConfirmPage(false);
  }, []);

  const convertTime = (data) => {
    const dateString = data;
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const handleCalculate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = Math.abs(end - start);
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60));
    // console.log(diffInDays);
    // prints the difference in days
    return `${diffInDays} hr`;
  };

  const getDate = (data) => {
    const dateString = data;
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // JavaScript months are 0-indexed, so add 1
    const day = dateObj.getDate();
    // console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  const selectOnwardFlight = (data) => {
    setSelectedOnwardFlight(data);
  };

  const selectReturnFlight = (data) => {
    setSelectedReturnFlight(data);
  };

  const BookOneWayFlight = (data) => {
    // console.log("BookOneWayFlight", data?.totalPriceList);
    // const NewPrice = data?.totalPriceList?.map((price) => {
    //   return price.id;
    // });
    setTotalPriceID(data?.totalPriceList[0]?.id);
  };

  useEffect(() => {
    let ApiData = {
      priceIds: [TotalPriceId],
    };

    const newConfig = {
      "Content-Type": "application/json ",
      apikey: ApiKey,
    };
    axios
      .post(`${ApiUrl}review`, ApiData, {
        headers: newConfig,
      })
      .then((res) => {
        setReviewResponse(res);
        setSelectedRouteInfo(res?.data?.searchQuery?.routeInfos[0]);
        console.log("setReviewResponse", res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [TotalPriceId]);

  const FlightBookingApi = () => {};

  const BookNow = () => {
    if (reviewResponse) {
      setShowConfirmPage(true);
      navigate("/confirm-booking", {
        state: { data: reviewResponse?.data?.tripInfos[0] },
      });
    }
  };

  return (
    <div>
      <main>
        <section className="pt-30 layout-pb-md bg-light-2">
          <div className="container">
            <div className="row y-gap-30">
              <div className="col-xl-3 col-lg-4">
                <aside className="sidebar py-20 px-20 bg-white">
                  <div className="row y-gap-40">
                    <div className="sidebar__item -no-border">
                      <h5 className="text-18 fw-500 mb-10">Stops</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Nonstop</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">1 Stop</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">2+ Stops</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Cabin</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Basic Economy</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Economy</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Mixed</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Airlines</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Air France</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Aer Lingus</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$45</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Air Canada</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$21</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Air Europa</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$79</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">
                                Turkish Airlines
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$900</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Alliance</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">oneworld</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">SkyTeam</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$45</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">Star Alliance</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$21</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Departing from</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">BOS Boston</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">
                                PVD Providence
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$45</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item">
                      <h5 className="text-18 fw-500 mb-10">Arriving at</h5>
                      <div className="sidebar-checkbox">
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">LCY London</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$92</div>
                          </div>
                        </div>
                        <div className="row y-gap-10 items-center justify-between">
                          <div className="col-auto">
                            <div className="d-flex items-center">
                              <div className="form-checkbox ">
                                <input type="checkbox" name="name" />
                                <div className="form-checkbox__mark">
                                  <div className="form-checkbox__icon icon-check" />
                                </div>
                              </div>
                              <div className="text-15 ml-10">LGW London</div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="text-15 text-light-1">$45</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sidebar__item pb-30">
                      <h5 className="text-18 fw-500 mb-10">Price</h5>
                      <div className="row x-gap-10 y-gap-30">
                        <div className="col-12">
                          <div className="js-price-rangeSlider">
                            <div className="text-14 fw-500" />
                            <div className="d-flex justify-between mb-20">
                              <div className="text-15 text-dark-1">
                                <span className="js-lower" />
                                -
                                <span className="js-upper" />
                              </div>
                            </div>
                            <div className="px-5">
                              <div className="js-slider" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="row y-gap-10 justify-between items-center position-relative">
                  <div className="col-auto">
                    <div className="text-18">
                      <span className="fw-500">3,269 Flights</span> in India
                    </div>
                  </div>
                  <div className="col-auto">
                    <button className="button -blue-1 h-40 px-30 rounded-100 bg-blue-1-05 text-15 text-blue-1">
                      <i className="icon-up-down text-14 mr-10" />
                      Sort
                    </button>
                  </div>
                </div>

                <div
                  className={
                    LocationDataReturn
                      ? `js-accordion grid grid-cols-2 gap-4 `
                      : `js-accordion grid grid-cols-1 gap-4 gap-3`
                  }
                >
                  <div
                    className={
                      LocationDataReturn
                        ? `js-accordion  base-tr`
                        : `js-accordion base-tr row`
                    }
                  >
                    {LocationData?.map((item) => {
                      return (
                        <Accordion className="col-12 col-md-12 col-lg-6 mb-3"
                          defaultKey="0"
                          onClick={() => {
                            selectOnwardFlight(item);
                          }}
                        >
                          <Accordion.Item
                            eventKey="0"
                            className="accordion-hide border-0"
                          >
                            <div className="px-20 py-20 justify-between">
                              <div className="col-12 my-auto p-0 gap-2">
                                {item?.sI?.map((item2) => {
                                  return (
                                    <div className="row y-gap-10 mb-3 items-center">
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
                                              {/* {moment(item2?.dt).format()} */}
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
                                          {handleCalculate(
                                            item2?.dt,
                                            item2?.at
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* <div className="row y-gap-10 items-center pt-30">
                                  <div className="col-sm-auto">
                                    <img
                                      className="size-40"
                                      src={flighticon}
                                      alt="image"
                                    />
                                  </div>
                                  <div className="col">
                                    <div className="row x-gap-20 items-end">
                                      <div className="col-auto">
                                        <div className="lh-15 fw-500">
                                          14:00
                                        </div>
                                        <div className="text-15 lh-15 text-light-1">
                                          SAW
                                        </div>
                                      </div>
                                      <div className="col text-center">
                                        <div className="flightLine">
                                          <div />
                                          <div />
                                        </div>
                                        <div className="text-15 lh-15 text-light-1 mt-10">
                                          Nonstop
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="lh-15 fw-500">
                                          22:00
                                        </div>
                                        <div className="text-15 lh-15 text-light-1">
                                          STN
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-auto">
                                    <div className="text-15 text-light-1 px-20 md:px-0">
                                      4h 05m
                                    </div>
                                  </div>
                                </div> */}
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
                                      <div className="text-15 lh-16 text-light-1">
                                        {/* 16 deals */}
                                      </div>
                                    </div>
                                    {!LocationDataReturn && (
                                      <button
                                        onClick={() => {
                                          BookOneWayFlight(item);
                                        }}
                                        className=" button btn text-sm -dark-1 px-10 h-40 bg-blue-1 text-white"
                                      >
                                        Book Flight{" "}
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
                                                {handleCalculate(
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
                                                    {handleCalculate(
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
                                            {/* <div className="col-auto text-right md:text-left">
                                              <div className="text-14 text-light-1">
                                                Economy
                                              </div>
                                              <div className="text-14 mt-15 md:mt-5">
                                                Airbus A320neo (Narrow-body jet)
                                                <br />
                                                Wi-Fi available
                                                <br />
                                                USB outlet
                                              </div>
                                            </div> */}
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

                  <div className="accordion__item base-tr">
                    {LocationDataReturn?.map((item) => {
                      return (
                        <Accordion
                          defaultKey="0"
                          onClick={() => {
                            selectReturnFlight(item);
                          }}
                        >
                          <Accordion.Item
                            eventKey="0"
                            className="accordion-hide border-0"
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
                                              {/* {moment(item2?.dt).format()} */}
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
                                          {handleCalculate(
                                            item2?.dt,
                                            item2?.at
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* <div className="row y-gap-10 items-center pt-30">
                                  <div className="col-sm-auto">
                                    <img
                                      className="size-40"
                                      src={flighticon}
                                      alt="image"
                                    />
                                  </div>
                                  <div className="col">
                                    <div className="row x-gap-20 items-end">
                                      <div className="col-auto">
                                        <div className="lh-15 fw-500">
                                          14:00
                                        </div>
                                        <div className="text-15 lh-15 text-light-1">
                                          SAW
                                        </div>
                                      </div>
                                      <div className="col text-center">
                                        <div className="flightLine">
                                          <div />
                                          <div />
                                        </div>
                                        <div className="text-15 lh-15 text-light-1 mt-10">
                                          Nonstop
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="lh-15 fw-500">
                                          22:00
                                        </div>
                                        <div className="text-15 lh-15 text-light-1">
                                          STN
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-auto">
                                    <div className="text-15 text-light-1 px-20 md:px-0">
                                      4h 05m
                                    </div>
                                  </div>
                                </div> */}
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
                                      <div className="text-15 lh-16 text-light-1">
                                        {/* 16 deals */}
                                      </div>
                                    </div>
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
                                                {handleCalculate(
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
                                                    {handleCalculate(
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
                                            {/* <div className="col-auto text-right md:text-left">
                                              <div className="text-14 text-light-1">
                                                Economy
                                              </div>
                                              <div className="text-14 mt-15 md:mt-5">
                                                Airbus A320neo (Narrow-body jet)
                                                <br />
                                                Wi-Fi available
                                                <br />
                                                USB outlet
                                              </div>
                                            </div> */}
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
                                          {/* {moment(item2?.dt).format()} */}
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
                                      {handleCalculate(item2?.dt, item2?.at)}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                          {/* <div className="border-end border-1 pe-3">
                          <h6 className="mb-2">
                            Departure ・ <span>IndiGo</span>
                          </h6>
                          <div className="d-flex justify-content-between">
                            <div className="col-sm-auto">
                              <img
                                className="size-30 me-2"
                                src={flighticon2}
                                alt="image"
                              />
                              <span className="text-14">{`${selectedRouteInfo?.fromCityOrAirport.city} → ${selectedRouteInfo?.toCityOrAirport.city} `}</span>
                              <span className="text-14">20:45 → 00:25</span>
                            </div>
                            <div>₹ 4,478</div>
                          </div>
                        </div> */}
                          {/* <div className="border-end border-1 pe-3">
                          <h6 className="mb-2">
                            Return ・ <span>AirAsia</span>
                          </h6>
                          <div className="d-flex justify-content-between">
                            <div className="col-sm-auto">
                              <img
                                className="size-30 me-2"
                                src={flighticon}
                                alt="image"
                              />
                              <span className="text-14">20:45 → 00:25</span>
                            </div>
                            <div>₹ 4,478</div>
                          </div>
                        </div> */}
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
                              <button className=" button btn -outline-blue-1 text-sm -dark-1 px-10 h-40  text-blue-1">
                                Lock Price
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
