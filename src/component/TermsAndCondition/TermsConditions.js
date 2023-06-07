import React, { useState } from "react";
import darklogo from "../../images/logo-dark.svg";
import Header from "../Header";
import Footer from "../Footer";

const TermsConditions = () => {
  return (
    <div>
      <div className="header-margin"></div>
      <Header />
      <main>
        <section className="layout-pb-md layout-pt-md">
          <div className="container">
            <div className="row y-gap-30">
              <div className="col-lg-12">
                <div className="is-tab-el-active">
                  <h1 className="text-30 fw-600 mb-15">Terms And Conditions</h1>
                  <h2 className="text-16 fw-500">1. Your Agreement</h2>
                  <p className="text-15 text-dark-1 mt-5">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                    <br />
                    <br />
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </p>
                  <h2 className="text-16 fw-500 mt-35">
                    2. Change of Terms of Use
                  </h2>
                  <p className="text-15 text-dark-1 mt-5">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                    <br />
                    <br />
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </p>
                  <h2 className="text-16 fw-500 mt-35">
                    3. Access and Use of the Services
                  </h2>
                  <p className="text-15 text-dark-1 mt-5">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                    <br />
                    <br />
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </p>
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
export default TermsConditions;
