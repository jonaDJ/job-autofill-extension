import React, { useEffect, useState } from "react";
import { FieldGroup, FormField } from "../components/Fields";
import { FaSpinner } from "react-icons/fa";
import { initialData, profileConfig } from "../utils/constants/profileFields";
import useProfile from "../hooks/useProfile";
import ResumeModal from "../components/ResumeModal";
import StepIndicator from "../components/StepIndicator";
import ResumeField from "../components/ResumeField";
import FormActions from "../components/FormActions";
import ExperienceFields from "../components/ExperienceFields";

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

        <StepIndicator
          totalSteps={totalSteps}
          currentStep={step}
          onStepChange={(newStep) => setStep(newStep)}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {profileConfig[step - 1].fields.map((section, index) => (
          <FieldGroup
            key={index}
            heading={section.title}
            isSingleRow={section.isFile || section.isArray}
          >
            {section.isFile ? (
              <ResumeField
                setResume={setLocalResume}
                resume={localResume}
                onViewResume={() => setShowModal(true)}
              />
            ) : section.isArray ? (
              <ExperienceFields
                experience={localProfile.experience}
                setProfile={setLocalProfile}
                fields={section.fields}
                errors={errors}
                handleChange={handleChange}
              />
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
          </FieldGroup>
        ))}

        <FormActions
          step={step}
          totalSteps={totalSteps}
          onBack={() => setStep((prev) => prev - 1)}
          onNext={() => setStep((prev) => prev + 1)}
          onSubmit={handleSubmit}
          isSaved={isSaved}
        />

        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </form>

      {showModal && (
        <ResumeModal resume={localResume} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProfileEdit;
