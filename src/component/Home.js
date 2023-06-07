import React from "react";
import homebanner from "../../src/images/flight-bg.png";
import Header from "./Header";
import Tabss from "./Tabss";
import Footer from "./Footer";
let Home = () => {
  return (
    <div>
      <Header />
      <div className="header-margin"></div>
      <section
        className="masthead -type-3 flight-space relative z-5"
        style={{ backgroundImage: `url(${homebanner})` }}
      >
        <Tabss />
      </section>
      <main>
        <Footer />
      </main>
    </div>
  );
};
export default Home;
