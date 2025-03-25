import React, { useState } from "react";
import { FaRegFilePdf, FaTrash, FaDownload, FaSpinner } from "react-icons/fa";
import ResumeModal from "../components/ResumeModal";
import { profileConfig } from "../utils/constants/profileFields";
import useProfile from "../hooks/useProfile";
import ConfirmationModal from "../components/ConfirmationModal";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { profile, resume, loadingData, error, deleteProfile } = useProfile();

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
              className="flex items-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Delete Profile"
              title="Delete Profile"
            >
              <FaTrash /> Delete Profile
            </button>
          </div>

          <div className="space-y-8 mt-4">
            {profileConfig.map((stepConfig, stepIndex) => (
              <div key={stepIndex} className="space-y-10">
                {stepConfig.fields.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="space-y-2">
                    <h2 className="text-lg font-semibold text-center text-gray-800 border-b border-red-600">
                      {section.title}
                    </h2>
                    {section.isFile ? (
                      <>
                        {resume && resume !== "null" ? (
                          <div className="flex flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FaRegFilePdf className="text-3xl text-red-600" />
                              <button
                                className="text-blue-600 hover:text-blue-800 hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setShowModal(true)}
                              >
                                View Resume
                              </button>
                            </div>
                            <button
                              onClick={handleDownloadResume}
                              className="flex items-center gap-2 text-gray-700 hover:text-red-600 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
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
                          className="shadow-md p-3 rounded-md hover:shadow-lg transition-shadow"
                        >
                          <h3 className="text-md font-semibold text-black text-end">
                            Experience {expIndex + 1}
                          </h3>

                          <div className="flex flex-col gap-0 pl-2 text-sm">
                            {section.fields.map((field) => (
                              <div key={field.id} className="flex gap-2">
                                <strong className="font-semibold text-gray-700">
                                  {field.label}:
                                </strong>
                                <p className="text-gray-700">
                                  {exp[field.id] || (
                                    <span className="text-gray-500">
                                      Not provided
                                    </span>
                                  )}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col gap-1 shadow-md rounded-md p-2">
                        {section.fields.map((field) => (
                          <div key={field.id} className="flex gap-2">
                            <strong className="font-semibold text-gray-700">
                              {field.label}:
                            </strong>
                            <p className="text-gray-700">
                              {profile[field.key] || (
                                <span className="text-gray-500">
                                  Not provided
                                </span>
                              )}
                            </p>
                          </div>
                        ))}
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
