import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect, useMemo } from "react";
import { updateProfile } from "../../redux/slices/AuthSlice";
import { BsPersonCircle, BsCameraFill } from "react-icons/bs";
import { FiUser, FiMail, FiPhone, FiMapPin, FiHash, FiMap } from "react-icons/fi";
import toast from "react-hot-toast";
import "./MyAccount.css";
import Header from "../../components/header/Header";

const INITIAL_FORM = {
  name: "",
  username: "",
  email: "",
  phoneNumber: "",
  address: "",
  pincode: "",
  state: ""
};

// Configuration for fields to control layout and icons
const FIELD_CONFIG = [
  { key: "name", label: "Full Name", icon: <FiUser />, type: "text", fullWidth: false },
  { key: "username", label: "Username", icon: <FiUser />, type: "text", fullWidth: false },
  { key: "email", label: "Email Address", icon: <FiMail />, type: "email", fullWidth: true },
  { key: "phoneNumber", label: "Phone Number", icon: <FiPhone />, type: "tel", fullWidth: true },
  { key: "address", label: "Address", icon: <FiMapPin />, type: "text", fullWidth: true },
  { key: "pincode", label: "Pincode", icon: <FiHash />, type: "number", fullWidth: false },
  { key: "state", label: "State", icon: <FiMap />, type: "text", fullWidth: false },
];

export default function MyAccount() {
  const handleBack = () => window.history.back()
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.data);
  const fileRef = useRef(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [preview, setPreview] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      pincode: user.pincode || "",
      state: user.state || ""
    });
    setPreview(user.avatar?.url || "");
  }, [user]);

  const changedFields = useMemo(() => {
    if (!user) return {};
    const diff = {};
    Object.keys(form).forEach((key) => {
      if (key !== "username" && form[key] !== user[key]) {
        diff[key] = form[key];
      }
    });
    return diff;
  }, [form, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") return;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    changedFields.avatar = file;
  };

  const handleSave = async () => {
    if (Object.keys(changedFields).length === 0) {
      toast("No changes detected");
      setEditing(false);
      return;
    }

    const fd = new FormData();
    Object.entries(changedFields).forEach(([k, v]) => fd.append(k, v));

    try {
      setLoading(true);
      await dispatch(updateProfile(fd)).unwrap();
      toast.success("Profile updated");
      setEditing(false);
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setPreview(user?.avatar?.url || "");
    setForm({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      pincode: user.pincode || "",
      state: user.state || ""
    });
  };

  if (!user) return null;

  return (
    <>        <Header showCart={false} showSearch={false} leftType="back"  onBack={handleBack}/>

    <div className="account-page">
      <div className="account-card">
        <div className="card-header">
          <h3>My Profile</h3>
          <p>Manage your account settings</p>
        </div>

        {/* Avatar Section */}
        <div className="avatar-section">
          <div 
            className={`avatar-wrapper ${editing ? "editable" : ""}`} 
            onClick={() => editing && fileRef.current.click()}
          >
            {preview ? (
              <img src={preview} alt="Profile" className="avatar-img" />
            ) : (
              <BsPersonCircle className="avatar-icon" />
            )}
            
            {/* Camera Overlay */}
            {editing && (
              <div className="avatar-overlay">
                <BsCameraFill />
              </div>
            )}
            
            <input type="file" hidden ref={fileRef} onChange={handleImage} accept="image/*" />
          </div>
          {editing && <span className="avatar-hint">Click image to change</span>}
        </div>

        {/* Form Content */}
        <div className="form-grid">
          {FIELD_CONFIG.map((field) => (
            <div 
              key={field.key} 
              className={`form-group ${field.fullWidth ? "full-width" : ""}`}
            >
              <label className="field-label">
                <span className="field-icon">{field.icon}</span>
                {field.label}
              </label>

              {editing ? (
                <input
                  name={field.key}
                  type={field.type}
                  value={form[field.key]}
                  onChange={handleChange}
                  disabled={field.key === "username"}
                  className={`input-field ${field.key === "username" ? "disabled" : ""}`}
                  placeholder={`Enter ${field.label}`}
                />
              ) : (
                <div className="info-display">
                  {user[field.key] || <span className="empty-text">Not set</span>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="action-row">
          {editing ? (
            <>
              <button className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <button className="btn btn-edit" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}