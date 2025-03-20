import { fieldMappings } from "./fieldsMapping";

const autofillData = async (profile, setErrorMessage) => {
  try {
    if (!profile) return;

    for (const { selectors, valueKey, valueResolver } of fieldMappings) {
      let value;

      if (valueResolver) {
        value = valueResolver(profile);
      } else {
        value = profile[valueKey];
      }

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

      element.style.border = "2px solid red";
      element.scrollIntoView({ behavior: "smooth", block: "center" });

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (method === "buttonClick") {
        console.log("buttonClick");
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
      setErrorMessage("Resume uploaded successfully");
      setTimeout(() => setErrorMessage(""), 3000);
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
    console.error("Error uploading resume:", error);
    setErrorMessage("Resume upload failed. Please try again.");
  }
};

export { autofillData, autofillResume };
