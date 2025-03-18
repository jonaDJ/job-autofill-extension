import React, { useEffect, useState } from "react";
import { autofillData } from "../utils/autofillUtils";
import { FaRocket } from "react-icons/fa";

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["profile"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving profile:", chrome.runtime.lastError);
        setErrorMessage("Failed to load profile.");
      } else {
        setProfile(result.profile);
      }
    });
  }, []);

  const handleAutoClick = async () => {
    setIsLoading(true);
    await autofillData(profile, setErrorMessage);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white border-t">
      <h1 className="text-lg font-semibold">
        {profile ? `Welcome, ${profile.firstName}!` : "Welcome to Job AutoFill"}
      </h1>

      <p className="text-sm text-gray-500">
        {profile
          ? "Streamline your job application process with your saved profile."
          : "No profile found."}
      </p>

      <button
        onClick={handleAutoClick}
        disabled={!profile || isLoading}
        className={`w-full mt-4 py-2 px-4 rounded-md border-none flex items-center justify-center gap-2 transition-all duration-200
                    ${
                      !profile || isLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-105"
                    }`}
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            Autofill <FaRocket />
          </>
        )}
      </button>
      {errorMessage && (
        <p className="text-green-500 text-center">{errorMessage}</p>
      )}
    </div>
  );
};

export default Home;
