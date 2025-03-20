import React, { useEffect, useState } from "react";
import { FieldGroup, FormField } from "../components/Fields";
import { FaFilePdf } from "react-icons/fa";
import { initialData, profileConfig } from "../utils/profileFields";
import useProfile from "../hooks/useProfile";
import ResumeModal from "../components/ResumeModal";

const ProfileEdit = () => {
  const [localProfile, setLocalProfile] = useState(initialData);
  const [localResume, setLocalResume] = useState(null);
  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { profile, resume, error, loadingData, saveProfile } = useProfile();

  const totalSteps = profileConfig.length;

  useEffect(() => {
    if (profile) setLocalProfile(profile);
    if (resume) setLocalResume(resume);
  }, [profile, resume]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLocalProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile(localProfile, localResume);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
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

  if (loadingData) return <>Loading...</>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manage Your Profile
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {profileConfig.map((section) => {
          if (section.step === step || section.step === step + 1) {
            if (section.isFile) {
              return (
                <FieldGroup
                  key={section.step}
                  heading={section.title}
                  rows={section.rows}
                >
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
                  </div>

                  <div className=" flex items-center justify-end -mt-3">
                    {localResume && localResume !== "null" ? (
                      <div
                        className="flex items-center text-green-700 hover:text-green-800 cursor-pointer"
                        onClick={() => setShowModal(true)}
                      >
                        <FaFilePdf className="mr-2" />
                        <span>Resume uploaded</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-500">
                        <span>No resume uploaded</span>
                      </div>
                    )}
                  </div>
                </FieldGroup>
              );
            } else {
              return (
                <FieldGroup
                  rows={section.rows}
                  key={section.step}
                  heading={section.title}
                >
                  {section.fields.map((field) => (
                    <FormField
                      key={field.id}
                      label={field.label}
                      id={field.id}
                      value={localProfile[field.id]}
                      onChange={handleChange}
                    />
                  ))}
                </FieldGroup>
              );
            }
          }
          return null;
        })}

        <div className={`flex ${step > 1 ? "justify-between" : "justify-end"}`}>
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 2)}
              className="py-2 px-6 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-200"
            >
              Back
            </button>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setStep((prev) => prev + 2);
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
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </form>

      {showModal && (
        <ResumeModal resume={localResume} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProfileEdit;
