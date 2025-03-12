console.log("Content script loaded");

async function autofillData() {
  try {
    const result = await new Promise((resolve, reject) => {
      chrome.storage.local.get(["profile"], (res) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(res);
        }
      });
    });

    if (result.profile) {
      const { firstName, lastName, phoneNumber } = result.profile;

      const fieldMappings = [
        {
          selector:
            'input[name="job_application[first_name]"], input#first_name',
          value: firstName,
        },
        {
          selector: 'input[name="job_application[last_name]"], input#last_name',
          value: lastName,
        },
        {
          selector: 'input[name="job_application[phone]"], input#phone',
          value: phoneNumber,
        },
      ];

      fieldMappings.forEach(({ selector, value }) => {
        const input = document.querySelector(selector);
        if (input && value) {
          input.value = value;
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });
    } else {
      console.log("Profile data not found in storage.");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "autofill") {
    autofillData();
  }
});
