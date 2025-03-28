import React from "react";

const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  children,
  rows,
  options,
  required = false,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-md font-medium text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children ? (
        children
      ) : type === "textarea" ? (
        <textarea
          id={id}
          required={required}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`mt-1 custom-scrollbar block w-[204%] border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2`}
        />
      ) : type === "select" ? (
        <select
          id={id}
          required={required}
          value={value || ""}
          onChange={onChange}
          className={`mt-1 block w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          required={required}
          id={id}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          className={`mt-1 block w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2`}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export { FormField };
