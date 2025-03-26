import React, { useState } from "react";
import {
  FaRegFilePdf,
  FaTrash,
  FaDownload,
  FaSpinner,
  FaPencilAlt,
} from "react-icons/fa";
import ResumeModal from "../components/ResumeModal";
import { profileConfig } from "../utils/constants/profileFields";
import useProfile from "../hooks/useProfile";
import ConfirmationModal from "../components/ConfirmationModal";

const ProfileField = ({ label, value, type }) => (
  <div
    className={`flex text-md ${
      type === "textarea"
        ? "flex-col items-start"
        : "flex-row items-center gap-2"
    }`}
  >
    <h3 className="font-semibold text-gray-900">{label}:</h3>
    {type === "url" && value ? (
      <a
        href={value.startsWith("http") ? value : `https://${value}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {value}
      </a>
    ) : (
      <p className="text-gray-700 whitespace-pre-wrap">
        {value || <span className="text-gray-500">Not provided</span>}
      </p>
    )}
  </div>
);

const Profile = ({ setCurrentPage, setStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { profile, resume, loadingData, error, deleteProfile } = useProfile();

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const handleDownloadResume = () => {
    if (resume) {
      setIsDownloading(true);
      const link = document.createElement("a");
      link.href = resume;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }
  };

  const handleEditClick = (step, sectionIndex = 0) => {
    setStep(step);
    setCurrentPage(2); // 2 is the ProfileEdit page

    setTimeout(() => {
      const sectionElement = document.getElementById(
        `section-${step}-${sectionIndex}`
      );
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-full">
        <FaSpinner className="animate-spin text-3xl text-red-600" />
      </div>
    );
  }

  return (
    <>
      {!profile ? (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h1>
          <p className="text-gray-500">No profile data found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {profile.firstName.slice(0, 3) || "Your"}'s Profile
            </h1>
            <button
              onClick={() => setShowConfirmation(true)}
              className="flex items-center gap-2 p-2 text-red-600 rounded-md shadow-md focus:ring-2 focus:ring-red-500"
              aria-label="Delete Profile"
              title="Delete Profile"
            >
              <FaTrash />
              <span>Delete Profile</span>
            </button>
          </div>

          <div className="space-y-8 mt-4">
            {profileConfig.map((stepConfig, stepIndex) => (
              <div key={stepIndex} className="space-y-10">
                {stepConfig.fields.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-2">
                    <div className="flex items-center justify-between border-b border-red-600">
                      <span></span>
                      <h2 className="text-lg font-semibold text-center text-gray-800">
                        {section.title}
                      </h2>
                      <button
                        onClick={() =>
                          handleEditClick(stepConfig.step, sectionIndex)
                        }
                        className="text-red-600 p-1 rounded-full transition-colors"
                        aria-label={`Edit ${section.title}`}
                        title={`Edit ${section.title}`}
                      >
                        <FaPencilAlt size={14} className="hover:text-red-800" />
                      </button>
                    </div>
                    {section.isFile ? (
                      <>
                        {resume && resume !== "null" ? (
                          <div className="flex flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FaRegFilePdf className="text-3xl text-red-600" />
                              <button
                                className="text-blue-600 hover:text-blue-800 hover:underline transition-all  focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowModal(true)}
                              >
                                View Resume
                              </button>
                            </div>
                            <button
                              onClick={handleDownloadResume}
                              className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:shadow-sm transition-all focus:ring-2 focus:ring-red-500"
                              disabled={isDownloading}
                            >
                              {isDownloading ? (
                                <FaSpinner
                                  className="animate-spin"
                                  aria-label="Downloading resume"
                                />
                              ) : (
                                <FaDownload />
                              )}
                              Download
                            </button>
                          </div>
                        ) : (
                          <p className="text-gray-500">No resume uploaded.</p>
                        )}
                      </>
                    ) : section.isArray ? (
                      profile.experience.map((exp, expIndex) => (
                        <div
                          key={expIndex}
                          className="shadow-lg p-2 rounded-md transition-shadow"
                        >
                          <h3 className="text-md font-semibold text-black text-end">
                            Experience {expIndex + 1}
                          </h3>

                          <div className="flex flex-col gap-0 pl-2 text-sm">
                            {section.fields.map((field) => (
                              <ProfileField
                                key={field.id}
                                label={field.label}
                                value={exp[field.id]}
                                type={field.type}
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col gap-1 shadow-lg rounded-md p-2">
                        {section.fields.map((field) => {
                          const value = field.key.includes(".")
                            ? getNestedValue(profile, field.key)
                            : profile[field.key];
                          return (
                            <ProfileField
                              key={field.id}
                              label={field.label}
                              value={value}
                              type={field.type}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {error && (
            <p
              className="text-red-500 text-center mt-4 font-medium"
              aria-live="assertive"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      )}

      {showModal && (
        <ResumeModal resume={resume} onClose={() => setShowModal(false)} />
      )}

      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete your profile?"
          onConfirm={() => {
            deleteProfile();
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </>
  );
};

export default Profile;
