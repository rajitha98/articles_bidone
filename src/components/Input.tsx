import React, { InputHTMLAttributes } from 'react';
import './Input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = ({ label, ...props }: InputProps) => (
  <label className="input-wrapper">
    {label && <span>{label}</span>}
    <input className="input" {...props} />
  </label>
);

export default Input;