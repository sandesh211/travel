import React from "react";
import homebannerhotel from "../../src/images/homebannerhote2.png";
import Footer from "./Footer";
import Hotelfilter from "./hotels/Hotelfilter";
const Hotel = () => {
  return (
    <div>
      <div className="header-margin"></div>
      <main>
        <section
          className="masthead -type-3 flight-space relative z-5"
          style={{ backgroundImage: `url(${homebannerhotel})` }}
        >
          <div className="container">
            <div className="text-center">
              <h1 className="text-60 lg:text-40 md:text-30 text-white">
                Book Your Hotels
              </h1>
            </div>
            <Hotelfilter />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Hotel;
