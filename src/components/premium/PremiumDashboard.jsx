import React, { useState } from 'react';
import { LogOut, User, Trophy, Target, TrendingUp, Crown } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Import premium feature components
import DocumentsVault from './DocumentsVault';
import Logbook from './Logbook';
import PRCalculator from './PRCalculator/PRCalculator';
import FutureStrategy from './FutureStrategy';

const PremiumDashboard = ({ onLogout = () => {} }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [accessCode] = useLocalStorage('indoz_premium_code', '');

  // Mock user data
  const userStatus = {
    visaStatus: 'WHV Active',
    prPoints: 65,
    documentsReady: '5/8',
  };

  const premiumFeatures = [
    {
      id: 'documents',
      icon: '📋',
      title: 'Documents Vault',
      description: 'Track dokumen visa',
      status: '5/8 Ready',
      color: 'indo-red',
    },
    {
      id: 'logbook',
      icon: '⏱️',
      title: '88 Days Logbook',
      description: 'Tracking hari kerja',
      status: '3/88 Hari',
      color: 'oz-gold',
    },
    {
      id: 'pr-calc',
      icon: '🧮',
      title: 'PR Calculator',
      description: 'Hitung poin PR',
      status: '65 pts',
      color: 'info',
    },
    {
      id: 'strategy',
      icon: '🚀',
      title: 'Future Strategy',
      description: 'Strategi imigrasi',
      status: '3 Options',
      color: 'success',
    },
  ];

  if (activeFeature) {
    // Render the selected feature
    const featureComponents = {
      documents: <DocumentsVault onBack={() => setActiveFeature(null)} />,
      logbook: <Logbook onBack={() => setActiveFeature(null)} />,
      'pr-calc': <PRCalculator onBack={() => setActiveFeature(null)} />,
      strategy: <FutureStrategy onBack={() => setActiveFeature(null)} />,
    };

    return featureComponents[activeFeature] || null;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Crown className="text-oz-gold" size={28} />
            <h1 className="text-3xl font-bold text-gray-900">
              IndOz+ Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Selamat datang kembali! Berikut progress Anda.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Status Overview */}
      <div className="bg-gradient-to-br from-indo-red/5 to-oz-gold/5 border-2 border-indo-red/10 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          STATUS OVERVIEW
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visa Status */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indo-red/10 rounded-lg flex items-center justify-center">
                <Target className="text-indo-red" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Visa Status</p>
                <p className="font-semibold text-gray-900">{userStatus.visaStatus}</p>
              </div>
            </div>
          </div>

          {/* PR Points */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-oz-gold/10 rounded-lg flex items-center justify-center">
                <Trophy className="text-oz-gold" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">PR Points</p>
                <p className="font-semibold text-gray-900">{userStatus.prPoints} pts</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-success" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Documents</p>
                <p className="font-semibold text-gray-900">{userStatus.documentsReady}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          PREMIUM FEATURES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {premiumFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className="bg-white border-2 border-gray-200 hover:border-indo-red rounded-xl p-6 text-left transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{feature.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-indo-red transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>

                <div className="px-3 py-1 bg-gray-100 rounded-full">
                  <span className="text-xs font-medium text-gray-700">
                    {feature.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center text-indo-red text-sm font-medium">
                Buka Fitur
                <span className="ml-1 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Access Code: {accessCode}</p>
        <p className="mt-1">© 2025 IndOz+ Premium. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PremiumDashboard;
