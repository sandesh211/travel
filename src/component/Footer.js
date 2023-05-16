import React from "react";
import { Link } from "react-router-dom";
import darklogo from "../../src/images/logo-dark.svg";

const Footer = () => {
  return (
    <div>
      <footer className="footer -type-2 bg-light-2">
        <div className="container">
          <div className="pt-60 pb-60">
            <div className="row y-gap-40 justify-between xl:justify-start">
              <div className="col-xl-4 col-lg-6">
                <Link to="/" className="footer-logo mr-30">
                  <img src={darklogo} alt="logo icon" />
                </Link>
                <div className="row y-gap-30 justify-between pt-30">
                  <div className="col-sm-6">
                    <div className="text-14">Toll Free Customer Care</div>
                    <Link to="#" className="text-18 fw-500 text-dark-1 mt-5">
                      +(1) 123 456 7890
                    </Link>
                  </div>
                  <div className="col-sm-5">
                    <div className="text-14">Need live support?</div>
                    <Link to="#" className="text-18 fw-500 text-dark-1 mt-5">
                      hi@delightfullholidays.com
                    </Link>
                  </div>
                </div>

                <div className="mt-60">
                  <h5 className="text-16 fw-500 mb-10">
                    Follow us on social media
                  </h5>
                  <div className="d-flex x-gap-20 items-center">
                    <Link to="#">
                      <i className="icon-facebook text-14" />
                    </Link>
                    <Link to="#">
                      <i className="icon-twitter text-14" />
                    </Link>
                    <Link to="#">
                      <i className="icon-instagram text-14" />
                    </Link>
                    <Link to="#">
                      <i className="icon-linkedin text-14" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row y-gap-30">
                  <div className="col-lg-4 col-sm-6">
                    <h5 className="text-16 fw-500 mb-30">Company</h5>
                    <div className="d-flex y-gap-10 flex-column">
                      <Link to="/AboutUs">About Us</Link>
                      <Link to="#">Careers</Link>
                      <Link to="#">Blog</Link>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <h5 className="text-16 fw-500 mb-30">Support</h5>
                    <div className="d-flex y-gap-10 flex-column">
                      <Link to="#">Contact</Link>

                      <Link to="/privacy-policy">Privacy Policy</Link>
                      <Link to="/terms-conditions">Terms and Conditions</Link>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <h5 className="text-16 fw-500 mb-30">Other Services</h5>
                    <div className="d-flex y-gap-10 flex-column">
                      {/* <Link to="#">Tour List</Link> */}
                      <Link to="#">Flight finder</Link>
                      <Link to="#">Cruise Ticket</Link>
                      <Link to="#">Holiday Rental</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-20 border-top-light">
            <div className="row justify-between items-center y-gap-10">
              <div className="col-auto">
                <div className="row x-gap-30 y-gap-10">
                  <div className="col-auto">
                    <div className="d-flex items-center">
                      © 2022 delightfulholidays LLC All rights reserved.
                    </div>
                  </div>
                  {/* <div className="col-auto">
                    <div className="d-flex x-gap-15">
                      <Link to="#">Privacy</Link>
                      <Link to="#">Terms</Link>
                      <Link to="#">Site Map</Link>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-auto">
                <div className="row y-gap-10 items-center">
                  <div className="col-auto">
                    <div className="d-flex items-center">
                      <button className="d-flex items-center text-14 fw-500 text-dark-1 mr-10">
                        <i className="icon-globe text-16 mr-10" />
                        <span className="underline">English (US)</span>
                      </button>
                      <button className="d-flex items-center text-14 fw-500 text-dark-1">
                        <i className="icon-usd text-16 mr-10" />
                        <span className="underline">USD</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
