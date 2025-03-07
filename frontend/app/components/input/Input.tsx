import styles from "@styles/signup.module.css";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorText, ...props }, ref) => {
    return (
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        <div className={styles.control}>
          <input 
            ref={ref} 
            className={`${styles.input} ${errorText ? styles.danger : ""}`} 
            {...props} 
          />
        </div>
        {errorText && <p className={styles.help}>{errorText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input"; 

export default Input;
