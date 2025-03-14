import React, { useEffect, useState } from "react";
import { FieldGroup, FormField } from "../components/Fields";

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

const ProfileEdit = () => {
  const [profile, setProfile] = useState(initialData);
  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      if (chrome.runtime.lastError) {
        console.error("Error saving profile:", chrome.runtime.lastError);
        setIsSaved(false);
        setErrorMessage("Error saving profile. Please try again.");
      } else {
        setIsSaved(true);
        setErrorMessage("");
        setTimeout(() => setIsSaved(false), 3000);
        console.log("Profile saved successfully.");
      }
    });
  };

  const handleDeleteProfile = () => {
    chrome.storage.local.remove("profile", () => {
      if (chrome.runtime.lastError) {
        console.error("Error deleting profile:", chrome.runtime.lastError);
        setErrorMessage("Error deleting profile. Please try again.");
      } else {
        console.log("Profile deleted successfully.");
        setProfile(initialData);
        setErrorMessage("");
      }
    });
  };

  return (
    <div className="form-container">
      <div>
        <button onClick={handleDeleteProfile} className="delete-button">
          Delete
        </button>
      </div>

      <div className="heading-container">
        <h2 className="text-h1">Manage Your Profile</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-block">
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

        <div className="button-group">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="back-button"
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
              className="next-button"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="save-button">
              Save Profile
            </button>
          )}
        </div>

        {isSaved && (
          <p className="success-message">Profile saved successfully!</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ProfileEdit;
