import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const ResultsCard = ({ points, isEligible, visaSubclass }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Estimasi Poin Anda:</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl font-bold text-gray-900">
          {points} <span className="text-xl font-normal text-gray-500">Poin</span>
        </div>
      </div>

      <div className={`flex items-start gap-3 p-4 rounded-lg ${
        isEligible ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
      }`}>
        {isEligible ? (
          <CheckCircle className="text-green-600 shrink-0" size={20} />
        ) : (
          <AlertCircle className="text-amber-600 shrink-0" size={20} />
        )}

        <div>
          <p className="font-semibold text-gray-900">
            {isEligible
              ? 'Eligible, tapi butuh strategi'
              : 'Belum memenuhi syarat minimum (65 poin)'}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            {isEligible
              ? `Anda memenuhi syarat minimum 65 poin untuk visa ${visaSubclass}. Namun persaingan saat ini sangat ketat.`
              : `Anda membutuhkan ${65 - points} poin lagi untuk bisa mengajukan EOI visa ${visaSubclass}.`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
