import React from 'react';
import { User } from 'lucide-react';

const AIProfile = ({ isCompact = false }) => {
  return (
    <div className={isCompact ? "flex items-center gap-3 mb-6" : "flex flex-col items-center mb-6 text-center"}>
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-indo-red to-red-600 rounded-full flex items-center justify-center">
          <User size={32} className="text-white" />
        </div>
        {/* Online indicator */}
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-white" />
      </div>

      <div className={isCompact ? "text-left" : ""}>
        <h3 className="font-semibold text-gray-900">Ollie</h3>
        <p className="text-sm text-gray-600">5 year survivor in Aussie</p>
      </div>
    </div>
  );
};

export default AIProfile;
