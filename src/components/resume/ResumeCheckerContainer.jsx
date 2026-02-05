import { useState } from 'react';
import { AlertCircle, FileText, CheckCircle, RefreshCw, Save, Share2 } from 'lucide-react';
import { analyzeResume, SAMPLE_RESUME } from '../../services/resumeAPI';
import UploadArea from './UploadArea';
import PasteArea from './PasteArea';
import AnalysisResults from './AnalysisResults';
import { cn } from '../../utils/cn';

const ResumeCheckerContainer = () => {
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
    setFile(null);
  };

  const handleFillSample = () => {
    setResumeText(SAMPLE_RESUME.trim());
    setError('');
    setResults(null);
    setFile(null);
  };

  const handleAnalyze = async () => {
    // Validation
    if (!file && resumeText.trim().length < 200) {
      setError('Silakan upload resume atau paste teks resume (minimal 200 karakter)');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // In production, you would extract text from PDF file
      // For now, we'll use the pasted text or a placeholder
      const textToAnalyze = resumeText.trim().length > 0 ? resumeText : SAMPLE_RESUME;

      const analysis = await analyzeResume(textToAnalyze);
      setResults(analysis);

      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indo-red/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-oz-gold/5 rounded-full blur-3xl" />
      </div>

      {!results ? (
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Header Section */}
          <div className="px-8 py-10 bg-gradient-to-br from-white to-gray-50 border-b border-gray-100 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <div className="p-3 bg-indo-red/10 rounded-2xl">
                <FileText className="text-indo-red" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Cek Resume</h1>
                <p className="text-gray-500 font-medium">
                  Optimalkan CV Anda untuk standar Applicant Tracking System (ATS) Australia
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            {/* Error Message */}
            {error && (
              <div className="mb-8 bg-error/5 border border-error/20 rounded-2xl p-4 flex items-start gap-3 animate-in fade-in zoom-in duration-300">
                <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-error">{error}</p>
              </div>
            )}

            {/* Upload and Paste Section */}
            <div className="grid grid-cols-1 gap-10">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indo-red to-oz-gold rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
                <UploadArea
                  onFileSelect={handleFileSelect}
                  onError={setError}
                  hasPastedText={resumeText.length > 0}
                />
              </div>

              {/* Divider with localized terminology */}
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 px-4 text-gray-400 text-xs font-bold uppercase tracking-widest">ATAU</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-oz-gold to-indo-red rounded-2xl blur opacity-0 group-hover:opacity-10 transition duration-500" />
                <PasteArea
                  value={resumeText}
                  onChange={handlePasteChange}
                  onFillSample={handleFillSample}
                  hasUploadedFile={file !== null}
                />
              </div>
            </div>

            {/* Analyze Button */}
            <div className="mt-12">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || (!file && resumeText.trim().length === 0)}
                className={cn(
                  "w-full group relative flex items-center justify-center gap-3 bg-gray-900 text-white font-bold text-lg py-5 rounded-2xl transition-all duration-300",
                  "hover:bg-indo-red hover:shadow-2xl hover:shadow-indo-red/20 hover:-translate-y-1",
                  "disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none",
                  isAnalyzing ? "bg-gray-800" : ""
                )}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="animate-spin" size={24} />
                    <span>Sedang Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="transition-transform group-hover:scale-110" size={24} />
                    <span>Mulai Analisis Resume</span>
                  </>
                )}
              </button>
              <p className="text-center text-gray-400 text-xs mt-4">
                Analisis kami diproses secara privat dan tidak disimpan di server tanpa izin Anda.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Hasil Analisis</h2>
              <p className="text-gray-500 font-medium">Berdasarkan standar industri Australia</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <RefreshCw size={18} />
              Analisis Ulang
            </button>
          </div>

          {/* Results */}
          <AnalysisResults results={results} />

          {/* Bottom Actions */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              <Save size={20} />
              Simpan Sebagai PDF
            </button>
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              <Share2 size={20} />
              Bagikan Hasil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeCheckerContainer;

