import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-luxury-600 text-white hover:bg-luxury-700 focus:ring-luxury-500',
    secondary: 'bg-white text-luxury-700 border-2 border-luxury-600 hover:bg-luxury-50 focus:ring-luxury-500',
    outline: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400',
    ghost: 'bg-transparent text-luxury-600 hover:bg-luxury-50 focus:ring-luxury-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
