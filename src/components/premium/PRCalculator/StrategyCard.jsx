import React from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';

const StrategyCard = ({ strategies, challenges }) => {
  return (
    <div className="space-y-6">
      {/* Strategies */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-oz-gold" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">Strategi & Langkah Selanjutnya</h3>
        </div>

        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          {strategies.length > 0 ? (
            strategies.map((strategy, index) => (
              <li key={index} className="pl-1 marker:font-bold marker:text-gray-500">{strategy}</li>
            ))
          ) : (
            <li className="list-none text-gray-500 italic">Tidak ada rekomendasi spesifik saat ini.</li>
          )}
        </ol>
      </div>

      {/* Challenges */}
      {challenges.length > 0 && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-amber-500" size={20} />
            <h3 className="font-semibold text-gray-900">Tantangan</h3>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {challenges.map((challenge, index) => (
              <li key={index} className="pl-1">{challenge}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StrategyCard;
