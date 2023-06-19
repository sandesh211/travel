import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadScript } from "../../config/Utils";
import { AuthService } from "../../services/auth";
import { FlightService } from "../../services/flight";

const ConfirmBooking = () => {
  const { state } = useLocation();
  const bookingData = state;
  const { review } = state;
  console.log("location data", bookingData);
  const TotalPriceFare = review?.totalPriceInfo?.totalFareDetail;

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

  const handlePayment = () => {
    if (!window.Razorpay) {
      console.log("Razorpay script not loaded.");
      return;
    }
    const options = {
      key: "rzp_test_YeQYaEfvpWfjLn",
      amount: review.totalPriceInfo.totalFareDetail.fC.TF * 100, // amount in paise
      currency: "INR",
      name: "Delightfull Holidays",
      description: "Payment for your product",
      handler: async (response) => {
        // Handle success callback
        console.log("payment", response);
        if (response.razorpay_payment_id) {
          const paymentResponse = await FlightService.paymentPHP(
            review.bookingId,
            1,
            response.razorpay_payment_id,
            "SUCCESS",
            review.totalPriceInfo.totalFareDetail.fC.TF
          );
          // if()
          const bookResponse = await FlightService.flightBooking({
            bookingId: review.bookingId,
            paymentInfos: [
              {
                amount: review.totalPriceInfo.totalFareDetail.fC.TF,
              },
            ],
            travellerInfo: [
              {
                ti: "Mr",
                fN: "Test",
                lN: "AdultA",
                pt: "ADULT",
              },
            ],

            gstInfo: {
              gstNumber: "09AABCU9603R1ZL",
              email: "apitest@apitest.com ",
              registeredName: "XYZ Pvt Ltd",
              mobile: "9728408906",
              address: "Delhi",
            },
            deliveryInfo: {
              emails: [travelEmail],
              contacts: [mobile],
            },
          });
          if (bookResponse?.data?.status?.success === true) {
            const bookingDetailResponse = await FlightService.getBookingDetail(
              bookResponse.data.bookingId
            );
            const PNR = Object.values(
              bookingDetailResponse.data.itemInfos.AIR.travellerInfos[0]
                .pnrDetails
            )[0];
            const { amount, bookingId, deliveryInfo, status } =
              bookingDetailResponse.data.order;
            const formData = new FormData();
            formData.append("pnr_number", PNR);
            formData.append("booking_id", bookingId);
            formData.append("amount", amount);
            formData.append("email", deliveryInfo.emails[0]);
            formData.append("mobile", deliveryInfo.contacts[0]);
            formData.append("status", status);
            formData.append(
              "full_detail",
              JSON.stringify(bookingDetailResponse.data)
            );
            formData.append("user_id", localStorage.getItem("id"));
            const phpBookResponse = await FlightService.flightBookingPHP(
              formData
            );

            if (!phpBookResponse?.data?.status) {
              console.log("phpError");
              return;
            }

            navigate("/flight-booking-success");
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
    <div className="bg-stone-100">
      <section className="container layout-pb-md bg-light-2 py-20">
        <div className="text-xl font-bold">Complete your booking</div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 md:gap-3 lg:gap-4 mt-6">
          <div className="col-span-2">
            {review?.tripInfos?.map((tripInfo) => {
              return tripInfo?.sI?.map((bookingDetail) => {
                return (
                  <div className=" bg-white p-3 md:p-4 lg:p-5 shadow-lg rounded mb-3">
                    <div className="shadow-md p-2">
                      <div className="md:flex lg:flex justify-between">
                        <div className="border-l-4 border-green-600 ps-3">
                          <h5 className="font-bold">
                            {bookingDetail?.da?.city} →{" "}
                            {bookingDetail?.aa?.city}
                          </h5>
                          <p className="mt-3">
                            <span className="bg-orange-100 font-medium p-1 me-2">
                              Thursday, May 25
                            </span>
                            Non Stop · 1h 5m
                          </p>
                        </div>
                        <div className="mt-3">
                          <small className="bg-emerald-600 text-white p-1 px-2 rounded">
                            CANCELLATION FEES APPLY
                          </small>
                        </div>
                      </div>
                      <div className="md:flex lg:flex justify-between">
                        <div className="ps-0 md:ps-2 lg:ps-3">
                          <p className="mt-3 text-sm">
                            <span className="font-medium">
                              {bookingDetail?.fD?.aI?.name}
                            </span>{" "}
                            {bookingDetail?.fD?.aI?.code}
                          </p>
                        </div>
                        <div>
                          <h6>
                            <small>{TotalPriceFare?.cc} </small>{" "}
                            {/* <span className="text-sky-600 font-bold">
                                  ALLIANCE SUPER SAVER &gt;
                                </span> */}
                          </h6>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 lg:grid-cols-3 justify-between bg-stone-100 p-2 rounded mt-3">
                        <div className="px-2 col-span-2">
                          <div className="flex gap-3 items-center">
                            <div className="font-bold text-base">
                              {" "}
                              {convertTime(bookingDetail?.dt)}
                            </div>
                            <div className="border border-gray-500 p-1 h-2 w-2 rounded-full"></div>
                            <div className="font-bold text-base">
                              {bookingDetail?.da?.city} .{" "}
                              <small className="font-normal">
                                {bookingDetail?.da?.name}
                              </small>
                            </div>
                          </div>
                          <div className="ms-14 ps-4 border-l-2 border-dashed border-gray-500">
                            {handleCalculate(
                              bookingDetail?.dt,
                              bookingDetail?.at
                            )}
                          </div>
                          <div className="flex gap-3 items-center">
                            <div className="font-bold text-base">
                              {" "}
                              {convertTime(bookingDetail?.at)}
                            </div>
                            <div className="border border-gray-500 p-1 h-2 w-2 rounded-full"></div>
                            <div className="font-bold text-base">
                              {bookingDetail?.aa?.city} .{" "}
                              <small className="font-normal">
                                {bookingDetail?.aa?.name}
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0 lg:mt-0 grid grid-cols-3 gap-3">
                          <div className="text-sm">
                            Baggage
                            <br></br>
                            <span className="font-bold">ADULT</span>
                          </div>
                          <div className="text-sm">
                            Check-in
                            <br></br>
                            <span className="font-bold">
                              {TotalPriceFare?.bI?.iB} (1 piece only)
                            </span>
                          </div>
                          <div className="text-sm">
                            Cabin
                            <br></br>
                            <span className="font-bold">
                              {TotalPriceFare?.bI?.cB} (1 piece only)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              });
            })}

            {token ? (
              <div className="bg-white shadow-lg rounded mt-3">
                <div className="p-4">
                  <h5 className="text-xl font-bold">Traveller Details</h5>
                </div>
                <div className="border-t p-4">
                  {/* <div className="text-gray-900 font-medium text-lg mb-3">
                    Booking details will be sent to
                  </div> */}
                  <div className="space-y-4 md:space-y-6" action="#">
                    <div className="md:grid lg:grid grid-cols-3 gap-4">
                      {/* <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Country Code
                      </label>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>India(91)</option>
                        <option>India(91)</option>
                        <option>India(91)</option>
                      </select>
                    </div> */}
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
                          placeholder="Mobile No."
                          required
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
          <div className="box mt-4 md:mt-0 lg:mt-0">
            <div className="bg-white p-4 shadow-lg rounded">
              <div className="font-bold text-gray-900">Fare Summary</div>
              <h6 className="text-base font-medium text-gray-900 mt-3 mb-1">
                Base Fare
              </h6>
              <div className="flex justify-between text-gray-600 text-sm">
                <p></p>
                <p>₹ {TotalPriceFare?.fC?.BF}</p>
              </div>
              <div className="border-t py-2.5 mt-3">
                <h6 className="text-base font-medium text-gray-900">
                  Taxes and Surcharges
                </h6>
                <div className="flex justify-between text-gray-600 text-sm">
                  <p>Airline Taxes and Surcharges</p>
                  <p>₹ {TotalPriceFare?.fC?.TAF}</p>
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
                <p>₹ {review?.totalPriceInfo?.totalFareDetail?.fC?.TF}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmBooking;
