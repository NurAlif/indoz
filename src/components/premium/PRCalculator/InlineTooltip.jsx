import React, { useState } from 'react';
import { Info } from 'lucide-react';

const InlineTooltip = ({ term, definition }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-flex items-center gap-1 cursor-help border-b border-dotted border-gray-400"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)} // For mobile touch
    >
      {term}
      <Info size={14} className="text-indo-red" />
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 w-64 text-sm text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none">
          {definition}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </span>
  );
};

export default InlineTooltip;
