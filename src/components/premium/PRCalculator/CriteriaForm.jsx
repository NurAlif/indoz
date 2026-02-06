import React from 'react';
import GlossaryTooltip from '../../common/GlossaryTooltip';

const CriteriaForm = ({ criteria, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const Select = ({ label, name, options, tooltipTerm, tooltipDef }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <span className="flex items-center gap-1">
            {label}
            {tooltipTerm && <GlossaryTooltip term={tooltipTerm} definition={tooltipDef} />}
        </span>
      </label>
      <select
        name={name}
        value={criteria[name] || ''}
        onChange={handleChange}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indo-red focus:ring-indo-red text-gray-900 bg-white p-2.5 border"
      >
        <option value="" disabled>Pilih...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
      {/* Age */}
      <Select
        label="Umur"
        name="age"
        options={[
          { value: '18-24', label: '18-24 tahun' },
          { value: '25-32', label: '25-32 tahun' },
          { value: '33-39', label: '33-39 tahun' },
          { value: '40-44', label: '40-44 tahun' },
          { value: '45-49', label: '45-49 tahun' },
        ]}
      />

      {/* English */}
      <Select
        label="Level Bahasa Inggris"
        name="english"
        tooltipTerm="(Level)"
        tooltipDef="Competent (IELTS 6 / PTE 50), Proficient (IELTS 7 / PTE 65), Superior (IELTS 8 / PTE 79)"
        options={[
          { value: 'Competent', label: 'Competent (IELTS 6+)' },
          { value: 'Proficient', label: 'Proficient (IELTS 7+)' },
          { value: 'Superior', label: 'Superior (IELTS 8+)' },
        ]}
      />

      {/* Education */}
      <Select
        label="Pendidikan Tertinggi"
        name="education"
        options={[
          { value: 'Doctorate', label: 'Doktor (PhD)' },
          { value: 'Masters', label: 'Magister (S2)' },
          { value: 'Bachelor', label: 'Sarjana (S1)' },
          { value: 'Diploma', label: 'Diploma / Kualifikasi Kejuruan' },
          { value: 'None', label: 'Lainnya / Tidak ada' },
        ]}
      />

      {/* Experience Overseas */}
      <Select
        label="Pengalaman Kerja (Luar Australia)"
        name="experienceOverseas"
        tooltipTerm="(Info)"
        tooltipDef="Pengalaman kerja skilled di luar Australia dalam 10 tahun terakhir."
        options={[
          { value: '0-3', label: 'Kurang dari 3 tahun' },
          { value: '3-5', label: '3-5 tahun' },
          { value: '5-8', label: '5-8 tahun' },
          { value: '8+', label: '8 tahun atau lebih' },
        ]}
      />

      {/* Experience Australian */}
      <Select
        label="Pengalaman Kerja (Australia)"
        name="experienceAustralian"
        tooltipTerm="(Info)"
        tooltipDef="Pengalaman kerja skilled di dalam Australia dalam 10 tahun terakhir."
        options={[
          { value: '0-1', label: 'Kurang dari 1 tahun' },
          { value: '1-3', label: '1-3 tahun' },
          { value: '3-5', label: '3-5 tahun' },
          { value: '5-8', label: '5-8 tahun' },
          { value: '8+', label: '8 tahun atau lebih' },
        ]}
      />

      {/* Australian Study */}
      <Select
        label="Australian Study Requirement"
        name="australianStudy"
        tooltipTerm="(Info)"
        tooltipDef="Minimal 2 tahun akademik studi di Australia (CRICOS registered)."
        options={[
          { value: 'Yes', label: 'Ya (Min. 2 tahun)' },
          { value: 'No', label: 'Tidak' },
        ]}
      />

      {/* Specialist Education */}
      <Select
        label="Specialist Education (STEM)"
        name="specialistEducation"
        tooltipTerm="(Info)"
        tooltipDef="Masters by Research atau PhD di bidang STEM di Australia (min 2 tahun)."
        options={[
          { value: 'Yes', label: 'Ya' },
          { value: 'No', label: 'Tidak' },
        ]}
      />

      {/* NAATI */}
      <Select
        label="NAATI / CCL"
        name="naati"
        tooltipTerm="(Info)"
        tooltipDef="Credentialed Community Language. Lulus tes penerjemah NAATI/CCL."
        options={[
          { value: 'Yes', label: 'Ya (Lulus)' },
          { value: 'No', label: 'Tidak' },
        ]}
      />

      {/* Professional Year */}
      <Select
        label="Professional Year"
        name="professionalYear"
        tooltipTerm="(Info)"
        tooltipDef="Program Professional Year (Accounting, IT, Engineering) di Australia."
        options={[
          { value: 'Yes', label: 'Ya' },
          { value: 'No', label: 'Tidak' },
        ]}
      />

       {/* Regional Study */}
       <Select
        label="Regional Study"
        name="regionalStudy"
        tooltipTerm="(Info)"
        tooltipDef="Tinggal dan studi di area regional Australia."
        options={[
          { value: 'Yes', label: 'Ya' },
          { value: 'No', label: 'Tidak' },
        ]}
      />

      {/* Partner Skills */}
      <Select
        label="Partner Skills"
        name="partnerSkills"
        tooltipTerm="(Info)"
        tooltipDef="Poin dari status pasangan atau skill pasangan."
        options={[
          { value: 'Single', label: 'Single (Belum Menikah)' },
          { value: 'Skilled', label: 'Pasangan Skilled + Competent English' },
          { value: 'Competent English', label: 'Pasangan Competent English' },
          { value: 'None', label: 'Pasangan Tidak Memenuhi Syarat / Lainnya' },
        ]}
      />

    </div>
  );
};

export default CriteriaForm;
