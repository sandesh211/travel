import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import DropdownButton from "react-bootstrap/DropdownButton";
import homebanner from "../../src/images/flight-bg.png";
import Footer from "./Footer";
import FlightFilter from "./flights/FlightFilter";

const Flight = () => {
  const [isShown, setIsShown] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(0);

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
    }
  };

  const handleChildrenIncrement = () => {
    setChildren(children + 1);
  };

  const handleRoomsDecrement = () => {
    if (rooms > 0) {
      setRooms(rooms - 1);
    }
  };

  const handleRoomsIncrement = () => {
    setRooms(rooms + 1);
  };

  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  // called in tripjack
  // https://apitest.tripjack.com/fms/v1/air-searchquery-list

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <div>
      <main>
        <section
          className="masthead -type-3 flight-space relative z-5"
          style={{ backgroundImage: `url(${homebanner})` }}
        >
          <div className="container">
            <div className="text-center">
              <h1 className="text-60 lg:text-40 md:text-30 text-white">
                Find Your Flight
              </h1>
            </div>
            <FlightFilter />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};
export default Flight;
