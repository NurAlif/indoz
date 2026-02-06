import React from 'react';
import { CheckCircle, AlertCircle, Info, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import GlossaryTooltip from '../common/GlossaryTooltip';
import { useNavigate } from 'react-router-dom';

const AnalysisResults = ({ results = {} }) => {
  const navigate = useNavigate();

  if (!results || !results.atsScore) {
    return null;
  }

  const { atsScore, strengths = [], improvements = [], australiaSpecific = [] } = results;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Sangat Baik';
    if (score >= 60) return 'Baik';
    if (score >= 40) return 'Cukup';
    return 'Perlu Perbaikan';
  };

  // Helper to inject tooltips into text
  const renderTextWithTooltips = (text) => {
    if (!text) return text;

    const terms = ['WHV', '88 days', 'PR', 'IELTS', 'TFN'];
    let parts = [text];

    terms.forEach(term => {
      const newParts = [];
      parts.forEach(part => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }

        const regex = new RegExp(`(${term})`, 'gi');
        const split = part.split(regex);

        split.forEach((s, i) => {
          if (s.toLowerCase() === term.toLowerCase()) {
            newParts.push(<GlossaryTooltip key={`${term}-${i}`} term={term === '88 days' ? '88 Days' : term} />);
          } else if (s !== '') {
            newParts.push(s);
          }
        });
      });
      parts = newParts;
    });

    return parts;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ATS Score Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="text-indo-red" size={24} />
          Skor Kompatibilitas ATS
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
                className="text-gray-100"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - atsScore / 100)}`}
                className={getScoreColor(atsScore)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-4xl font-black", getScoreColor(atsScore))}>
                {atsScore}
              </span>
              <span className="text-sm font-medium text-gray-500">/ 100</span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className={cn(
              "inline-block px-4 py-1 rounded-full text-sm font-bold mb-3",
              getScoreBg(atsScore),
              getScoreColor(atsScore)
            )}>
              {getScoreLabel(atsScore)}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {atsScore >= 80
                ? 'Resume Anda luar biasa! Sangat kompetitif untuk pasar kerja Australia.'
                : atsScore >= 60
                  ? 'Resume Anda cukup baik, namun optimasi kecil akan sangat membantu.'
                  : 'Resume Anda memerlukan beberapa perbaikan penting agar lolos sistem ATS.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md">Ramah Mobile</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md">Format Rapi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-success/10 rounded-lg">
              <CheckCircle size={20} className="text-success" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Kelebihan Utama
            </h3>
          </div>

          <ul className="space-y-4">
            {strengths.length > 0 ? strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 bg-success/10 rounded-full flex items-center justify-center text-success text-xs mt-0.5">
                  ✓
                </span>
                <span className="text-gray-700 text-sm font-medium leading-tight">
                  {renderTextWithTooltips(strength)}
                </span>
              </li>
            )) : (
              <p className="text-gray-400 text-sm italic">Belum ada data kekuatan yang terdeteksi.</p>
            )}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-warning/10 rounded-lg">
              <AlertCircle size={20} className="text-warning" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Perlu Optimasi
            </h3>
          </div>

          <ul className="space-y-4">
            {improvements.length > 0 ? improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-warning rounded-full mt-2" />
                <span className="text-gray-700 text-sm font-medium leading-tight">
                  {renderTextWithTooltips(improvement)}
                </span>
              </li>
            )) : (
              <p className="text-gray-400 text-sm italic">Tidak ada saran perbaikan mendesak.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Australia-Specific Advice */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-info/5 border-b border-gray-100 flex items-center gap-3">
          <Info size={20} className="text-info" />
          <h3 className="text-lg font-bold text-gray-900">
            Saran Khusus Australia (Optimasi Aussie)
          </h3>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {australiaSpecific.map((tip, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-700 leading-relaxed transition-all hover:border-info/30 hover:bg-info/5"
            >
              {renderTextWithTooltips(tip)}
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA */}
      <div className="bg-gradient-to-r from-indo-red to-red-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <TrendingUp size={120} />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-2xl font-black mb-3">
              Siap Taklukkan Australia?
            </h4>
            <p className="text-red-100 text-base opacity-90 mb-6 max-w-lg">
              Dapatkan akses ke **Premium Resume Guide** kami yang dirancang khusus untuk melewati ATS perusahaan besar di Australia.
            </p>
            <button
              onClick={() => navigate('/guides')}
              className="px-8 py-3 bg-white text-indo-red font-bold rounded-xl hover:bg-red-50 transition-all flex items-center gap-2 mx-auto sm:mx-0 shadow-xl hover:shadow-2xl"
            >
              Buka Panduan Lengkap
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;

