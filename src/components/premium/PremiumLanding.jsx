import React, { useState } from 'react';
import { Lock, Crown, Check, Zap, Shield, Clock, Calculator, ArrowRight, Star, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import TopBar from '../layout/TopBar';

const PREMIUM_FEATURES = [
  {
    icon: <Calculator className="w-8 h-8 text-oz-gold" />,
    title: 'Kalkulator Poin PR',
    description: 'Berhenti menebak. Hitung poin eligibilitas Anda secara akurat dengan alat pintar kami yang dirancang khusus untuk pemegang WHV yang mengincar PR.',
    benefits: ['Pelacakan poin real-time', 'Perencanaan strategis', 'Notifikasi eligibilitas']
  },
  {
    icon: <Clock className="w-8 h-8 text-oz-gold" />,
    title: 'Logbook 88 Hari',
    description: 'Pastikan persetujuan visa tahun kedua dan ketiga Anda. Catat hari kerja pertanian dengan presisi dan buat laporan kepatuhan.',
    benefits: ['Dukungan verifikasi GPS', 'Pengorganisasian slip gaji', 'Hitung mundur hari']
  },
  {
    icon: <Shield className="w-8 h-8 text-oz-gold" />,
    title: 'Brankas Dokumen',
    description: 'Benteng digital aman Anda. Simpan semua dokumen visa, sertifikasi, dan bukti ID Anda terorganisir dan siap untuk hari aplikasi.',
    benefits: ['Penyimpanan terenkripsi', 'Notifikasi kedaluwarsa', 'Ekspor mudah']
  },
  {
    icon: <Zap className="w-8 h-8 text-oz-gold" />,
    title: 'Strategi Masa Depan',
    description: 'Wawasan bertenaga AI untuk membantu merencanakan jalur migrasi Anda setelah Working Holiday Visa.',
    benefits: ['Tren migrasi', 'Penjelajah opsi visa', 'Peta jalan personal']
  }
];

const VALID_ACCESS_CODES = ['BETA2025', 'INDOZ2025', 'PREMIUM'];

const PremiumLanding = ({ onUnlock = () => { } }) => {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setError('Silakan masukkan kode akses');
      return;
    }
    setIsSubmitting(true);
    setError('');

    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 800));

    if (VALID_ACCESS_CODES.includes(accessCode.toUpperCase())) {
      onUnlock(accessCode);
      // Return immediately - navigation will happen via onUnlock
      return;
    } else {
      setError('Kode akses tidak valid. Silakan periksa dan coba lagi.');
    }
    setIsSubmitting(false);
  };

  const handlePurchase = () => {
    // Demo alert
    alert('Akses Demo: Gunakan kode BETA2025 untuk membuka fitur premium.');
  };

  const scrollToUnlock = () => {
    document.getElementById('unlock-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar darkMode={true} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-900 text-white pb-20 pt-20 px-6">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indo-red/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-oz-gold/20 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-oz-gold/20 border border-oz-gold/30 rounded-full mb-6 backdrop-blur-sm">
            <Crown size={16} className="text-oz-gold" />
            <span className="text-oz-gold font-medium text-sm tracking-wide">KEANGGOTAAN PREMIUM</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Wujudkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-oz-gold to-yellow-200">Mimpi Australiamu</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Toolkit lengkap yang dirancang untuk memperlancar perjalanan Working Holiday Visa Anda dan mempercepat jalan menuju Permanent Residency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handlePurchase}
              className="px-8 py-4 bg-indo-red hover:bg-red-700 text-white text-lg font-bold rounded-xl transition-all shadow-lg shadow-indo-red/25 hover:shadow-indo-red/40 hover:-translate-y-1 flex items-center gap-2"
            >
              Dapatkan Akses Premium <ArrowRight size={20} />
            </button>
            <button
              onClick={scrollToUnlock}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-medium rounded-xl backdrop-blur-sm transition-all border border-white/10"
            >
              Punya kode? Buka Akses
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-success" /> Tanpa kartu kredit (Beta)
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-success" /> Aktivasi instan
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Semua yang Anda butuhkan untuk sukses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            IndOz+ Premium memberi Anda keunggulan kompetitif dalam perjalanan migrasi Anda dengan alat kelas profesional.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Gabung Komunitas IndOz+</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Dapatkan akses ke semua fitur premium dan pembaruan masa depan. Mulai perjalanan Anda dengan alat yang tepat hari ini.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handlePurchase}
              className="px-8 py-3 bg-oz-gold hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-colors text-lg"
            >
              Mulai Sekarang
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-400">Akses beta waktu terbatas tersedia.</p>
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
                <h3 className="text-xl font-bold text-gray-900">Akses Member</h3>
                <p className="text-gray-600 text-sm">Sudah punya kode? Masukkan di bawah ini.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Masukkan kode akses Anda (contoh: BETA2025)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent font-mono uppercase"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? 'Memverifikasi...' : 'Buka Akses'}
                  {!isSubmitting && <ChevronRight size={18} />}
                </button>
              </div>
              {error && (
                <p className="absolute -bottom-6 left-0 text-sm text-error mt-1">{error}</p>
              )}
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-between items-center text-sm">
            <span className="text-gray-500">Butuh bantuan?</span>
            <button onClick={handlePurchase} className="text-indo-red font-medium hover:underline">
              Minta Kode Akses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLanding;
