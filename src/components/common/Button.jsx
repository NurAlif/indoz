import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({
  children,
  variant = 'primary', // primary | secondary | outline | ghost | danger
  size = 'md', // sm | md | lg
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-indo-red text-white hover:bg-red-700 focus:ring-indo-red",
    secondary: "bg-oz-gold text-white hover:bg-yellow-600 focus:ring-oz-gold",
    outline: "border-2 border-indo-red text-indo-red hover:bg-indo-red hover:text-white focus:ring-indo-red",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
    danger: "bg-error text-white hover:bg-red-600 focus:ring-error",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
