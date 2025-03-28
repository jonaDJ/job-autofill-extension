const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const addHighlight = async (element) => {
  if (!element) return;
  element.style.border = "2px solid red";
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  await delay(500);
};

const removeHighlight = async (element) => {
  if (!element) return;
  element.style.border = "";
};

const inputFill = (element, value) => {
  if (!element || !value) return;
  element.value = value;
  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
};

const fillAndHighlightField = async (input, value, styledInput = input) => {
  if (!input || !value) return;
  if (input.shadowRoot) {
    input = input.shadowRoot.querySelector("input");
    styledInput = input;
  }

  await addHighlight(styledInput);
  inputFill(input, value);
  removeHighlight(styledInput);
};

const clickOption = async (option) => {
  await addHighlight(option);
  option.click();
  await removeHighlight(option);
};

const fillAndHighlightAutocompleteField = async (input) => {
  await delay(500);
  if (!input) return;
  const autocompleteOptions = input.nextElementSibling;
  if (autocompleteOptions) {
    const firstOption = autocompleteOptions.querySelector("li[role='option']");
    if (firstOption) {
      await clickOption(firstOption);
    }
  }
};

const findElementByShadowPath = (shadowPath) => {
  let element = document;
  for (const path of shadowPath) {
    element = element.querySelector(path);
    if (!element) return null;
    if (element.shadowRoot) element = element.shadowRoot;
  }
  return element;
};

const clickButton = async (selector) => {
  const button = document.querySelector(selector);
  if (button) {
    button.click();
    await delay(500);
  }
};

export {
  addHighlight,
  removeHighlight,
  inputFill,
  delay,
  fillAndHighlightField,
  fillAndHighlightAutocompleteField,
  findElementByShadowPath,
  clickButton,
  clickOption,
};
