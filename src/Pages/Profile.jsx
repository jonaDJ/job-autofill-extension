import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    chrome.storage.local.get(["profile"], (result) => {
      if (result.profile) {
        setProfile(result.profile);
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

  return (
    <div className="main-container">
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
      </div>
    </div>
  );
};

export default Profile;
