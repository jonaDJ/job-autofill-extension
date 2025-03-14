import React, { useEffect, useState } from "react";
import { fieldMappings } from "../utils/fieldsMapping";

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

  // const handleAutoClick = () => {
  //   if (!profile) return;
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     if (!tabs[0]?.id) return;
  //     chrome.tabs.sendMessage(
  //       tabs[0].id,
  //       { action: "autofill" },
  //       (response) => {
  //         if (chrome.runtime.lastError) {
  //           console.error("Error sending message:", chrome.runtime.lastError);
  //           setErrorMessage("Autofill failed. Please try again.");
  //         } else if (response && response.success) {
  //           setErrorMessage("Autofill successful!");
  //           setTimeout(() => setErrorMessage(""), 3000);
  //         } else {
  //           setErrorMessage("Autofill failed. Please try again.");
  //         }
  //       }
  //     );
  //   });
  // };

  const autofillData = async () => {
    try {
      if (!profile) {
        console.log("Profile data not found.");
        return;
      }

      fieldMappings.forEach(({ selectors, valueKey }) => {
        const value = profile[valueKey];
        if (!value) return;

        selectors.forEach((selector) => {
          const input = document.querySelector(selector);

          if (!input || (input && input.type === "hidden")) return;

          input.value = value;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));

          if (input.hasAttribute("aria-autocomplete")) {
            observeAutocomplete(input);
          }
        });
      });
      setErrorMessage("Autofill successful!");
      setTimeout(() => setErrorMessage(""), 3000);
    } catch (error) {
      console.error("Error during autofill:", error);
      setErrorMessage("Autofill failed. Please try again.");
    }
  };

  function observeAutocomplete(input) {
    console.log("in", input);
    const listbox = document.querySelector("ul[role='listbox']");
    if (!listbox) return; // Exit if no listbox is found

    const observer = new MutationObserver(() => {
      const firstOption = listbox.querySelector("li[role='option']");
      if (firstOption) {
        firstOption.click();
        observer.disconnect();
      }
    });

    observer.observe(listbox, {
      childList: true,
      subtree: true,
    });
  }

  const handleAutoClick = () => {
    console.log("auto clicked");
    autofillData();
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

      <button onClick={handleAutoClick} className="home-button">
        Autofill
      </button>
      {errorMessage && <p className="success-message">{errorMessage}</p>}
    </div>
  );
};

export default Home;
