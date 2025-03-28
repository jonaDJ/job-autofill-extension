import React, { useState } from "react";
import autofill from "../utils/autofill/autofill";
import { FaRocket, FaSpinner } from "react-icons/fa";
import useProfile from "../hooks/useProfile";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentField, setCurrentField] = useState("");

  const { profile, resume, loadingData } = useProfile();

  const handleAutoClick = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setCurrentField("");
    try {
      await autofill(
        profile || "",
        resume || "",
        setErrorMessage,
        setCurrentField
      );
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred during autofill. Please try again.");
    } finally {
      setIsLoading(false);
      setCurrentField("");
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-full">
        <FaSpinner
          className="animate-spin text-3xl text-red-600"
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        {`Welcome, ${profile.firstName || "Yo!"}!`}
      </h1>

      <p className="text-sm text-gray-500 mb-4 text-center">
        {profile.firstName
          ? "Streamline your job application process with your saved profile."
          : "No profile found. Please create a profile to use autofill."}
      </p>

      <div className="w-full" aria-live="polite" aria-busy={isLoading}>
        <button
          onClick={handleAutoClick}
          disabled={!profile || isLoading}
          aria-disabled={!profile || isLoading}
          aria-label={
            !profile
              ? "Create a profile to use autofill"
              : "Autofill job applications"
          }
          className={`w-full mt-4 py-2 px-4 rounded-md border-none flex items-center justify-center gap-2 transition-all duration-200
                      ${
                        !profile.firstName || isLoading
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform hover:scale-105"
                      }`}
          title={
            !profile.firstName ? "Please create a profile to use autofill." : ""
          }
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" aria-hidden="true" />
          ) : (
            <>
              Autofill <FaRocket aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {currentField && (
        <p className="text-gray-500 text-center mt-4 font-medium">
          Autofilling <span className="text-red-600">{currentField}</span>...
        </p>
      )}

      {errorMessage && (
        <p
          className="text-red-500 text-center mt-4 font-medium"
          aria-live="assertive"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Home;
