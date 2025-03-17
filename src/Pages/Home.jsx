import React, { useContext } from "react";
import { autofillData } from "../utils/autofillUtils";
import { ProfileContext } from "../contexts/ProfileContext";
import { FaMagic } from "react-icons/fa";

const Home = () => {
  const { profile, errorMessage, setErrorMessage } = useContext(ProfileContext);

  const handleAutoClick = () => {
    console.log("auto clicked");
    autofillData(profile, setErrorMessage);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white">
      <h1 className="text-lg">
        {profile ? `Welcome, ${profile.firstName}!` : "Welcome to Job AutoFill"}
      </h1>

      <p className="text-sm text-gray-500">
        {profile
          ? "Streamline your job application process with your saved profile."
          : "No profile found."}
      </p>

      <button
        onClick={handleAutoClick}
        disabled={!profile}
        className={`w-full mt-4 py-2 px-4 rounded-md border-none cursor-pointer flex items-center justify-center gap-2
          ${
            !profile
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" // Enabled styles
          }`}
      >
        Autofill
        <FaMagic />
      </button>
      {errorMessage && (
        <p className="text-green-500 text-center">{errorMessage}</p>
      )}
    </div>
  );
};

export default Home;
