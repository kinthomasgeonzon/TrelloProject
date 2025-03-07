import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorText?: string;
}

const Input: React.FC<InputProps> = ({ label, errorText, ...props }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className={`input ${errorText ? "is-danger" : ""}`} {...props} />
      </div>
      {errorText && <p className="help is-danger">{errorText}</p>}
    </div>
  );
};

export default Input;
