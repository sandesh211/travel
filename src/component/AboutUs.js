import React, { useState, useEffect } from "react";
import darklogo from "../../src/images/logo-dark.svg";
import aboutbg from "../../src/images/about-bg.png";
import about from "../../src/images/about.jpg";
import team from "../../src/images/1.png";
import team2 from "../../src/images/2.png";
import team3 from "../../src/images/3.png";
import team4 from "../../src/images/4.png";
import Footer from "./Footer";
import { AuthService } from "../services/auth";

const AboutUs = () => {
  const [destinations, setDestinations] = useState(0);
  const [properties, setProperties] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [volunteers, setVolunteers] = useState(0);

  const destinationsEnd = 4958;
  const propertiesEnd = 2869;
  const customersEnd = 2000000;
  const volunteersEnd = 574974;

  const updateInterval = 50;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDestinations((prevCount) =>
        prevCount < destinationsEnd
          ? prevCount + Math.ceil(destinationsEnd / (1000 / updateInterval))
          : prevCount
      );

      setProperties((prevCount) =>
        prevCount < propertiesEnd
          ? prevCount + Math.ceil(propertiesEnd / (1000 / updateInterval))
          : prevCount
      );

      setCustomers((prevCount) =>
        prevCount < customersEnd
          ? prevCount + Math.ceil(customersEnd / (1000 / updateInterval))
          : prevCount
      );

      setVolunteers((prevCount) =>
        prevCount < volunteersEnd
          ? prevCount + Math.ceil(volunteersEnd / (1000 / updateInterval))
          : prevCount
      );
    }, updateInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div>
      {" "}
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
                  href="#"
                  className="header-logo mr-30"
                  data-x="header-logo"
                  data-x-toggle="is-logo-dark"
                >
                  <img src={darklogo} alt="logo icon" />
                </a>
              </div>
            </div>
            <div
              className="header-menu col-auto"
              data-x="mobile-menu"
              data-x-toggle="is-menu-active"
            >
              <div className="mobile-overlay" />
              <div className="header-menu__content">
                <div className="mobile-bg js-mobile-bg" />
                <div className="menu js-navList d-flex justify-content-between">
                  <ul className="menu__nav text-dark-1 -is-active text-center">
                    <li>
                      <a href="/"> Home</a>
                    </li>
                    <li>
                      <a href="/Flight"> Flight</a>
                    </li>
                    <li>
                      <a href="Hotel"> Hotal</a>
                    </li>
                    <li>
                      <a href="/Destination"> Destination</a>
                    </li>
                    <li>
                      <a href="/Tpur"> Tour</a>
                    </li>
                    <li>
                      <a href="/Contact">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="mobile-footer px-20 py-20 border-top-light js-mobile-footer"></div>
              </div>
            </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="section-bg layout-pt-lg layout-pb-lg">
          <div className="section-bg__item col-12">
            <img src={aboutbg} alt="image" />
          </div>
          <div className="container">
            <div className="row justify-center text-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <h1 className="text-40 md:text-25 fw-600 text-white">
                  Looking for joy?
                </h1>
                <div className="text-white mt-15">
                  Your trusted trip companion
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="layout-pt-md">
          <div className="container">
            <div className="row y-gap-30 justify-between items-center">
              <div className="col-lg-5">
                <h2 className="text-30 fw-600">About Delightful Holidays</h2>
                <p className="mt-5">
                  These popular destinations have a lot to offer
                </p>
                <p className="text-dark-1 mt-60 lg:mt-40 md:mt-20">
                  London is a shining example of a metropolis at the highest
                  peak of modernity and boasts an economy and cultural diversity
                  that’s the envy of other global superpowers.
                  <br />
                  <br />
                  Take the opportunity to acquaint yourself with its fascinating
                  history chronicled by institutions like the British Museum as
                  well as see how far it has come by simply riding the Tube and
                  passing by celebrated landmarks like Buckingham Palace,
                  Westminster Abbey, and marvels like Big Ben, the London Eye,
                  and the Tower Bridge.
                </p>
              </div>
              <div className="col-lg-6">
                <img src={about} alt="image" className="rounded-4" />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-60">
          <div className="container">
            <div className="border-bottom-light pb-40">
              <div className="row y-gap-30 justify-center text-center">
                <div className="col-xl-3 col-6">
                  <div className="text-40 lg:text-30 lh-13 fw-600">
                    {destinations}
                  </div>
                  <div className="text-14 lh-14 text-light-1 mt-5">
                    Destinations
                  </div>
                </div>
                <div className="col-xl-3 col-6">
                  <div className="text-40 lg:text-30 lh-13 fw-600">
                    {properties}
                  </div>
                  <div className="text-14 lh-14 text-light-1 mt-5">
                    Total Properties
                  </div>
                </div>
                <div className="col-xl-3 col-6">
                  <div className="text-40 lg:text-30 lh-13 fw-600">
                    {customers}
                  </div>
                  <div className="text-14 lh-14 text-light-1 mt-5">
                    Happy customers
                  </div>
                </div>
                <div className="col-xl-3 col-6">
                  <div className="text-40 lg:text-30 lh-13 fw-600">
                    {volunteers}
                  </div>
                  <div className="text-14 lh-14 text-light-1 mt-5">
                    Our Volunteers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="layout-pt-lg layout-pb-lg">
          <div className="container">
            <div className="row y-gap-20 justify-between items-end">
              <div className="col-auto">
                <div className="sectionTitle -md">
                  <h2 className="sectionTitle__title">Our Team</h2>
                  <p className=" sectionTitle__text mt-5 sm:mt-0">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden pt-40 js-section-slider">
              <div className="row">
                <div className="col-md-3 col-lg-3">
                  <div className="swiper-slide">
                    <img src={team} alt="image" className="rounded-4 col-12" />
                    <div className="mt-10">
                      <div className="text-18 lh-15 fw-500">Cody Fisher</div>
                      <div className="text-14 lh-15">Medical Assistant</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <div className="swiper-slide">
                    <img src={team3} alt="image" className="rounded-4 col-12" />
                    <div className="mt-10">
                      <div className="text-18 lh-15 fw-500">Dianne Russell</div>
                      <div className="text-14 lh-15">Web Designer</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <div className="swiper-slide">
                    <img src={team2} alt="image" className="rounded-4 col-12" />
                    <div className="mt-10">
                      <div className="text-18 lh-15 fw-500">Jerome Bell</div>
                      <div className="text-14 lh-15">Marketing Coordinator</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3">
                  <div className="swiper-slide">
                    <img src={team4} alt="image" className="rounded-4 col-12" />
                    <div className="mt-10">
                      <div className="text-18 lh-15 fw-500">Theresa Webb</div>
                      <div className="text-14 lh-15">Nursing Assistant</div>
                    </div>
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
export default AboutUs;
