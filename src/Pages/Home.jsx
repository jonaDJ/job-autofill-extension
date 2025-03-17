import React, { useEffect, useState } from "react";
import { autofillData } from "../utils/autofillUtils";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["profile"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving profile:", chrome.runtime.lastError);
        setErrorMessage("Failed to load profile.");
      } else if (result.profile) {
        setProfile(result.profile);
      }
    });
  }, []);

  const handleAutoClick = () => {
    console.log("auto clicked");
    autofillData(profile, setErrorMessage);
  };

  return (
    <div className="main-container">
      <h1 className="text-h1">
        {profile ? `Welcome, ${profile.firstName}!` : "Welcome to Job AutoFill"}
      </h1>

      <p className="text-sub">
        {profile
          ? "Streamline your job application process with your saved profile."
          : "No profile found."}
      </p>

      <button onClick={handleAutoClick} className="autofill-button">
        Autofill
      </button>
      {errorMessage && <p className="success-message">{errorMessage}</p>}
    </div>
  );
};

export default Home;
