import React, { useState } from 'react';
import { Lock, Crown, Check, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

const PREMIUM_FEATURES = [
  {
    icon: '📋',
    title: 'Documents Vault',
    description: 'Track kelengkapan dokumen untuk aplikasi visa',
  },
  {
    icon: '⏱️',
    title: '88 Days Logbook',
    description: 'Catat hari kerja untuk extension WHV kedua',
  },
  {
    icon: '🧮',
    title: 'PR Calculator',
    description: 'Hitung poin dan rencanakan strategi PR',
  },
  {
    icon: '🚀',
    title: 'Future Strategy',
    description: 'Eksplor opsi imigrasi untuk kembali ke Australia',
  },
];

const VALID_ACCESS_CODES = ['BETA2025', 'INDOZ2025', 'PREMIUM']; // For demo

const PremiumLanding = ({ onUnlock = () => {} }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessCode.trim()) {
      setError('Silakan masukkan access code');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (VALID_ACCESS_CODES.includes(accessCode.toUpperCase())) {
      onUnlock(accessCode);
    } else {
      setError('Access code tidak valid. Coba lagi atau hubungi support.');
    }

    setIsSubmitting(false);
  };

  const handleGetCode = () => {
    // In production, this would open a modal or navigate to pricing page
    alert('Demo: Gunakan kode BETA2025 untuk akses premium');
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-oz-gold/10 text-oz-gold text-sm font-semibold rounded-full mb-4">
          <Zap size={16} />
          BETA
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          IndOz+ Premium
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock fitur premium untuk mempermudah perjalanan WHV dan PR Anda
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PREMIUM_FEATURES.map((feature, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 hover:border-oz-gold rounded-xl p-6 transition-all group"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-oz-gold transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Access Code Form */}
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-indo-red/10 to-oz-gold/10 border-2 border-indo-red/20 rounded-xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-indo-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-indo-red" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Unlock Premium Features
            </h2>
            <p className="text-gray-600 text-sm">
              Masukkan access code untuk mengakses semua fitur premium
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-indo-red text-center text-lg font-mono tracking-wider"
              />
              {error && (
                <p className="mt-2 text-sm text-error text-center">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-3 rounded-lg font-semibold transition-all",
                "bg-indo-red text-white hover:bg-red-700",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? 'Memvalidasi...' : 'Unlock Premium'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleGetCode}
                className="text-sm text-indo-red hover:text-red-700 font-medium underline"
              >
                Dapatkan Access Code
              </button>
            </div>
          </form>

          {/* Demo Code Hint */}
          <div className="mt-6 p-4 bg-white/50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Demo:</strong> Gunakan kode <span className="font-mono">BETA2025</span>
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Kenapa IndOz+ Premium?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <Check className="text-success flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-900">Save Time</p>
              <p className="text-sm text-gray-600">
                Tools otomatis untuk tracking dokumen dan 88 days
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="text-success flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-900">Expert Guidance</p>
              <p className="text-sm text-gray-600">
                Kalkulator PR dengan strategi personal
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="text-success flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-medium text-gray-900">Stay Organized</p>
              <p className="text-sm text-gray-600">
                Semua dokumen dan progress dalam satu tempat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLanding;
