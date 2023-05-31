import React, { useState, useEffect } from "react";
import { loadScript } from "../../config/Utils";

const PaymentForm = () => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js", "razorpayScript")
      .then(() => {
        console.log("Razorpay script loaded.");
      })
      .catch((error) => {
        console.log("Failed to load Razorpay script:", error);
      });
  }, []);

  const handlePayment = () => {
    if (!window.Razorpay) {
      console.log("Razorpay script not loaded.");
      return;
    }
    const options = {
      key: "rzp_test_YeQYaEfvpWfjLn",
      amount: amount * 100, // amount in paise
      currency: "INR",
      name: "Delightfull Holidays",
      description: "Payment for your product",
      handler: (response) => {
        // Handle success callback
        console.log("payment", response);
      },
      prefill: {
        name: "Delightfull Holidays",
        email: "info.delightfulholidays@gmail.com",
        contact: "9636952821",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <h2>Razorpay Payment Form</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentForm;
