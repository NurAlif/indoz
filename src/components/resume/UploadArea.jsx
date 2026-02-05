import { useState, useRef } from 'react';
import { Cloud, X, Check, FileUp, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const UploadArea = ({ onFileSelect = () => { }, onError = () => { }, hasPastedText = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSelectFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      validateAndSelectFile(files[0]);
    }
  };

  const validateAndSelectFile = (file) => {
    // Validate file size (max 4MB)
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    if (file.size > maxSize) {
      onError('Ukuran file maksimal 4MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      onError('Hanya file PDF, JPG, atau PNG yang diperbolehkan');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
    onError('');
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn(
      "transition-all duration-300",
      hasPastedText ? "opacity-40 grayscale pointer-events-none scale-[0.98]" : ""
    )}>
      <div className="flex items-center gap-2 mb-3 px-1">
        <div className="p-1.5 bg-indo-red/10 rounded-lg">
          <FileUp size={16} className="text-indo-red" />
        </div>
        <h3 className="text-sm font-bold text-gray-700">Upload File Resume</h3>
      </div>

      {!selectedFile ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative group border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-500 overflow-hidden",
            isDragging
              ? "border-indo-red bg-indo-red/5 scale-[1.02]"
              : "border-gray-200 hover:border-indo-red/50 hover:bg-gray-50/50"
          )}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indo-red/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="relative z-10">
            <div className={cn(
              "mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500",
              isDragging ? "bg-indo-red text-white rotate-12 scale-110" : "bg-gray-100 text-gray-400 group-hover:bg-indo-red/10 group-hover:text-indo-red"
            )}>
              <Cloud size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Klik atau Seret file ke sini
            </h3>
            <p className="text-gray-500 text-sm font-medium">
              Format yang didukung: <span className="text-gray-700">PDF, JPG, atau PNG</span>
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-400 shadow-sm">
              <AlertCircle size={12} />
              Maksimal 4MB
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group p-6 bg-white border border-success/30 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute inset-0 bg-success/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-success">
                <Check size={24} />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-gray-900 truncate max-w-[200px] sm:max-w-xs">{selectedFile.name}</p>
                <p className="text-xs font-bold text-success uppercase tracking-wider">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Terpilih
                </p>
              </div>
            </div>

            <button
              onClick={handleRemoveFile}
              className="p-2.5 bg-gray-50 text-gray-400 hover:bg-error/10 hover:text-error rounded-xl transition-all"
              title="Hapus file"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;

