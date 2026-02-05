import { useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { analyzeResume, SAMPLE_RESUME } from '../../services/resumeAPI';
import UploadArea from './UploadArea';
import PasteArea from './PasteArea';
import AnalysisResults from './AnalysisResults';

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
    if (!file && resumeText.trim().length < 200) {
      setError('Upload resume atau paste teks (min. 200 karakter)');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const textToAnalyze = resumeText.trim().length > 0 ? resumeText : SAMPLE_RESUME;
      const analysis = await analyzeResume(textToAnalyze);
      setResults(analysis);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Error:', err);
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
    <div className="w-full max-w-full mx-auto py-8 px-4">
      {!results ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Cek Resume</h1>
          <p className="text-gray-500 text-sm mb-6">Upload file atau paste teks resume Anda</p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <UploadArea
              onFileSelect={handleFileSelect}
              onError={setError}
              hasPastedText={resumeText.length > 0}
            />

            <div className="relative flex py-1">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink px-3 text-gray-400 text-xs font-medium">ATAU</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <PasteArea
              value={resumeText}
              onChange={handlePasteChange}
              onFillSample={handleFillSample}
              hasUploadedFile={file !== null}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!file && resumeText.trim().length === 0)}
            className="w-full mt-6 bg-indo-red hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Menganalisis...
              </>
            ) : (
              'Analisis Sekarang'
            )}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Hasil Analisis</h2>
            <button
              onClick={handleReset}
              className="text-indo-red hover:text-red-700 text-sm font-medium"
            >
              Analisis Ulang
            </button>
          </div>
          <AnalysisResults results={results} />
        </div>
      )}
    </div>
  );
};

export default ResumeCheckerContainer;

