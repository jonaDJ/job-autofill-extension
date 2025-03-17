import React, { useEffect, useState } from "react";
import { FieldGroup, FormField } from "../components/Fields";
import { initialData } from "../utils/profileFields";

const ProfileEdit = () => {
  const [profile, setProfile] = useState(initialData);
  const [resume, setResume] = useState(null);
  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["profile", "resume"], (result) => {
      if (result.profile) {
        setProfile(result.profile);
      }
      if (result.resume) {
        setResume(result.resume);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    chrome.storage.local.set({ profile, resume }, () => {
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

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResume(event.target.result); // Store resume as base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-container">
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

        {step === 3 && (
          <FieldGroup heading="Resume" isFile={true}>
            <div className="form-field">
              <label className="form-label">Upload Resume (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeChange}
                className="form-input"
              />
            </div>
            {resume && <span className="resume-view-text">resume.pdf</span>}
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

          {step < 3 ? (
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
