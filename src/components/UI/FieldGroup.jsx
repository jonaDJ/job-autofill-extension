import React from "react";

const FieldGroup = ({ heading, children }) => {
  return (
    <div className="pb-7">
      <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
      <div className="h-[2px] w-full bg-gray-300"></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2">
        {children}
      </div>
    </div>
  );
};

export default FieldGroup;
