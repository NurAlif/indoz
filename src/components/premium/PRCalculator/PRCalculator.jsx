import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import VisaSelector from './VisaSelector';
import CriteriaForm from './CriteriaForm';
import ResultsCard from './ResultsCard';
import StrategyCard from './StrategyCard';
import InlineTooltip from './InlineTooltip';

const PRCalculator = ({ onBack }) => {
  const [visaSubclass, setVisaSubclass] = useState('189');
  const [criteria, setCriteria] = useState({});
  const [points, setPoints] = useState(0);
  const [strategies, setStrategies] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleCriteriaChange = (name, value) => {
    setCriteria(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // Check if all fields are filled
    const requiredFields = [
      'age', 'english', 'education', 'experienceOverseas',
      'experienceAustralian', 'australianStudy', 'specialistEducation',
      'naati', 'professionalYear', 'regionalStudy', 'partnerSkills'
    ];
    // Check if field exists in criteria object (even if empty string, but our Selects set strings)
    // We want to ensure they are not undefined and not empty string (since we init with {} and Selects show placeholder)
    const isComplete = requiredFields.every(field => criteria[field]);

    if (isComplete) {
      calculateAndStrategize();
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [criteria, visaSubclass]);

  const calculateAndStrategize = () => {
    let p = 0;

    // Age
    const ageMap = {
      '18-24': 25, '25-32': 30, '33-39': 25, '40-44': 15, '45-49': 0
    };
    p += ageMap[criteria.age] || 0;

    // English
    const engMap = { 'Competent': 0, 'Proficient': 10, 'Superior': 20 };
    p += engMap[criteria.english] || 0;

    // Education
    const eduMap = {
      'Doctorate': 20, 'Masters': 15, 'Bachelor': 15, 'Diploma': 10, 'None': 0
    };
    p += eduMap[criteria.education] || 0;

    // Exp Overseas
    const expOverseasMap = { '0-3': 0, '3-5': 5, '5-8': 10, '8+': 15 };
    p += expOverseasMap[criteria.experienceOverseas] || 0;

    // Exp Aus
    const expAusMap = { '0-1': 0, '1-3': 5, '3-5': 10, '5-8': 15, '8+': 20 };
    p += expAusMap[criteria.experienceAustralian] || 0;

    // Others
    if (criteria.australianStudy === 'Yes') p += 5;
    if (criteria.specialistEducation === 'Yes') p += 10;
    if (criteria.naati === 'Yes') p += 5;
    if (criteria.professionalYear === 'Yes') p += 5;
    if (criteria.regionalStudy === 'Yes') p += 5;

    // Partner
    const partnerMap = { 'None': 0, 'Competent English': 5, 'Skilled': 10, 'Single': 10 };
    p += partnerMap[criteria.partnerSkills] || 0;

    // Visa 190 Nomination
    if (visaSubclass === '190') p += 5;

    setPoints(p);
    generateStrategies(p);
  };

  const generateStrategies = (currentPoints) => {
    const newStrategies = [];
    const newChallenges = [];

    // Basic eligibility
    if (currentPoints < 65) {
      newStrategies.push(`Anda butuh ${65 - currentPoints} poin lagi untuk mencapai minimum 65.`);
      newChallenges.push('Poin belum memenuhi syarat minimum pengajuan EOI.');
    } else {
      newStrategies.push('Anda sudah eligible untuk mengajukan EOI.');
      if (visaSubclass === '189') {
         newChallenges.push('Persaingan Visa 189 sangat ketat. Cut-off poin bisa mencapai 85-95+ tergantung jurusan.');
      }
    }

    // Specific improvements
    if (criteria.english !== 'Superior') {
      const gain = 20 - (criteria.english === 'Proficient' ? 10 : 0);
      newStrategies.push(`Tingkatkan English ke Superior untuk tambah ${gain} poin.`);
    }

    if (criteria.naati === 'No') {
      newStrategies.push('Ambil tes NAATI/CCL untuk tambah 5 poin.');
    }

    if (criteria.professionalYear === 'No') {
      newStrategies.push('Ikuti Professional Year program jika jurusan IT/Accounting/Engineering (+5 poin).');
    }

    if (criteria.partnerSkills === 'None' || criteria.partnerSkills === 'Competent English') {
       if (criteria.partnerSkills !== 'Skilled' && criteria.partnerSkills !== 'Single') {
          newStrategies.push('Jika punya pasangan, skill assessment pasangan bisa tambah poin maksimal (10 pts).');
       }
    }

    if (visaSubclass === '189' && currentPoints < 85) {
      newStrategies.push('Pertimbangkan Visa 190 (State Nomination) untuk tambahan 5 poin dan peluang invite lebih besar.');
    }

    // 190 specific
    if (visaSubclass === '190') {
        newStrategies.push('Cek persyaratan spesifik setiap state untuk Visa 190, karena berbeda-beda.');
    }

    setStrategies(newStrategies);
    setChallenges(newChallenges);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Kembali ke Dashboard</span>
      </button>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          PR Points Calculator
        </h1>
        <InlineTooltip
            term="PR"
            definition="Permanent Residency (Izin Tinggal Tetap). Status yang memungkinkan Anda tinggal, kerja, dan belajar di Australia tanpa batas waktu."
        />
      </div>

      <VisaSelector selected={visaSubclass} onChange={setVisaSubclass} />

      <CriteriaForm criteria={criteria} onChange={handleCriteriaChange} />

      {showResults && (
        <>
          <ResultsCard
            points={points}
            isEligible={points >= 65}
            visaSubclass={visaSubclass}
          />
          <StrategyCard strategies={strategies} challenges={challenges} />
        </>
      )}
    </div>
  );
};

export default PRCalculator;
