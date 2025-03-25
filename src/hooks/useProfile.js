import { useState, useEffect } from "react";
import { initialData } from "../utils/constants/profileFields";

const useProfile = () => {
  const [profile, setProfile] = useState(initialData);
  const [resume, setResume] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["profile", "resume"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving profile:", chrome.runtime.lastError);
        setError("Failed to load profile.");
      } else {
        setProfile(result.profile || null);
        setResume(result.resume || null);
      }
      setLoadingData(false);
    });
  }, []);

  const saveProfile = (newProfile, newResume) => {
    chrome.storage.local.set({ profile: newProfile, resume: newResume }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving profile:", chrome.runtime.lastError);
        setError("Error saving profile. Please try again.");
      } else {
        setProfile(newProfile);
        setResume(newResume);
        setError("");
      }
    });
  };

  const deleteProfile = () => {
    chrome.storage.local.remove(["profile", "resume"], () => {
      if (chrome.runtime.lastError) {
        console.error("Error deleting profile:", chrome.runtime.lastError);
        setError("Error deleting profile. Please try again.");
      } else {
        setProfile(initialData);
        setResume(null);
        setError("");
      }
    });
  };

  return {
    profile,
    resume,
    loadingData,
    error,
    saveProfile,
    deleteProfile,
  };
};

export default useProfile;
