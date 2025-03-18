import React, { useEffect, useState } from "react";
import { FieldGroup, FormField } from "../components/Fields";

const profileConfig = [
  {
    step: 1,
    heading: "Basic Information",
    fields: [
      { label: "First Name", id: "firstName" },
      { label: "Last Name", id: "lastName" },
      { label: "Email", id: "email" },
      { label: "Phone Number", id: "phoneNumber" },
    ],
  },
  {
    step: 2,
    heading: "Address Information",
    fields: [
      { label: "Street", id: "street" },
      { label: "City", id: "city" },
      { label: "Zip Code", id: "zipCode" },
      { label: "State", id: "state" },
      { label: "Country", id: "country" },
    ],
  },
  {
    step: 3,
    heading: "Resume",
    isFile: true,
  },
];

const ProfileEdit = () => {
  const [profile, setProfile] = useState({});
  const [resume, setResume] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["profile", "resume"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving profile:", chrome.runtime.lastError);
        setErrorMessage("Failed to load profile.");
      } else {
        setProfile(result.profile || {});
        setResume(result.resume || null);
      }
    });
  }, []);

  const saveProfile = (newProfile, newResume) => {
    chrome.storage.local.set({ profile: newProfile, resume: newResume }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving profile:", chrome.runtime.lastError);
        setErrorMessage("Error saving profile. Please try again.");
      } else {
        setProfile(newProfile);
        setResume(newResume);
        setErrorMessage("");
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      }
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile(profile, resume);
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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manage Your Profile
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        {profileConfig.map((section) => {
          if (section.step === step) {
            if (section.isFile) {
              return (
                <FieldGroup
                  key={section.step}
                  heading={section.heading}
                  isFile={true}
                >
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Resume (PDF)
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeChange}
                      className="mt-2 block w-full text-gray-700 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  {resume && (
                    <div className="text-sm text-gray-600">resume.pdf</div>
                  )}
                </FieldGroup>
              );
            } else {
              return (
                <FieldGroup key={section.step} heading={section.heading}>
                  {section.fields.map((field) => (
                    <FormField
                      key={field.id}
                      label={field.label}
                      id={field.id}
                      value={profile[field.id]}
                      onChange={handleChange}
                    />
                  ))}
                </FieldGroup>
              );
            }
          }
          return null;
        })}

        <div
          className={`flex mt-4 ${
            step > 1 ? "justify-between" : "justify-end"
          }`}
        >
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="py-2 px-6 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-200"
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
              className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Save Profile
            </button>
          )}
        </div>

        {isSaved && (
          <p className="text-green-600 mt-2 text-center">
            Profile saved successfully!
          </p>
        )}
        {errorMessage && (
          <p className="text-red-600 mt-2 text-center">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ProfileEdit;
