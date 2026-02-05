import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Check, AlertCircle, FileImage } from 'lucide-react';
import Modal from '../../common/Modal';
import { cn } from '../../../utils/cn';

const UploadModal = ({ isOpen, onClose, onUpload, documentTitle }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (file) => {
    setError(null);
    if (!file) return;

    // Validate type (PDF or Image)
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Format file tidak didukung. Gunakan PDF, JPG, atau PNG.');
      return;
    }

    // Validate size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      setError('Ukuran file terlalu besar. Maksimum 4MB.');
      return;
    }

    setFile(file);
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onUpload(file);
          resetState();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetState = () => {
    setFile(null);
    setError(null);
    setUploading(false);
    setProgress(0);
  };

  const handleClose = () => {
    if (uploading) return;
    resetState();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Upload ${documentTitle}`}
      size="md"
    >
      <div className="space-y-6">
        {/* Upload Area */}
        {!file && (
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
              isDragging
                ? "border-indo-red bg-indo-red/5"
                : "border-gray-300 hover:border-indo-red hover:bg-gray-50",
              error && "border-error bg-error/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.jpg,.jpeg,.png,.webp"
            />
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="text-gray-600" size={24} />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              PDF, JPG, PNG (Max 4MB)
            </p>
            {error && (
              <div className="flex items-center justify-center gap-2 mt-4 text-error text-sm font-medium">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
          </div>
        )}

        {/* Selected File State */}
        {file && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  {file.type.includes('pdf') ? (
                    <FileText className="text-indo-red" size={20} />
                  ) : (
                    <FileImage className="text-oz-gold" size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {!uploading && (
                <button
                  onClick={() => setFile(null)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              )}
            </div>

            {/* Progress Bar */}
            {uploading ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indo-red transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-success font-medium">
                 Ready to upload
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={uploading}
            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="px-4 py-2 bg-indo-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
