import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

const PasteArea = ({ value = '', onChange = () => {}, onFillSample = () => {} }) => {
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const text = e.target.value;
    onChange(text);
    setWordCount(text.trim().split(/\s+/).filter(w => w.length > 0).length);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="text-gray-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">
            Paste Resume Text
          </h3>
        </div>

        <button
          onClick={onFillSample}
          className="text-sm text-indo-red hover:text-red-700 font-medium transition-colors"
        >
          Isi Contoh Resume
        </button>
      </div>

      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Paste resume content here..."
        rows={15}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent resize-none font-mono text-sm"
      />

      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <span>{wordCount} kata</span>
        <span>Minimal 200 kata untuk hasil terbaik</span>
      </div>
    </div>
  );
};

export default PasteArea;
