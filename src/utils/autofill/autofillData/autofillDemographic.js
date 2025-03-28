import { addHighlight, clickOption, delay, removeHighlight } from "../helper";

export const demographicValues = {
  gender: {
    male: ["male"],
    female: ["female"],
    "non-binary": ["non binary"],
    "prefer-not-to-say": ["I don't wish to answer", "decline to self identify"],
  },
  isHispanicLatino: {
    yes: ["yes"],
    no: ["no"],
    "prefer-not-to-say": ["I don't wish to answer", "decline to self identify"],
  },
  veteranStatus: {
    veteran: [
      "veteran",
      "i identify as one or more of the classifications of a protected veteran",
    ],
    "not-veteran": ["not a veteran", "i am not a protected veteran"],
    "prefer-not-to-say": ["I don't wish to answer", "decline"],
  },
  race: {
    white: ["white", "caucasian"],
    black: ["black", "african american", "african-american"],
    asian: ["asian", "asian american", "asian-american"],
    native: [
      "native american",
      "alaska native",
      "american indian",
      "native american/alaska native",
    ],
    pacific: [
      "pacific islander",
      "native hawaiian",
      "native hawaiian or pacific islander",
    ],
    other: ["other", "two or more races", "multiracial", "mixed race"],
    "prefer-not-to-say": [
      "I don't wish to answer",
      "decline to self identify",
      "prefer not to say",
    ],
  },
  disabilityStatus: {
    yes: ["yes", "yes, i have a disability, or have had one in the past"],
    no: [
      "no",
      "no, i do not have a disability and have not had one in the past",
    ],
    "prefer-not-to-say": ["I do not want to answer"],
  },
};

const demographicsSelectors = [
  {
    valueKey: "gender",
    selectors: [
      {
        type: "dropdown",
        label: "label[id='gender-label']",
      },
    ],
  },
  {
    valueKey: "isHispanicLatino",
    selectors: [
      {
        type: "dropdown",
        label: "label[id='hispanic_ethnicity-label']",
      },
    ],
  },
  {
    valueKey: "veteranStatus",
    selectors: [
      {
        type: "dropdown",
        label: "label[id='veteran_status-label']",
      },
    ],
  },
  {
    valueKey: "race",
    selectors: [
      {
        type: "dropdown",
        label: "label[id='race-label']",
      },
    ],
  },
  {
    valueKey: "disabilityStatus",
    selectors: [
      {
        type: "dropdown",
        label: "label[id='disability_status-label']",
      },
    ],
  },
];

const autofillDemographics = async (
  demographicsData,
  setErrorMessage,
  setCurrentField
) => {
  try {
    if (!demographicsData?.veteranStatus) return;

    for (let i = 0; i < demographicsSelectors.length; i++) {
      const { valueKey, selectors } = demographicsSelectors[i];
      let selectVal = demographicsData[valueKey];

      if (!selectVal) continue;
      let values = demographicValues[valueKey][selectVal];

      for (let j = 0; j < selectors.length; j++) {
        const { type, label } = selectors[j];

        if (type === "dropdown") {
          const genderToggleButton = document
            .querySelector(label)
            .closest(".select")
            .querySelector('button[aria-label="Toggle flyout"]');

          if (!genderToggleButton) {
            return;
          }

          setCurrentField?.(valueKey);

          await addHighlight(genderToggleButton);
          const event = new MouseEvent("mouseup", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          await removeHighlight(genderToggleButton);

          genderToggleButton.dispatchEvent(event);
          await delay(500);
          const options = document.querySelectorAll(".select__option");

          for (const option of options) {
            const optionText = option.textContent.toLowerCase();

            for (const value of values) {
              if (optionText === value) {
                await clickOption(option);
                setCurrentField("");
                break;
              }
            }
          }
          setCurrentField("");
        }
      }
    }
  } catch (error) {
    console.log("Error at Demographics autofill", error);
    setErrorMessage(error);
    setCurrentField("");
  }
};

export default autofillDemographics;
