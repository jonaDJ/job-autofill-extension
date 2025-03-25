const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const addHighlight = async (element) => {
  if (!element) return;
  element.style.border = "2px solid red";
  element.scrollIntoView({ behavior: "smooth", block: "center" });
  await delay(500);
};

const removeHighlight = (element) => {
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

const findBestParentToHighlight = (input) => {
  return input.parentElement?.parentElement || input.parentElement || input;
};

export {
  addHighlight,
  removeHighlight,
  inputFill,
  delay,
  findBestParentToHighlight,
  fillAndHighlightField,
};
