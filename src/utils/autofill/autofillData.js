import {
  delay,
  findBestParentToHighlight,
  fillAndHighlightField,
} from "./helper";
import { fieldEducationMappings, fieldMappings } from "./fieldsMapping";

const autofillBasic = async (profile, setErrorMessage) => {
  try {
    if (!profile) return;
    for (const { selectors, valueKey, valueResolver } of fieldMappings) {
      const value = valueResolver ? valueResolver(profile) : profile[valueKey];
      if (!value) continue;

      for (const selector of selectors) {
        const input = document.querySelector(selector);
        if (!input || (input && input.type === "hidden")) continue;

        if (input.hasAttribute("aria-autocomplete")) {
          await fillAndHighlightField(
            input,
            value,
            findBestParentToHighlight(input)
          );
        } else {
          await fillAndHighlightField(input, value, input);
        }
      }
    }
  } catch (error) {
    console.error("Basic info autofill failed:", error);
    setErrorMessage?.("Basic information autofill failed. Please try again.");
    throw error;
  }
};

const autofillEducation = async (data, setErrorMessage) => {
  try {
    if (!data) return;

    const addEducationButton = document.querySelector(
      'button[data-ui="add-section"][aria-label="Add Education"]'
    );
    if (addEducationButton) {
      addEducationButton.click();
      await delay(500);
    }

    for (const { selectors, valueKey } of fieldEducationMappings) {
      const value = data[valueKey];
      if (!value) continue;
      let input;
      for (const selector of selectors) {
        input = document.querySelector(selector);
        if (input) break;
      }

      if (!input) continue;

      await fillAndHighlightField(input, value);
    }

    const updateButton = document.querySelector(
      'button[data-ui="save-section"]'
    );
    if (updateButton) {
      updateButton.click();
      await delay(500);
    }
  } catch (error) {
    console.log("Error during education autofill:", error);
    setErrorMessage("Education autofill failed. Please try again.");
  }
};

const autofillExperience = async () => {
  return; //we will right logic later
};

export { autofillBasic, autofillEducation, autofillExperience };
