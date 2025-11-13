import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

function LoginForm({dispatchFuntion}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: ""
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  }

  async function OnLogin(event) {
    console.log(loginData);
    event.preventDefault();

    if (!loginData.identifier || !loginData.password) {
      toast.error("All fields required");
      return;
    }

    console.log(loginData);
    const response = await dispatch(dispatchFuntion(loginData));

    if (response?.payload?.success) navigate("/");

    setLoginData({
      identifier: "",
      password: "",
    });
  }

  return (
    <form className="space-y-4">
      <div>
        <h1 className="flex align-center justify-center text-[30px] font-bold">Login Form</h1>
        <label className="block text-gray-700 font-medium">Username</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your username"
          name="identifier"
          value={loginData.identifier}
          onChange={handleUserInput}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Password</label>
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          name="password"
          value={loginData.password}
          onChange={handleUserInput}
        />
      </div>
      <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition" onClick={OnLogin}>
        Login
      </button>

      <p className="text-sm text-gray-600 text-center">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-blue-500 font-semibold hover:underline">
          Sign up here
        </Link>
        <br />
        Forgot Password?{" "}
        <Link to="/auth/forgotPassword" className="text-blue-500 font-semibold hover:underline">
          Change password
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
