import React from 'react';

const ProgressHeader = ({ entries = [] }) => {
  const totalDays = entries.length;
  const targetDays = 88;
  const remainingDays = Math.max(0, targetDays - totalDays);
  const progressPercentage = Math.min(100, (totalDays / targetDays) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-900">Progress</h2>
        <span className="text-gray-900 font-medium">{totalDays} / {targetDays} Hari</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div
          className="bg-oz-gold h-4 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500">
        {remainingDays > 0
          ? `Kurang ${remainingDays} hari lagi.`
          : 'Selamat! Anda telah memenuhi syarat 88 hari.'}
      </p>
    </div>
  );
};

export default ProgressHeader;
