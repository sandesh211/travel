import React from "react";
import { Link } from "react-router-dom";
import darklogo from "../../src/images/logo-dark.svg";

const Header = () => {
  return (
    <div className="flightcontainer">
      <header
        className="header bg-white shadow-3 js-header"
        data-x="header"
        data-x-toggle="is-menu-opened"
      >
        <div className="container px-30 sm:px-20">
          <div className="row d-flex justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link
                  to="/"
                  className="header-logo mr-30"
                  data-x="header-logo"
                  data-x-toggle="is-logo-dark"
                >
                  <img src={darklogo} alt="logo icon" />
                </Link>
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
                      <Link to="/"> Home</Link>
                    </li>
                    <li>
                      <Link to="/Flight"> Flight</Link>
                    </li>
                    <li>
                      <Link to="/Hotel"> Hotel</Link>
                    </li>
                    <li>
                      <Link to="/Destination"> Destination</Link>
                    </li>
                    <li>
                      <Link to="/Tour"> Tour</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact</Link>
                    </li>
                  </ul>
                </div>
                <div className="mobile-footer px-20 py-20 border-top-light js-mobile-footer"></div>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex items-center">
                <div class="d-flex">
                  <div class="button -outline-blue-1 px-30 fw-400 text-14 h-50 text-blue-1 ml-20">
                    <Link to="/Login"> Sign In &nbsp;</Link>{" "}
                    <Link to="/Register"> / Register</Link>
                  </div>
                </div>

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
    </div>
  );
};
export default Header;
