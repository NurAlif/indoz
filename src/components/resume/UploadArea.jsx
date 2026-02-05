import React, { useState, useRef } from 'react';
import { Upload, FileText, X, Check } from 'lucide-react';
import { isValidFileSize, isPDFFile } from '../../utils/validation';
import { cn } from '../../utils/cn';

const UploadArea = ({ onFileSelect = () => {}, onError = () => {} }) => {
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
    // Validate file type
    if (!isPDFFile(file)) {
      onError('Format file harus PDF');
      return;
    }

    // Validate file size
    if (!isValidFileSize(file, 4)) {
      onError('Ukuran file maksimal 4MB');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleRemoveFile = () => {
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
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      {!selectedFile ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-indo-red bg-indo-red/5"
              : "border-gray-300 hover:border-indo-red hover:bg-gray-50"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <FileText size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Resume Anda
          </h3>
          <p className="text-gray-600 mb-4">
            Drag & drop atau klik untuk memilih file
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Upload size={16} />
            <span>Format: PDF • Max 4MB</span>
          </div>
        </div>
      ) : (
        <div className="border-2 border-success bg-success/5 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <Check className="text-success" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              onClick={handleRemoveFile}
              className="p-2 text-gray-400 hover:text-error transition-colors"
              aria-label="Remove file"
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
