import React, { useState } from "react";
import darklogo from "../../images/logo-dark.svg";
import map from "../../images/map.png";

const Contact = () => {
  return (
    <div>
      {/* <div class="header-margin"></div> */}

      <main>
        <div>
          <section
            data-anim="fade"
            className="d-flex items-center py-15 border-top-light"
          >
            <div className="container">
              <div className="row y-gap-10 items-center justify-between">
                <div className="col-auto">
                  <div className="row x-gap-10 y-gap-5 items-center text-14 text-light-1">
                    <div className="col-auto">
                      <div className>Europe</div>
                    </div>
                    <div className="col-auto">
                      <div className>&gt;</div>
                    </div>
                    <div className="col-auto">
                      <div className>United Kingdom (UK)</div>
                    </div>
                    <div className="col-auto">
                      <div className>&gt;</div>
                    </div>
                    <div className="col-auto">
                      <div className="text-dark-1">London</div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <a href="#" className="text-14 text-light-1">
                    London Tourism: Best of London
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div className="ratio ratio-16:9">
            <div className="map-ratio">
              <div
                className="map js-map-single"
                style={{
                  backgroundImage: `url(${map})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
          </div>
          <section>
            <div className="relative container">
              <div className="row justify-end">
                <div className="col-xl-5 col-lg-7">
                  <div className="map-form px-40 pt-40 pb-50 lg:px-30 lg:py-30 md:px-24 md:py-24 bg-white rounded-4 shadow-4">
                    <div className="text-22 fw-500">Send a message</div>
                    <div className="row y-gap-20 pt-20">
                      <div className="col-12">
                        <div className="form-input ">
                          <input type="text" required />
                          <label className="lh-1 text-16 text-light-1">
                            Full Name
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-input ">
                          <input type="text" required />
                          <label className="lh-1 text-16 text-light-1">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-input ">
                          <input type="text" required />
                          <label className="lh-1 text-16 text-light-1">
                            Subject
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-input ">
                          <textarea required rows={4} defaultValue={""} />
                          <label className="lh-1 text-16 text-light-1">
                            Your Messages
                          </label>
                        </div>
                      </div>
                      <div className="col-auto">
                        <a
                          href="#"
                          className="button px-24 h-50 -dark-1 bg-blue-1 text-white"
                        >
                          Send a Messsage{" "}
                          <div className="icon-arrow-top-right ml-15" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="layout-pt-md layout-pb-lg">
            <div className="container">
              <div className="row x-gap-80 y-gap-20 justify-between">
                <div className="col-12">
                  <div className="text-30 sm:text-24 fw-600">Contact Us</div>
                </div>
                <div className="col-lg-3">
                  <div className="text-14 text-light-1">Address</div>
                  <div className="text-18 fw-500 mt-10">
                    328 Queensberry Street, North Melbourne VIC 3051, Australia.
                  </div>
                </div>
                <div className="col-auto">
                  <div className="text-14 text-light-1">
                    Toll Free Customer Care
                  </div>
                  <div className="text-18 fw-500 mt-10">+(1) 123 456 7890</div>
                </div>
                <div className="col-auto">
                  <div className="text-14 text-light-1">Need live support?</div>
                  <div className="text-18 fw-500 mt-10">
                    hi@delightfulholidays.com
                  </div>
                </div>
                <div className="col-auto">
                  <div className="text-14 text-light-1">
                    Follow us on social media
                  </div>
                  <div className="d-flex x-gap-20 items-center mt-10">
                    <a href="#">
                      <i className="icon-facebook text-14" />
                    </a>
                    <a href="#">
                      <i className="icon-twitter text-14" />
                    </a>
                    <a href="#">
                      <i className="icon-instagram text-14" />
                    </a>
                    <a href="#">
                      <i className="icon-linkedin text-14" />
                    </a>
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
        </div>

        <footer className="footer -type-2 bg-light-2">
          <div className="container">
            <div className="pt-60 pb-60">
              <div className="row y-gap-40 justify-between xl:justify-start">
                <div className="col-xl-4 col-lg-6">
                  <img
                    src={darklogo}
                    style={{ width: "150px", height: "200px" }}
                    alt="image"
                  />
                  <div className="row y-gap-30 justify-between pt-30">
                    <div className="col-sm-6">
                      <div className="text-14">Toll Free Customer Care</div>
                      <a href="#" className="text-18 fw-500 text-dark-1 mt-5">
                        +(1) 123 456 7890
                      </a>
                    </div>
                    <div className="col-sm-5">
                      <div className="text-14">Need live support?</div>
                      <a href="#" className="text-18 fw-500 text-dark-1 mt-5">
                        hi@delightfulholidays.com
                      </a>
                    </div>
                  </div>

                  <div className="mt-60">
                    <h5 className="text-16 fw-500 mb-10">
                      Follow us on social media
                    </h5>
                    <div className="d-flex x-gap-20 items-center">
                      <a href="#">
                        <i className="icon-facebook text-14" />
                      </a>
                      <a href="#">
                        <i className="icon-twitter text-14" />
                      </a>
                      <a href="#">
                        <i className="icon-instagram text-14" />
                      </a>
                      <a href="#">
                        <i className="icon-linkedin text-14" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row y-gap-30">
                    <div className="col-lg-4 col-sm-6">
                      <h5 className="text-16 fw-500 mb-30">Company</h5>
                      <div className="d-flex y-gap-10 flex-column">
                        <a href="#">About Us</a>
                        <a href="#">Careers</a>
                        <a href="#">Blog</a>
                        <a href="#">Press</a>
                        <a href="#">Gift Cards</a>
                        <a href="#">Magazine</a>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <h5 className="text-16 fw-500 mb-30">Support</h5>
                      <div className="d-flex y-gap-10 flex-column">
                        <a href="#">Contact</a>
                        <a href="#">Legal Notice</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms and Conditions</a>
                        <a href="#">Sitemap</a>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                      <h5 className="text-16 fw-500 mb-30">Other Services</h5>
                      <div className="d-flex y-gap-10 flex-column">
                        <a href="#">Car hire</a>
                        <a href="#">Activity Finder</a>
                        <a href="#">Tour List</a>
                        <a href="#">Flight finder</a>
                        <a href="#">Cruise Ticket</a>
                        <a href="#">Holiday Rental</a>
                        <a href="#">Travel Agents</a>
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
                        © 2022 Delightful Holidays LLC All rights reserved.
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="d-flex x-gap-15">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Site Map</a>
                      </div>
                    </div>
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
      </main>
    </div>
  );
};
export default Contact;
