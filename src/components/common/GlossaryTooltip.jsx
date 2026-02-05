import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '../../utils/cn';

const GLOSSARY_TERMS = {
  'WHV': 'Working Holiday Visa - Visa kerja liburan untuk warga usia 18-30 tahun',
  'SDUWHV': 'Subclass 417 Working Holiday Visa - Jenis WHV untuk Indonesia',
  '88 Days': 'Syarat kerja 3 bulan (88 hari) di regional Australia untuk extension visa WHV kedua',
  'PR': 'Permanent Residency - Izin tinggal permanen di Australia',
  'TFN': 'Tax File Number - Nomor pajak wajib untuk bekerja di Australia',
  'IELTS': 'International English Language Testing System - Tes bahasa Inggris yang disyaratkan untuk visa dan PR',
};

const GlossaryTooltip = ({ term, definition: customDefinition, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const definition = customDefinition || GLOSSARY_TERMS[term];

  if (!definition) {
    return <span>{term}</span>;
  }

  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1 cursor-help border-b border-dotted border-gray-400",
        className
      )}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {term}
      <Info size={14} className="text-indo-red" />

      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 w-64 text-sm text-white bg-gray-900 rounded-lg shadow-lg">
          {definition}
          {/* Arrow */}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1" />
        </div>
      )}
    </span>
  );
};

export default GlossaryTooltip;
