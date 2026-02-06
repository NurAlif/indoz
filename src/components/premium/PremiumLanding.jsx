import React, { useState } from 'react';
import { Lock, Crown, Check, Zap, Shield, Clock, Calculator, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import TopBar from '../layout/TopBar';

const PREMIUM_FEATURES = [
  {
    icon: <Calculator className="w-8 h-8 text-oz-gold" />,
    title: 'PR Points Calculator',
    description: 'Stop guessing. Calculate your eligibility points accurately with our smart tool tailored for WHV holders aiming for PR.',
    benefits: ['Real-time points tracking', 'Strategic planning', 'Eligibility alerts']
  },
  {
    icon: <Clock className="w-8 h-8 text-oz-gold" />,
    title: '88 Days Logbook',
    description: 'Ensure your second and third-year visa approvals. Log your farm work days with precision and generate compliance reports.',
    benefits: ['GPS verification support', 'Payslip organization', 'Days countdown']
  },
  {
    icon: <Shield className="w-8 h-8 text-oz-gold" />,
    title: 'Documents Vault',
    description: 'Your secure digital fortress. Keep all your visa documents, certifications, and ID proofs organized and ready for application day.',
    benefits: ['Encrypted storage', 'Expiry notifications', 'Easy export']
  },
  {
    icon: <Zap className="w-8 h-8 text-oz-gold" />,
    title: 'Future Strategy',
    description: 'AI-powered insights to help you plan your migration pathway beyond the Working Holiday Visa.',
    benefits: ['Migration trends', 'Visa options explorer', 'Personalized roadmap']
  }
];

const VALID_ACCESS_CODES = ['BETA2025', 'INDOZ2025', 'PREMIUM'];

const PremiumLanding = ({ onUnlock = () => {} }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setError('Please enter an access code');
      return;
    }
    setIsSubmitting(true);
    setError('');

    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 800));

    if (VALID_ACCESS_CODES.includes(accessCode.toUpperCase())) {
      onUnlock(accessCode);
    } else {
      setError('Invalid access code. Please check and try again.');
    }
    setIsSubmitting(false);
  };

  const handlePurchase = () => {
    // Demo alert
    alert('Demo Access: Use code BETA2025 to unlock premium features.');
  };

  const scrollToUnlock = () => {
    document.getElementById('unlock-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar darkMode={true} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-900 text-white pb-20 pt-24 px-6">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indo-red/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-oz-gold/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-oz-gold/20 border border-oz-gold/30 rounded-full mb-6 backdrop-blur-sm">
            <Crown size={16} className="text-oz-gold" />
            <span className="text-oz-gold font-medium text-sm tracking-wide">PREMIUM MEMBERSHIP</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-oz-gold to-yellow-200">Australian Dream</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one toolkit designed to streamline your Working Holiday Visa journey and fast-track your path to Permanent Residency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handlePurchase}
              className="px-8 py-4 bg-indo-red hover:bg-red-700 text-white text-lg font-bold rounded-xl transition-all shadow-lg shadow-indo-red/25 hover:shadow-indo-red/40 hover:-translate-y-1 flex items-center gap-2"
            >
              Get Premium Access <ArrowRight size={20} />
            </button>
            <button
              onClick={scrollToUnlock}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-medium rounded-xl backdrop-blur-sm transition-all border border-white/10"
            >
              Have a code? Unlock
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-success" /> No credit card required (Beta)
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-success" /> Instant activation
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            IndOz+ Premium gives you the competitive edge in your migration journey with professional-grade tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PREMIUM_FEATURES.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-oz-gold/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm h-24">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-success rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA / Pricing Teaser */}
      <div className="bg-gray-900 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-indo-red/10"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center bg-gray-800/50 backdrop-blur-md p-10 rounded-3xl border border-gray-700">
          <div className="inline-block p-3 bg-oz-gold/20 rounded-full mb-6">
            <Star className="text-oz-gold w-8 h-8" fill="currentColor" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the IndOz+ Community</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Get access to all premium features and future updates. Start your journey with the right tools today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handlePurchase}
              className="px-8 py-3 bg-oz-gold hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors text-lg"
            >
              Get Started Now
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-400">Limited time beta access available.</p>
        </div>
      </div>

      {/* Unlock Section */}
      <div id="unlock-section" className="max-w-2xl mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indo-red/10 rounded-full flex items-center justify-center">
                <Lock className="text-indo-red w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Member Access</h3>
                <p className="text-gray-600 text-sm">Already have a code? Enter it below.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter your access code (e.g., BETA2025)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent font-mono uppercase"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? 'Verifying...' : 'Unlock Access'}
                  {!isSubmitting && <ChevronRight size={18} />}
                </button>
              </div>
              {error && (
                <p className="absolute -bottom-6 left-0 text-sm text-error mt-1">{error}</p>
              )}
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-between items-center text-sm">
            <span className="text-gray-500">Need help?</span>
            <button onClick={handlePurchase} className="text-indo-red font-medium hover:underline">
              Request Access Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLanding;
