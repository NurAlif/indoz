import React, { useState } from 'react';
import CategoryTabs from './CategoryTabs';
import StrategyCard from './StrategyCard';
import { ArrowLeft } from 'lucide-react';

const STRATEGIES = {
  populer: [
    {
      id: 'student-visa',
      icon: '🎓',
      title: 'Student Visa (500)',
      subtitle: 'Kuliah di Australia untuk pathway ke PR',
      details: {
        duration: '2 tahun (biasanya)',
        cost: '~AUD 30,000/tahun kuliah + biaya hidup',
        prPathway: 'Graduate → Visa 485 → 189/190',
        pros: [
          'Hak kerja (40 jam/2 minggu)',
          'Pasangan bisa ikut',
          'Pathway jelas ke PR',
          'Meningkatkan kemampuan bahasa Inggris',
        ],
        cons: [
          'Mahal (biaya kuliah tinggi)',
          'Tidak ada tunjangan pemerintah',
          'Tidak menjamin PR',
          'Perlu tes IELTS lagi',
        ],
      },
    },
    {
      id: 'partner-visa',
      icon: '💑',
      title: 'Partner Visa (820/801)',
      subtitle: 'Jika pasangan adalah Australian citizen/PR',
      details: {
        duration: '12-24 bulan proses',
        cost: '~AUD 8,000 biaya visa',
        prPathway: 'Langsung ke PR (sementara lalu permanen)',
        pros: [
          'Hak kerja penuh',
          'Akses kesehatan (Medicare)',
          'Tidak ada syarat sekolah',
          'Hasil permanen',
        ],
        cons: [
          'Waktu proses sangat lama',
          'Butuh bukti hubungan asli',
          'Biaya aplikasi mahal',
          'Pasangan harus mensponsori',
        ],
      },
    },
  ],
  hardMode: [
    {
      id: 'employer-sponsored',
      icon: '💼',
      title: 'Employer Sponsored (482)',
      subtitle: 'Ditempatkan oleh employer Australia',
      details: {
        duration: '2-4 tahun',
        cost: 'Ditanggung employer (biaya legal ~AUD 5k)',
        prPathway: '482 → 186 (ENS) PR setelah 3 tahun',
        pros: [
          'Hak kerja penuh',
          'Penghasilan stabil',
          'Pathway ke PR jelas',
          'Employer membantu proses',
        ],
        cons: [
          'Terikat dengan employer tertentu',
          'Sulit mencari sponsor',
          'Syarat kerja regional',
          'Risiko jika employer melanggar',
        ],
      },
    },
  ],
  niche: [
    {
      id: 'regional-work',
      icon: '🌾',
      title: 'Regional Work Program',
      subtitle: 'Priority untuk daerah regional',
      details: {
        duration: 'Berkelanjutan',
        cost: 'Minimal (biaya pindahan)',
        prPathway: '491 → 191 PR',
        pros: [
          'Bonus poin untuk regional',
          'Biaya hidup lebih rendah',
          'Proses prioritas',
          'Dukungan komunitas',
        ],
        cons: [
          'Kesempatan kerja terbatas',
          'Lokasi terisolasi',
          'Akses layanan terbatas',
          'Gegar budaya',
        ],
      },
    },
  ],
};

const FutureStrategy = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('populer');

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Kembali</span>
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Strategi Kembali ke Australia
        </h1>
        <p className="text-gray-600">
          Jika WHV sudah habis, ini opsi legal paling realistis:
        </p>
      </div>

      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="grid gap-6">
        {STRATEGIES[activeCategory]?.map((strategy) => (
          <StrategyCard key={strategy.id} strategy={strategy} />
        ))}
      </div>
    </div>
  );
};

export default FutureStrategy;
