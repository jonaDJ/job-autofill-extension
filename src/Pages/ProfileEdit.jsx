import React, { useEffect, useState } from "react";
import { FieldGroup, FormField } from "../components/Fields";
import { FaFilePdf, FaSpinner, FaPlus, FaTrash } from "react-icons/fa";
import {
  initialData,
  profileConfig,
  educationData,
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
        education: prev.education.map((edu, i) =>
          i === index ? { ...edu, [id]: value } : edu
        ),
      }));
    } else {
      setLocalProfile((prev) => ({ ...prev, [id]: value }));
    }
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const addEducation = () => {
    setLocalProfile((prev) => ({
      ...prev,
      education: [...prev.education, { ...educationData }],
    }));
  };

  const deleteEducation = (index) => {
    setLocalProfile((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
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
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLocalResume(event.target.result);
      };
      reader.readAsDataURL(file);
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Resume (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  className="mt-2 block w-full text-gray-700 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                {localResume && (
                  <div className="flex items-center justify-end mt-2">
                    <button
                      onClick={() => setShowModal(true)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FaFilePdf className="mr-2" />
                      View Resume
                    </button>
                  </div>
                )}
              </div>
            ) : section.isArray ? (
              localProfile.education.map((edu, eduIndex) => (
                <div key={eduIndex} className="mb-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-semibold text-gray-800">
                      Education {eduIndex + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => deleteEducation(eduIndex)}
                      className="px-2 text-red-600 hover:text-red-900"
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
                        value={edu[field.id]}
                        onChange={(e) => handleChange(e, eduIndex)}
                        error={errors[field.id]}
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
                />
              ))
            )}
            {section.isArray && (
              <button
                type="button"
                onClick={addEducation}
                className="flex items-center justify-center w-full p-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FaPlus className="mr-2" />
                Add Education
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
              className="bg-blue-600 text-white hover:bg-blue-700"
            />
          ) : (
            <ActionButton
              name="Save Profile"
              onClick={handleSubmit}
              className="bg-red-600 text-white hover:bg-red-700"
            />
          )}
        </div>

        {isSaved && (
          <p className="text-green-600 mt-2 text-center">
            Profile saved successfully!
          </p>
        )}
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </form>

      {showModal && (
        <ResumeModal resume={localResume} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProfileEdit;
