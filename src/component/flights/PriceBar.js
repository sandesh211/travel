import React from "react";
import flighticon2 from "../../images/flight-icon2.png";

const FlightInfo = ({ selectedFlight, departure, airline, startTime, endTime }) => {
  console.log("selectedFlightselectedFlightselectedFlightselectedFlight", selectedFlight)
  return (
    <div className="col-6 col-md-4 col-lg-4 y-gap-10 items-center">
      <div className="col-sm-auto">
        <img className="size-30 me-2" src={flighticon2} alt="image" />
        <span className="text-14">
          {departure ? "Departure" : "Return"} - {airline}
        </span>
      </div>
      <div className="col p-0">
        <div className="row x-gap-20 items-end">
          <div className="col-auto">
            <div className="lh-13 fw-500 text-13">{startTime}</div>
            <div className="text-13 lh-15 text-light-1">{selectedFlight?.flight?.sI && selectedFlight?.flight?.sI[0]?.da?.code}</div>
          </div>
          <div className="col text-center">
            <div className="flightLine">
              <div />
              <div />
            </div>
            <div className="text-13 lh-15 text-light-1 mt-10">{selectedFlight?.flight?.sI?.length - 1} stop</div>
          </div>
          <div className="col-auto">
            <div className="lh-15 text-13 fw-500">{endTime}</div>
            <div className="text-13 lh-15 text-light-1">{selectedFlight?.flight?.sI && selectedFlight?.flight?.sI[1]?.aa?.code}</div>
          </div>
        </div>
      </div>
      {/* <div className="col-md-auto p-0">
          <div className="text-13 text-light-1 px-20 md:px-0">{date}</div>
        </div> */}
    </div>
  );
};

const ReturnPriceBar = ({
  selectedFlight,
  selectedReturnFlight,
  airlineDeparture,
  airlineReturn,
  startTimeDeparture,
  endTimeDeparture,
  startTimeReturn,
  endTimeReturn,
  price,
  onAction,
}) => {


  return (
    <div className="additional-detail">
      <div className="fixedbottom bg-dark text-white position-fixed bottom-0">
        <div className="container">
          <div className="row w-100 p-3">
            <FlightInfo
              selectedFlight={selectedFlight}
              departure={true}
              airline={airlineDeparture}
              startTime={startTimeDeparture}
              endTime={endTimeDeparture}
            />
            <FlightInfo
              selectedFlight={selectedReturnFlight}
              airline={airlineReturn}
              startTime={startTimeReturn}
              endTime={endTimeReturn}
            />
            <div className="text-end col-12 col-md-4 col-lg-4">
              <h6>
                ₹ {price}
                <small className="text-10">Per Traveller</small>
              </h6>
              <div className="d-flex justify-content-end gap-4 mt-3">
                <button
                  className=" button btn text-sm -dark-1 px-10 h-40 bg-blue-1 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    //   BookNow();
                    onAction();
                  }}
                >
                  Book Now
                </button>
                {/* <button className=" button btn -outline-blue-1 text-sm -dark-1 px-10 h-40  text-blue-1">
                        Lock Price
                      </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPriceBar;
