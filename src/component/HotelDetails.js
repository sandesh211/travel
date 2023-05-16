import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import avatar from "../../src/images/avater.png";
import Footer from "./Footer";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import MapWithAMarker from "./googlemaps/GoogleMap";
import { ApiUrl, ApiUrlHotel, ApiKey } from "../config/Config";
import "./hotels/Hotel.css";

const HotelDetails = () => {
  const { state } = useLocation();
  // const data = state?.data?.hotel;
  const [hotelDetail, setHotelDetail] = useState();
  const [response, setResponse] = useState(null);
  const [loaderApiRes, setLoaderApiRes] = useState(false);
  const [error, setError] = useState();
  const param = useParams();

  useEffect(() => {
    handleApiCall();
  }, []);

  const url = `${ApiUrl}hotel-cancellation-policy`;
  const apikey = "7121268d836907-c712-4301-81f3-bf819f0c159f";
  const requestData = {
    id: "hsid2364874688--2090707905",
    optionId: "1_46343474-78_64050",
  };

  const handlecanclepolicy = () => {
    axios
      .post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          apikey,
        },
      })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleApiCall = () => {
    const url = `${ApiUrlHotel}hotelDetail-search`;
    const requestData = {
      id: param.id,
    };
    axios
      .post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          ApiKey,
        },
      })
      .then((response) => {
        console.log("response data", response?.data?.hotel);
        setHotelDetail(response?.data?.hotel);
        handleReview();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReview = (opID) => {
    const url = `${ApiUrlHotel}hotel-review`;
    const requestData = {
      hotelId: param.id,
      optionId: opID,
    };
    axios
      .post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          ApiKey,
        },
      })
      .then((response) => {
        console.log("response data", response?.data);
        // setHotelDetail(response?.data?.hotel);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {" "}
      <div class="header-margin"></div>
      <main>
        <section className="py-10 d-flex items-center bg-light-2">
          <div className="container">
            <div className="row y-gap-10 items-center justify-between">
              <div className="col-auto">
                <div className="row x-gap-10 y-gap-5 items-center text-14 text-light-1">
                  <div className="col-auto">
                    <div className>Home</div>
                  </div>
                  <div className="col-auto">
                    <div className>&gt;</div>
                  </div>
                  <div className="col-auto">
                    <div className>{hotelDetail?.ad?.state?.name} Hotels</div>
                  </div>
                  <div className="col-auto">
                    <div className>&gt;</div>
                  </div>
                  <div className="col-auto">
                    <div className="text-dark-1">
                      {hotelDetail?.name}, {hotelDetail?.ad?.state?.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <Link to="" className="text-14 text-blue-1 underline">
                  Hotel in {hotelDetail?.ad?.city?.name}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-40">
          <div className="container">
            <div className="hotelSingleGrid">
              <div>
                <Carousel>
                  {hotelDetail?.img?.map((items, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          src={items.url}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>

                <div className="row justify-between items-end pt-40">
                  <div className="col-auto">
                    <div className="row x-gap-20 y-gap-20 items-center">
                      <div className="col-auto">
                        <h1 className="text-26 fw-600">{hotelDetail?.name}</h1>
                      </div>
                      <div className="col-auto">
                        <i className="icon-star text-10 text-yellow-1" />
                        <i className="icon-star text-10 text-yellow-1" />
                        <i className="icon-star text-10 text-yellow-1" />
                        <i className="icon-star text-10 text-yellow-1" />
                        <i className="icon-star text-10 text-yellow-1" />
                      </div>
                    </div>
                    <div className="row x-gap-20 y-gap-20 items-center">
                      <div className="col-auto">
                        <div className="text-15 text-light-1">
                          {hotelDetail?.ad?.adr}
                        </div>
                      </div>
                      <div className="col-auto">
                        <button
                          data-x-click="mapFilter"
                          className="text-blue-1 text-15 underline"
                        >
                          Show on map
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="text-14 text-right">
                      INR
                      <span className="text-22 text-dark-1 fw-500">
                        {hotelDetail?.ops[0]?.ris[0]?.tp}
                      </span>
                    </div>
                    <Link
                      to=""
                      className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-5"
                    >
                      Select Room <div className="icon-arrow-top-right ml-15" />
                    </Link>
                  </div>
                </div>
                <div id="overview" className="row y-gap-40 pt-40">
                  <div className="col-12">
                    <h3 className="text-22 fw-500 pt-40 border-top-light">
                      Overview
                    </h3>
                    <p className="overview-desc"> {hotelDetail?.des}</p>
                  </div>
                  <div className="col-12">
                    <h3 className="text-22 fw-500 pt-40 border-top-light">
                      Most Popular Facilities
                    </h3>
                    <div className="row y-gap-10 pt-20 overview-desc">
                      {hotelDetail?.fl?.map((item, index) => {
                        return (
                          <div className="col-md-5" key={index}>
                            <div className="d-flex x-gap-15 y-gap-15 items-center">
                              <i className="icon-no-smoke" />
                              <div className="text-15">{item}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: "350px" }}>
                <MapWithAMarker
                  containerElement={<div style={{ height: `300px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  lat={hotelDetail?.gl?.lt}
                  lng={hotelDetail?.gl?.ln}
                />
              </div>
              <div>
                {/* <div className="px-30 py-30 border-light rounded-4">
                  <div className="border-top-light mt-15 mb-15" />
                  <div className="text-15 fw-500">Popular landmarks</div>
                  <div className="d-flex justify-between pt-10">
                    <div className="text-14">Royal Pump Room Museum</div>
                    <div className="text-14 text-light-1">0.1 km</div>
                  </div>
                  <div className="d-flex justify-between pt-5">
                    <div className="text-14">Harrogate Turkish Baths</div>
                    <div className="text-14 text-light-1">0.1 km</div>
                  </div>
                  <Link
                    to="#"
                    className="d-block text-14 fw-500 underline text-blue-1 mt-10"
                  >
                    Show More
                  </Link>
                </div> */}
                <div className="px-30 py-30 border-light rounded-4 mt-30">
                  <div className="d-flex items-center">
                    <div className="size-40 flex-center bg-blue-1 rounded-4">
                      <div className="text-14 fw-600 text-white">4.8</div>
                    </div>
                    <div className="text-14 ml-10">
                      <div className="lh-15 fw-500">Exceptional</div>
                      <div className="lh-15 text-light-1">3,014 reviews</div>
                    </div>
                  </div>
                  <div className="d-flex mt-20">
                    <i className="icon-group text-16 mr-10 pt-5" />
                    <div className="text-15">
                      Highly rated by guests – 86% would recommend
                    </div>
                  </div>
                  <div className="border-top-light mt-20 mb-20" />
                  <div className="row x-gap-10 y-gap-10">
                    <div className="col-auto">
                      <div className="d-flex items-center py-5 px-20 rounded-100 border-light">
                        <i className="icon-like text-12 text-blue-1 mr-10" />
                        <div className="text-14 lh-15">
                          Breakfast{" "}
                          <span className="fw-500 text-blue-1">25</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="d-flex items-center py-5 px-20 rounded-100 border-light">
                        <i className="icon-like text-12 text-blue-1 mr-10" />
                        <div className="text-14 lh-15">
                          WiFi <span className="fw-500 text-blue-1">14</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="d-flex items-center py-5 px-20 rounded-100 border-light">
                        <i className="icon-like text-12 text-blue-1 mr-10" />
                        <div className="text-14 lh-15">
                          Food &amp; Dining{" "}
                          <span className="fw-500 text-blue-1">67</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-30 py-30 border-light rounded-4 mt-30">
                  <div className="text-18 fw-500">Property highlights</div>
                  <div className="row x-gap-20 y-gap-20 pt-20">
                    <div className="col-auto">
                      <i className="icon-city text-24 text-blue-1" />
                    </div>
                    <div className="col-auto">
                      <div className="text-15">In London City Centre</div>
                    </div>
                  </div>
                  <div className="row x-gap-20 y-gap-20 pt-5">
                    <div className="col-auto">
                      <i className="icon-airplane text-24 text-blue-1" />
                    </div>
                    <div className="col-auto">
                      <div className="text-15">Airport transfer</div>
                    </div>
                  </div>
                  <div className="row x-gap-20 y-gap-20 pt-5">
                    <div className="col-auto">
                      <i className="icon-bell-ring text-24 text-blue-1" />
                    </div>
                    <div className="col-auto">
                      <div className="text-15">Front desk [24-hour]</div>
                    </div>
                  </div>
                  <div className="row x-gap-20 y-gap-20 pt-5">
                    <div className="col-auto">
                      <i className="icon-tv text-24 text-blue-1" />
                    </div>
                    <div className="col-auto">
                      <div className="text-15">Premium TV channels</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-light-2 py-3 mt-6">
          <div className="container mt-50">
            <div className="row y-gap-40 justify-between">
              <div className="col-xl-3">
                <h3 className="text-22 fw-500">Guest reviews</h3>
                <div className="d-flex items-center mt-20">
                  <div className="flex-center bg-blue-1 rounded-4 size-70 text-22 fw-600 text-white">
                    4.8
                  </div>
                  <div className="ml-20">
                    <div className="text-16 text-dark-1 fw-500 lh-14">
                      Exceptional
                    </div>
                    <div className="text-15 text-light-1 lh-14 mt-4">
                      3,014 reviews
                    </div>
                  </div>
                </div>
                <div className="row y-gap-20 pt-20">
                  <div className="col-12">
                    <div className>
                      <div className="d-flex items-center justify-between">
                        <div className="text-15 fw-500">Location</div>
                        <div className="text-15 text-light-1">9.4</div>
                      </div>
                      <div className="progressBar mt-10">
                        <div className="progressBar__bg bg-blue-2" />
                        <div
                          className="progressBar__bar bg-blue-1"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className>
                      <div className="d-flex items-center justify-between">
                        <div className="text-15 fw-500">Staff</div>
                        <div className="text-15 text-light-1">9.4</div>
                      </div>
                      <div className="progressBar mt-10">
                        <div className="progressBar__bg bg-blue-2" />
                        <div
                          className="progressBar__bar bg-blue-1"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className>
                      <div className="d-flex items-center justify-between">
                        <div className="text-15 fw-500">Cleanliness</div>
                        <div className="text-15 text-light-1">9.4</div>
                      </div>
                      <div className="progressBar mt-10">
                        <div className="progressBar__bg bg-blue-2" />
                        <div
                          className="progressBar__bar bg-blue-1"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className>
                      <div className="d-flex items-center justify-between">
                        <div className="text-15 fw-500">Value for money</div>
                        <div className="text-15 text-light-1">9.4</div>
                      </div>
                      <div className="progressBar mt-10">
                        <div className="progressBar__bg bg-blue-2" />
                        <div
                          className="progressBar__bar bg-blue-1"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className>
                      <div className="d-flex items-center justify-between">
                        <div className="text-15 fw-500">Comfort</div>
                        <div className="text-15 text-light-1">9.4</div>
                      </div>
                      <div className="progressBar mt-10">
                        <div className="progressBar__bg bg-blue-2" />
                        <div
                          className="progressBar__bar bg-blue-1"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className>
                      <div className="d-flex items-center justify-between">
                        <div className="text-15 fw-500">Facilities</div>
                        <div className="text-15 text-light-1">9.4</div>
                      </div>
                      <div className="progressBar mt-10">
                        <div className="progressBar__bg bg-blue-2" />
                        <div
                          className="progressBar__bar bg-blue-1"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className>
                      <div className="d-flex items-center justify-between">
                        <div className="text-15 fw-500">Free WiFi</div>
                        <div className="text-15 text-light-1">9.4</div>
                      </div>
                      <div className="progressBar mt-10">
                        <div className="progressBar__bg bg-blue-2" />
                        <div
                          className="progressBar__bar bg-blue-1"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="row y-gap-40">
                  <div className="col-12">
                    <div className="row x-gap-20 y-gap-20 items-center">
                      <div className="col-auto">
                        <img src={avatar} width={50} alt="image" />
                      </div>
                      <div className="col-auto">
                        <div className="fw-500 lh-15">Tonko</div>
                        <div className="text-14 text-light-1 lh-15">
                          March 2022
                        </div>
                      </div>
                    </div>
                    <h5 className="fw-500 text-blue-1 mt-20">9.2 Superb</h5>
                    <p className="text-15 text-dark-1 mt-10">
                      Nice two level apartment in great London location. Located
                      in quiet small street, but just 50 meters from main street
                      and bus stop. Tube station is short walk, just like two
                      grocery stores.{" "}
                    </p>

                    <div className="d-flex x-gap-30 items-center pt-20">
                      <button className="d-flex items-center text-blue-1">
                        <i className="icon-like text-16 mr-10" />
                        Helpful
                      </button>
                      <button className="d-flex items-center text-light-1">
                        <i className="icon-dislike text-16 mr-10" />
                        Not helpful
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row x-gap-20 y-gap-20 items-center">
                      <div className="col-auto">
                        <img src={avatar} width={50} alt="image" />
                      </div>
                      <div className="col-auto">
                        <div className="fw-500 lh-15">Tonko</div>
                        <div className="text-14 text-light-1 lh-15">
                          March 2022
                        </div>
                      </div>
                    </div>
                    <h5 className="fw-500 text-blue-1 mt-20">9.2 Superb</h5>
                    <p className="text-15 text-dark-1 mt-10">
                      Nice two level apartment in great London location. Located
                      in quiet small street, but just 50 meters from main street
                      and bus stop. Tube station is short walk, just like two
                      grocery stores.{" "}
                    </p>

                    <div className="d-flex x-gap-30 items-center pt-20">
                      <button className="d-flex items-center text-blue-1">
                        <i className="icon-like text-16 mr-10" />
                        Helpful
                      </button>
                      <button className="d-flex items-center text-light-1">
                        <i className="icon-dislike text-16 mr-10" />
                        Not helpful
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="row x-gap-20 y-gap-20 items-center">
                      <div className="col-auto">
                        <img src={avatar} width={50} alt="image" />
                      </div>
                      <div className="col-auto">
                        <div className="fw-500 lh-15">Tonko</div>
                        <div className="text-14 text-light-1 lh-15">
                          March 2022
                        </div>
                      </div>
                    </div>
                    <h5 className="fw-500 text-blue-1 mt-20">9.2 Superb</h5>
                    <p className="text-15 text-dark-1 mt-10">
                      Nice two level apartment in great London location. Located
                      in quiet small street, but just 50 meters from main street
                      and bus stop. Tube station is short walk, just like two
                      grocery stores.{" "}
                    </p>
                    <div className="d-flex x-gap-30 items-center pt-20">
                      <button className="d-flex items-center text-blue-1">
                        <i className="icon-like text-16 mr-10" />
                        Helpful
                      </button>
                      <button className="d-flex items-center text-light-1">
                        <i className="icon-dislike text-16 mr-10" />
                        Not helpful
                      </button>
                    </div>
                  </div>

                  <div className="col-auto">
                    <Link
                      to=""
                      className="button -md -outline-blue-1 text-blue-1"
                    >
                      Show all 116 reviews{" "}
                      <div className="icon-arrow-top-right ml-15" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-xl-8 py-50 mx-auto">
                <div className="col-12">
                  <div className="col-auto">
                    <h3 className="text-22 fw-500">Leave a Reply</h3>
                    <p className="text-15 text-dark-1 mt-5">
                      Your email address will not be published.
                    </p>
                  </div>
                </div>
                <div className="row y-gap-30">
                  <div className="col-xl-6">
                    <div className="form-input ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">Text</label>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-input ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-input ">
                      <textarea required rows={6} defaultValue={""} />
                      <label className="lh-1 text-16 text-light-1">
                        Write Your Comment
                      </label>
                    </div>
                  </div>
                  <div className="col-auto">
                    <Link
                      to=""
                      className="button -md -dark-1 bg-blue-1 text-white"
                    >
                      Post Comment{" "}
                      <div className="icon-arrow-top-right ml-15" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="layout-pt-md layout-pb-md bg-dark-2">
          <div className="container">
            <div className="row y-gap-30 justify-between items-center">
              <div className="col-auto">
                <div className="row y-gap-20  flex-wrap items-center">
                  <div className="col-auto">
                    <div className="icon-newsletter text-60 sm:text-40 text-white" />
                  </div>
                  <div className="col-auto">
                    <h4 className="text-26 text-white fw-600">
                      Your Travel Journey Starts Here
                    </h4>
                    <div className="text-white">
                      Sign up and we'll send the best deals to you
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <div className="single-field -w-410 d-flex x-gap-10 y-gap-20">
                  <div>
                    <input
                      className="bg-white h-60"
                      type="text"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <button className="button -md h-60 bg-blue-1 text-white">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};
export default HotelDetails;
