import React from "react";

const FieldGroup = ({ heading, children, isFile = false }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{heading}</h3>
      <div className="border-b border-gray-200 mb-4"></div>
      <div
        className={`${
          isFile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-4"
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
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
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
          className="mt-1 bg-gray-50 block w-full border border-gray-500 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-2"
        />
      )}
    </div>
  );
};

export { FieldGroup, FormField };
