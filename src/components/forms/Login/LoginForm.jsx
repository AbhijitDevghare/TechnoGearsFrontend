import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import "./LoginForm.css"

function LoginForm({ dispatchFuntion }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  async function OnLogin(e) {
    e.preventDefault();

    if (!loginData.identifier || !loginData.password) {
      toast.error("All fields required");
      return;
    }

    const response = await dispatch(dispatchFuntion(loginData));
    if (response?.payload?.success) navigate("/");

    setLoginData({ identifier: "", password: "" });
  }

  return (
    <div className="loginForm">
      <form
        onSubmit={OnLogin}
        className=""
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#0b2a4a] flex items-center justify-center text-blue-400 text-2xl">
            ⚡
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl font-semibold text-center">
          Welcome Back
        </h1>
        <p className="text-slate-400 text-center mt-2 mb-8">
          Login to your electronics hub
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="text-white text-sm mb-2 block">
            Email or Username
          </label>
          <input
            type="text"
            name="identifier"
            value={loginData.identifier}
            onChange={handleUserInput}
            placeholder="Enter your email"
            className="w-full rounded-xl px-4 py-3 bg-[#0b243f] text-white placeholder-slate-400 border border-[#163a5f] focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="text-white text-sm mb-2 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleUserInput}
            placeholder="Enter your password"
            className=""
          />
        </div>

        {/* Forgot */}
        <div className="text-right mb-6">
          <Link
            to="/auth/forgotPassword"
            className="text-blue-400 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-blue-400 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
