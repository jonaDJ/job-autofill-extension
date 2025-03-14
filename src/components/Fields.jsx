import React from "react";

const FieldGroup = ({ heading, children }) => {
  return (
    <div className="field-group">
      <h3 className="field-group-heading">{heading}</h3>
      <div className="separator"></div>
      <div className="field-group-content">{children}</div>
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
    <div className="form-field">
      <label htmlFor={id} className="form-label">
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
          className="form-input"
        />
      )}
    </div>
  );
};

export { FieldGroup, FormField };
