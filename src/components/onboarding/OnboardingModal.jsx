import React from 'react';
import Modal from '../common/Modal';
import { cn } from '../../utils/cn';

const GLOSSARY_ITEMS = [
  {
    term: 'WHV',
    definition: 'Working Holiday Visa (visa kerja liburan)',
  },
  {
    term: 'SDUWHV',
    definition: 'Subclass 417 WHV (jenis visa WHV)',
  },
  {
    term: '88 Days',
    definition: 'Syarat kerja 3 bulan untuk extension visa',
  },
  {
    term: 'PR',
    definition: 'Permanent Residency (izin tinggal permanen)',
  },
];

const FEATURES = [
  {
    icon: '✈️',
    title: 'Mempersiapkan Working Holiday Visa (WHV)',
  },
  {
    icon: '💼',
    title: 'Mencari lowongan kerja di Australia',
  },
  {
    icon: '📋',
    title: 'Tracking 88 days untuk extension visa',
  },
  {
    icon: '🏠',
    title: 'Merencanakan Permanent Residency (PR)',
  },
];

const OnboardingModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      showCloseButton={false}
    >
      <div className="text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Selamat Datang di IndOz!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Gerbang Karir & Residensial Australia untuk Indonesia
        </p>

        {/* Features Grid */}
        <div className="bg-indo-red/5 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 text-left">
            IndOz membantu Anda:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <p className="text-sm text-gray-700 text-left">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Glossary */}
        <div className="bg-oz-gold/5 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">
            Istilah Penting:
          </h3>
          <div className="space-y-3">
            {GLOSSARY_ITEMS.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-indo-red font-semibold">{item.term} =</span>
                <span className="text-gray-700">{item.definition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Use Case */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-3">
            App ini digunakan untuk:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Planning persiapan sebelum berangkat</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Tracking progress saat sudah di Australia</span>
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={onClose}
          className="w-full px-8 py-3 bg-indo-red text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
        >
          Mulai Sekarang
        </button>
      </div>
    </Modal>
  );
};

export default OnboardingModal;
