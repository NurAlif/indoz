import { useState } from 'react';
import { cn } from '../../utils/cn';

const PasteArea = ({ value = '', onChange = () => {}, onFillSample = () => {}, hasUploadedFile = false }) => {
  const [charCount, setCharCount] = useState(value.length);

  const handleChange = (e) => {
    const text = e.target.value;
    onChange(text);
    setCharCount(text.length);
  };

  const isLowCount = charCount > 0 && charCount < 200;

  return (
    <div className={cn(
      "transition-all",
      hasUploadedFile ? "opacity-50 pointer-events-none" : ""
    )}>
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Paste isi resume kamu di sini..."
          rows={8}
          className={cn(
            "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent resize-none text-sm",
            isLowCount ? "border-orange-400" : "border-gray-300"
          )}
        />
        <button
          onClick={onFillSample}
          className="absolute bottom-3 right-3 text-xs text-indo-red hover:text-red-700 font-medium"
        >
          Isi Contoh Resume
        </button>
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <span className={cn(
          charCount > 0 && charCount < 200 ? "text-orange-500" : ""
        )}>
          {charCount} karakter
        </span>
        <span>Minimal 200 karakter</span>
      </div>
    </div>
  );
};

export default PasteArea;

