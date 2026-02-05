import React from 'react';
import { AlertTriangle } from 'lucide-react';

const PrivacyNotice = () => {
  return (
    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg px-4 py-3 flex items-start gap-3">
      <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-amber-900">
          ⚠️ PRIVACY NOTICE
        </p>
        <p className="text-xs text-amber-800 mt-1">
          JANGAN share nomor TFN atau Passport Anda dalam percakapan ini.
        </p>
      </div>
    </div>
  );
};

export default PrivacyNotice;
