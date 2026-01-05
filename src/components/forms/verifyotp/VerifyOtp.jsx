import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../../redux/slices/AuthSlice";
import toast from "react-hot-toast";
import "./VerifyOtp.css";

const VerifyOtp = () => {
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ phoneNumber, otp }))
      .unwrap()
      .then(() => {
        toast.success("OTP verified successfully!");
      })
      .catch((error) => {
        toast.error("Failed to verify OTP");
      });
  };

  return (
    <div className="verifyOtp">
      <form onSubmit={handleSubmit}>
        <h2>Verify OTP</h2>

        <div style={{ marginBottom: "16px" }}>
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>

        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
