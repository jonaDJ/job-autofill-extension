import React, { useState, useEffect } from "react";
import { ProfileContext } from "./ProfileContext";
import { initialData } from "../utils/profileFields";

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(initialData);
  const [resume, setResume] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["profile", "resume"], (result) => {
      if (chrome.runtime.lastError) {
        console.error("Error retrieving profile:", chrome.runtime.lastError);
        setErrorMessage("Failed to load profile.");
      } else {
        if (result.profile) setProfile(result.profile);
        if (result.resume) setResume(result.resume);
      }
    });
  }, []);

  const saveProfile = (newProfile, newResume) => {
    chrome.storage.local.set({ profile: newProfile, resume: newResume }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving profile:", chrome.runtime.lastError);
        setErrorMessage("Error saving profile. Please try again.");
      } else {
        setProfile(newProfile);
        setResume(newResume);
        setErrorMessage("");
      }
    });
  };

  const deleteProfile = () => {
    chrome.storage.local.remove(["profile", "resume"], () => {
      if (chrome.runtime.lastError) {
        console.error("Error deleting profile:", chrome.runtime.lastError);
        setErrorMessage("Error deleting profile. Please try again.");
      } else {
        setProfile(initialData);
        setResume(null);
        setErrorMessage("");
      }
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        resume,
        errorMessage,
        saveProfile,
        deleteProfile,
        setProfile,
        setResume,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
