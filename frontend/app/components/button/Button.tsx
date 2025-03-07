import styles from "@styles/button.module.css";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button className={styles.button} disabled={loading} {...props}>
      {loading ? <span className={styles.spinner}></span> : null}
      {children}
    </button>
  );
};

export default Button;
