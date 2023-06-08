import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Datepicker from "react-tailwindcss-datepicker";
import "react-bootstrap";
import axios from "axios";
import Country from "../Country.json";
import { ApiKey, ApiUrlHotel } from "../../config/Config";

const Hotelfilter = () => {
  const navigate = useNavigate();

  const [cityvalue, setCityValue] = useState("");
  const [age, setAge] = useState([]);
  const [countryValue, setCountryValue] = useState("");
  const [cityListFlag, setCityListFlag] = useState(false);
  const [destinationListFlag, setDestinationListFlag] = useState(false);
  const [cityFilterValue, setCityFilterValue] = useState([]);
  const [selectnationlity, setSelectnationlity] = useState("");
  const [selectedRatings, setSelectedRatings] = useState(["5", "4"]);
  const [isShown, setIsShown] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState();
  const [startDate, setStartDate] = useState("");
  const [loaderApiRes, setLoaderApiRes] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [childrenAge, setChildrenAge] = useState([]);
  const [selectedCityObject, setSelectedCityObject] = useState({});
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handleshow = (event) => {
    if (isShown == false) {
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  };

  const handleAdultsDecrement = () => {
    if (adults > 0) {
      setAdults(adults - 1);
    }
  };

  const handleAdultsIncrement = () => {
    setAdults(adults + 1);
  };

  const handleChildrenDecrement = () => {
    if (children > 0) {
      setChildren(children - 1);
      childrenAge.pop();
    }
  };

  const handleChildrenIncrement = () => {
    setChildren(children + 1);
    childrenAge.push("5");
  };

  const handleRoomsDecrement = () => {
    if (rooms > 0) {
      setRooms(rooms - 1);
    }
  };

  const handleRoomsIncrement = () => {
    setRooms(rooms + 1);
  };

  const handleDateValue = (value) => {
    if (value.startDate && value.endDate) {
      setSelectedDates({ startDate: value.startDate, endDate: value.endDate });
      setStartDate(value.startDate);
      setEndDate(value.endDate);
    }
  };

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    if (event.target.checked) {
      setSelectedRatings((prevRatings) => [...prevRatings, rating]);
    } else {
      setSelectedRatings((prevRatings) =>
        prevRatings.filter((prevRating) => prevRating !== rating)
      );
    }
  };

  const handleCountryChange = (event) => {
    // selectedCityObject.countryName
    const selectedCountryName = event.target.value;
    const selectedCountry = Country.find(
      (country) => country.name === selectedCountryName
    );
  };
  const handleChangeNationlity = (event) => {
    const selectedCountryName = event.target.value;
    const selectedCountry = Country.find(
      (country) => country.name === selectedCountryName
    );
    setSelectnationlity(selectedCountry?.countryid);
  };

  const Searchlist = () => {
    setLoaderApiRes(true);
    const searchQuery = {
      searchQuery: {
        checkinDate: startDate,
        checkoutDate: endDate,
        roomInfo: [
          {
            numberOfAdults: adults,
            numberOfChild: children,
            childAge: children ? childrenAge : [],
          },
        ],
        searchCriteria: {
          city: selectedCityObject?.id,
          // city: setid.toString(),
          nationality: selectnationlity,
          currency: "INR",
        },
        searchPreferences: {
          ratings: selectedRatings,
          fsc: true,
        },
      },
      sync: true,
    };
    const newConfig = {
      "Content-Type": "application/json ",
      apikey: ApiKey,
    };
    const data = JSON.stringify(searchQuery);
    axios
      .post(`${ApiUrlHotel}hotel-searchquery-list`, data, {
        headers: newConfig,
      })
      .then((response) => {
        setLoaderApiRes(false);
        console.log("response", response);
        navigate("/HotelList", { state: { data: response.data } });
      })
      .catch((error) => {
        console.log("error", error.message);
        setError(error);
        alert("no data found");
        setLoaderApiRes(false);
      });
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

  const handleSearchCity = (val) => {
    setCityFilterValue([]);
    axios
      .get(`https://rasatva.apponedemo.top/travel/api/cities?searchVal=${val}`)
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
    const selectedCountry = Country.find(
      (country) =>
        country?.name?.toLowerCase() === val?.countryName?.toLowerCase()
    );
    setSelectnationlity(selectedCountry?.countryid);
    //   {
    //     "id": 180144,
    //     "cityName": "BIJAIPUR",
    //     "countryName": "INDIA",
    //     "type": "CITY"
    // }
    setCityValue(val?.cityName);
  };

  return (
    <div className="tabs__pane -tab-item-1 is-tab-el-active">
      <div className="mainSearch bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 shadow-1">
        <div className="button-grid items-center grid-colamss hotelscols">
          <div className="searchMenu-loc px-20 lg:py-20 lg:px-0 js-form-dd js-liverSearch -is-dd-wrap-active">
            <div data-x-dd-click="searchMenu-loc">
              <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>

              <div className="text-15 text-light-1 ls-2 lh-16">
                <input
                  autocomplete="off"
                  type="text"
                  value={cityvalue}
                  onChange={(e) => {
                    handleChangeCity(e.target.value);
                  }}
                  placeholder="Where are you going?"
                  className="js-search js-dd-focus"
                />
              </div>

              {cityFilterValue && cityFilterValue.length > 0 && (
                <div
                  className="searchMenu-loc__field shadow-2 js-popup-window -is-active"
                  data-x-dd="searchMenu-loc"
                  data-x-dd-toggle="-is-active"
                >
                  <div className="bg-white sm:px-0 sm:py-15">
                    <div className="y-gap-5 js-results">
                      <div className="cityDataScroll">
                        {cityFilterValue?.map((data) => {
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
                                  setCityFilterValue(null);
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
              )}
            </div>
          </div>

          <div className="searchMenu-date px-20 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div data-x-dd-click="searchMenu-date">
              <h4 className="text-15 fw-500 ls-2 lh-16">
                Check in - Check out
              </h4>
              <div>
                <Datepicker
                  classNames="date_width"
                  value={{
                    startDate: selectedDates.startDate,
                    endDate: selectedDates.endDate,
                  }}
                  onChange={handleDateValue}
                  minDate={new Date()}
                />
              </div>
            </div>
          </div>

          {/* <div className="searchMenu-date px-10 lg:py-20 lg:px-0 js-form-dd js-calendar">
            <div data-x-dd-click="searchMenu-date">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="text-15 fw-500 ls-2 lh-16">Check in</h4>

                  <DatePicker
                    placeholderText={"dd-mm-yyyy"}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div>
                  <h4 className="text-15 fw-500 ls-2 lh-16">Check out</h4>

                  <DatePicker
                    placeholderText={"dd-mm-yyyy"}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="searchMenu-guests px-20 lg:py-20 lg:px-0 js-form-dd js-form-counters">
            <div data-x-dd-click="searchMenu-guests">
              <h4 className="text-15 fw-500 ls-2 lh-16">Guest</h4>

              <div
                className="text-15 text-light-1 ls-2 lh-16"
                onClick={handleshow}
              >
                <span className="js-count-adult">{adults}</span> adults{" "}
                <span className="js-count-child">{children}</span> children{" "}
                <span className="js-count-room">{rooms}</span> rooms
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
                      <div className="text-15 fw-500">Adults</div>
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
                      <div className="text-15 lh-12 fw-500">Children</div>
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
                      {/* <div className="col-auto">
                        <lable>age</lable>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => {
                            setAge([...age, e.target.value]);
                          }}
                        />
                      </div> */}
                    </div>
                  </div>

                  <div className="border-top-light mt-24 mb-24"></div>
                  <div className="row y-gap-10 justify-between items-center">
                    <div className="col-auto">
                      <div className="text-15 fw-500">Rooms</div>
                    </div>

                    <div className="col-auto">
                      <div
                        className="d-flex items-center js-counter"
                        data-value-change=".js-count-room"
                      >
                        <button
                          className="button -outline-blue-1 text-blue-1 size-38 js-down"
                          onClick={handleRoomsDecrement}
                        >
                          <i className="icon-minus text-12"></i>
                        </button>

                        <div className="flex-center size-20 ml-15 mr-15">
                          <div className="text-15 js-count">{rooms}</div>
                        </div>

                        <button
                          className="button -outline-blue-1 text-blue-1 size-38 js-up"
                          onClick={handleRoomsIncrement}
                        >
                          <i className="icon-plus text-12"></i>
                        </button>
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
                Searchlist();
              }}
            >
              <i className="icon-search text-20 mr-10"></i>
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
      <div className="moreOption text-white">
        <div className="selextbox">
          <DropdownButton
            id="dropdown-basic-button"
            className="bg-arrowndown dropdown-basic-button2 border-none"
            title="Rating"
          >
            <i className="fa fa-angle-down" aria-hidden="true"></i>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked
                value="5"
                id="onestar5"
                onChange={handleRatingChange}
              />
              <label className="form-check-label" htmlFor="onestar5">
                5 Star
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="4"
                defaultChecked
                id="onestar4"
                onChange={handleRatingChange}
              />
              <label className="form-check-label" htmlFor="onestar4">
                4 Star
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="3"
                id="onestar3"
                onChange={handleRatingChange}
              />
              <label className="form-check-label" htmlFor="onestar3">
                3 Star
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="2"
                id="onestar2"
                onChange={handleRatingChange}
              />
              <label className="form-check-label" htmlFor="onestar2">
                2 Star
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="1"
                id="onestar"
                onChange={handleRatingChange}
              />
              <label className="form-check-label" htmlFor="onestar">
                1 Star
              </label>
            </div>
          </DropdownButton>
        </div>
        <div className="selextbox">
          <select
            className="bg-arrowndown dropdown-basic-button2 border-none"
            value={selectedCityObject?.countryName?.toLowerCase()}
            onChange={handleCountryChange}
          >
            <option>Netionality</option>
            {Country.map((country, index) => (
              <option value={country?.name?.toLowerCase()} key={index}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="selextbox">
          <select
            value={selectedCityObject?.countryName?.toLowerCase()}
            className="bg-arrowndown dropdown-basic-button2 border-none"
            onChange={handleChangeNationlity}
          >
            <option>Country</option>
            {Country.map((country, index) => (
              <option value={country?.name?.toLowerCase()} key={index}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="selextbox selectcheck">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="onestar"
            />
            <label className="form-check-label" htmlFor="onestar">
              Special Category
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotelfilter;
