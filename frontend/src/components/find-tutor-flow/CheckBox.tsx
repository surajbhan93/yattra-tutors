import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className="mb-2 flex cursor-pointer items-center text-sm text-[#1C2B22]">
      <input type="checkbox" {...props} className="mr-2 accent-[#D79A2C]" />
      {label}
    </label>
  );
};

export default Checkbox;
