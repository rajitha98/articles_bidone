import React, { SelectHTMLAttributes } from 'react';
import './Dropdown.css';

type DropdownProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: { value: string; label: string }[];
};

const Dropdown = ({ label, options, ...props }: DropdownProps) => (
  <label className="dropdown-wrapper">
    {label && <span>{label}</span>}
    <select className="dropdown" {...props}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </label>
);

export default Dropdown;