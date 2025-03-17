import React, { useContext, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { ProfileContext } from "../contexts/ProfileContext";

const Profile = () => {
  const { profile, resume, deleteProfile, errorMessage } =
    useContext(ProfileContext);
  const [showModal, setShowModal] = useState(false);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white">
        <h1 className="text-2xl font-semibold mb-2">View Profile</h1>
        <p className="text-gray-500">No profile data found.</p>
      </div>
    );
  }

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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full flex justify-end">
        <button
          onClick={deleteProfile}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>

      <h1 className="text-2xl font-semibold mb-4">View Profile</h1>
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Basic Information</h2>
          <div className="w-full h-[1px] bg-red-600 mb-2"></div>

          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>First Name:</strong> {profile.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {profile.lastName}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {profile.phoneNumber}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Address</h2>
          <div className="w-full h-[1px] bg-red-600 mb-2"></div>
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Street:</strong> {profile.street}
            </p>
            <p>
              <strong>City:</strong> {profile.city}
            </p>
            <p>
              <strong>Zip Code:</strong> {profile.zipCode}
            </p>
            <p>
              <strong>State:</strong> {profile.state}
            </p>
            <p>
              <strong>Country:</strong> {profile.country}
            </p>
          </div>
        </div>
        {resume && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Resume</h2>
            <div className="w-full h-[1px] bg-red-600 mb-2"></div>
            <div className="border border-gray-300 rounded-md p-4 flex items-center">
              <button
                className="flex items-center text-blue-600 hover:text-blue-800 underline p-2 pr-4"
                onClick={handleOpenModal}
              >
                <FaFilePdf className="mr-2 text-2xl text-blue-800" />
                <span className="whitespace-nowrap">resume.pdf</span>
              </button>
              <div className="border-l border-gray-300 h-6"></div>

              <button
                onClick={handleDownloadResume}
                className="font-bold py-2 px-4 ml-4 whitespace-nowrap"
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="text-red-500 text-center mt-4">{errorMessage}</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-3xl">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
            <embed
              src={resume}
              type="application/pdf"
              className="w-full h-[600px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
