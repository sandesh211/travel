import React, { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";
import "react-bootstrap";
import Airport from "../../json/AirportAirline.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FlightService } from "../../services/flight";

const FlightFilter = () => {
  const navigate = useNavigate();
  const [loaderApiRes, setLoaderApiRes] = useState(false);
  const [cityListFlag, setCityListFlag] = useState(false);
  const [destinationListFlag, setDestinationListFlag] = useState(false);
  const [airportFilterValue, setAirportFilterValue] = useState([]);
  const [airportFilterValueDest, setAirportFilterValueDest] = useState([]);
  const [airportLocation, setAirportLocation] = useState("");
  const [airportLocationDest, setAirportLocationDest] = useState("");
  const [originCode, setOriginCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childrenAge, setChildrenAge] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tripType, setTripType] = useState("oneway");
  const [countryCode, setCountryCode] = useState();
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [preferdAirLine, setPreferdAirLine] = useState([]);
  const [directFlight, setDirectFlight] = useState(false);
  const [pft, setPft] = useState("REGULAR");
  const [onewayRoute, setOneWay] = useState([]);
  const [roundRoute, setRoundWay] = useState([]);

  const handleshow = (event) => {
    if (isShown == false) {
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  };

  const validateMaxBooking = () => {
    return adults + children < 9;
  };

  const handleAdultsDecrement = () => {
    if (adults > 0) {
      setAdults(adults - 1);
    }
  };

  const handleAdultsIncrement = () => {
    if (!validateMaxBooking()) {
      return;
    }
    setAdults(adults + 1);
  };

  const handleChildrenDecrement = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
    childrenAge.pop();
  };

  const handleChildrenIncrement = () => {
    if (!validateMaxBooking()) {
      return;
    }
    setChildren(children + 1);
    childrenAge.push("5");
  };

  const handleInfantsDecrement = () => {
    if (infants > 0) {
      setInfants(infants - 1);
    }
  };

  const handleInfantsIncrement = () => {
    setInfants(infants + 1);
  };

  const handleAirportLocation = (val) => {
    setCityListFlag(true);
    setDestinationListFlag(false);
    setAirportLocation(val);
    const newData = Airport?.Airport?.filter((data) =>
      data.city.toLowerCase().includes(val.toLowerCase())
    );
    setAirportFilterValue(newData);
  };

  const handleAirportLocationDest = (val) => {
    setCityListFlag(false);
    setDestinationListFlag(true);
    setAirportLocationDest(val);
    const newData = Airport.Airport.filter((data) =>
      data.city.toLowerCase().includes(val.toLowerCase())
    );
    setAirportFilterValueDest(newData);
  };

  const handleAirportSelect = (val) => {
    setAirportLocation(val?.city);
    setOriginCode(val?.code);
    setCountryCode(val?.countrycode);
  };

  const handleAirportSelectDest = (val) => {
    setAirportLocationDest(val?.city);
    setDestinationCode(val?.code);
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (event.target.checked) {
      setPreferdAirLine([...preferdAirLine, value]);
    } else {
      setPreferdAirLine(preferdAirLine.filter((item) => item !== value));
    }
  };

  const FlightApiCall = async () => {
    setLoaderApiRes(true);
    const response = await FlightService.airSearchAll(
      originCode,
      destinationCode,
      startDate,
      endDate,
      travelClass,
      preferdAirLine,
      tripType,
      directFlight,
      pft,
      adults,
      children,
      infants
    );
    setLoaderApiRes(false);
    navigate("/flight-detail", {
      state: {
        data: response?.data?.searchResult?.tripInfos,
        info: {
          originCode,
          destinationCode,
          startDate,
          endDate,
          travelClass,
          preferdAirLine,
          tripType,
          directFlight,
          pft,
          adults,
          children,
          infants,
        },
      },
    });
  };

  return (
    <>
      <div className="tabs__pane -tab-item-1 is-tab-el-active">
        <div className="mainSearch bg-transparent bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 shadow-1">
          {/* One Way, Round Trip Filter */}
          <div className="toggle_radio onewaycity">
            <input
              onClick={() => {
                setTripType("oneway");
              }}
              type="radio"
              className="toggle_option"
              defaultChecked
              id="first_toggle"
              name="toggle_option"
            />
            <input
              onClick={() => {
                setTripType("round");
              }}
              type="radio"
              className="toggle_option"
              id="second_toggle"
              name="toggle_option"
            />
            <input
              onClick={() => {
                setTripType("multi");
              }}
              type="radio"
              className="toggle_option"
              id="third_toggle"
              name="toggle_option"
            />
            <label htmlFor="first_toggle">
              <p>ONE WAY</p>
            </label>
            <label htmlFor="second_toggle">
              <p>ROUND TRIP</p>
            </label>
            {/* <label htmlFor="third_toggle">
              <p>MULTI CITY</p>
            </label> */}
            <div className="toggle_option_slider"></div>
          </div>

          {/* Inputs - From, To, Departure, Return, Guest */}
          <div className="button-grid items-center grid-colams">
            <div className="searchMenu-loc px-20 lg:py-20 lg:px-0 js-form-dd js-liverSearch -is-dd-wrap-active">
              <div data-x-dd-click="searchMenu-loc">
                <h4 className="text-15 fw-500 ls-2 lh-16">From</h4>
                <div className="text-15 text-light-1 ls-2 lh-16">
                  <input
                    type="text"
                    value={airportLocation}
                    onChange={(e) => {
                      handleAirportLocation(e.target.value);
                    }}
                    onClick={() => {
                      setCityListFlag(true);
                      setDestinationListFlag(false);
                      setIsShown(false);
                    }}
                    placeholder="Where are you going?"
                    className="js-search js-dd-focus"
                  />
                </div>
              </div>
              {cityListFlag &&
                airportFilterValue &&
                airportFilterValue.length > 0 && (
                  <div
                    className="searchMenu-loc__field shadow-2 js-popup-window -is-active"
                    data-x-dd="searchMenu-loc"
                    data-x-dd-toggle="-is-active"
                  >
                    <div className="bg-white">
                      <div className="y-gap-5 js-results">
                        <div className="cityDataScroll">
                          {airportFilterValue?.map((data) => {
                            return (
                              <button
                                key={data.code}
                                className="-link d-block col-12 text-left px-20 py-15 js-search-option"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAirportSelect(data);
                                  setAirportFilterValue(null);
                                }}
                              >
                                <div className="d-flex">
                                  <div className="icon-location-2 text-light-1 text-20 pt-4"></div>
                                  <div className="ml-10">
                                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                                      {data.city} ({data.code})
                                    </div>
                                    <div className="text-14 lh-12 text-light-1 mt-5">
                                      {data.name}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="searchMenu-loc px-20 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
              <div data-x-dd-click="searchMenu-loc">
                <h4 className="text-15 fw-500 ls-2 lh-16">To</h4>

                <div className="text-15 text-light-1 ls-2 lh-16">
                  <input
                    type="text"
                    value={airportLocationDest}
                    onChange={(e) => {
                      handleAirportLocationDest(e.target.value);
                    }}
                    onClick={() => {
                      setDestinationListFlag(true);
                      setCityListFlag(false);
                      setIsShown(false);
                      setCityListFlag(false);
                    }}
                    placeholder="Where are you going?"
                    className="js-search js-dd-focus"
                  />
                </div>
              </div>
              {destinationListFlag &&
                airportFilterValueDest &&
                airportFilterValueDest.length > 0 && (
                  <div
                    className="searchMenu-loc__field shadow-2 js-popup-window -is-active"
                    data-x-dd="searchMenu-loc"
                    data-x-dd-toggle="-is-active"
                  >
                    <div className="bg-white px-0 py-0 sm:px-0 sm:py-15">
                      <div className="y-gap-5 js-results">
                        <div className="cityDataScroll">
                          {airportFilterValueDest?.map((data) => {
                            return (
                              <button
                                key={data.code}
                                className="-link d-block col-12 text-left px-20 py-15 js-search-option"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAirportSelectDest(data);
                                  setAirportFilterValueDest(null);
                                }}
                              >
                                <div className="d-flex">
                                  <div className="icon-location-2 text-light-1 text-20 pt-4"></div>
                                  <div className="ml-10">
                                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                                      {data.city} ({data.code})
                                    </div>
                                    <div className="text-14 lh-12 text-light-1 mt-5">
                                      {data.name}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="searchMenu-date px-10 lg:py-20 lg:px-0 js-form-dd js-calendar">
              <div data-x-dd-click="searchMenu-date">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4 className="text-15 fw-500 ls-2 lh-16">Departure</h4>

                    <DatePicker
                      placeholderText={"dd-mm-yyyy"}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      filterDate={(date) => date > new Date()}
                      onFocus={() => {
                        setIsShown(false);
                        setDestinationListFlag(false);
                        setCityListFlag(false);
                      }}
                    />
                  </div>
                  <div>
                    {tripType === "round" ? (
                      <>
                        <h4 className="text-15 fw-500 ls-2 lh-16">Return</h4>

                        <DatePicker
                          placeholderText={"dd-mm-yyyy"}
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          filterDate={(date) => date > new Date()}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="searchMenu-guests px-20 lg:py-20 lg:px-0 js-form-dd js-form-counters">
              <div data-x-dd-click="searchMenu-guests">
                <h4 className="text-15 fw-500 ls-2 lh-16">Guest</h4>

                <div
                  className="text-15 text-light-1 ls-2 lh-16"
                  onClick={() => {
                    handleshow();
                    setDestinationListFlag(false);
                    setCityListFlag(false);
                  }}
                >
                  <span className="js-count-adult">{adults}</span> adults{" "}
                  <span className="js-count-child">{children}</span> children{" "}
                </div>
              </div>
              {isShown ? (
                <div
                  className="searchMenu-guests__field shadow-2 -is-active"
                  data-x-dd="searchMenu-guests"
                  data-x-dd-toggle="-is-active"
                >
                  <div className="bg-white px-20 py-20">
                    <div className="row y-gap-10 justify-between items-center">
                      <div className="col-auto">
                        <div className="text-15 fw-500">Adults(12y +)</div>
                        <p>on the day of travel</p>
                      </div>

                      <div className="col-auto">
                        <div
                          className="d-flex items-center js-counter"
                          data-value-change=".js-count-adult"
                        >
                          <button
                            className="button -outline-blue-1 text-blue-1 size-38 js-down"
                            onClick={handleAdultsDecrement}
                          >
                            <i className="icon-minus text-12"></i>
                          </button>

                          <div className="flex-center size-20 ml-15 mr-15">
                            <div className="text-15 js-count">{adults}</div>
                          </div>

                          <button
                            className="button -outline-blue-1 text-blue-1 size-38 js-up"
                            onClick={handleAdultsIncrement}
                          >
                            <i className="icon-plus text-12"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-top-light mt-24 mb-24"></div>

                    <div className="row y-gap-10 justify-between items-center">
                      <div className="col-auto">
                        <div className="text-15 lh-12 fw-500">
                          Children(2y - 12y )
                        </div>
                        <p>on the day of travel</p>
                      </div>

                      <div className="col-auto">
                        <div
                          className="d-flex items-center js-counter"
                          data-value-change=".js-count-child"
                        >
                          <button
                            className="button -outline-blue-1 text-blue-1 size-38 js-down"
                            onClick={handleChildrenDecrement}
                          >
                            <i className="icon-minus text-12"></i>
                          </button>

                          <div className="flex-center size-20 ml-15 mr-15">
                            <div className="text-15 js-count">{children}</div>
                          </div>

                          <button
                            className="button -outline-blue-1 text-blue-1 size-38 js-up"
                            onClick={handleChildrenIncrement}
                          >
                            <i className="icon-plus text-12"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-top-light mt-24 mb-24"></div>

                    <div className="row y-gap-10 justify-between items-center">
                      <div className="col-auto">
                        <div className="text-15 lh-12 fw-500">
                          INFANTS (below 2y)
                        </div>
                        <p>on the day of travel</p>
                      </div>

                      <div className="col-auto">
                        <div
                          className="d-flex items-center js-counter"
                          data-value-change=".js-count-child"
                        >
                          <button
                            className="button -outline-blue-1 text-blue-1 size-38 js-down"
                            onClick={handleInfantsDecrement}
                          >
                            <i className="icon-minus text-12"></i>
                          </button>

                          <div className="flex-center size-20 ml-15 mr-15">
                            <div className="text-15 js-count">{infants}</div>
                          </div>

                          <button
                            className="button -outline-blue-1 text-blue-1 size-38 js-up"
                            onClick={handleInfantsIncrement}
                          >
                            <i className="icon-plus text-12"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-top-light mt-24 mb-24"></div>
                    <div className="row y-gap-10 justify-between items-center">
                      <div className="col-auto">
                        <div className="text-15 lh-12 fw-500">
                          CHOOSE TRAVEL CLASS
                        </div>
                        <p>
                          <span
                            onClick={() => {
                              setTravelClass("ECONOMY");
                            }}
                          >
                            Economy
                          </span>{" "}
                          /
                          <span
                            onClick={() => {
                              setTravelClass("PREMIUM_ECONOMY");
                            }}
                          >
                            {" "}
                            Premium{" "}
                          </span>
                          /{" "}
                          <span
                            onClick={() => {
                              setTravelClass("BUSINESS");
                            }}
                          >
                            Business
                          </span>
                          /{" "}
                          <span
                            onClick={() => {
                              setTravelClass("FIRST");
                            }}
                          >
                            First
                          </span>
                        </p>
                      </div>

                      <div className="col-auto col-12">
                        <div
                          className="js-counter"
                          data-value-change=".js-count-child"
                        >
                          <div className="">
                            <div className="text-15 js-count">
                              {travelClass}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="button-item">
              <button
                className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 bg-blue-1 text-white"
                onClick={() => {
                  FlightApiCall();
                }}
              >
                {/* <i className="icon-search text-20 mr-10"></i> */}
                {loaderApiRes ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}

        <div className="moreOption text-white">
          <div className="selextbox">
            <DropdownButton
              id="dropdown-basic-button"
              className="bg-arrowndown dropdown-basic-button2"
              title="Select Preferred Airline"
            >
              <i className="fa fa-angle-down" aria-hidden="true"></i>
              <div className="form-check">
                <input
                  onClick={handleCheckboxChange}
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked
                  id="onestar5"
                  value="Spicejet"
                />
                <label className="form-check-label" htmlFor="onestar5">
                  Spicejet
                </label>
              </div>
              <div className="form-check">
                <input
                  onClick={handleCheckboxChange}
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="onestar4"
                  value="Go First"
                />
                <label className="form-check-label" htmlFor="onestar4">
                  Go First
                </label>
              </div>
              <div className="form-check">
                <input
                  onClick={handleCheckboxChange}
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="onestar3"
                  value="Trujet"
                />
                <label className="form-check-label" htmlFor="onestar3">
                  Trujet
                </label>
              </div>
              <div className="form-check">
                <input
                  onClick={handleCheckboxChange}
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="onestar2"
                  value="Vistara"
                />
                <label className="form-check-label" htmlFor="onestar2">
                  Vistara
                </label>
              </div>
              <div className="form-check">
                <input
                  onClick={handleCheckboxChange}
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="onestar"
                  value="Air India"
                />
                <label className="form-check-label" htmlFor="onestar">
                  Air India
                </label>
              </div>
              <div className="form-check">
                <input
                  onClick={handleCheckboxChange}
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="Indigo"
                  value="Indigo"
                />
                <label className="form-check-label" htmlFor="Indigo">
                  Indigo
                </label>
              </div>
            </DropdownButton>
          </div>

          <div className="selextbox selectcheck">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="Direct-Flight"
                onChange={(e) => {
                  setDirectFlight(e.target.checked);
                }}
              />
              <label
                className="form-check-label text-15 ml-5"
                htmlFor="Direct-Flight"
              >
                Direct Flight
              </label>
            </div>
          </div>
          <div className="selextbox selectcheck">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="Credit-Shell"
              />
              <label
                className="form-check-label text-15 ml-5"
                htmlFor="Credit-Shell"
              >
                Credit Shell
              </label>
            </div>
          </div>
        </div>
        <div className="moreOption text-white">
          <div className="selextbox">
            <h6 className="text-16 fw-400">Select Fare Type:</h6>
          </div>

          <div className="selextbox">
            <div className="form-radio d-flex items-center ">
              <div className="radio">
                <input
                  type="radio"
                  name="name"
                  id="regular-fares"
                  onClick={() => {
                    setPft("REGULAR");
                  }}
                />
                <div className="radio__mark border-light">
                  <div className="radio__icon" />
                </div>
              </div>
              <label className="ml-10" htmlFor="regular-fares">
                Regular Fares
              </label>
            </div>
          </div>
          <div className="selextbox">
            <div className="form-radio d-flex items-center ">
              <div className="radio">
                <input
                  type="radio"
                  name="name"
                  id="Student-Fares"
                  onClick={() => {
                    setPft("STUDENT");
                  }}
                />
                <div className="radio__mark border-light">
                  <div className="radio__icon" />
                </div>
              </div>
              <label className="ml-10" htmlFor="Student-Fares">
                Student Fares
              </label>
            </div>
          </div>
          <div className="selextbox">
            <div className="form-radio d-flex items-center ">
              <div className="radio">
                <input
                  type="radio"
                  name="name"
                  id="seniar-citizen"
                  onClick={() => {
                    setPft("SENIOR_CITIZEN");
                  }}
                />
                <div className="radio__mark border-light">
                  <div className="radio__icon" />
                </div>
              </div>
              <label className="ml-10" htmlFor="seniar-citizen">
                Senior Citizen Fares
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightFilter;
