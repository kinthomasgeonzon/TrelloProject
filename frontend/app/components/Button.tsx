import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  return (
    <button className="button" disabled={loading} {...props}>
      {loading ? "Processing..." : children}
    </button>
  );
};

export default Button;
