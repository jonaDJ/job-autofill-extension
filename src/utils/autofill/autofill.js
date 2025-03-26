import {
  autofillBasic,
  autofillEducation,
  autofillExperience,
} from "./autofillData";
import { autofillResume } from "./autofillResume";

const autofill = async (profile, resume, setErrorMessage) => {
  try {
    if (!profile && !resume) return;
    await autofillResume(resume, setErrorMessage);
    await autofillBasic(profile, setErrorMessage);

    await autofillEducation(profile.education, setErrorMessage);
    await autofillExperience();
  } catch (error) {
    console.log("calling failed", error);
    setErrorMessage("Autofill failed. Please try again.");
  }
};

export default autofill;
