import React, { useState } from 'react';
import { Lock, Crown, Check, Zap, Star, Shield, TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';

const PREMIUM_FEATURES = [
  {
    icon: <Shield className="w-8 h-8 text-indo-red" />,
    title: 'Documents Vault',
    description: 'Track kelengkapan dokumen visa dengan aman dan terorganisir.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-oz-gold" />,
    title: '88 Days Logbook',
    description: 'Tracking otomatis hari kerja untuk persyaratan renewal WHV.',
  },
  {
    icon: <Star className="w-8 h-8 text-purple-600" />,
    title: 'PR Calculator',
    description: 'Hitung poin PR Anda dan dapatkan strategi untuk meningkatkannya.',
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-500" />,
    title: 'Future Strategy',
    description: 'Roadmap personalisasi untuk transisi dari WHV ke PR.',
  },
];

const VALID_ACCESS_CODES = ['BETA2025', 'INDOZ2025', 'PREMIUM'];

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

    // Simulate validation delay for effect
    await new Promise(resolve => setTimeout(resolve, 800));

    if (VALID_ACCESS_CODES.includes(accessCode.toUpperCase())) {
      onUnlock(accessCode);
    } else {
      setError('Access code tidak valid. Silakan coba lagi.');
    }

    setIsSubmitting(false);
  };

  const handleGetCode = () => {
    alert('Demo: Gunakan kode BETA2025 untuk akses premium');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indo-red/10 to-oz-gold/10 border border-indo-red/20 rounded-full mb-6">
          <Crown size={16} className="text-indo-red" />
          <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indo-red to-orange-600">
            EARLY ACCESS BETA
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">
          Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indo-red to-oz-gold">Australian Dream</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Platform all-in-one untuk membantu WHV holder merencanakan masa depan, tracking progress, dan mencapai Permanent Residency.
        </p>
      </div>

      {/* Access Code Card - "The Gate" */}
      <div className="max-w-md mx-auto mb-20 relative z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-indo-red to-oz-gold rounded-2xl blur opacity-25 animate-pulse"></div>
        <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 text-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 border border-gray-100">
              <Lock size={28} className="text-indo-red" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Member Access</h2>
            <p className="text-sm text-gray-500 mt-1">Enter your invitation code to enter</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="code" className="sr-only">Access Code</label>
                <input
                  id="code"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter Access Code"
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indo-red focus:ring-4 focus:ring-indo-red/10 transition-all text-center text-lg font-mono tracking-widest placeholder:tracking-normal placeholder:font-sans"
                />
                {error && (
                  <div className="mt-3 flex items-center justify-center text-error text-sm font-medium animate-shake">
                    <span className="mr-1">⚠️</span> {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0",
                  "bg-gradient-to-r from-indo-red to-red-700 hover:shadow-indo-red/25",
                  "disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Validating...
                  </span>
                ) : (
                  'UNLOCK PREMIUM'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={handleGetCode}
                className="text-sm text-gray-400 hover:text-indo-red transition-colors font-medium"
              >
                Where do I get a code?
              </button>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Demo Code: <span className="font-mono font-bold text-gray-600">BETA2025</span>
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Tools Included</h3>
          <div className="h-1 w-20 bg-indo-red mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PREMIUM_FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-inner transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indo-red transition-colors">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumLanding;
