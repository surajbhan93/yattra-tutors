import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  disabled,
  className,
  ...props
}) => {
  const baseStyle = 'px-5 py-2.5 rounded-md text-sm font-semibold transition-colors duration-200';

  const variantStyle =
    variant === 'primary'
      ? 'bg-[#D79A2C] text-[#17261D] hover:bg-[#c4891f]'
      : 'border border-[#1C2B22]/15 text-[#1C2B22] hover:border-[#D79A2C]/50';

  const disabledStyle = 'opacity-60 cursor-not-allowed';

  return (
    <button
      className={`
        ${baseStyle}
        ${variantStyle}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? disabledStyle : ''}
        ${className || ''}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
};

export default Button;
