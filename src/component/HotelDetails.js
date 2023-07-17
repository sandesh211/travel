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
  const navigate = useNavigate();
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

  const selectRoom = (option) => {
    console.log("room selected", hotelDetail, option);
    navigate("/confirm-hotel-booking", {
      state: { hotelDetail, option, info: state?.info },
    });
  };

  return (
    <div>
      {" "}
      <div className="header-margin"></div>
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
                    {/* <div
                      className="button h-50 px-24 -dark-1 bg-blue-1 text-white mt-5"
                      // onClick={selectRoom}
                    >
                      Select Room <div className="icon-arrow-top-right ml-15" />
                    </div> */}
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
            </div>
          </div>
        </section>


        <section id="rooms" className="pt-30">
          <div className="container">
            <div className="row pb-20">
              <div className="col-auto">
                <h3 className="text-22 fw-500">Available Rooms</h3>
              </div>
            </div>

            <div className="border-light rounded-4 px-30 py-30 sm:px-20 sm:py-20">
              <div className="row y-gap-20">
                <div className="col-12">

                  <div className="roomGrid">
                    <div className="roomGrid__header hotelroomsd">
                      <div>Room</div>
                      <div>Hotel Info</div>
                      <div>Price</div>
                    </div>

                    {hotelDetail?.ops?.map((option) => {
                      // const totalPrice = option.tp;
                      return (
                        <React.Fragment>
                          {option.ris.map((room) => {
                            const roomType = room.rt;
                            const roomCategory = room.rc;
                            const roomPrice = room.tp;
                            const roomAmenities = room.fcs;
                            return (
                              <React.Fragment>
                                <div className="hotelsfd">
                                  <div><img src={room.imgs[0]?.url} alt="" /></div>
                                  <div>{`${roomCategory} - ${roomType}`} {roomAmenities?.map((amenity) => {
                                    return <div>{amenity}</div>;
                                  })}</div>
                                  <div className="pricebtn">{roomPrice}</div>
                                  <button
                                    className="button -md -dark-1 bg-blue-1 text-white mt-24"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      selectRoom(option);
                                    }}
                                  >
                                    Book
                                  </button>
                                </div>
                              </React.Fragment>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
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
