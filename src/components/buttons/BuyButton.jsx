import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, verifyPayment } from "../features/payment/paymentSlice";

const BuyButton = () => {
  const dispatch = useDispatch();
  const { order, loading } = useSelector((state) => state.payment);

  const handlePayment = async () => {
    const amount = 500 * 100; // in paise
    const res = await dispatch(createOrder(amount));

    if (!res.payload || !res.payload.id) return alert("Order creation failed");

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: res.payload.amount,
      currency: res.payload.currency,
      name: "My E-Commerce Store",
      description: "Test Transaction",
      order_id: res.payload.id,
      handler: async function (response) {
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        dispatch(verifyPayment(paymentData));
      },
      prefill: {
        name: "Abhijit Devghare",
        email: "devghare@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
    >
      {loading ? "Processing..." : "Pay ₹500"}
    </button>
  );
};

export default BuyButton;
