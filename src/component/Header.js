import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import darklogo from "../../src/images/logo-dark.svg";

const Header = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = React.useState(
    window.innerWidth > 1115 ? 1 : 0
  );
  const isUserLoggedIn = localStorage.getItem("access_token");

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flightcontainer">
      <header
        className="header bg-white shadow-3 js-header"
        data-x="header"
        data-x-toggle="is-menu-opened"
      >
        <div className="container">
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
              style={{ opacity: opacity }}
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
                    {/* <li>
                      <Link to="/Destination"> Destination</Link>
                    </li>
                    <li>
                      <Link to="/Tour"> Tour</Link>
                    </li> */}

                    <li>
                      <Link to="/"> About us</Link>
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
                {!isUserLoggedIn ? (
                  <div className="d-flex">
                    <div className="button -outline-blue-1 px-20 md:px-20 lg:px-30 fw-400 text-14 h-50 text-blue-1 m-0">
                      <Link to="/Login"> Sign In &nbsp;</Link>{" "}
                      <Link to="/Register"> / Register</Link>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex">
                    <div className="button -outline-blue-1 px-20 md:px-20 lg:px-30 fw-400 text-14 h-50 text-blue-1 m-0">
                      <div onClick={logOut}>Log out&nbsp;</div>
                    </div>
                  </div>
                )}

                <div
                  className="d-none xl:d-flex x-gap-20 items-center pl-30"
                  data-x="header-mobile-icons"
                  data-x-toggle="text-white"
                >
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-x-click="html, header, header-logo, header-mobile-icons, mobile-menu"
                      onClick={() =>
                        setOpacity((val) => {
                          if (val) {
                            return 0;
                          } else {
                            return 1;
                          }
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="header-margin"></div>
    </div>
  );
};
export default Header;
