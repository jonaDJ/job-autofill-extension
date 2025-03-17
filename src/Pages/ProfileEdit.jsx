import React, { useContext, useState } from "react";
import { FieldGroup, FormField } from "../components/Fields";
import { ProfileContext } from "../contexts/ProfileContext";

const ProfileEdit = () => {
  const { profile, resume, saveProfile, setProfile, setResume, errorMessage } =
    useContext(ProfileContext);

  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile(profile, resume);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
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
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-2">Manage Your Profile</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {resume && (
              <span className="text-sm text-gray-600">resume.pdf</span>
            )}
          </FieldGroup>
        )}

        <div className="button-group">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              Save Profile
            </button>
          )}
        </div>

        {isSaved && (
          <p className="text-green-600 mt-2">Profile saved successfully!</p>
        )}
        {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ProfileEdit;
