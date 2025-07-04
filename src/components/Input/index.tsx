import React, { ReactNode } from "react";
import "./style.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: string;
  iconPosition?: "left" | "right";
};

const Input = ({ icon, iconPosition = "left", ...props }: InputProps) => {
  return (
    <div className={`input-container ${iconPosition}`}>
      {icon && iconPosition === "left" && <img className="icon" src={icon} alt="icon" />}
      <input className="input-field" {...props} />
      {icon && iconPosition === "right" && <img className="icon" src={icon} alt="icon" />}
    </div>
  );
};

export default Input;
