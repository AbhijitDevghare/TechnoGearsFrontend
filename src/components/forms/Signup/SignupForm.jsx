import { useDispatch } from "react-redux";
import { useState } from "react";
import { createAccount } from "../../../redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./SignupForm.css";

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

      if (
        file &&
        !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)
      ) {
        toast.error("Only JPG, PNG, and WEBP files are allowed");
        return;
      }

      if (file && file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }

      if (
        signupData.avatarPreview &&
        signupData.avatarPreview !== "/default-avatar.png"
      ) {
        URL.revokeObjectURL(signupData.avatarPreview);
      }

      const previewURL = URL.createObjectURL(file);
      setSignupData({ ...signupData, avatar: file, avatarPreview: previewURL });
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
  }

  async function onSignup(e) {
    e.preventDefault();
    if (loading) return;

    const requiredFields = [
      "name",
      "username",
      "email",
      "phoneNumber",
      "address",
      "pincode",
      "state",
      "password",
      "confirmPassword",
    ];

    for (let field of requiredFields) {
      if (!signupData[field]) {
        toast.error("All fields are required");
        return;
      }
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
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signupForm">
      <form onSubmit={onSignup}>
        <h1>Register</h1>

        {/* Avatar */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="file"
            id="avatarInput"
            hidden
            accept="image/*"
            onChange={handleUserInput}
          />
          <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
            <img
              src={signupData.avatarPreview}
              alt="avatar"
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </label>
        </div>

        {[
          "name",
          "username",
          "email",
          "phoneNumber",
          "address",
          "pincode",
          "state",
        ].map((field) => (
          <div key={field} style={{ marginBottom: "12px" }}>
            <label>
              {field.replace(/([A-Z])/g, " $1").toUpperCase()}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={`Enter ${field}`}
              value={signupData[field]}
              onChange={handleUserInput}
            />
          </div>
        ))}

        <div style={{ marginBottom: "12px" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={signupData.password}
            onChange={handleUserInput}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={signupData.confirmPassword}
            onChange={handleUserInput}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/auth/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
