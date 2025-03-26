import React, { useEffect, useState } from "react";
import { FormField } from "../components/Fields";
import { FaSpinner } from "react-icons/fa";
import { initialData, profileConfig } from "../utils/constants/profileFields";
import useProfile from "../hooks/useProfile";
import ResumeModal from "../components/ResumeModal";
import StepIndicator from "../components/StepIndicator";
import ResumeField from "../components/ResumeField";
import FormActions from "../components/FormActions";
import ExperienceFields from "../components/ExperienceFields";

const ProfileEdit = ({ step, setStep }) => {
  const [localProfile, setLocalProfile] = useState(initialData);
  const [localResume, setLocalResume] = useState(null);
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

    setLocalProfile((prev) => {
      if (index !== undefined) {
        return {
          ...prev,
          experience: prev.experience.map((exp, i) =>
            i === index ? { ...exp, [id]: value } : exp
          ),
        };
      }

      const path = id.split(".");
      if (path.length > 1) {
        const [parent, child] = path;
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }

      return {
        ...prev,
        [id]: value,
      };
    });

    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    profileConfig[step - 1].fields.forEach((section) => {
      section.fields.forEach((field) => {
        const path = field.id.split(".");
        const value =
          path.length > 1
            ? localProfile[path[0]][path[1]]
            : localProfile[field.id];

        if (!value && field.required) {
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
    <div className="bg-white ">
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
          <div key={index} id={`section-${step}-${index}`} className="mb-1">
            {!section.isArray && (
              <>
                <h3 className="text-lg font-semibold text-gray-800">
                  {section.title}
                </h3>
                <div className="border-b border-1 border-red-700 mb-4"></div>
              </>
            )}

            <div
              className={`grid gap-2 ${
                section.singleRow ? "grid-cols-1" : "grid-cols-2"
              }`}
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
                section.fields.map((field) => {
                  const path = field.id.split(".");
                  const value =
                    path.length > 1
                      ? localProfile[path[0]][path[1]]
                      : localProfile[field.id];

                  return (
                    <FormField
                      key={field.id}
                      label={field.label}
                      id={field.id}
                      value={value}
                      onChange={handleChange}
                      error={errors[field.id]}
                      type={field.type}
                      options={field.options}
                    />
                  );
                })
              )}
            </div>
          </div>
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
