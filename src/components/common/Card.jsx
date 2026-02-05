import React from 'react';
import { cn } from '../../utils/cn';

const Card = React.forwardRef(({
  children,
  className = '',
  variant = 'default', // default | elevated | bordered
  ...props
}, ref) => {
  const variants = {
    default: "bg-white",
    elevated: "bg-white shadow-md",
    bordered: "bg-white border border-gray-200",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl p-6",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
