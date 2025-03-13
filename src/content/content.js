import { fieldMappings } from "./fieldsMapping.js";

console.log("Content script loaded");

async function autofillData() {
  try {
    const result = await new Promise((resolve, reject) => {
      chrome.storage.local.get(["profile"], (res) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(res);
        }
      });
    });

    if (result?.profile) {
      fieldMappings.forEach(({ selectors, valueKey }) => {
        const value = result.profile[valueKey];
        if (!value) return;

        selectors.forEach((selector) => {
          const input = document.querySelector(selector);

          // Skip if no element is found
          if (!input || (input && input.type === "hidden")) return;

          console.log(
            input,
            input.tagName,
            input.type,
            input.hasAttribute("aria-autocomplete")
          );

          input.value = value;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));

          //If you find auto-complete
          if (input.hasAttribute("aria-autocomplete")) {
            console.log("Autocomplete detected");
            observeAutocomplete(input);
          }
        });
      });
    } else {
      console.log("Profile data not found in storage.");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
}

function observeAutocomplete() {
  const listbox = document.querySelector("ul[role='listbox']");
  const observer = new MutationObserver(() => {
    const firstOption = listbox.querySelector("li[role='option']");
    if (firstOption) {
      firstOption.click();
      observer.disconnect(); // Stop observing once clicked
    }
  });

  // Observe near the listbox (not the whole body)
  observer.observe(listbox, {
    childList: true,
    subtree: true,
  });
}
// Listen for messages from popup
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "autofill") {
    autofillData();
  }
});
