import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="mb-1.5 block text-sm font-medium text-[#1C2B22]">{label}</label>}
      <input
        {...props}
        className={`w-full rounded-md border px-3.5 py-2 text-sm text-[#1C2B22] outline-none transition-colors focus:border-[#D79A2C] ${
          error ? 'border-red-400' : 'border-[#1C2B22]/15'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
