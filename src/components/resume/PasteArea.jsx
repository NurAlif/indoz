import { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Clipboard, Quote } from 'lucide-react';

const PasteArea = ({ value = '', onChange = () => { }, onFillSample = () => { }, hasUploadedFile = false }) => {
  const [charCount, setCharCount] = useState(value.length);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const handleChange = (e) => {
    const text = e.target.value;
    onChange(text);
    setCharCount(text.length);
  };

  const isLowCount = charCount > 0 && charCount < 200;

  return (
    <div className={cn(
      "bg-white rounded-2xl transition-all duration-300",
      hasUploadedFile ? "opacity-40 grayscale pointer-events-none scale-[0.98]" : "hover:shadow-md"
    )}>
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="p-1.5 bg-oz-gold/10 rounded-lg">
          <Clipboard size={16} className="text-oz-gold" />
        </div>
        <h3 className="text-sm font-bold text-gray-700">Paste Konten Resume</h3>
      </div>

      <div className="relative group">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Tempel (Paste) teks resume kamu di sini untuk dianalisis..."
          rows={10}
          className={cn(
            "w-full px-5 py-4 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-oz-gold/20 focus:border-oz-gold resize-none text-gray-700 leading-relaxed transition-all",
            isLowCount ? "border-warning border-2" : "border-gray-200"
          )}
        />

        <button
          onClick={onFillSample}
          className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-oz-gold hover:bg-oz-gold hover:text-white border border-oz-gold/20 rounded-lg text-xs font-bold transition-all shadow-sm"
        >
          <Quote size={12} />
          Isi Contoh Resume
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 px-1 gap-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-bold",
            charCount === 0 ? "bg-gray-100 text-gray-400" :
              isLowCount ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
          )}>
            {charCount.toLocaleString()} Karakter
          </div>
          {isLowCount && (
            <span className="text-xs font-medium text-warning animate-pulse">Butuh {200 - charCount} lagi</span>
          )}
        </div>
        <span className="text-xs font-medium text-gray-400 italic">Target optimasi: Min. 200 karakter</span>
      </div>
    </div>
  );
};

export default PasteArea;

