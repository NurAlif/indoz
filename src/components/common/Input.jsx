import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  className = '',
  ...props
}, ref) => {
  const inputStyles = cn(
    "w-full px-4 py-2 border rounded-lg",
    "focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent",
    "transition-all duration-200",
    "disabled:bg-gray-100 disabled:cursor-not-allowed",
    error ? "border-error" : "border-gray-300",
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={inputStyles}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
