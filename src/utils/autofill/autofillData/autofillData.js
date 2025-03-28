import {
  fillAndHighlightField,
  fillAndHighlightAutocompleteField,
  findElementByShadowPath,
  clickButton,
} from "../helper";
import {
  basicInfoSelectors,
  educationSelectors,
  experienceSelectors,
} from "../fieldsMapping";

const autofillBasic = async (profile, setErrorMessage, setCurrentField) => {
  try {
    if (!profile) return;

    for (const { selectors, valueKey, valueResolver } of basicInfoSelectors) {
      setCurrentField?.(valueKey);
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

          await fillAndHighlightField(input, value, input);

          if (input.hasAttribute?.("aria-autocomplete")) {
            fillAndHighlightAutocompleteField(input);
          }

          break;
        } catch (error) {
          console.warn(`Error with selector ${selector}:`, error);
          continue;
        }
      }
    }
    setCurrentField("");
  } catch (error) {
    console.log("Error during basic information autofill:", error);
    setErrorMessage?.("Basic information autofill failed. Please try again.");
    setCurrentField("");
  }
};

const autofillEducation = async (
  educationData,
  setErrorMessage,
  setCurrentField
) => {
  try {
    if (!educationData) return;

    await clickButton(
      'button[data-ui="add-section"][aria-label="Add Education"]'
    );

    for (const { selectors, valueKey } of educationSelectors) {
      const value = educationData[valueKey];
      if (!value) continue;
      setCurrentField?.(valueKey);
      let input;
      for (const selector of selectors) {
        input = document.querySelector(selector);
        if (input) break;
      }

      if (!input) continue;

      await fillAndHighlightField(input, value);
    }
    await clickButton('button[data-ui="save-section"]');
    setCurrentField("");
  } catch (error) {
    console.log("Error during education autofill:", error);
    setErrorMessage("Education autofill failed. Please try again.");
    setCurrentField("");
  }
};

const autofillExperience = async (
  experienceData,
  setErrorMessage,
  setCurrentField
) => {
  try {
    if (!experienceData) return;

    await clickButton(
      'button[data-ui="add-section"][aria-label="Add Experience"]'
    );

    for (const { selectors, valueKey } of experienceSelectors) {
      const value = experienceData[valueKey];
      if (!value) continue;
      setCurrentField?.(valueKey);
      let input;
      for (const selector of selectors) {
        input = document.querySelector(selector);
        if (input) break;
      }

      if (!input) continue;

      await fillAndHighlightField(input, value);
    }

    await clickButton('button[data-ui="save-section"]');
    setCurrentField("");
  } catch (error) {
    console.log("Error during experience autofill:", error);
    setErrorMessage("Experience autofill failed. Please try again.");
    setCurrentField("");
  }
};

export { autofillBasic, autofillEducation, autofillExperience };
