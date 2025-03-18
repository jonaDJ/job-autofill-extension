import { fieldMappings } from "./fieldsMapping";

const autofillData = async (profile, setErrorMessage) => {
  try {
    if (!profile) return;

    for (const { selectors, valueKey } of fieldMappings) {
      const value = profile[valueKey];
      if (!value) continue;

      for (const selector of selectors) {
        const input = document.querySelector(selector);

        if (!input || (input && input.type === "hidden")) continue;

        input.style.border = "2px solid red";
        input.scrollIntoView({ behavior: "smooth", block: "center" });

        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay of 500ms

        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));

        input.style.border = "";

        if (input.hasAttribute("aria-autocomplete")) {
          await observeAutocomplete();
        }
      }
    }
    setErrorMessage("Autofill successful!");
    setTimeout(() => setErrorMessage(""), 3000);
  } catch (error) {
    console.error("Error during autofill:", error);
    setErrorMessage("Autofill failed. Please try again.");
  }
};

async function observeAutocomplete() {
  return new Promise((resolve) => {
    const listbox = document.querySelector("ul[role='listbox']");
    if (!listbox) return resolve();

    const observer = new MutationObserver(() => {
      const firstOption = listbox.querySelector("li[role='option']");
      if (firstOption) {
        firstOption.click();
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(listbox, {
      childList: true,
      subtree: true,
    });
  });
}

export { autofillData };
