import React, { useState, useEffect } from 'react';
import { CheckCircle, Info, FileText, Check } from 'lucide-react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import DocumentSection from './DocumentSection';
import UploadModal from './UploadModal';
import { cn } from '../../../utils/cn';

const DocumentsVault = () => {
  const [documents, setDocuments] = useLocalStorage('indoz_documents', []);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Initialize documents if empty
  useEffect(() => {
    if (!documents || documents.length === 0) {
      const initialDocs = [
        { id: 'passport', title: 'Paspor', section: 'Persyaratan Dasar', status: 'empty' },
        { id: 'ielts', title: 'IELTS Certificate', section: 'Persyaratan Dasar', status: 'empty' },
        { id: 'skck', title: 'SKCK Polda', section: 'Persyaratan Dasar', status: 'empty' },
        { id: 'health', title: 'Surat Keterangan Sehat', section: 'Persyaratan Dasar', status: 'empty' },
        { id: 'cv', title: 'CV/Resume', section: 'Dokumen Pendukung', status: 'empty' },
        { id: 'reference', title: 'Reference Letter', section: 'Dokumen Pendukung', status: 'empty' },
        { id: 'bank', title: 'Bank Statement', section: 'Dokumen Pendukung', status: 'empty' },
        { id: 'contract', title: 'Work Contract', section: 'Dokumen Pendukung', status: 'empty' },
      ];
      setDocuments(initialDocs);
    }
  }, [documents, setDocuments]);

  const handleUploadClick = (doc) => {
    setSelectedDoc(doc);
    setIsUploadModalOpen(true);
  };

  const handleFileUploaded = (file) => {
    if (!selectedDoc) return;

    const updatedDocs = documents.map(doc =>
      doc.id === selectedDoc.id ? { ...doc, status: 'saved' } : doc
    );
    setDocuments(updatedDocs);
    setIsUploadModalOpen(false);
  };

  const handleViewClick = (doc) => {
    // In a real app, this would open the file viewer
    // For now we can alert
    alert(`Viewing document: ${doc.title}`);
  };

  // Progress Calculation
  const progressCount = documents.filter(d => d.status === 'verified' || d.status === 'saved').length;
  const totalCount = documents.length;
  const progressPercentage = totalCount > 0 ? (progressCount / totalCount) * 100 : 0;
  const isComplete = progressCount === totalCount && totalCount > 0;

  useEffect(() => {
    if (isComplete) {
      setShowCelebration(true);
    }
  }, [isComplete]);

  // Group by section
  const sections = {
    'Persyaratan Dasar': documents.filter(d => d.section === 'Persyaratan Dasar'),
    'Dokumen Pendukung': documents.filter(d => d.section === 'Dokumen Pendukung'),
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents Vault</h1>
        <p className="text-gray-500">Manage and track your visa documents</p>
      </div>

      {/* Explanation Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex gap-3">
        <Info className="text-blue-600 flex-shrink-0" size={24} />
        <div>
          <h3 className="font-semibold text-blue-900 mb-1">Why use Documents Vault?</h3>
          <p className="text-sm text-blue-800">
            Keep all your essential visa and job documents in one secure place.
            Track your progress as you prepare for your journey. We'll let you know when you're ready to apply!
          </p>
        </div>
      </div>

      {/* Progress Bar & Celebration */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-3xl font-bold text-gray-900">{progressCount}</span>
            <span className="text-gray-500 text-lg">/{totalCount}</span>
            <span className="ml-2 text-gray-600 font-medium">Documents Ready</span>
          </div>
          {isComplete && (
            <div className="flex items-center gap-2 text-success font-bold animate-bounce">
              <CheckCircle size={24} />
              All Set!
            </div>
          )}
        </div>

        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-1000 ease-out relative",
              isComplete ? "bg-success" : "bg-indo-red"
            )}
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite] skew-x-12"></div>
          </div>
        </div>

        {isComplete && (
          <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg text-center border border-green-200 animate-in fade-in slide-in-from-top-4 duration-700">
            <p className="font-semibold text-lg">🎉 Congratulations! You have all documents ready!</p>
            <p className="text-sm">You are now fully prepared for your application process.</p>
          </div>
        )}
      </div>

      {/* Sections */}
      {Object.entries(sections).map(([title, docs]) => (
        <DocumentSection
          key={title}
          title={title}
          documents={docs}
          onUpload={handleUploadClick}
          onView={handleViewClick}
        />
      ))}

      {/* Legend */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend:</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
              <Check className="text-white" size={14} />
            </div>
            <span className="text-sm text-gray-600">Verified = Document checked & approved</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="text-oz-gold" size={20} />
            <span className="text-sm text-gray-600">Saved = Uploaded, pending verification</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border-2 border-gray-300" />
            <span className="text-sm text-gray-600">Empty = Not uploaded yet</span>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUploaded}
        documentTitle={selectedDoc?.title || 'Document'}
      />
    </div>
  );
};

export default DocumentsVault;
