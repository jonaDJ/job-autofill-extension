import React, { useEffect, useState } from "react";
import { FaFilePdf, FaTrash } from "react-icons/fa";
import ResumeModal from "../components/ResumeModal";

const profileConfig = [
  {
    title: "Basic Information",
    fields: [
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "Email", key: "email" },
      { label: "Phone Number", key: "phoneNumber" },
    ],
  },
  {
    title: "Address",
    fields: [
      { label: "Street", key: "street" },
      { label: "City", key: "city" },
      { label: "Zip Code", key: "zipCode" },
      { label: "State", key: "state" },
      { label: "Country", key: "country" },
    ],
  },
];

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [resume, setResume] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["profile", "resume"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving profile:", chrome.runtime.lastError);
        setErrorMessage("Failed to load profile.");
      } else {
        setProfile(result.profile);
        setResume(result.resume);
      }
    });
  }, []);

  const deleteProfile = () => {
    chrome.storage.local.remove(["profile", "resume"], () => {
      if (chrome.runtime.lastError) {
        console.error("Error deleting profile:", chrome.runtime.lastError);
        setErrorMessage("Error deleting profile. Please try again.");
      } else {
        setProfile(null);
        setResume(null);
        setErrorMessage("");
      }
    });
  };

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

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Profile</h1>
        <p className="text-gray-500">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center border-t  bg-[#F8F9FA]">
      <div className="w-full bg-white shadow-lg px-3 py-1">
        <div className="flex justify-end">
          <button
            onClick={deleteProfile}
            className=" flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-md shadow-sm transition-all"
          >
            <FaTrash /> Delete
          </button>
        </div>

        <h1 className="text-2xl text-center font-semibold text-gray-900">
          Profile
        </h1>

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
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {section.fields.map((field) => (
                  <p key={field.key} className="text-gray-700 text-sm mb-2">
                    <strong className="font-medium text-gray-900">
                      {field.label}:{" "}
                    </strong>
                    {profile[field.key]}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {resume && (
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Resume</h2>
              <div className="w-full h-[2px] bg-gradient-to-r from-red-500 to-red-700 mb-3"></div>
              <div className="flex items-center justify-between bg-white shadow-sm border border-gray-300 p-3 rounded-lg">
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-all"
                  onClick={() => setShowModal(true)}
                >
                  <FaFilePdf className="mr-2 text-2xl text-blue-800" />
                  <span className="font-medium">View Resume</span>
                </button>
                <button
                  onClick={handleDownloadResume}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg shadow-sm transition-all"
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center mt-4 font-medium">
            {errorMessage}
          </p>
        )}
      </div>

      {showModal && (
        <ResumeModal resume={resume} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Profile;
