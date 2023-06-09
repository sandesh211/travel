import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-bootstrap";
import axios from "axios";
import FlightFilter from "./flights/FlightFilter";
import Hotelfilter from "./hotels/Hotelfilter";

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
                          ? "active tabs__button px-30 py-20 fw-600 text-white js-tabs-button is-tab-el-active"
                          : ""
                      }
                      onClick={() => handleTabClick(1)}
                    >
                      Flights
                    </button>
                    {/* <button
                      className={
                        activeTab === 2
                          ? "active tabs__button px-30 py-20 fw-600 text-white js-tabs-button"
                          : ""
                      }
                      onClick={() => handleTabClick(2)}
                    >
                      Tour
                    </button> */}
                    <button
                      className={
                        activeTab === 3
                          ? "active tabs__button px-30 py-20 fw-600 text-white js-tabs-button"
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
                        <div className="d">
                          <div className="tabs__pane -tab-item-1 is-tab-el-active">
                            <div className="mainSearch bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 shadow-1">
                              <div className="button-grid items-center grid-colams">
                                <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch -is-dd-wrap-active">
                                  <div data-x-dd-click="searchMenu-loc">
                                    <h4 className="text-15 fw-500 ls-2 lh-16">
                                      Location
                                    </h4>

                                    <div className="text-15 text-light-1 ls-2 lh-16">
                                      <input
                                        autoComplete="off"
                                        type="search"
                                        // value={cityvalD}
                                        // onChange={(e) => { handleChangeCity(e.target.value) }}
                                        placeholder="Where are you going?"
                                        className="js-search js-dd-focus"
                                      />
                                    </div>
                                  </div>

                                  <div
                                    className="searchMenu-loc__field shadow-2 js-popup-window -is-active"
                                    data-x-dd="searchMenu-loc"
                                    data-x-dd-toggle="-is-active"
                                  >
                                    <div className="bg-white px-30 py-30 sm:px-0 sm:py-15">
                                      <div className="y-gap-5 js-results">
                                        <div className="cityDataScroll">
                                          {cityFilterValue?.map((data) => {
                                            return (
                                              <button
                                                key={data.cityName}
                                                className="-link d-block col-12 text-left px-20 py-15 js-search-option"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleCitySelect(data);
                                                }}
                                              >
                                                <div className="d-flex">
                                                  <div className="icon-location-2 text-light-1 text-20 pt-4"></div>
                                                  <div className="ml-10">
                                                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                                                      {data.cityName}
                                                    </div>
                                                    <div className="text-14 lh-12 text-light-1 mt-5">
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
                                <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
                                  <div data-x-dd-click="searchMenu-loc">
                                    <h4 className="text-15 fw-500 ls-2 lh-16">
                                      Destination
                                    </h4>

                                    <div className="text-15 text-light-1 ls-2 lh-16">
                                      <input
                                        autoComplete="off"
                                        // value={cityvalueD}
                                        // onChange={(e) => { handleChangeCityDest(e.target.value) }}
                                        type="search"
                                        placeholder="Where are you going?"
                                        className="js-search js-dd-focus"
                                      />
                                    </div>
                                  </div>

                                  <div
                                    className="searchMenu-loc__field shadow-2 js-popup-window -is-active"
                                    data-x-dd="searchMenu-loc"
                                    data-x-dd-toggle="-is-active"
                                  >
                                    <div className="bg-white px-30 py-30 sm:px-0 sm:py-15">
                                      <div className="y-gap-5 js-results">
                                        <div className="cityDataScroll">
                                          {cityFilterValueDest?.map((data) => {
                                            return (
                                              <button
                                                key={data.cityName}
                                                className="-link d-block col-12 text-left px-20 py-15 js-search-option"
                                              >
                                                <div
                                                  className="d-flex"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCitySelect(data);
                                                  }}
                                                >
                                                  <div className="icon-location-2 text-light-1 text-20 pt-4"></div>
                                                  <div className="ml-10">
                                                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                                                      {data.cityName}
                                                    </div>
                                                    <div className="text-14 lh-12 text-light-1 mt-5">
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
                                <div className="searchMenu-date px-10 lg:py-20 lg:px-0 js-form-dd js-calendar">
                                  <div data-x-dd-click="searchMenu-date">
                                    <h4 className="text-15 fw-500 ls-2 lh-16">
                                      Check in - Check out
                                    </h4>
                                  </div>
                                </div>
                                <div className="searchMenu-guests px-30 lg:py-20 lg:px-0 js-form-dd js-form-counters">
                                  <div data-x-dd-click="searchMenu-guests">
                                    <h4 className="text-15 fw-500 ls-2 lh-16">
                                      Guest
                                    </h4>

                                    <div className="text-15 text-light-1 ls-2 lh-16">
                                      <select className="form-control">
                                        <option>Adults</option>
                                        <option>Childeren</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="button-item">
                                  <button className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 bg-blue-1 text-white">
                                    <i className="icon-search text-20 mr-10"></i>
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
