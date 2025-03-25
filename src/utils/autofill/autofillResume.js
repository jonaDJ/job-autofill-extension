import { addHighlight } from "./helper";

const autofillResume = async (resumeData, setErrorMessage) => {
  try {
    if (!resumeData) return;

    const uploadMethods = [
      {
        selectors: ['input[data-ui="resume"]'],
        method: "directInput",
      },
      {
        selectors: ['button[data-source="attach"]', 'input[type="file"]'],
        method: "buttonClick",
      },
    ];

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
    const file = new File([blob], "resume.pdf", { type: "application/pdf" });

    const uploadFileToInput = (inputElement, fileToUpload) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(fileToUpload);
      inputElement.files = dataTransfer.files;
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));
    };

    const uploadFile = async (selector, method) => {
      const element = document.querySelector(selector);

      if (!element) {
        return false;
      }

      addHighlight(element);

      if (method === "buttonClick") {
        const fileInput = document.querySelector('input[type="file"]');
        if (!fileInput) {
          return false;
        }
        uploadFileToInput(fileInput, file);
      } else if (method === "directInput") {
        if (element.getAttribute("data-ui") !== "resume") {
          return false;
        }
        uploadFileToInput(element, file);
      }

      element.style.border = "";
      return true;
    };

    for (const uploadMethod of uploadMethods) {
      for (const selector of uploadMethod.selectors) {
        if (await uploadFile(selector, uploadMethod.method)) {
          return;
        }
      }
    }

    setErrorMessage("Resume upload failed. No suitable upload method found.");
  } catch (error) {
    console.log("Error uploading resume:", error);
    setErrorMessage("Resume upload failed. Please try again.");
  }
};

export { autofillResume };
