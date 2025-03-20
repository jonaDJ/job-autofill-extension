import React, { useState } from "react";
import { FaRegFilePdf, FaTrash, FaDownload } from "react-icons/fa";
import ResumeModal from "../components/ResumeModal";
import { profileConfig } from "../utils/profileFields";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { profile, resume, loadingData, error, deleteProfile } = useProfile();

  const handleDownloadResume = () => {
    if (resume) {
      const link = document.createElement("a");
      link.href = resume;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loadingData) return <>Loading...</>;

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-500">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center border-t">
      <div className="w-full bg-white shadow-lg px-3 py-1">
        <h1 className="text-2xl text-center font-semibold text-gray-900">
          Profile
        </h1>
        <div className="flex justify-end">
          <button
            onClick={deleteProfile}
            className="flex mb-2 items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-md shadow-sm transition-all"
          >
            <FaTrash /> Delete
          </button>
        </div>
        <div className="space-y-3 mb-3">
          {profileConfig.map((section, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-50 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {section.title}
              </h2>
              <div className="w-full h-[2px] bg-gradient-to-r from-red-500 to-red-700 mb-3"></div>
              {!section.isFile ? (
                <div className="flex flex-col items-start gap-1">
                  {section.fields.map((field) => (
                    <div
                      key={field.key}
                      className="text-md flex items-center gap-3"
                    >
                      <strong className="font-semibold text-gray-700">
                        {field.label}:
                      </strong>
                      <span className="text-gray-700">
                        {profile[field.key] || (
                          <span className="text-gray-500">Not provided</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {resume && resume !== "null" ? (
                    <div className="flex items-center justify-between bg-white shadow-sm border border-gray-300 pl-3 w-full">
                      <div className="flex items-center py-2">
                        <button
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-all focus:outline-none"
                          onClick={() => setShowModal(true)}
                        >
                          <FaRegFilePdf className="mr-2 text-3xl text-blue-800" />
                          View Resume
                        </button>
                      </div>
                      <button
                        onClick={handleDownloadResume}
                        className="flex items-center py-2 px-3 bg-white text-black hover:bg-gray-500 transition-all focus:outline-none"
                      >
                        <FaDownload className="mr-2" />
                        Download
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500">No resume uploaded.</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
        )}
      </div>

      {showModal && (
        <ResumeModal resume={resume} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Profile;
