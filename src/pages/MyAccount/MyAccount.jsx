import { useSelector, useDispatch } from "react-redux";
import HomeLayout from "../../layout/HomeLayout";
import { useState, useRef, useEffect } from "react";
import { updateProfile } from "../../redux/slices/AuthSlice";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";

function MyAccount() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.data);

  // State Management
  const [previewImage, setPreviewImage] = useState(user?.avatar?.url || "");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [updatedFields, setUpdatedFields] = useState({}); // Track changes

  const fileInputRef = useRef(null);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "", // Keep for display but non-editable
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        avatar: user.avatar?.url || "",
        address: user.address || "",
        pincode: user.pincode || "",
        state: user.state || "",
      });
    }
  }, [user]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent updating username
    if (name === "username") return;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Track only changed fields
    setUpdatedFields((prevFields) => ({
      ...prevFields,
      [name]: value !== user[name] ? value : undefined,
    }));
  };

  // Handle Image Selection
  const handleImageChange = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(uploadedImage);

      setUpdatedFields((prevFields) => ({
        ...prevFields,
        avatar: uploadedImage, // Only send new image if selected
      }));
    }
  };

  // Handle Save Button Click
  const handleSave = () => {
    if (Object.keys(updatedFields).length === 0) {
      toast("No changes detected.");
      setIsEditingProfile(false);
      return;
    }

    setLoading(true);
    const formdata = new FormData();

    // Append only updated fields to FormData
    Object.keys(updatedFields).forEach((key) => {
      formdata.append(key, updatedFields[key]);
    });

    dispatch(updateProfile(formdata))
      .then((response) => {
        setLoading(false);
        if (response?.payload?.success) {
          setIsEditingProfile(false);
          setUpdatedFields({});
          toast.success("Profile updated successfully!");
        } else {
          toast.error("Failed to update profile");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to update profile", error);
        toast.error("An error occurred");
      });
  };

  // Handle Cancel Button Click
  const handleCancel = () => {
    setIsEditingProfile(false);
    setUpdatedFields({});
    setPreviewImage(user?.avatar?.url || "");
  };

  return (
    <HomeLayout>
      {user && (
        <div className="w-[99vw] flex items-center justify-center">
          <div className="w-[400px] flex flex-col gap-4 bg-base-100 p-10 m-10 rounded-lg shadow-md">
            
            {/* Profile Image Section */}
            <div className="flex justify-center items-center">
              <label className="cursor-pointer">
                {previewImage ? (
                  <img
                    className={`w-[150px] h-[150px] rounded-full object-cover border-2 border-gray-300 shadow-md cursor-pointer ${
                      isEditingProfile ? "hover:opacity-75" : ""
                    }`}
                    src={previewImage}
                    alt="Profile"
                    onClick={() => isEditingProfile && fileInputRef.current.click()}
                  />
                ) : (
                  <BsPersonCircle
                    className={`text-gray-400 w-[150px] h-[150px] rounded-full cursor-pointer ${
                      isEditingProfile ? "hover:opacity-75" : ""
                    }`}
                    onClick={() => isEditingProfile && fileInputRef.current.click()}
                  />
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            {/* Profile Form Section */}
            {isEditingProfile ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Enter your name"
                />

                {/* Non-editable username field */}
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  disabled
                  className="input input-bordered w-full mb-2 bg-gray-100 cursor-not-allowed"
                  placeholder="Username"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Enter your email"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Enter your phone number"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Enter your address"
                />
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Enter your pincode"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Enter your state"
                />

                <div className="flex justify-end gap-2">
                  <button
                    className="btn text-xs px-2 py-1 text-white bg-green-500 hover:bg-green-600"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="btn text-xs px-2 py-1 text-white bg-red-500 hover:bg-red-600"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="font-bold">{user.name}</div>
                <div><b>Username:</b> {user.username}</div>
                <div><b>Email:</b> {user.email}</div>
                <div><b>Phone Number:</b> {user.phoneNumber}</div>
                <div><b>Pincode:</b> {user.pincode}</div>
                <div><b>State:</b> {user.state}</div>
                <div className="my-5">
                  <button
                    className="btn text-xs px-2 py-1 text-white bg-gray-500 hover:bg-gray-600"
                    onClick={() => setIsEditingProfile(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </HomeLayout>
  );
}

export default MyAccount;
