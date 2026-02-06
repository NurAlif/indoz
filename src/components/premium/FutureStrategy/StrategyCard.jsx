import React from 'react';

const StrategyCard = ({ strategy }) => (
  <div className="bg-white border-2 border-gray-200 hover:border-indo-red rounded-xl p-6 transition-all">
    {/* Header */}
    <div className="flex items-start gap-4 mb-4">
      <span className="text-4xl">{strategy.icon}</span>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900">{strategy.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{strategy.subtitle}</p>
      </div>
    </div>

    {/* Details */}
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase">Durasi</p>
          <p className="font-medium text-gray-900">{strategy.details.duration}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Biaya</p>
          <p className="font-medium text-gray-900">{strategy.details.cost}</p>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase mb-1">Jalur PR</p>
        <p className="text-sm text-gray-700">{strategy.details.prPathway}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-success/5 rounded-lg p-3">
          <p className="text-xs font-semibold text-success mb-2">Kelebihan</p>
          <ul className="space-y-1">
            {strategy.details.pros.map((pro, i) => (
              <li key={i} className="text-xs text-gray-700">✓ {pro}</li>
            ))}
          </ul>
        </div>

        <div className="bg-error/5 rounded-lg p-3">
          <p className="text-xs font-semibold text-error mb-2">Kekurangan</p>
          <ul className="space-y-1">
            {strategy.details.cons.map((con, i) => (
              <li key={i} className="text-xs text-gray-700">✗ {con}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* CTA */}
    <button className="mt-4 w-full py-2 bg-indo-red text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
      Pelajari Lebih Lanjut
    </button>
  </div>
);

export default StrategyCard;
