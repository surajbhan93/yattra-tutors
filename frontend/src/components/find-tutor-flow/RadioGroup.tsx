import React from 'react';

interface RadioGroupOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioGroupOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div>
      {options.map((option) => (
        <label key={option.value} className="mb-2 flex cursor-pointer items-center text-sm text-[#1C2B22]">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="mr-2 accent-[#D79A2C]"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
