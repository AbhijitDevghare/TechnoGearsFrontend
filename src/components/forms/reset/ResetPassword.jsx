import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../../redux/slices/AuthSlice";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { resetToken } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ resetToken, password }));
  };

  return (
    <div className="resetPassword">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <div style={{ marginBottom: "16px" }}>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            required
          />
        </div>

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
