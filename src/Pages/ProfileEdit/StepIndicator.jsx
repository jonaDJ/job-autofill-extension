import React from "react";

const StepIndicator = ({ totalSteps, currentStep, onStepChange }) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalSteps }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onStepChange(i + 1)}
          className={`w-3 h-3 rounded-full transition-colors ${
            currentStep === i + 1 ? "bg-red-600" : "bg-gray-300"
          }`}
          aria-label={`Go to step ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
