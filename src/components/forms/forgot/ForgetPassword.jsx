import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../redux/slices/AuthSlice";
import { Link } from "react-router-dom";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  return (
    <div className="forgetPassword">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Your Password?</h2>

        <div style={{ marginBottom: "16px" }}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit">Send Reset Link</button>

        <p>
          We will send you an email with instructions to reset your password.
        </p>

        <p>Or</p>

        <Link to="/auth/sendOtp">
          <p>Send OTP</p>
        </Link>

        <Link to="/auth/login">
          <p>Log in</p>
        </Link>
      </form>
    </div>
  );
};

export default ForgetPassword;
