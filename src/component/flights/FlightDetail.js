import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Datepicker from "react-tailwindcss-datepicker";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Accordion from "react-bootstrap/Accordion";
import flighticon from "../../images/flight-icon.png";
import flighticon2 from "../../images/flight-icon2.png";
import flighticon3 from "../../images/flight-icon3.png";
import plane from "../../images/plane.svg";
import Header from "../Header";
import Footer from "../Footer";
import moment from "moment";
const FlightDetail = (props) => {
  const [stateData, setStateData] = useState();
  const { state } = useLocation();
  const LocationData = state?.data?.ONWARD;
  const LocationDataReturn = state?.data?.RETURN;

  console.log("LocationData", state);

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
    console.log(diffInDays); // prints the difference in days
    return `${diffInDays} hr`;
  };

  const getDate = (data) => {
    const dateString = data;
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // JavaScript months are 0-indexed, so add 1
    const day = dateObj.getDate();
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <main>
        <section className="layout-pt-md layout-pb-md bg-light-2">
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
                <div className="row y-gap-10 justify-between items-center">
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

                <div className="js-accordion">
                  <div className="accordion__item bg-white base-tr mt-30">
                    {LocationData?.map((item) => {
                      return (
                        <Accordion defaultKey="0">
                          <Accordion.Item
                            eventKey="0"
                            className="accordion-hide border-0"
                          >
                            <div className="row y-gap-30 px-30 py-30 justify-between">
                              <div className="col my-auto p-0 gap-2">
                                <div className="row y-gap-10 items-center">
                                  <div className="col-sm-auto">
                                    <img
                                      className="size-40 me-2"
                                      src={flighticon2}
                                      alt="image"
                                    />
                                    {item?.sI[0]?.fD?.aI?.name}
                                    {item?.sI[0]?.fD?.aI?.code}
                                  </div>
                                  <div className="col p-0">
                                    <div className="row x-gap-20 items-end">
                                      <div className="col-auto">
                                        <div className="lh-15 fw-500">
                                          {/* {moment(item?.sI[0]?.dt).format()} */}
                                          {convertTime(item?.sI[0]?.dt)}
                                        </div>
                                        <div className="text-15 lh-15 text-light-1">
                                          {item?.sI[0]?.da?.code}
                                        </div>
                                      </div>
                                      <div className="col text-center">
                                        <div className="flightLine">
                                          <div />
                                          <div />
                                        </div>
                                        <div className="text-15 lh-15 text-light-1 mt-10">
                                          {item?.sI[0]?.stops == 0
                                            ? "Nonstop"
                                            : `${item?.sI[0]?.stops} stops`}
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="lh-15 fw-500">
                                          {convertTime(item?.sI[0]?.at)}
                                        </div>
                                        <div className="text-15 lh-15 text-light-1">
                                          {item?.sI[0]?.aa?.code}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-auto p-0">
                                    <div className="text-15 text-light-1 px-20 md:px-0">
                                      {handleCalculate(
                                        item?.sI[0]?.dt,
                                        item?.sI[0]?.at
                                      )}
                                    </div>
                                  </div>
                                </div>
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
                              <div className="col-md-auto p-0">
                                <div className="d-flex items-center h-full">
                                  <div className="pl-30 border-left-light h-full md:d-none" />
                                  <div>
                                    <div className="text-right md:text-left mb-10">
                                      <div className="text-18 lh-16 fw-500">
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
                                          className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                                          data-x-click="flight-item-1"
                                        >
                                          View Detail{" "}
                                          <div className="icon-arrow-top-right ml-15" />
                                        </button>
                                      </Accordion.Header>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Accordion.Body>
                              <div className="accordion__contents">
                                <div className="border-light">
                                  <div className="py-20 px-30">
                                    <div className="row justify-between items-center">
                                      <div className="col-auto">
                                        <div className="fw-500 text-dark-1">
                                          Depart • {getDate(item?.sI[0]?.dt)}
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="text-14 text-light-1">
                                          {handleCalculate(
                                            item?.sI[0]?.dt,
                                            item?.sI[0]?.at
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="py-30 px-30 border-top-light">
                                    <div className="row y-gap-10 justify-between">
                                      <div className="col-auto">
                                        <div className="d-flex items-center mb-15">
                                          <div className="w-28 d-flex justify-center mr-15">
                                            <img
                                              src={flighticon3}
                                              alt="image"
                                            />
                                          </div>
                                          <div className="text-14 text-light-1">
                                            {item?.sI[0]?.fD?.aI?.name}{" "}
                                            {item?.sI[0]?.fD?.aI?.code}
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
                                                <div className="lh-14 fw-500">
                                                  {convertTime(item?.sI[0]?.dt)}
                                                </div>
                                              </div>
                                              <div className="col-auto">
                                                <div className="lh-14 fw-500">
                                                  {item?.sI[0]?.da?.name}(
                                                  {item?.sI[0]?.da?.code})
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="d-flex items-center mt-15">
                                            <div className="w-28 d-flex justify-center mr-15">
                                              <img src={plane} alt="image" />
                                            </div>
                                            <div className="text-14 text-light-1">
                                              {handleCalculate(
                                                item?.sI[0]?.dt,
                                                item?.sI[0]?.at
                                              )}
                                            </div>
                                          </div>
                                          <div className="d-flex items-center mt-15">
                                            <div className="w-28 d-flex justify-center mr-15">
                                              <div className="size-10 border-light rounded-full bg-border" />
                                            </div>
                                            <div className="row">
                                              <div className="col-auto">
                                                <div className="lh-14 fw-500">
                                                  {convertTime(item?.sI[0]?.at)}
                                                </div>
                                              </div>
                                              <div className="col-auto">
                                                <div className="lh-14 fw-500">
                                                  {item?.sI[0]?.aa?.name}(
                                                  {item?.sI[0]?.aa?.code})
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-auto text-right md:text-left">
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
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      );
                    })}
                    {LocationDataReturn?.map((item) => {
                      return (
                        <Accordion defaultKey="0">
                          <Accordion.Item
                            eventKey="0"
                            className="accordion-hide border-0"
                          >
                            <div className="row y-gap-30 px-30 py-30 justify-between">
                              <div className="col my-auto p-0 gap-2">
                                <div className="row y-gap-10 items-center">
                                  <div className="col-sm-auto">
                                    <img
                                      className="size-40 me-2"
                                      src={flighticon}
                                      alt="image"
                                    />
                                    {item?.sI[0]?.fD?.aI?.name}
                                    {item?.sI[0]?.fD?.aI?.code}
                                  </div>
                                  <div className="col p-0">
                                    <div className="row x-gap-20 items-end">
                                      <div className="col-auto">
                                        <div className="lh-15 fw-500">
                                          {/* {moment(item?.sI[0]?.dt).format()} */}
                                          {convertTime(item?.sI[0]?.dt)}
                                        </div>
                                        <div className="text-15 lh-15 text-light-1">
                                          {item?.sI[0]?.da?.code}
                                        </div>
                                      </div>
                                      <div className="col text-center">
                                        <div className="flightLine">
                                          <div />
                                          <div />
                                        </div>
                                        <div className="text-15 lh-15 text-light-1 mt-10">
                                          {item?.sI[0]?.stops == 0
                                            ? "Nonstop"
                                            : `${item?.sI[0]?.stops} stops`}
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="lh-15 fw-500">
                                          {convertTime(item?.sI[0]?.at)}
                                        </div>
                                        <div className="text-15 lh-15 text-light-1">
                                          {item?.sI[0]?.aa?.code}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-auto p-0">
                                    <div className="text-15 text-light-1 px-20 md:px-0">
                                      {handleCalculate(
                                        item?.sI[0]?.dt,
                                        item?.sI[0]?.at
                                      )}
                                    </div>
                                  </div>
                                </div>
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
                              <div className="col-md-auto p-0">
                                <div className="d-flex items-center h-full">
                                  <div className="pl-30 border-left-light h-full md:d-none" />
                                  <div>
                                    <div className="text-right md:text-left mb-10">
                                      <div className="text-18 lh-16 fw-500">
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
                                          className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                                          data-x-click="flight-item-1"
                                        >
                                          View Detail{" "}
                                          <div className="icon-arrow-top-right ml-15" />
                                        </button>
                                      </Accordion.Header>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Accordion.Body>
                              <div className="accordion__contents">
                                <div className="border-light">
                                  <div className="py-20 px-30">
                                    <div className="row justify-between items-center">
                                      <div className="col-auto">
                                        <div className="fw-500 text-dark-1">
                                          Depart • {getDate(item?.sI[0]?.dt)}
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="text-14 text-light-1">
                                          {handleCalculate(
                                            item?.sI[0]?.dt,
                                            item?.sI[0]?.at
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="py-30 px-30 border-top-light">
                                    <div className="row y-gap-10 justify-between">
                                      <div className="col-auto">
                                        <div className="d-flex items-center mb-15">
                                          <div className="w-28 d-flex justify-center mr-15">
                                            <img
                                              src={flighticon3}
                                              alt="image"
                                            />
                                          </div>
                                          <div className="text-14 text-light-1">
                                            {item?.sI[0]?.fD?.aI?.name}{" "}
                                            {item?.sI[0]?.fD?.aI?.code}
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
                                                <div className="lh-14 fw-500">
                                                  {convertTime(item?.sI[0]?.dt)}
                                                </div>
                                              </div>
                                              <div className="col-auto">
                                                <div className="lh-14 fw-500">
                                                  {item?.sI[0]?.da?.name}(
                                                  {item?.sI[0]?.da?.code})
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="d-flex items-center mt-15">
                                            <div className="w-28 d-flex justify-center mr-15">
                                              <img src={plane} alt="image" />
                                            </div>
                                            <div className="text-14 text-light-1">
                                              {handleCalculate(
                                                item?.sI[0]?.dt,
                                                item?.sI[0]?.at
                                              )}
                                            </div>
                                          </div>
                                          <div className="d-flex items-center mt-15">
                                            <div className="w-28 d-flex justify-center mr-15">
                                              <div className="size-10 border-light rounded-full bg-border" />
                                            </div>
                                            <div className="row">
                                              <div className="col-auto">
                                                <div className="lh-14 fw-500">
                                                  {convertTime(item?.sI[0]?.at)}
                                                </div>
                                              </div>
                                              <div className="col-auto">
                                                <div className="lh-14 fw-500">
                                                  {item?.sI[0]?.aa?.name}(
                                                  {item?.sI[0]?.aa?.code})
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-auto text-right md:text-left">
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
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      );
                    })}
                  </div>
                </div>
                {/* <div className="js-accordion">
                  <div className="accordion__item py-30 px-30 bg-white base-tr mt-30">
                    <Accordion defaultKey="0">
                      <Accordion.Item eventKey="0" className="accordion-hide">
                        <div className="row y-gap-30 justify-between">
                          <div className="col">
                            <div className="row y-gap-10 items-center">
                              <div className="col-sm-auto">
                                <img
                                  className="size-40"
                                  src={flighticon2}
                                  alt="image"
                                />
                              </div>
                              <div className="col">
                                <div className="row x-gap-20 items-end">
                                  <div className="col-auto">
                                    <div className="lh-15 fw-500">14:00</div>
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
                                    <div className="lh-15 fw-500">22:00</div>
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
                            </div>
                            <div className="row y-gap-10 items-center pt-30">
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
                                    <div className="lh-15 fw-500">14:00</div>
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
                                    <div className="lh-15 fw-500">22:00</div>
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
                            </div>
                          </div>
                          <div className="col-md-auto">
                            <div className="d-flex items-center h-full">
                              <div className="pl-30 border-left-light h-full md:d-none" />
                              <div>
                                <div className="text-right md:text-left mb-10">
                                  <div className="text-18 lh-16 fw-500">
                                    US$934
                                  </div>
                                  <div className="text-15 lh-16 text-light-1">
                                    16 deals
                                  </div>
                                </div>
                                <div className="accordion__button">
                                  <Accordion.Header>
                                    <button
                                      className="button -dark-1 px-30 h-50 bg-blue-1 text-white"
                                      data-x-click="flight-item-1"
                                    >
                                      View Deal{" "}
                                      <div className="icon-arrow-top-right ml-15" />
                                    </button>
                                  </Accordion.Header>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Accordion.Body>
                          <div className="accordion__contents">
                            <div className="border-light mt-30">
                              <div className="py-20 px-30">
                                <div className="row justify-between items-center">
                                  <div className="col-auto">
                                    <div className="fw-500 text-dark-1">
                                      Depart • Sat, Mar 26
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="text-14 text-light-1">
                                      4h 05m
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="py-30 px-30 border-top-light">
                                <div className="row y-gap-10 justify-between">
                                  <div className="col-auto">
                                    <div className="d-flex items-center mb-15">
                                      <div className="w-28 d-flex justify-center mr-15">
                                        <img src={flighticon3} alt="image" />
                                      </div>
                                      <div className="text-14 text-light-1">
                                        Pegasus Airlines 1169
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
                                            <div className="lh-14 fw-500">
                                              8:25 am
                                            </div>
                                          </div>
                                          <div className="col-auto">
                                            <div className="lh-14 fw-500">
                                              Istanbul Sabiha Gokcen (SAW)
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="d-flex items-center mt-15">
                                        <div className="w-28 d-flex justify-center mr-15">
                                          <img src={plane} alt="image" />
                                        </div>
                                        <div className="text-14 text-light-1">
                                          4h 05m
                                        </div>
                                      </div>
                                      <div className="d-flex items-center mt-15">
                                        <div className="w-28 d-flex justify-center mr-15">
                                          <div className="size-10 border-light rounded-full bg-border" />
                                        </div>
                                        <div className="row">
                                          <div className="col-auto">
                                            <div className="lh-14 fw-500">
                                              9:30 am
                                            </div>
                                          </div>
                                          <div className="col-auto">
                                            <div className="lh-14 fw-500">
                                              London Stansted (STN)
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto text-right md:text-left">
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
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="border-light mt-20">
                              <div className="py-20 px-30">
                                <div className="row justify-between items-center">
                                  <div className="col-auto">
                                    <div className="fw-500 text-dark-1">
                                      Depart • Sat, Mar 26
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="text-14 text-light-1">
                                      4h 05m
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="py-30 px-30 border-top-light">
                                <div className="row y-gap-10 justify-between">
                                  <div className="col-auto">
                                    <div className="d-flex items-center mb-15">
                                      <div className="w-28 d-flex justify-center mr-15">
                                        <img src={flighticon3} alt="image" />
                                      </div>
                                      <div className="text-14 text-light-1">
                                        Pegasus Airlines 1169
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
                                            <div className="lh-14 fw-500">
                                              8:25 am
                                            </div>
                                          </div>
                                          <div className="col-auto">
                                            <div className="lh-14 fw-500">
                                              Istanbul Sabiha Gokcen (SAW)
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="d-flex items-center mt-15">
                                        <div className="w-28 d-flex justify-center mr-15">
                                          <img src={plane} alt="image" />
                                        </div>
                                        <div className="text-14 text-light-1">
                                          4h 05m
                                        </div>
                                      </div>
                                      <div className="d-flex items-center mt-15">
                                        <div className="w-28 d-flex justify-center mr-15">
                                          <div className="size-10 border-light rounded-full bg-border" />
                                        </div>
                                        <div className="row">
                                          <div className="col-auto">
                                            <div className="lh-14 fw-500">
                                              9:30 am
                                            </div>
                                          </div>
                                          <div className="col-auto">
                                            <div className="lh-14 fw-500">
                                              London Stansted (STN)
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto text-right md:text-left">
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FlightDetail;
