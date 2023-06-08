import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";
import Home from "./component/Home";
import Hotel from "./component/Hotel";
import Flight from "./component/Flight";
import "./App.css";
import Tabss from "./component/Tabss";
import Footer from "./component/Footer";
import Header from "./component/Header";
import HotelList from "./component/HotelList";
import AboutUs from "./component/AboutUs";
import HotelDetails from "./component/HotelDetails";
import FlightDetail from "./component/flights/FlightDetail";
import Contact from "./component/contacts/Contact";
import PrivacyPolicy from "./component/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./component/TermsAndCondition/TermsConditions";
import "../src/main.css"
import ConfirmBooking from "./component/flights/ConfirmBooking";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Flight" element={<Flight />} />
          <Route path="/Hotel" element={<Hotel />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Tabss" element={<Tabss />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/HotelList" element={<HotelList />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/HotelDetails/:id" element={<HotelDetails />} />
          <Route path="/flight-detail" element={<FlightDetail />} />
          <Route path="/confirm-booking" element={<ConfirmBooking />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
