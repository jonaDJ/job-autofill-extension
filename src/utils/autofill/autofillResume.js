import {
  addHighlight,
  delay,
  findElementByShadowPath,
  removeHighlight,
} from "./helper";

const convertbase64ToFile = (resumeData) => {
  const byteCharacters = atob(resumeData.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "application/pdf" });
  return new File([blob], "resume.pdf", { type: "application/pdf" });
};

const RESUME_SELECTORS = [
  'input[data-ui="resume"]',
  'input[type="file"]',
  'button[data-source="attach"]',
  {
    shadowPath: [
      'spl-dropzone[data-test="apply-with-resume-container"]',
      "input",
    ],
  },
];

const uploadFileToInput = async (inputElement, file) => {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  inputElement.files = dataTransfer.files;
  inputElement.dispatchEvent(new Event("change", { bubbles: true }));
};

const autofillResume = async (resumeData, setErrorMessage) => {
  try {
    if (!resumeData) return;

    const file = convertbase64ToFile(resumeData);
    let uploadSuccessful = false;

    for (const selector of RESUME_SELECTORS) {
      try {
        let element =
          typeof selector === "object"
            ? findElementByShadowPath(selector.shadowPath)
            : document.querySelector(selector);

        if (!element) continue;

        await addHighlight(element);

        await uploadFileToInput(element, file);
        await delay(1000);
        uploadSuccessful = true;

        removeHighlight(element);

        if (uploadSuccessful) {
          return;
        }
      } catch (error) {
        console.error(`Error with selector ${selector}:`, error);
        continue;
      }
    }

    if (!uploadSuccessful) {
      setErrorMessage("Resume upload failed. No suitable upload method found.");
    }
  } catch (error) {
    console.log("Error uploading resume:", error);
    setErrorMessage("Resume upload failed. Please try again.");
  }
};

export { autofillResume };
