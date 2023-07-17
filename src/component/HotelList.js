import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import recommendedhotel from "../../src/images/hotels/1.png";
import hotelnot from "../../src/images/hotels/3.png";
import darklogo from "../../src/images/logo-dark.svg";
import Footer from "./Footer";
import axios from "axios";
import { ApiUrl, ApiUrlHotel, ApiKey } from "../config/Config";
import { AuthService } from "../services/auth";

const HotelList = () => {
  const { state } = useLocation();
  const data = state?.data?.searchResult?.his;
  const [detailId, setDetailId] = useState("");
  // const [response, setResponse] = useState(null);
  // const aminities = data?.map(item => data.ops?.map(option => option.ris.map(roomInformation => {
  //   return roomInformation.fcs
  // })))
  // console.log(aminities)
  const navigate = useNavigate();

  console.log(data);

  useEffect(() => {
    if (data && data.length > 0) {
      const id = data[0].id;
      setDetailId(id);
    }
  }, [data]);

  // const apikey = "7121268d836907-c712-4301-81f3-bf819f0c159f";

  const handleApiCall = (id) => {
    navigate(`/HotelDetails/${id}`, {
      state: {
        info: state?.info
      }
    });
  };

  const [searchFilter, setSearchFilter] = React.useState("")
  const [priceFilter, setPriceFilter] = React.useState(Math.min())
  const [ratingFilter, setRatingFilter] = React.useState([1, 2, 3, 4, 5])

  React.useEffect(() => {
    // debugger
    console.log(ratingFilter)
  }, [ratingFilter])

  const toggleRatingFilter = (num) => {
    // debugger
    setRatingFilter(ratingFilter => {
      if (!ratingFilter.includes(num)) {
        return [...ratingFilter, num]
      } else {
        const idx = ratingFilter.indexOf(num)
        const newRatingfilter = [...ratingFilter]
        newRatingfilter.splice(idx, 1)
        return newRatingfilter
      }
    })
  }

  return (
    <div>
      <div className="header-margin"></div>
      <header
        className="header bg-white shadow-3 js-header"
        data-x="header"
        data-x-toggle="is-menu-opened"
      >
        <div className="container">
          <div className="row d-flex justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <a
                  href="index.html"
                  className="header-logo mr-30"
                  data-x="header-logo"
                  data-x-toggle="is-logo-dark"
                >
                  <img src={darklogo} alt="logo icon" />
                </a>
              </div>
            </div>
            {/* <div className="header-menu col-auto" data-x="mobile-menu" data-x-toggle="is-menu-active">
                      <div className="mobile-overlay" />
                      <div className="header-menu__content">
                          <div className="mobile-bg js-mobile-bg" />
                          <div className="menu js-navList d-flex justify-content-between">
                              <ul className="menu__nav text-dark-1 -is-active text-center">
                                  <li><a href="#"> Home</a></li>
                                  <li><a href="#"> Flight</a></li>
                                  <li><a href="#"> Hotal</a></li>
                                  <li><a href="#"> Destination</a></li>
                                  <li><a href="#"> Tour</a></li>
                                  <li><a href="#">Contact</a></li>

                              </ul>


                          </div>
                          <div className="mobile-footer px-20 py-20 border-top-light js-mobile-footer">
                          </div>
                      </div>
                  </div> */}
            <div className="col-auto">
              <div className="d-flex items-center">
                {AuthService.isUserLoggedIn() && (
                  <div className="d-flex ">
                    <a
                      href="#"
                      className="button -outline-blue-1 px-30 fw-400 text-14 h-50 text-blue-1"
                    >
                      Sign In / Register
                    </a>
                  </div>
                )}
                <div
                  className="d-none xl:d-flex x-gap-20 items-center pl-30"
                  data-x="header-mobile-icons"
                  data-x-toggle="text-white"
                >
                  <div>
                    <a
                      href="login.html"
                      className="d-flex items-center icon-user text-inherit text-22"
                    />
                  </div>
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-x-click="html, header, header-logo, header-mobile-icons, mobile-menu"
                    />
                  </div>Price
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3 col-lg-4 lg:d-none">
              <aside className="sidebar y-gap-40">
                <div className="sidebar__item -no-border">
                  <h5 className="text-18 fw-500 mb-10">Search by name</h5>
                  <div className="single-field relative d-flex items-center py-10">
                    <input
                      className="pl-50 border-light text-dark-1 h-50 rounded-8"
                      type="text"
                      placeholder="Search Hotels"
                      value={searchFilter}
                      onChange={e => setSearchFilter(e.target.value)}
                    />
                    <button className="absolute d-flex items-center h-full">
                      <i className="icon-search text-20 px-15 text-dark-1" />
                    </button>
                  </div>
                </div>
                <div className="sidebar__item">
                  <h5 className="text-18 fw-500 mb-10">Price</h5>
                  <div className="sidebar-checkbox">
                    <div className="row y-gap-10 items-center justify-between">
                      <div className="col-auto">
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={priceFilter === 500} onClick={() => setPriceFilter(500)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">Upto 500</div>
                        </div>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={priceFilter === 1000} onClick={() => setPriceFilter(1000)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">Upto 1000</div>
                        </div>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={priceFilter === 2000} onClick={() => setPriceFilter(2000)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">Upto 2000</div>
                        </div>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={priceFilter === 5000} onClick={() => setPriceFilter(5000)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">Upto 5000</div>
                        </div>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={priceFilter === 10000} onClick={() => setPriceFilter(10000)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">Upto 10000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar__item">
                  <h5 className="text-18 fw-500 mb-10">Rating</h5>
                  <div className="sidebar-checkbox">
                    <div className="row y-gap-10 items-center justify-between">
                      <div className="col-auto">
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={ratingFilter.includes(5)} onClick={() => toggleRatingFilter(5)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">5</div>
                        </div>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={ratingFilter.includes(4)} onClick={() => toggleRatingFilter(4)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">4</div>
                        </div>
                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={ratingFilter.includes(3)} onClick={() => toggleRatingFilter(3)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">3</div>
                        </div>                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={ratingFilter.includes(2)} onClick={() => toggleRatingFilter(2)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">2</div>
                        </div>                        <div className="d-flex items-center">
                          <div className="form-checkbox">
                            <input type="checkbox" checked={ratingFilter.includes(1)} onClick={() => toggleRatingFilter(1)} />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon icon-check" />
                            </div>
                          </div>
                          <div className="text-15 ml-10">1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="row y-gap-10 items-center justify-between">
                <div className="col-auto">
                  <div className="text-18">
                    <span className="fw-500">3,269 Hotels</span> in India
                  </div>
                </div>
                <div className="col-auto">
                  <div className="row x-gap-20 y-gap-20">
                    {/* <div className="col-auto">
                      <button className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1">
                        <i className="icon-up-down text-14 mr-10" />
                        Sort
                      </button>
                    </div> */}
                    <div className="col-auto d-none lg:d-block">
                      <button
                        data-x-click="filterPopup"
                        className="button -blue-1 h-40 px-20 rounded-100 bg-blue-1-05 text-15 text-blue-1"
                      >
                        <i className="icon-up-down text-14 mr-10" />
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-30" />
              <div className="row y-gap-30">
                {data?.filter(item => item.name.toLowerCase().includes(searchFilter.toLowerCase()) && item?.ops[0].ris[0].tp < priceFilter && ratingFilter.includes(item.rt)).map((item, index) => {
                  return (
                    <div className="col-12" key={index}>
                      <div className="border-top-light pt-30">
                        <div className="row x-gap-20 y-gap-20">
                          <div className="col-md-auto">
                            <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                              <div className="cardImage__content">
                                {/* <img  src={recommendedhotel} alt="image" /> */}
                                <img
                                  className="rounded-4 col-12"
                                  src={
                                    item?.img[0]?.tns
                                      ? item?.img[0]?.tns
                                      : item?.img[0]?.url
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="cardImage__wishlist">
                                <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                                  <i className="icon-heart text-12" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-md">
                            <h3 className="text-18 lh-16 fw-500">
                              {item?.name}
                              <br className="lg:d-none" />
                              <div className="d-inline-block ml-10">
                                <i className="icon-star text-10 text-yellow-1" />
                                <i className="icon-star text-10 text-yellow-1" />
                                <i className="icon-star text-10 text-yellow-1" />
                                <i className="icon-star text-10 text-yellow-1" />
                                <i className="icon-star text-10 text-yellow-1" />
                              </div>
                            </h3>
                            <div className="row x-gap-10 y-gap-10 items-center pt-10">
                              <div className="col-auto">
                                <p className="text-14"></p>
                              </div>
                              <div className="col-auto">
                                <button className="d-block text-14 text-blue-1 underline">
                                  Show on map
                                </button>
                              </div>
                              <div className="col-auto">
                                <div className="size-3 rounded-full bg-light-1" />
                              </div>
                              <div className="col-auto">
                                <p className="text-14">2 km to city center</p>
                              </div>
                            </div>
                            <div className="text-14 lh-15 mt-20">
                              <div className="fw-500">
                                {item?.ops[0].ris[0].id}
                              </div>
                              <div className="text-light-1">
                                {item?.ops[0].ris[0].rc}
                              </div>
                              <br></br>
                              <div className="text-light-1">
                                {item?.ops[0].ris[0].mb}
                              </div>
                              <br />
                              <div className="text-14 lh-15 mt-20">
                                {item?.ad.adr}
                              </div>
                            </div>
                            {/* <div className="text-14 text-green-2 lh-15 mt-10">
                              <div className="fw-500">Free cancellation</div>
                              <div className>
                                You can cancel later, so lock in this great
                                price today.
                              </div>
                            </div> */}
                            <div className="row x-gap-10 y-gap-10 pt-20">
                              <div className="col-auto">
                                <div className="border-light rounded-100 py-2 px-4 text-14 lh-14">
                                  Breakfast
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="border-light rounded-100 py-2 px-4 text-14 lh-14">
                                  WiFi
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-auto text-right md:text-left">
                            <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                              <div className="col-auto">
                                <div className="text-14 lh-14 fw-500">
                                  Exceptional
                                </div>
                                <div className="text-14 lh-14 text-light-1">
                                  3,014 reviews
                                </div>
                              </div>
                              <div className="col-auto">
                                <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                                  {item?.rt}
                                </div>
                              </div>
                            </div>
                            <div className>
                              <div className="text-14 text-light-1 mt-50 md:mt-20">
                                8 nights, 2 adult
                              </div>
                              <div className="text-22 lh-12 fw-600 mt-5">
                                INR {item?.ops[0].ris[0].tp}
                              </div>
                              {/* <div className="text-14 text-light-1 mt-5">
                                +US$828 taxes and charges
                              </div> */}
                              <button
                                className="button -md -dark-1 bg-blue-1 text-white mt-24"
                                onClick={(e) => {
                                  handleApiCall(item.id);
                                }}
                              >
                                See Availability{" "}
                                <div className="icon-arrow-top-right ml-15" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default HotelList;
