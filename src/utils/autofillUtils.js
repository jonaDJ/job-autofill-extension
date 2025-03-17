import { fieldMappings } from "./fieldsMapping";

const autofillData = async (profile, setErrorMessage) => {
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

async function observeAutocomplete(input) {
  console.log("in", input); //TODO: we may need input in the future
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

export { autofillData };
