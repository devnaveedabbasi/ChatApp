import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function UpdateProfile() {
  const { authUser, updateProfile, isUpdatingProfile, checkAuth } =
    useAuthStore();
  const [username, setUsername] = useState(authUser?.fullName || "");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", username || authUser?.fullName);
    formData.append("profile", profilePic);

    const res = await updateProfile(formData);
    if (res && res.success) {
      // Fetch latest user data after successful update
      checkAuth();
    }
  };

  // useEffect(() => {
  //   if (handleSubmit) {
  //     checkAuth();
  //   }
  // }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white shadow-md rounded-lg justify-center items-center">
      <div className="p-4 border-b border-gray-300 w-full flex flex-col items-center">
        <img
          src={preview || authUser?.profilePic}
          alt="Profile Preview"
          className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow"
        />
      </div>
      <div className="p-4 w-full ">
        <h2 className="text-gray-800 font-semibold text-lg text-center">
          Update Profile
        </h2>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="text-gray-500 text-sm mt-1">
              Upload a profile picture (optional). Recommended size: 256x256px.
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#52AB86] text-white p-2 rounded-md hover:bg-[#429f7a]"
          >
            {isUpdatingProfile ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
