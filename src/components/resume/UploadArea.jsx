import { useState, useRef } from 'react';
import { Cloud, X, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

const UploadArea = ({ onFileSelect = () => {}, onError = () => {}, hasPastedText = false }) => {
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
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      onError('Ukuran file maksimal 4MB');
      return;
    }
    setSelectedFile(file);
    onFileSelect(file);
    onError('');
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    fileInputRef.current.value = '';
    onFileSelect(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn(
      "transition-all",
      hasPastedText ? "opacity-50 pointer-events-none" : ""
    )}>
      {!selectedFile ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-indo-red bg-indo-red/5"
              : "border-gray-300 hover:border-indo-red hover:bg-gray-50"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
          <Cloud size={40} className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium text-gray-700">Klik untuk upload file</p>
          <p className="text-sm text-gray-500 mt-1">PDF, JPG, atau PNG (Max 4MB)</p>
        </div>
      ) : (
        <div className="border border-green-500 bg-green-50 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Check className="text-green-600" size={20} />
            <div>
              <p className="font-medium text-gray-900 text-sm">{selectedFile.name}</p>
              <p className="text-xs text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            onClick={handleRemoveFile}
            className="p-1 text-gray-400 hover:text-red-500"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadArea;

