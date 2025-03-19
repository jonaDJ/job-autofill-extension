import React from "react";

const FieldGroup = ({ heading, children, isFile = false }) => {
  return (
    <div className="mb-0">
      <h3 className="text-lg font-semibold text-gray-800">{heading}</h3>
      <div className="border-b border-gray-300 my-0"></div>
      <div
        className={`${
          isFile
            ? "grid grid-cols-1 gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 gap-4"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  children,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-md font-medium text-gray-800">
        {label}
      </label>
      {children ? (
        children
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-0.5 text-gray-700 bg-gray-50 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm px-2 py-3"
        />
      )}
    </div>
  );
};

export { FieldGroup, FormField };
