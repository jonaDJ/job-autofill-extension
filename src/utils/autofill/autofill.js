import {
  autofillBasic,
  autofillEducation,
  autofillExperience,
} from "./autofillData/autofillData";
import autofillDemographics from "./autofillData/autofillDemographic";
import { autofillResume } from "./autofillResume";

const autofill = async (profile, resume, setErrorMessage, setCurrentField) => {
  try {
    if (!profile && !resume) return;
    await autofillResume(resume, setErrorMessage, setCurrentField);
    await autofillBasic(profile, setErrorMessage, setCurrentField);

    await autofillEducation(
      profile.education,
      setErrorMessage,
      setCurrentField
    );
    for (let i = 0; i < profile.experience.length; i++) {
      await autofillExperience(
        profile.experience[i],
        setErrorMessage,
        setCurrentField
      );
    }

    await autofillDemographics(
      profile.demographics,
      setErrorMessage,
      setCurrentField
    );
  } catch (error) {
    console.log("calling failed", error);
    setErrorMessage("Autofill failed. Please try again.");
  }
};

export default autofill;
