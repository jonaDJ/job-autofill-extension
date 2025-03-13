import React, { useEffect, useState } from "react";
import FieldGroup from "../components/FieldGroup";
import FormField from "../components/FormField";
import { useNavigate } from "react-router-dom";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  street: "",
  city: "",
  zipCode: "",
  state: "",
  country: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(initialData);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!chrome.tabs) return;
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
    if (!chrome.tabs) return;

    chrome.storage.local.set({ profile }, () => {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    });
  };

  const handleDeleteProfile = (e) => {
    e.preventDefault();
    if (!chrome.tabs) return;

    chrome.storage.local.remove("profile", () => {
      if (chrome.runtime.lastError) {
        console.error("Error deleting profile:", chrome.runtime.lastError);
      } else {
        console.log("Profile deleted successfully.");
        setProfile(initialData);
      }
    });
  };

  return (
    <div className="bg-gray-50 py-5">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Back
          </button>
          <button
            onClick={handleDeleteProfile}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Manage Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <FieldGroup heading="Basic Information">
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
                label="Email"
                id="email"
                value={profile.email}
                onChange={handleChange}
              />
              <FormField
                label="Phone Number"
                id="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
              />
            </FieldGroup>
          )}

          {step === 2 && (
            <FieldGroup heading="Address Information">
              <FormField
                label="Street"
                id="street"
                value={profile.street}
                onChange={handleChange}
              />
              <FormField
                label="City"
                id="city"
                value={profile.city}
                onChange={handleChange}
              />
              <FormField
                label="Zip Code"
                id="zipCode"
                value={profile.zipCode}
                onChange={handleChange}
              />
              <FormField
                label="State"
                id="state"
                value={profile.state}
                onChange={handleChange}
              />
              <FormField
                label="Country"
                id="country"
                value={profile.country}
                onChange={handleChange}
              />
            </FieldGroup>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
              >
                Back
              </button>
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setStep((prev) => prev + 1);
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition font-semibold"
              >
                Save Profile
              </button>
            )}
          </div>

          {isSaved && (
            <p className="text-green-600 text-center mt-4 font-semibold">
              Profile saved successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
