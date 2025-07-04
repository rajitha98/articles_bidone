import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const Button = ({ label, ...props }: ButtonProps) => (
  <button className="button" {...props}>{label}</button>
);

export default Button;