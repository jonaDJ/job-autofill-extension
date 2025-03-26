import {
  delay,
  findBestParentToHighlight,
  fillAndHighlightField,
  findElementByShadowPath,
} from "./helper";
import { fieldEducationMappings, fieldMappings } from "./fieldsMapping";

const autofillBasic = async (profile, setErrorMessage) => {
  try {
    if (!profile) return;

    for (const { selectors, valueKey, valueResolver } of fieldMappings) {
      const value = valueResolver ? valueResolver(profile) : profile[valueKey];
      if (!value) continue;

      let input;
      for (const selector of selectors) {
        try {
          if (typeof selector === "object" && selector.shadowPath) {
            input = findElementByShadowPath(selector.shadowPath);
          } else {
            input = document.querySelector(selector);
          }

          if (!input || input.type === "hidden") continue;

          if (input.hasAttribute?.("aria-autocomplete")) {
            await fillAndHighlightField(
              input,
              value,
              findBestParentToHighlight(input)
            );
          } else {
            await fillAndHighlightField(input, value, input);
          }

          break;
        } catch (error) {
          console.warn(`Error with selector ${selector}:`, error);
          continue;
        }
      }
    }
  } catch (error) {
    console.error("Basic info autofill failed:", error);
    setErrorMessage?.("Basic information autofill failed. Please try again.");
  }
};

const autofillEducation = async (educationData, setErrorMessage) => {
  try {
    if (!educationData) return;

    const addEducationButton = document.querySelector(
      'button[data-ui="add-section"][aria-label="Add Education"]'
    );
    if (addEducationButton) {
      addEducationButton.click();
      await delay(500);
    }

    for (const { selectors, valueKey } of fieldEducationMappings) {
      const value = educationData[valueKey];
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
