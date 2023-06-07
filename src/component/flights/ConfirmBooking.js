import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "../payment/PaymentForm";
import { loadScript } from "../../config/Utils";

const ConfirmBooking = () => {
  const { state } = useLocation();
  const bookingData = state;
  console.log("location data", bookingData);
  const TotalPriceFare = bookingData?.data?.totalPriceList[0]?.fd?.ADULT;

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

  const handlePayment = () => {
    if (!window.Razorpay) {
      console.log("Razorpay script not loaded.");
      return;
    }
    const options = {
      key: "rzp_test_YeQYaEfvpWfjLn",
      amount: TotalPriceFare?.fC?.TF * 100, // amount in paise
      currency: "INR",
      name: "Delightfull Holidays",
      description: "Payment for your product",
      handler: (response) => {
        // Handle success callback
        console.log("payment", response);
      },
      prefill: {
        name: "Delightfull Holidays",
        email: "info.delightfulholidays@gmail.com",
        contact: "9636952821",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="bg-stone-100">
      <section className="container layout-pb-md bg-light-2 py-20">
        <div className="text-xl font-bold">Complete your booking</div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 md:gap-3 lg:gap-4 mt-6">
          <div className="col-span-2">
            {bookingData?.data?.sI?.map((bookingDetail) => {
              return (
                <div class=" bg-white p-3 md:p-4 lg:p-5 shadow-lg rounded mb-3">
                  <div className="shadow-md p-2">
                    <div className="md:flex lg:flex justify-between">
                      <div className="border-l-4 border-green-600 ps-3">
                        <h5 className="font-bold">
                          {bookingDetail?.da?.city} → {bookingDetail?.aa?.city}
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
            })}

            {/* <div class="my-4 bg-white p-3 md:p-4 lg:p-5 shadow-lg rounded">
              <div className="shadow-md p-2">
                <div className="md:flex lg:flex justify-between">
                  <div className="border-l-4 border-green-600 ps-3">
                    <h5 className="font-bold">Jaipur → New Delhi</h5>
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
                      <span className="font-medium">Alliance Air</span> 9I 644
                    </p>
                  </div>
                  <div>
                    <h6>
                      <small>Economy &gt;</small>{" "}
                      <span className="text-sky-600 font-bold">
                        ALLIANCE SUPER SAVER
                      </span>
                    </h6>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-3 justify-between bg-stone-100 p-2 rounded mt-3">
                  <div className="px-2 col-span-2">
                    <div className="flex gap-3 items-center">
                      <div className="font-bold text-base">21:00</div>
                      <div className="border border-gray-500 p-1 h-2 w-2 rounded-full"></div>
                      <div className="font-bold text-base">
                        Jaipur .{" "}
                        <small className="font-normal">
                          Jaipur Airport, Terminal T2
                        </small>
                      </div>
                    </div>
                    <div className="ms-14 ps-4 border-l-2 border-dashed border-gray-500">
                      1h 5m
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="font-bold text-base">21:00</div>
                      <div className="border border-gray-500 p-1 h-2 w-2 rounded-full"></div>
                      <div className="font-bold text-base">
                        Jaipur .{" "}
                        <small className="font-normal">
                          Jaipur Airport, Terminal T2
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
                      <span className="font-bold">15 Kgs (1 piece only)</span>
                    </div>
                    <div className="text-sm">
                      Cabin
                      <br></br>
                      <span className="font-bold">5 Kgs (1 piece only)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div class="bg-white shadow-lg rounded mt-3">
              <div className="p-4">
                <h5 className="text-xl font-bold">Traveller Details</h5>
                <div className="md:flex lg:flex justify-between bg-gray-100 p-2 mt-3">
                  <p>
                    <i class="fa-solid fa-user-lock"></i> Log in to view your
                    saved traveller list, unlock amazing deals & much more!
                  </p>
                  <button class="text-sm rounded-full font-bold text-cyan-600">
                    LOGIN NOW
                  </button>
                </div>
              </div>
              <div className="border-t p-4">
                <div className="text-gray-900 font-medium text-lg mb-3">
                  Booking details will be sent to
                </div>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div className="md:grid lg:grid grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Country Code
                      </label>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>India(91)</option>
                        <option>India(91)</option>
                        <option>India(91)</option>
                      </select>
                    </div>
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
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handlePayment}
                  >
                    CONTINUE
                  </button>
                </form>
                {/* <PaymentForm /> */}
              </div>
            </div>
          </div>
          <div class="box mt-4 md:mt-0 lg:mt-0">
            <div class="bg-white p-4 shadow-lg rounded">
              <div className="font-bold text-gray-900">Fare Summary</div>
              <h6 className="text-base font-medium text-gray-900 mt-3 mb-1">
                Base Fare
              </h6>
              <div className="flex justify-between text-gray-600 text-sm">
                <p>Adult(s) (1 X ₹ 3,400)</p>
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
                <p>₹ {TotalPriceFare?.fC?.TF}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConfirmBooking;
