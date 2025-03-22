import React from "react";
import ActionButton from "../../components/ActionButton";

const ActionButtons = ({
  step,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isSaved,
}) => {
  return (
    <div className={`flex ${step > 1 ? "justify-between" : "justify-end"}`}>
      {step > 1 && (
        <ActionButton
          name="Back"
          onClick={onBack}
          className="bg-gray-300 text-gray-700 hover:bg-gray-400"
        />
      )}

      {step < totalSteps ? (
        <ActionButton
          name="Next"
          onClick={onNext}
          className="bg-blue-800 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <ActionButton
          name={`${isSaved ? "Profile Saved!" : "Save"}`}
          onClick={onSubmit}
          className={`text-white ${
            isSaved ? "bg-green-600" : "bg-red-600 hover:bg-red-700"
          }`}
        />
      )}
    </div>
  );
};

export default ActionButtons;
