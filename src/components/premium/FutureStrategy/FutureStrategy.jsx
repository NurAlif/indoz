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
        duration: '2 years (typical)',
        cost: '~AUD 30,000/year tuition + living',
        prPathway: 'Graduate → 485 visa → 189/190',
        pros: [
          'Work rights (40hr/fortnight)',
          'Partner can accompany',
          'Pathway jelas ke PR',
          'Meningkatkan English',
        ],
        cons: [
          'Expensive (tuition mahal)',
          'No government benefits',
          'Tidak guarantee PR',
          'Perlu valid IELTS lagi',
        ],
      },
    },
    {
      id: 'partner-visa',
      icon: '💑',
      title: 'Partner Visa (820/801)',
      subtitle: 'Jika pasangan adalah Australian citizen/PR',
      details: {
        duration: '12-24 months processing',
        cost: '~AUD 8,000 visa fee',
        prPathway: 'Direct to PR (tempory then permanent)',
        pros: [
          'Full work rights',
          'Access to healthcare (Medicare)',
          'No study requirement',
          'Permanent outcome',
        ],
        cons: [
          'Processing time sangat lama',
          'Butuh bukti relationship genuine',
          'Expensive application fee',
          'Partner harus sponsor',
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
        duration: '2-4 years',
        cost: 'Employer pays (butuh legal fee ~AUD 5k)',
        prPathway: '482 → 186 (ENS) PR after 3 years',
        pros: [
          'Full work rights',
          'Stable income',
          'Pathway ke PR jelas',
          'Employer membantu proses',
        ],
        cons: [
          'Tied to specific employer',
          'Difficult cari sponsor',
          'Regional work requirement',
          'Risk jika employer breaching',
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
        duration: 'Ongoing',
        cost: 'Minimal (relocation costs)',
        prPathway: '491 → 191 PR',
        pros: [
          'Points bonus untuk regional',
          'Lower cost of living',
          'Priority processing',
          'Community support',
        ],
        cons: [
          'Limited job opportunities',
          'Isolated location',
          'Access to services limited',
          'Culture shock',
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
        <span>Return</span>
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
