import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadScript } from "../../config/Utils";
import { AuthService } from "../../services/auth";
import { FlightService } from "../../services/flight";
import { HotelService } from "../../services/hotel";

const ConfirmHotelBooking = () => {
  const { state } = useLocation();

  const { hotelDetail, option, info } = state;
  const totalAmount = parseInt(option.tp.toString().replace(".", ""))

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js", "razorpayScript")
      .then(() => {
        console.log("Razorpay script loaded.");
      })
      .catch((error) => {
        console.log("Failed to load Razorpay script:", error);
      });
  }, []);

  const navigate = useNavigate();

  const travellerObj =
  {
    fN: "",
    lN: "",
    ti: "Mr",
    pt: "ADULT",
    pan: ""
  }
  const defaultTravellerInfo = []
  for (let i = 0; i < info?.adults; i++) {
    defaultTravellerInfo.push({ ...travellerObj })
  }
  const [travellerInfo, setTravellerInfo] = React.useState(defaultTravellerInfo)

  const handlePayment = () => {
    if (!window.Razorpay) {
      console.log("Razorpay script not loaded.");
      return;
    }
    const options = {
      key: "rzp_test_YeQYaEfvpWfjLn",
      amount: totalAmount, // amount in paise
      currency: "INR",
      name: "Delightful Holidays",
      description: "Payment for your product",
      handler: async (response) => {
        // Handle success callback
        console.log("payment", response);
        if (response.razorpay_payment_id) {
          const paymentResponse = await FlightService.paymentPHP(
            option.id,
            2,
            response.razorpay_payment_id,
            "SUCCESS",
            totalAmount / 100,
            token
          );

          const reviewResponse = await HotelService.review(hotelDetail.id, option.id)

          console.log(reviewResponse)

          const bookResponse = await HotelService.hotelBooking({
            "bookingId": reviewResponse?.data?.bookingId,
            // bookingId: "TJS206800617165",
            "roomTravellerInfo": [
              {
                travellerInfo
                // "travellerInfo": [
                //   {
                //     "fN": "akash",
                //     "lN": "sdfsd",
                //     "ti": "Mr",
                //     "pt": "ADULT",
                //     "pan": "ABCDE1224F"
                //   }
                // ]
              }
            ],
            "deliveryInfo": {
              "emails": [
                travelEmail
              ],
              "contacts": [
                mobile
              ],
              "code": [
                "+91"
              ]
            },
            "type": "HOTEL",
            "paymentInfos": [
              {
                "amount": totalAmount / 100
              }
            ]
          });
          if (bookResponse?.data?.status?.success === true) {
            const bookingDetailResponse = await HotelService.getBookingDetail(
              bookResponse.data.bookingId
            );
            // const PNR = Object.values(
            //   bookingDetailResponse.data.itemInfos.AIR.travellerInfos[0]
            //     .pnrDetails
            // )[0];
            // const { amount, bookingId, deliveryInfo, status } =
            //   bookingDetailResponse.data.order;
            // const formData = new FormData();
            // formData.append("pnr_number", PNR);
            // formData.append("booking_id", bookingId);
            // formData.append("amount", amount);
            // formData.append("email", deliveryInfo.emails[0]);
            // formData.append("mobile", deliveryInfo.contacts[0]);
            // formData.append("status", status);
            // formData.append(
            //   "full_detail",
            //   JSON.stringify(bookingDetailResponse.data)
            // );
            // formData.append("user_id", localStorage.getItem("id"));
            const phpBookResponse = await HotelService.hotelBookingPHP(
              {
                booking_id: bookResponse.data.bookingId,
                amount: totalAmount / 100,
                email: travelEmail,
                mobile: mobile,
                status: "SUCCESS",
                full_detail: bookingDetailResponse.data
              }
            );

            // if (!phpBookResponse?.data?.status) {
            //   console.log("phpError");
            //   return;
            // }

            navigate("/hotel-booking-success");
          }
        }
      },
      prefill: {
        name: "Delightful Holidays",
        email: "info.delightfulholidays@gmail.com",
        contact: "9636952821",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // const navigate = useNavigate();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [token, setToken] = React.useState(
    localStorage.getItem("access_token")
  );

  const onSignIn = async () => {
    setLoading(true);
    setError();
    const res = await AuthService.login(email, password);
    if (res.data.status !== false) {
      // navigate("/");
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("token_type", res.data.token_type);
      localStorage.setItem("email", res.data.data.email);
      localStorage.setItem("id", res.data.data.id);
      localStorage.setItem("name", res.data.name);
      setToken(res.data.access_token);
    } else {
      setError(res.data.message);
    }
    setLoading(false);
  };

  const [mobile, setMobile] = React.useState();
  const [travelEmail, setTravelEmail] = React.useState(
    localStorage.getItem("email")
  );

  return (
    <div className="bg-stone-100 layout-pb-md bg-light-2 py-20">
      <section className="container">
        <div className="text-xl font-bold mb-3">Complete your booking</div>
        <div className="row">
          <div className="col-md-8 col-lg-8">
            <div className="bg-white shadow-lg rounded p-4 bookingdetails">
              <div className="mb-2"><h4>{option?.ris[0]?.rt}</h4></div>
              <div>{option?.ris[0]?.des}</div>
              <div>{option?.ris[0]?.fcs?.map(a => <div>{a}</div>)}</div>
              <div className="nowrap bookinghotelimg">{option?.ris[0]?.imgs?.map(a => <img src={a.url} alt="" />)}</div>
            </div>
            {token ? (
              <div className="bg-white shadow-lg rounded mt-3">
                <div className="p-4">
                  <h5 className="text-xl font-bold">Details</h5>
                </div>
                <div className="border-t p-4">
                  {/* <div className="text-gray-900 font-medium text-lg mb-3">
                    Booking details will be sent to
                  </div> */}
                  <div className="space-y-4 md:space-y-6" action="#">

                    {Array(info?.adults).fill().map((_, i) => {
                      return <>
                        <div>Person {i + 1}</div>
                        <div className="md:grid lg:grid grid-cols-3 gap-4">
                          <div>
                            <label>First Name</label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={travellerInfo[i]?.fN}
                              onChange={(e) => setTravellerInfo(tinfo => {
                                const newtinfo = [...tinfo]
                                newtinfo[i].fN = e.target.value
                                return newtinfo
                              })}
                            />
                          </div>
                          <div>
                            <label>Last Name</label>
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={travellerInfo[i]?.lN}
                              onChange={(e) => setTravellerInfo(tinfo => {
                                const newtinfo = [...tinfo]
                                newtinfo[i].lN = e.target.value
                                return newtinfo
                              })}
                            />
                          </div>
                          {option?.ipr && (
                            <div>
                              <label>PAN</label>
                              <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={travellerInfo[i]?.pan}
                                onChange={(e) => setTravellerInfo(tinfo => {
                                  const newtinfo = [...tinfo]
                                  newtinfo[i].pan = e.target.value
                                  return newtinfo
                                })}
                              />
                            </div>
                          )}
                          {/* {option?.ipm && (
                            <div>
                              <label>Passport Number</label>
                              <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              // value={travelEmail}
                              // onChange={(e) => setTravelEmail(e.target.value)}
                              />
                            </div>
                          )} */}
                          <div className="lg:my-0 md:my-0">
                            <label
                              htmlFor="Mobile-number"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Mobile No
                            </label>
                            <input
                              type="number"
                              name="name"
                              id="Mobile-number"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Your email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Email ID"
                              required
                              value={travelEmail}
                              onChange={(e) => setTravelEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    })}
                    <button
                      // type="submit"
                      // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      className="btn btn-primary"
                      onClick={handlePayment}
                    >
                      CONTINUE
                    </button>
                  </div>
                  {/* <PaymentForm /> */}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-lg rounded mt-3">
                <div className="p-4">
                  <h5 className="text-xl font-bold">Traveller Details</h5>
                </div>
                <div className="border-t p-4">
                  <div className="row y-gap-20">
                    <div className="col-12">
                      {/* <h1 className="text-22 fw-500">Welcome back</h1> */}
                      <p className="mt-10">
                        Please login to continue flight booking
                      </p>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="col-12">
                      <div className="form-input ">
                        <input
                          type="text"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="lh-1 text-14 text-light-1">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-input ">
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="lh-1 text-14 text-light-1">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <a
                        href="#"
                        className="text-14 fw-500 text-blue-1 underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div to="/Register" className="text-blue-1">
                      Or sign up for a free
                    </div>
                    <div className="col-12">
                      <div
                        className="button py-20 -dark-1 bg-blue-1 text-white"
                        onClick={onSignIn}
                      >
                        Sign In
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-4 col-lg-4">
            <div className="bg-white p-4 shadow-lg rounded">
              <div className="font-bold text-gray-900">Fare Summary</div>
              <h6 className="text-base font-medium text-gray-900 mt-3 mb-1">
                Base Fare
              </h6>
              <div className="flex justify-between text-gray-600 text-sm">
                <p></p>
                <p>₹ Price BF</p>
              </div>
              <div className="border-t py-2.5 mt-3">
                <h6 className="text-base font-medium text-gray-900">
                  Taxes and Surcharges
                </h6>
                <div className="flex justify-between text-gray-600 text-sm">
                  <p>Airline Taxes and Surcharges</p>
                  <p>₹ TAF</p>
                </div>
              </div>
              <div className="border-t py-2.5 mt-3">
                <h6 className="text-base font-medium text-gray-900">
                  Other Services
                </h6>
                {/* <div className="flex justify-between text-gray-600 text-sm">
                  <p>Zero Cancellation</p>
                  <p>₹ 1,598</p>
                </div> */}
              </div>
              <div className="flex justify-between text-black font-bold pt-2 text-base border-t-2 border-gray-400">
                <p>Total Amount</p>
                <p>₹ {totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmHotelBooking;
