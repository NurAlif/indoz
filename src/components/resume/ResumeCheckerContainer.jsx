import React, { useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { analyzeResume, SAMPLE_RESUME } from '../../services/resumeAPI';
import UploadArea from './UploadArea';
import PasteArea from './PasteArea';
import AnalysisResults from './AnalysisResults';
import Button from '../common/Button';

const ResumeCheckerContainer = () => {
  const [mode, setMode] = useState('upload'); // 'upload' or 'paste'
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError('');
    setResults(null);
  };

  const handlePasteChange = (text) => {
    setResumeText(text);
    setError('');
    setResults(null);
  };

  const handleFillSample = () => {
    setResumeText(SAMPLE_RESUME.trim());
    setError('');
    setResults(null);
  };

  const handleAnalyze = async () => {
    // Validation
    if (mode === 'upload' && !file) {
      setError('Silakan upload resume terlebih dahulu');
      return;
    }

    if (mode === 'paste' && resumeText.trim().length < 200) {
      setError('Resume text terlalu pendek. Minimal 200 kata.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // In production, you would extract text from PDF file
      // For now, we'll use the pasted text or a placeholder
      const textToAnalyze = mode === 'paste' ? resumeText : SAMPLE_RESUME;

      const analysis = await analyzeResume(textToAnalyze);
      setResults(analysis);
    } catch (err) {
      setError('Terjadi kesalahan saat menganalisis resume. Silakan coba lagi.');
      console.error('Error analyzing resume:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResumeText('');
    setResults(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cek Resume</h1>
        <p className="text-gray-600 text-sm mt-1">
          Analisis resume Anda untuk pasar kerja Australia
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-error/10 border-2 border-error/20 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {!results ? (
        <>
          {/* Mode Toggle */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setMode('upload');
                  setResults(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'upload'
                    ? 'bg-indo-red text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Upload PDF
              </button>

              <span className="text-gray-400">atau</span>

              <button
                onClick={() => {
                  setMode('paste');
                  setResults(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'paste'
                    ? 'bg-indo-red text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {/* Upload Mode */}
          {mode === 'upload' && <UploadArea onFileSelect={handleFileSelect} onError={setError} />}

          {/* Paste Mode */}
          {mode === 'paste' && (
            <PasteArea
              value={resumeText}
              onChange={handlePasteChange}
              onFillSample={handleFillSample}
            />
          )}

          {/* Action Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!file && !resumeText)}
              variant="primary"
              size="lg"
              isLoading={isAnalyzing}
            >
              {isAnalyzing ? 'Menganalisa...' : 'Analisa Resume'}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Results */}
          <AnalysisResults results={results} />

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={handleReset} variant="outline">
              Cek Resume Lain
            </Button>
            <Button onClick={() => window.print()} variant="secondary">
              Simpan Hasil
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResumeCheckerContainer;
