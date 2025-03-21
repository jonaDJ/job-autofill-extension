import React, { useEffect, useState } from "react";
import { FieldGroup, FormField } from "../components/Fields";
import { FaFilePdf, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";
import {
  initialData,
  profileConfig,
  experienceData,
} from "../utils/profileFields";
import useProfile from "../hooks/useProfile";
import ResumeModal from "../components/ResumeModal";
import ActionButton from "../components/ActionButton";

const ProfileEdit = () => {
  const [localProfile, setLocalProfile] = useState(initialData);
  const [localResume, setLocalResume] = useState(null);
  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const { profile, resume, error, loadingData, saveProfile } = useProfile();

  const totalSteps = profileConfig.length;

  useEffect(() => {
    if (profile) setLocalProfile(profile);
    if (resume) setLocalResume(resume);
  }, [profile, resume]);

  const handleChange = (e, index) => {
    const { id, value } = e.target;
    if (index !== undefined) {
      setLocalProfile((prev) => ({
        ...prev,
        experience: prev.experience.map((exp, i) =>
          i === index ? { ...exp, [id]: value } : exp
        ),
      }));
    } else {
      setLocalProfile((prev) => ({ ...prev, [id]: value }));
    }
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const addExperience = () => {
    setLocalProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...experienceData }],
    }));
  };

  const deleteExperience = (index) => {
    setLocalProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    profileConfig[step - 1].fields.forEach((section) => {
      section.fields.forEach((field) => {
        if (!localProfile[field.id] && field.required) {
          newErrors[field.id] = `${field.label} is required.`;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveProfile(localProfile, localResume);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLocalResume(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-full">
        <FaSpinner className="animate-spin text-3xl text-red-600" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Manage Your Profile
        </h2>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setStep(i + 1)}
              className={`w-3 h-3 rounded-full transition-colors ${
                step === i + 1 ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {profileConfig[step - 1].fields.map((section, index) => (
          <FieldGroup
            key={index}
            heading={section.title}
            rows={section.rows || section.isFile || section.isArray}
          >
            {section.isFile ? (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resume (PDF)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    tabIndex={0}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        document.getElementById("resume-upload").click();
                      }
                    }}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF only (max. 5MB)
                      </p>
                    </div>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {localResume && (
                  <div className="mt-3 flex items-center justify-between bg-green-50 p-3 rounded-md">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <p className="text-sm text-green-700">Resume uploaded!</p>
                    </div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View Resume
                    </button>
                  </div>
                )}
              </div>
            ) : section.isArray ? (
              localProfile.experience.map((exp, expIndex) => (
                <div key={expIndex} className="mb-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-semibold text-gray-800">
                      Experience {expIndex + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => deleteExperience(expIndex)}
                      className="px-2 text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label={`Delete Experience ${expIndex + 1}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="border-b border-1 border-red-700 mb-2 mt-1"></div>
                  <div className="grid grid-cols-2 gap-4">
                    {section.fields.map((field) => (
                      <FormField
                        key={field.id}
                        label={field.label}
                        id={field.id}
                        value={exp[field.id]}
                        onChange={(e) => handleChange(e, expIndex)}
                        error={errors[field.id]}
                        type={field.type}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              section.fields.map((field) => (
                <FormField
                  key={field.id}
                  label={field.label}
                  id={field.id}
                  value={localProfile[field.id]}
                  onChange={handleChange}
                  error={errors[field.id]}
                  type={field.type}
                />
              ))
            )}
            {section.isArray && (
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center justify-center w-full p-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaPlus className="mr-2" />
                Add Experience
              </button>
            )}
          </FieldGroup>
        ))}

        <div className={`flex ${step > 1 ? "justify-between" : "justify-end"}`}>
          {step > 1 && (
            <ActionButton
              name="Back"
              onClick={() => setStep((prev) => prev - 1)}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400"
            />
          )}

          {step < totalSteps ? (
            <ActionButton
              name="Next"
              onClick={() => setStep((prev) => prev + 1)}
              className="bg-blue-800 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <ActionButton
              name={`${isSaved ? "Profil Saved!" : "Save"}  `}
              onClick={handleSubmit}
              className={`text-white ${
                isSaved ? "bg-green-600  " : "bg-red-600  hover:bg-red-700"
              } `}
            />
          )}
        </div>

        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </form>

      {showModal && (
        <ResumeModal resume={localResume} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProfileEdit;
