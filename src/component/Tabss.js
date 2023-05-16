import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Datepicker from "react-tailwindcss-datepicker";
import "react-bootstrap";
import axios from "axios";
import Country from "./Country.json";
import { ApiUrl, ApiKey, ApiUrlHotel } from "../config/Config";
import Airport from "../json/AirportAirline.json";
import FlightFilter from "./flights/FlightFilter";
import Hotelfilter from "./hotels/Hotelfilter";
import debounce from "lodash.debounce";
import loadingImg from "../images/loaderApi.gif";

const Tabss = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [allCities, setAllCities] = useState([]);
  const [cityvalue, setCityValue] = useState("");
  const [cityvalD, setCityValD] = useState("");
  const [cityListFlag, setCityListFlag] = useState(false);
  const [destinationListFlag, setDestinationListFlag] = useState(false);
  const [cityFilterValue, setCityFilterValue] = useState([]);
  const [cityFilterValueDest, setCityFilterValueDest] = useState([]);
  const [airportFilterValue, setAirportFilterValue] = useState([]);
  const [airportFilterValueDest, setAirportFilterValueDest] = useState([]);
  const [airportLocation, setAirportLocation] = useState("");
  const [airportLocationDest, setAirportLocationDest] = useState("");
  const [locationCode, setLocationCode] = useState("");
  const [destinationCode, setDestinationCode] = useState("");
  const [selectnationlity, setSelectnationlity] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [error, setError] = useState();
  const [startDate, setStartDate] = useState("");
  const [loaderApiRes, setLoaderApiRes] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [selectedCityObject, setSelectedCityObject] = useState({});
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleChangeCity = (val) => {
    setCityListFlag(true);
    setDestinationListFlag(false);
    setCityValue(val);
    // const newData = allCities?.filter((data) =>
    //   data.cityName.toLowerCase().includes(val.toLowerCase())
    // );
    // setCityFilterValue(newData);
    handleSearchCity(val);
    // const debouncedSave = debounce(() => handleSearchCity(val), 1000);
    // debouncedSave();
  };

  const handleSearchCity = () => {
    axios
      .get(
        `https://rasatva.apponedemo.top/travel/api/cities?searchVal=${cityvalue}`
      )
      .then((data) => {
        console.log("cityyyy data", data?.data?.data);
        const newData = data?.data?.data?.filter((item) =>
          item.cityName.toLowerCase().includes(cityvalue.toLowerCase())
        );
        setCityFilterValue(newData);
      });
  };

  const handleCitySelect = (val) => {
    console.log("selected city", val);
    setSelectedCityObject(val);
    //   {
    //     "id": 180144,
    //     "cityName": "BIJAIPUR",
    //     "countryName": "INDIA",
    //     "type": "CITY"
    // }
    setCityValue(val?.cityName);
  };

  return (
    <div className="flightcontainer">
      <main>
        <section className="topspace relative z-5">
          <div className="container mx-auto container-xl">
            <div className="row justify-center">
              <div className="col-xl-12">
                <div className="text-center">
                  <h1 className="text-60 lg:text-40 md:text-30 text-white">
                    Discover Your World
                  </h1>
                  <p className="text-white mt-5">
                    Discover amzaing places at exclusive deals
                  </p>
                </div>
                <div className="tabs_category">
                  <div className="tabs__controlssdf">
                    <button
                      className={
                        activeTab === 1
                          ? "active tabs__button px-30 py-20 rounded-4 fw-600 text-white js-tabs-button is-tab-el-active"
                          : ""
                      }
                      onClick={() => handleTabClick(1)}
                    >
                      Flights
                    </button>
                    <button
                      className={
                        activeTab === 2
                          ? "active tabs__button px-30 py-20 rounded-4 fw-600 text-white js-tabs-button"
                          : ""
                      }
                      onClick={() => handleTabClick(2)}
                    >
                      Tour
                    </button>
                    <button
                      className={
                        activeTab === 3
                          ? "active tabs__button px-30 py-20 rounded-4 fw-600 text-white js-tabs-button"
                          : ""
                      }
                      onClick={() => handleTabClick(3)}
                    >
                      Hotel
                    </button>
                  </div>

                  <div className="tab-content">
                    {activeTab === 1 && <FlightFilter />}

                    <div className="D">
                      {activeTab === 2 && (
                        <div class="d">
                          <div class="tabs__pane -tab-item-1 is-tab-el-active">
                            <div class="mainSearch bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 shadow-1">
                              <div class="button-grid items-center grid-colams">
                                <div class="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch -is-dd-wrap-active">
                                  <div data-x-dd-click="searchMenu-loc">
                                    <h4 class="text-15 fw-500 ls-2 lh-16">
                                      Location
                                    </h4>

                                    <div class="text-15 text-light-1 ls-2 lh-16">
                                      <input
                                        autocomplete="off"
                                        type="search"
                                        // value={cityvalD}
                                        // onChange={(e) => { handleChangeCity(e.target.value) }}
                                        placeholder="Where are you going?"
                                        class="js-search js-dd-focus"
                                      />
                                    </div>
                                  </div>

                                  <div
                                    class="searchMenu-loc__field shadow-2 js-popup-window -is-active"
                                    data-x-dd="searchMenu-loc"
                                    data-x-dd-toggle="-is-active"
                                  >
                                    <div class="bg-white px-30 py-30 sm:px-0 sm:py-15 rounded-4">
                                      <div class="y-gap-5 js-results">
                                        <div className="cityDataScroll">
                                          {cityFilterValue?.map((data) => {
                                            return (
                                              <button
                                                key={data.cityName}
                                                class="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleCitySelect(data);
                                                }}
                                              >
                                                <div class="d-flex">
                                                  <div class="icon-location-2 text-light-1 text-20 pt-4"></div>
                                                  <div class="ml-10">
                                                    <div class="text-15 lh-12 fw-500 js-search-option-target">
                                                      {data.cityName}
                                                    </div>
                                                    <div class="text-14 lh-12 text-light-1 mt-5">
                                                      {data.countryName}
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
                                </div>
                                <div class="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
                                  <div data-x-dd-click="searchMenu-loc">
                                    <h4 class="text-15 fw-500 ls-2 lh-16">
                                      Destination
                                    </h4>

                                    <div class="text-15 text-light-1 ls-2 lh-16">
                                      <input
                                        autocomplete="off"
                                        // value={cityvalueD}
                                        // onChange={(e) => { handleChangeCityDest(e.target.value) }}
                                        type="search"
                                        placeholder="Where are you going?"
                                        class="js-search js-dd-focus"
                                      />
                                    </div>
                                  </div>

                                  <div
                                    class="searchMenu-loc__field shadow-2 js-popup-window -is-active"
                                    data-x-dd="searchMenu-loc"
                                    data-x-dd-toggle="-is-active"
                                  >
                                    <div class="bg-white px-30 py-30 sm:px-0 sm:py-15 rounded-4">
                                      <div class="y-gap-5 js-results">
                                        <div className="cityDataScroll">
                                          {cityFilterValueDest?.map((data) => {
                                            return (
                                              <button
                                                key={data.cityName}
                                                class="-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option"
                                              >
                                                <div
                                                  class="d-flex"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCitySelect(data);
                                                  }}
                                                >
                                                  <div class="icon-location-2 text-light-1 text-20 pt-4"></div>
                                                  <div class="ml-10">
                                                    <div class="text-15 lh-12 fw-500 js-search-option-target">
                                                      {data.cityName}
                                                    </div>
                                                    <div class="text-14 lh-12 text-light-1 mt-5">
                                                      {data.countryName}
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
                                </div>
                                <div class="searchMenu-date px-10 lg:py-20 lg:px-0 js-form-dd js-calendar">
                                  <div data-x-dd-click="searchMenu-date">
                                    <h4 class="text-15 fw-500 ls-2 lh-16">
                                      Check in - Check out
                                    </h4>
                                  </div>
                                </div>
                                <div class="searchMenu-guests px-30 lg:py-20 lg:px-0 js-form-dd js-form-counters">
                                  <div data-x-dd-click="searchMenu-guests">
                                    <h4 class="text-15 fw-500 ls-2 lh-16">
                                      Guest
                                    </h4>

                                    <div class="text-15 text-light-1 ls-2 lh-16">
                                      <select className="form-control">
                                        <option>Adults</option>
                                        <option>Childeren</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div class="button-item">
                                  <button class="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-blue-1 text-white">
                                    <i class="icon-search text-20 mr-10"></i>
                                    Search
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 3 && <Hotelfilter />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default Tabss;
