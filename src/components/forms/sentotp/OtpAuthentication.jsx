import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp } from "../../../redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import "./OtpAuthentication.css";

const OtpAuthentication = () => {
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    setPhoneNumber(input.startsWith("+91") ? input : "+91" + input.replace(/^\+91/, ""));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const response = await dispatch(sendOtp({ phoneNumber, email }));
    if (response?.payload?.success) setOtpSent(true);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const res = await dispatch(verifyOtp({ phoneNumber, otp, email, password }));
    if (res?.payload?.success) navigate("/auth/login");
  };

  return (
    <div className="otpAuth">
      <div className="card">
        {!otpSent ? (
          <>
            <h2>Send OTP</h2>

            <form onSubmit={handleSendOtp}>
              <label>Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter phone number"
                required
              />

              <label style={{ marginTop: "12px" }}>
                Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />

              <button type="submit" className="primary">
                Send OTP
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Verify OTP & Reset Password</h2>

            <form onSubmit={handleVerifyOtp}>
              <label>OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />

              <label style={{ marginTop: "12px" }}>
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />

              <button type="submit" className="primary">
                Verify OTP & Reset Password
              </button>
            </form>

            <button onClick={handleSendOtp} className="secondary">
              Resend OTP
            </button>
          </>
        )}

        <Link to="/auth/forgotPassword">Send reset link</Link>

        <p onClick={() => setOtpSent(false)}>
          Get OTP on another number
        </p>
      </div>
    </div>
  );
};

export default OtpAuthentication;
