import React, { useEffect, useState } from "react";
import { initialData } from "../utils/profileFields";
import { FaFilePdf } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(initialData);
  const [resume, setResume] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["profile", "resume"], (result) => {
      if (result.profile) {
        setProfile(result.profile);
      }
      if (result.resume) {
        setResume(result.resume);
      }
    });
  }, []);

  if (!profile) {
    return (
      <div className="main-container">
        <h1 className="text-h1">View Profile</h1>
        <p className="text-sub">No profile data found.</p>
      </div>
    );
  }

  const handleDeleteProfile = () => {
    chrome.storage.local.remove(["profile", "resume"], () => {
      if (chrome.runtime.lastError) {
        console.error("Error deleting profile:", chrome.runtime.lastError);
        setErrorMessage("Error deleting profile. Please try again.");
      } else {
        console.log("Profile deleted successfully.");
        setProfile(initialData);
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

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="main-container">
      <div className="delete-container">
        <button onClick={handleDeleteProfile} className="delete-button">
          Delete
        </button>
      </div>
      <h1 className="text-h1">View Profile</h1>
      <div className="profile-details">
        <div className="profile-section">
          <h2 className="profile-section-title">Basic Information</h2>
          <div className="separator"></div>
          <div className="profile-info-grid">
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
        <div className="profile-section">
          <h2 className="profile-section-title">Address</h2>
          <div className="separator"></div>
          <div className="profile-info-grid">
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
          <div className="profile-section">
            <h2 className="profile-section-title">Resume</h2>
            <div className="separator"></div>
            <div className="resume-container">
              <div className="resume-actions-container">
                <button
                  className="resume-view-button"
                  onClick={handleOpenModal}
                >
                  <FaFilePdf className="resume-file-icon" />
                  <span className="resume-view-text">resume.pdf</span>
                </button>
                <button
                  onClick={handleDownloadResume}
                  className="resume-download-button"
                >
                  <span className="resume-download-text">Download</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {showModal && (
        <div className="resume-modal">
          <div className="resume-modal-content">
            <button className="modal-close-button" onClick={handleCloseModal}>
              Close
            </button>
            <embed
              src={resume}
              type="application/pdf"
              className="modal-resume-preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
