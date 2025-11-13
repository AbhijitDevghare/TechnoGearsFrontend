import { useDispatch } from "react-redux";
import { useState } from "react";
import { createAccount } from "../../../redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    pincode: "",
    state: "",
    password: "",
    confirmPassword: "",
    avatar: null,
    avatarPreview: "/default-avatar.png",
  });

  function handleUserInput(e) {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];

      if (file && !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)) {
        toast.error("Only JPG, PNG, and WEBP files are allowed");
        return;
      }

      if (file && file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }

      if (signupData.avatarPreview && signupData.avatarPreview !== "/default-avatar.png") {
        URL.revokeObjectURL(signupData.avatarPreview);
      }

      const previewURL = URL.createObjectURL(file);
      setSignupData({ ...signupData, avatar: file, avatarPreview: previewURL });
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
  }

  async function onSignup(event) {
    event.preventDefault();
    if (loading) return;

    if (!signupData.name || !signupData.username || !signupData.email || !signupData.phoneNumber || !signupData.address || !signupData.pincode || !signupData.state || !signupData.password || !signupData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.keys(signupData).forEach((key) => {
      if (key !== "avatarPreview" && signupData[key]) {
        formData.append(key, signupData[key]);
      }
    });

    try {
      const response = await dispatch(createAccount(formData));
      if (response?.payload?.success) {
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error(response?.payload?.message || "Signup failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4 flex flex-col items-center bg-white p-6 rounded-lg w-[600px] max-w-md">
              <h1 className="flex align-center justify-center text-[30px] font-bold">Register Form</h1>
      <div className="relative">
        <input type="file" id="avatarInput" className="hidden" accept="image/*" onChange={handleUserInput} />
        <label htmlFor="avatarInput" className="cursor-pointer">
          <img src={signupData.avatarPreview} alt="Profile Preview" className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-md object-cover" />
        </label>
      </div>

      <div className="w-full">
        {["name", "username", "email", "phoneNumber", "address", "pincode", "state"].map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-gray-700 font-medium capitalize">{field.replace(/([A-Z])/g, " $1").trim()}</label>
            <input type={field === "email" ? "email" : "text"} name={field} className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500" placeholder={`Enter your ${field}`} value={signupData[field]} onChange={handleUserInput} />
          </div>
        ))}
        <div className="mb-3">
          <label className="block text-gray-700 font-medium">Password</label>
          <input type="password" name="password" className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500" placeholder="Create a password" value={signupData.password} onChange={handleUserInput} />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 font-medium">Confirm Password</label>
          <input type="password" name="confirmPassword" className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500" placeholder="Confirm your password" value={signupData.confirmPassword} onChange={handleUserInput} />
        </div>
      </div>

      <button className={`w-3/4 bg-blue-600 text-white p-3 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"} transition mt-4`} onClick={onSignup} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-sm text-gray-500">
        Already have an account? {" "}
        <Link to="/auth/login" className="text-blue-500 font-semibold hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
}

export default SignupForm;
