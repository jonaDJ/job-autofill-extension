import React from "react";

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
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-800">
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
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        />
      )}
    </div>
  );
};

export default FormField;
