import React from 'react';
import { CheckCircle, AlertCircle, Info, TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';

const AnalysisResults = ({ results = {} }) => {
  if (!results || !results.atsScore) {
    return null;
  }

  const { atsScore, strengths = [], improvements = [], australiaSpecific = [] } = results;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* ATS Score */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ATS Compatibility Score
        </h3>

        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - atsScore / 100)}`}
                className={getScoreColor(atsScore)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-3xl font-bold", getScoreColor(atsScore))}>
                {atsScore}
              </span>
              <span className="text-xs text-gray-600">/100</span>
            </div>
          </div>

          <div className="flex-1">
            <p className={cn("text-xl font-semibold", getScoreColor(atsScore))}>
              {getScoreLabel(atsScore)}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {atsScore >= 80
                ? 'Resume Anda sudah siap untuk apply ke perusahaan Australia!'
                : atsScore >= 60
                ? 'Resume cukup baik, tapi masih bisa ditingkatkan'
                : 'Resume perlu perbaikan signifikan untuk ATS'}
            </p>
          </div>
        </div>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={20} className="text-success" />
            <h3 className="text-lg font-semibold text-gray-900">
              Kekuatan Resume
            </h3>
          </div>

          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-success mt-1">✓</span>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements Needed */}
      {improvements.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-warning" />
            <h3 className="text-lg font-semibold text-gray-900">
              Perbaikan yang Disarankan
            </h3>
          </div>

          <ul className="space-y-2">
            {improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-warning mt-1">•</span>
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Australia-Specific Advice */}
      {australiaSpecific.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} className="text-info" />
            <h3 className="text-lg font-semibold text-gray-900">
              Tips untuk Pasar Kerja Australia
            </h3>
          </div>

          <ul className="space-y-2">
            {australiaSpecific.map((tip, index) => (
              <li
                key={index}
                className="p-3 bg-info/5 rounded-lg text-sm text-gray-700"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="bg-indo-red/5 border-2 border-indo-red/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <TrendingUp size={24} className="text-indo-red flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Tingkatkan Peluang Anda
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              Dapatkan panduan lengkap cara membuat resume ATS-friendly untuk pasar kerja Australia
            </p>
            <button className="px-4 py-2 bg-indo-red text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              Lihat Panduan Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
