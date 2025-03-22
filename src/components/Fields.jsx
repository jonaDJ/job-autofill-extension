import React from "react";

const FieldGroup = ({ heading, children, isSingleRow }) => {
  return (
    <div className="mb-6">
      {!isSingleRow && (
        <>
          <h3 className="text-lg font-semibold text-gray-800">{heading}</h3>
          <div className="border-b border-1 border-red-700 my-2"></div>
        </>
      )}
      <div
        className={`${
          isSingleRow
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
  error,
  children,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-md font-medium text-gray-700">
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
          className={`mt-1 block w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2`}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export { FieldGroup, FormField };
