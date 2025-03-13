import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const handleButtonClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
    if (chrome.tabs) {
      chrome.storage.local.get(["profile"], (result) => {
        if (result.profile) {
          setProfile(result.profile);
        }
      });
    }
  }, []);

  const handleAutoClick = () => {
    if (!chrome.tabs || !profile) return;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) return;
      chrome.tabs.sendMessage(tabs[0].id, { action: "autofill" });
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center  text-gray-800">
          {profile
            ? `Welcome, ${profile.firstName}!`
            : "Welcome to Job AutoFill"}
        </h1>

        <p className="text-gray-600 text-center mb-6">
          {profile
            ? "Streamline your job application process with your saved profile."
            : "No profile found."}
        </p>

        <button
          onClick={handleButtonClick}
          className="w-full mb-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-300" // Styled as a button
        >
          {profile ? "Update Your Profile" : "Add Your Profile"}
        </button>

        <button
          onClick={handleAutoClick}
          className="w-full mb-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Autofill
        </button>
      </div>
    </div>
  );
};

export default Home;
