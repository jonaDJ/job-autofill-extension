import React, { useEffect, useState } from "react";
import FieldGroup from "../components/UI/FieldGroup";
import FormField from "../components/UI/FormField";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["profile"], (result) => {
      if (result.profile) {
        setProfile(result.profile);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    chrome.storage.local.set({ profile }, () => {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Back
      </button>

      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Manage Your Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl"
      >
        <FieldGroup heading="Personal Information">
          <FormField
            label="First Name"
            id="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
          <FormField
            label="Last Name"
            id="lastName"
            value={profile.lastName}
            onChange={handleChange}
          />
          <FormField
            label="Phone no"
            id="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </FieldGroup>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Save Profile
        </button>

        {isSaved && (
          <p className="text-green-600 text-center mt-4">
            Profile saved successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default Profile;
