import React from 'react';
import { Check } from 'lucide-react';
import GlossaryTooltip from '../../common/GlossaryTooltip';

const VisaSelector = ({ selected, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Pilih Visa Subclass:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onChange('189')}
          className={`relative p-4 rounded-xl border-2 transition-all text-left ${
            selected === '189'
              ? 'border-indo-red bg-indo-red/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="font-bold text-lg text-gray-900">189</span>
            {selected === '189' && <Check size={20} className="text-indo-red" />}
          </div>
          <div className="text-sm text-gray-600">
             <GlossaryTooltip term="Skilled Independent" definition="Visa permanen tanpa butuh sponsor state/family. Bebas tinggal di mana saja di Australia." />
          </div>
        </button>

        <button
          onClick={() => onChange('190')}
          className={`relative p-4 rounded-xl border-2 transition-all text-left ${
            selected === '190'
              ? 'border-indo-red bg-indo-red/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-1">
            <span className="font-bold text-lg text-gray-900">190</span>
            {selected === '190' && <Check size={20} className="text-indo-red" />}
          </div>
          <div className="text-sm text-gray-600">
            <GlossaryTooltip term="Skilled Nominated" definition="Visa permanen dengan nominasi state. Biasanya wajib tinggal di state tersebut selama 2 tahun pertama." />
          </div>
        </button>
      </div>
    </div>
  );
};

export default VisaSelector;
