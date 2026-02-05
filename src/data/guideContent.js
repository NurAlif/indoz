export const GUIDE_TABS = [
  { id: 'persiapan', label: 'Persiapan' },
  { id: 'tiba', label: 'Tiba' },
  { id: 'hidup', label: 'Hidup' },
  { id: 'masadepan', label: 'Masa Depan' },
];

export const GUIDE_CONTENT = {
  persiapan: {
    title: 'Persiapan Sebelum Berangkat',
    sections: [
      {
        id: 'syarat-whv',
        title: 'Syarat WHV (Working Holiday Visa)',
        content: `
Lihat: [Official Checklist 462](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-假日-417) untuk informasi lengkap.
        `,
      },
      {
        id: 'biaya',
        title: 'Biaya yang Diperlukan',
        content: `
Estimasi total biaya yang diperlukan untuk aplikasi WHV dan keberangkatan.
        `,
      },
      {
        id: 'dokumen',
        title: 'Dokumen yang Harus Disiapkan',
        content: `
Dokumen-dokumen berikut harus disiapkan untuk aplikasi WHV Anda.
        `,
      },
      {
        id: 'timeline',
        title: 'Timeline Aplikasi',
        content: `
Timeline persiapan aplikasi WHV dari 6 bulan sebelum keberangkatan.
        `,
      },
    ],
  },

  tiba: {
    title: 'Saat Tiba di Australia',
    sections: [
      {
        id: 'imigrasi',
        title: 'Proses Imigrasi di Bandara',
        content: `
Panduan proses imigrasi saat tiba di bandara Australia.
        `,
      },
      {
        id: 'akomodasi',
        title: 'Mencari Tempat Tinggal',
        content: `
Pilihan akomodasi yang tersedia untuk pemegang WHV beserta kelebihannya.
        `,
      },
      {
        id: 'tfn-super',
        title: 'TFN & Superannuation',
        content: `
Panduan lengkap mengenai Tax File Number (TFN) dan Superannuation yang wajib dimiliki saat bekerja di Australia.
        `,
      },
    ],
  },

  hidup: {
    title: 'Hidup di Australia',
    sections: [
      {
        id: 'biaya-hidup',
        title: 'Biaya Hidup per Bulan',
        content: `
Perbandingan biaya hidup antara kota besar (Sydney/Melbourne) dengan regional area.
        `,
      },
      {
        id: 'transport',
        title: 'Transportasi',
        content: `
Pilihan transportasi di Australia mulai dari public transport hingga kendaraan pribadi.
        `,
      },
      {
        id: 'mencari-kerja',
        title: 'Mencari Kerja',
        content: `
Website pencarian kerja dan jenis pekerjaan populer untuk pemegang WHV di Australia.
        `,
      },
    ],
  },

  masadepan: {
    title: 'Masa Depan & PR',
    sections: [
      {
        id: 'extension-whv',
        title: 'Extension WHV Kedua',
        content: `
Panduan untuk mendapatkan visa WHV kedua dengan menyelesaikan 88 days regional work.
        `,
      },
      {
        id: 'pathway-pr',
        title: 'Pathway ke Permanent Residency',
        content: `
Jenis-jenis visa dan pathway untuk mendapatkan Permanent Residency (PR) di Australia.
        `,
      },
      {
        id: 'skill-assessment',
        title: 'Skill Assessment',
        content: `
Penjelasan mengenai Skill Assessment yang diperlukan untuk pathway PR di Australia.
        `,
      },
    ],
  },
};
