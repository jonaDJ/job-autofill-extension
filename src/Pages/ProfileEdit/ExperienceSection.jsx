import React from "react";
import { experienceData } from "../../utils/profileFields";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FormField } from "../../components/Fields";
const ExperienceSection = ({
  experience,
  setProfile,
  fields,
  errors,
  handleChange,
}) => {
  const addExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...experienceData }],
    }));
  };

  const deleteExperience = (index) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };
  return (
    <>
      {experience.map((exp, expIndex) => (
        <div key={expIndex} className="mb-6">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-semibold text-gray-800">
              Experience {expIndex + 1}
            </h4>
            <button
              type="button"
              onClick={() => deleteExperience(expIndex)}
              className="px-2 text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={`Delete Experience ${expIndex + 1}`}
            >
              <FaTrash />
            </button>
          </div>
          <div className="border-b border-1 border-red-700 mb-2 mt-1"></div>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <FormField
                key={field.id}
                label={field.label}
                id={field.id}
                value={exp[field.id]}
                onChange={(e) => handleChange(e, expIndex)}
                error={errors[field.id]}
                type={field.type}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        className="flex items-center justify-center w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <FaPlus className="mr-2" />
        Add Experience
      </button>
    </>
  );
};

export default ExperienceSection;
