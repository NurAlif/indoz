# AGENT 07: Complete Guides (Panduan Lengkap)

**Status:** PARALLEL (Can start after Agents 01-03 complete)
**Dependencies:** Agent 01 (Foundation), Agent 02 (Navigation)
**Priority:** MEDIUM - Informational feature

---

## 🎯 Your Mission

Build a comprehensive guide system with 4 tabs (Persiapan, Tiba, Hidup, Masa Depan), sticky table of contents, and integrated consultation form with proper form contrast.

---

## 📚 Required Reading (Read FIRST)

Before writing ANY code, you MUST read:

1. **[../Prompt.md](../Prompt.md)** - Complete project specifications
   - Focus on: Section 3.6 (Panduan Lengkap) - COMPLETE SPEC
   - Focus on: Section 2.1 (System Level MUST FIX issues)

2. **[../final-evaluation.md](../final-evaluation.md)** - Evaluation requirements
   - Focus on: Section 4 (Panduan Lengkap) - all issues and good practices

3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - For components and utilities

4. **Screenshots to Reference:**
   - `../panduan-lengkap.png` - Complete guide interface
   - `../menu-konsultasi-lanjut.png` - Consultation form

---

## 🎨 Critical Requirements

### MUST FIX (from evaluation):

1. ❌ **FIX** Consultation form - white text on white background
   → ✅ Ensure proper contrast for all form fields

2. ✅ **ADD** Sticky table of contents or side navigation
   - Allow quick navigation between sections
   - Should be visible while scrolling

### MUST KEEP (Good Practices):

- Tab navigation (Persiapan, Tiba, Hidup, Masa Depan)
- Active tab styling (bold + underline)
- External links styled consistently (blue, underlined)
- Consultation form at the bottom

---

## 📋 Your Tasks (Step-by-Step)

### Task 1: Create Guide Content Data

**File:** `src/data/guideContent.js`

```javascript
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
        title: 'Syarat WHV',
        content: `
# Syarat WHV (Working Holiday Visa)

Untuk mendapatkan visa WHV Subclass 417, Anda harus memenuhi syarat-syarat berikut:

## Usia
- 18-30 tahun (inklusif) pada saat aplikasi
- Warga negara Indonesia

## Kesehatan
- Memenuhi persyaratan kesehatan tertentu
- Dapat diminta melakukan pemeriksaan medis

## Karakter
- Tidak memiliki catatan kriminal serius
- Bersedia menjalani pemeriksaan background

## Dana
- Memiliki dana cukup untuk dukungan awal (sekitar AUD 5,000)
- Biaya tiket pesawat pulang

Lihat: [Official Checklist 462](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/work-假日-417) untuk informasi lengkap.
        `,
      },
      {
        id: 'biaya',
        title: 'Biaya yang Diperlukan',
        content: `
# Biaya yang Diperlukan

## Visa Application
- Biaya aplikasi WHV: AUD 510 (harga dapat berubah)
- Asuransi wajib: AUD 300-500/tahun

## Persiapan Dokumen
- IELTS: Rp 3,000,000
- SKCK: Rp 50,000 - Rp 100,000
- Surat Keterangan Sehat: Rp 500,000 - Rp 1,000,000

## Biaya Lain
- Tiket pesawat: Rp 10,000,000 - Rp 15,000,000
- Perlengkapan awal: Rp 2,000,000 - Rp 5,000,000

**Total estimasi:** Rp 20,000,000 - Rp 30,000,000
        `,
      },
      {
        id: 'dokumen',
        title: 'Dokumen yang Harus Disiapkan',
        content: `
# Dokumen yang Harus Disiapkan

## Wajib
- [x] Paspor (valid minimal 6 bulan)
- [x] IELTS Certificate (Overall 4.5+)
- [x] SKCK dari Polda
- [x] Surat Keterangan Sehat
- [x] Bukti dana cukup (bank statement)

## Disarankan
- [ ] CV/Resume dalam bahasa Inggris
- [ ] Referensi kerja (jika ada)
- [ ] Sertifikasi skill tambahan
- [ ] Driver License (jika ada)

**Tip:** Scan semua dokumen dan simpan di cloud/email sebagai backup.
        `,
      },
      {
        id: 'timeline',
        title: 'Timeline Aplikasi',
        content: `
# Timeline Aplikasi

## 3-6 Bulan Sebelumnya
- [ ] Persiapkan dokumen (IELTS, SKCK, dll)
- [ ] Simpan dana untuk biaya aplikasi
- [ ] Riset tentang tempat tujuan

## 1-2 Bulan Sebelumnya
- [ ] Submit aplikasi visa online
- [ ] Bayar biaya visa
- [ ] Tunggu proses (biasanya 2-6 minggu)

## 1 Bulan Sebelumnya
- [ ] Booking tiket pesawat
- [ ] Cari akomodasi sementara (hostel)
- [ ] Packing barang bawaan

## 1 Minggu Sebelumnya
- [ ] Konfirmasi semua reservasi
- [ ] Siapkan dokumen fisik
- [ ] Informasi bank & operator seluler tentang perjalanan
        `,
      },
    ],
  },

  tiba: {
    title: 'Saat Tiba di Australia',
    sections: [
      {
        id: 'imigrasi',
        title: 'Proses Imigrasi',
        content: `
# Proses Imigrasi di Bandara

## Saat Turun dari Pesawat
1. Ikuti tanda "Arrivals" dan "Immigration"
2. Siapkan paspor dan visa grant letter
3. Isi Incoming Passenger Card (diberikan di pesawat)

## Di Counter Imigrasi
- Jawab pertanyaan petugas dengan jujur
- Sebutkan datang dengan WHV untuk holiday & work
- Tidak perlu menyebutkan rencana kerja spesifik

## Setelah Imigrasi
- Ambil bagasi
- Lewati biosecurity (declare makanan/obat)
- Keluar ke arrival hall

**PENTING:** Jangan bawa makanan/obat tanpa declare - dendanya besar!
        `,
      },
      {
        id: 'akomodasi',
        title: 'Mencari Tempat Tinggal',
        content: `
# Mencari Tempat Tinggal

## Opsi Akomodasi

### Hostel/Backpacker (Rp 300,000 - 600,000/malam)
- Paling populer untuk pemegang WHV
- Mudah bertemu orang lain
- Kontrak fleksibel (bisa per minggu)

### Share House (Rp 3,000,000 - 6,000,000/bulan)
- Lebih murah untuk jangka panjang
- Butuh deposit (biasanya 2-4 minggu sewa)
- Cari di Facebook Marketplace, Gumtree

### Rental Sendiri (Rp 8,000,000+)
- Lebih privasi tapi mahal
- Kontrak minimal 6-12 bulan
- Butuh referensi & bukti income

## Website Populer
- [Flatmates.com.au](https://flatmates.com.au) - Cari roommate
- [Facebook Marketplace](https://facebook.com/marketplace) - Share house
- [Realestate.com.au](https://realestate.com.au) - Rental apartment
        `,
      },
      {
        id: 'tfn-super',
        title: 'TFN & Superannuation',
        content: `
# TFN & Superannuation

## TFN (Tax File Number)
**Wajib punya jika ingin bekerja secara legal.**

### Cara Apply
1. Kunjungi [ato.gov.au](https://ato.gov.au)
2. Apply online (butuh paspor)
3. Gratis, proses 2-4 minggu
4. TFN akan dikirim ke alamat di Australia

### Pentingnya TFN
- Wajib untuk buka bank account
- Wajib untuk kerja legal
- Tanpa TFN, tax rate 47% (dengan TFN max 32%)

## Superannuation
- Tabungan wajib dari gaji (11%)
- Bisa di-claim saat pulang permanen
- Pilih fund: AustralianSuper, Hostplus

**Tip:** Apply TFN segera setelah punya alamat Australia!
        `,
      },
    ],
  },

  hidup: {
    title: 'Hidup di Australia',
    sections: [
      {
        id: 'biaya-hidup',
        title: 'Biaya Hidup',
        content: `
# Biaya Hidup per Bulan

## Sydney/Melbourne (Mahal)
- Share room: Rp 4,000,000 - 6,000,000
- Makan: Rp 3,000,000 - 4,000,000
- Transport: Rp 1,000,000 - 1,500,000
- Internet/Phone: Rp 500,000 - 800,000
- Lain-lain: Rp 1,000,000 - 2,000,000

**Total: Rp 9,500,000 - 14,300,000**

## Regional (Lebih Murah)
- Share room: Rp 2,500,000 - 4,000,000
- Makan: Rp 2,000,000 - 3,000,000
- Transport: Rp 500,000 (banyak jalan kaki/sepeda)

**Total: Rp 6,000,000 - 9,500,000**

**Tip:** Regional lebih murah dan hitung untuk 88 days!
        `,
      },
      {
        id: 'transport',
        title: 'Transportasi',
        content: `
# Transportasi

## Public Transport
- **Sydney**: Opal Card (Train/Bus/Ferry)
- **Melbourne**: Myki Card (Train/Tram/Bus)
- **Brisbane**: Go Card (Train/Bus)

### Harga (Per Trip)
- Peak hour: Rp 30,000 - 50,000
- Off-peak: Rp 20,000 - 35,000
- Sunday cap: Rp 60,000 (unlimited trips)

## Kendaraan Pribadi
- Beli motor bekas: Rp 8,000,000 - 15,000,000
- Beli mobil bekas: Rp 50,000,000 - 100,000,000
- Asuransi wajib: Rp 1,000,000+ /tahun
- Bengkel & sparepart mahal

**Rekomendasi:** Di kota besar pakai public transport. Di regional pertimbangkan beli motor.
        `,
      },
      {
        id: 'mencari-kerja',
        title: 'Mencari Kerja',
        content: `
# Mencari Kerja

## Website Populer
- [Seek](https://seek.com.au) - Job board terbesar
- [Indeed](https://indeed.com.au) - Job board internasional
- [Gumtree](https://gumtree.com.au) - Classified ads (banyak casual jobs)
- [Facebook Groups](https://facebook.com) - WHV Australia Groups

## Jenis Kerja Populer untuk WHV

### Hospitality (Cafe/Restaurant)
- Barista, Waitstaff, Kitchen Hand
- Gaji: Rp 150,000 - 250,000/jam
- Tip: Sering ada cash tip (tidak semua tempat)

### Farm Work (88 Days Eligible)
- Fruit Picking, Packing, Farm Hand
- Gaji: Rp 170,000 - 300,000/jam (kadang piece rate)
- Biasanya ada akomodasi gratis/murah

### Retail
- Sales Assistant, Cashier
- Gaji: Rp 150,000 - 220,000/jam
- Butuh bahasa Inggris cukup baik

**Tip:** Untuk 88 days, cari kerja di regional area!
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
# Extension WHV Kedua

## Syarat Utama
- [x] Selesaikan 88 days regional work
- [x] Apply sebelum WHV pertama expired
- [x] Usia masih di bawah 31 tahun

## Apa itu 88 Days?
- 3 bulan kerja di regional Australia
- Boleh tidak berturut-turut
- Boleh di beberapa employer
- Boleh part-time (jam dihitung)

## Regional Areas
- **NSW**: Selain Sydney, Newcastle, Wollongong
- **QLD**: Selain Brisbane, Gold Coast
- **VIC**: Selain Melbourne, Geelong
- Seluruh WA, SA, TAS, NT adalah regional

**Dokumen:** Simpan slip gaji, contract, reference letter untuk bukti!
        `,
      },
      {
        id: 'pathway-pr',
        title: 'Pathway ke PR',
        content: `
# Pathway ke Permanent Residency

## Visa 189 (Skilled Independent)
- Tidak butuh sponsor
- Butuh skill assessment
- Butuh high English score (IELTS 8+)
- Points test: harus 65+ poin
- Competition sangat tinggi

## Visa 190 (Skilled Nominated)
- Butuh state sponsorship
- Lebih mudah daripada 189
- Harus tinggal di sponsoring state
- Points test: 65+ poin (tapi lower cutoff)

## Visa 491 (Skilled Work Regional)
- Regional area only
- 5 years visa (leading to PR)
- Butuh regional sponsorship
- Lebih mudah daripada 189/190

## Student Visa (Subclass 500)
- Study 2 years di Australia
- Graduate → 485 visa → 189/190
- Biaya kuliah: Rp 150,000,000+ /tahun

**Tip:** Kalkulator poin PR ada di menu IndOz+ (Premium)
        `,
      },
      {
        id: 'skill-assessment',
        title: 'Skill Assessment',
        content: `
# Skill Assessment

## Apa itu Skill Assessment?
Evaluasi kualifikasi & pengalaman kerja oleh organisasi profesional di Australia.

## Organisasi Populer
- **Accounting**: CPA/CA/IPA
- **IT**: ACS
- **Engineering**: Engineers Australia
- **Nursing**: ANMAC
- **Trades**: TRA

## Proses Umum
1. Cek ANZSCO code untuk job Anda
2. Persiapkan dokumen (ijazah, transkrip, referensi kerja)
3. Apply ke assessing body
4. Biaya: Rp 10,000,000 - 25,000,000
5. Proses: 2-6 bulan

**Penting:** Skill assessment hanya bisa dilakukan untuk occupation di [MLTSSL/STSOL list](https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list).
        `,
      },
    ],
  },
};
```

### Task 2: Create GuideTabs Component

**File:** `src/components/guides/GuideTabs.jsx`

```jsx
import React from 'react';
import { cn } from '../../utils/cn';
import { GUIDE_TABS } from '../../data/guideContent';

const GuideTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex border-b border-gray-200">
        {GUIDE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-indo-red border-b-2 border-indo-red bg-indo-red/5"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GuideTabs;
```

### Task 3: Create TableOfContents Component

**File:** `src/components/guides/TableOfContents.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

const TableOfContents = ({ sections = [], activeSection = '' }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "hidden lg:block w-64 flex-shrink-0 transition-all",
        isSticky ? "sticky top-24" : ""
      )}
    >
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Daftar Isi</h4>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={cn(
                "block text-sm py-1 px-2 rounded transition-colors",
                activeSection === section.id
                  ? "bg-indo-red/10 text-indo-red font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;
```

### Task 4: Create GuideContent Component

**File:** `src/components/guides/GuideContent.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../../utils/cn';

const GuideContent = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => document.getElementById(s.id));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="flex-1 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-16 scroll-mt-24"
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-medium text-gray-900 mb-2 mt-6">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-700">{children}</li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info underline hover:text-info/80"
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">
                    {children}
                  </strong>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-100 text-indo-red px-1 py-0.5 rounded text-sm">
                    {children}
                  </code>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-indo-red bg-indo-red/5 p-4 my-4 italic text-gray-700">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {section.content}
            </ReactMarkdown>
          </section>
        ))}
      </div>
    </div>
  );
};

export default GuideContent;
```

### Task 5: Create ConsultationForm Component

**File:** `src/components/guides/ConsultationForm.jsx`

```jsx
import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { isValidEmail, isValidPhone } from '../../utils/validation';
import { cn } from '../../utils/cn';

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    needs: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.needs) {
      newErrors.needs = 'Pilih kebutuhan konsultasi';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor HP wajib diisi';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Format nomor HP tidak valid';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="text-success" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Terima Kasih!
          </h3>
          <p className="text-gray-600">
            Permintaan konsultasi Anda telah terkirim. Kami akan menghubungi Anda segera.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Butuh Bantuan Lebih Lanjut?
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Konsultasi gratis dengan ahli imigrasi Australia
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nama"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Nama lengkap Anda"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="email@contoh.com"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kebutuhan Anda <span className="text-error">*</span>
          </label>
          <select
            name="needs"
            value={formData.needs}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent transition-all",
              errors.needs ? "border-error" : "border-gray-300"
            )}
            required
          >
            <option value="">Pilih kebutuhan</option>
            <option value="visa-application">Bantuan Aplikasi Visa</option>
            <option value="pr-planning">Perencanaan PR</option>
            <option value="skill-assessment">Skill Assessment</option>
            <option value="job-search">Mencari Kerja</option>
            <option value="other">Lainnya</option>
          </select>
          {errors.needs && (
            <p className="mt-1 text-sm text-error">{errors.needs}</p>
          )}
        </div>

        <Input
          label="Nomor HP"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="0812 3456 7890"
          helperText="Akan dihubungi via WhatsApp"
          required
        />

        {isSubmitting && (
          <div className="bg-info/10 border-2 border-info/20 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-info flex-shrink-0 mt-0.5" />
            <p className="text-sm text-info">
              Mengirim permintaan konsultasi...
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim'}
        </Button>
      </form>
    </div>
  );
};

export default ConsultationForm;
```

### Task 6: Create Main GuidesContainer Component

**File:** `src/components/guides/GuidesContainer.jsx`

```jsx
import React, { useState } from 'react';
import { GUIDE_TABS, GUIDE_CONTENT } from '../../data/guideContent';
import GuideTabs from './GuideTabs';
import TableOfContents from './TableOfContents';
import GuideContent from './GuideContent';
import ConsultationForm from './ConsultationForm';

const GuidesContainer = () => {
  const [activeTab, setActiveTab] = useState('persiapan');
  const [activeSection, setActiveSection] = useState('');

  const currentContent = GUIDE_CONTENT[activeTab];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Panduan Lengkap</h1>
        <p className="text-gray-600 text-sm mt-1">
          Panduan lengkap untuk WHV dan kehidupan di Australia
        </p>
      </div>

      {/* Tabs */}
      <GuideTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Area */}
      <div className="mt-6">
        {/* Two-column layout on desktop */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Table of Contents - Desktop Only */}
          <TableOfContents
            sections={currentContent.sections}
            activeSection={activeSection}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Title */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentContent.title}
              </h2>
            </div>

            {/* Content Sections */}
            <GuideContent sections={currentContent.sections} />
          </div>
        </div>
      </div>

      {/* Consultation Form */}
      <div className="mt-12">
        <ConsultationForm />
      </div>
    </div>
  );
};

export default GuidesContainer;
```

---

## ✅ Checklist Before Completing

- [ ] Guide content data created (guideContent.js)
- [ ] GuideTabs component with 4 tabs
- [ ] TableOfContents component with sticky behavior
- [ ] GuideContent component with markdown rendering
- [ ] ConsultationForm component with proper contrast
- [ ] All form validations working
- [ ] External links open in new tab
- [ ] Smooth scrolling to sections
- [ ] Active section highlighting in TOC
- [ ] Responsive design (desktop: sidebar TOC, mobile: hidden)
- [ ] Form submission handling
- [ ] Success state after form submit
- [ ] All form fields have proper contrast (FIX white-on-white issue)
- [ ] Tested: All tabs switch correctly
- [ ] Tested: TOC links scroll to sections
- [ ] Tested: Form validation works
- [ ] Tested: Form submission works

---

## 📤 Deliverables

When you're done, the following should exist:

```
src/
├── components/
│   └── guides/
│       ├── GuidesContainer.jsx    ✅
│       ├── GuideTabs.jsx          ✅
│       ├── TableOfContents.jsx    ✅
│       ├── GuideContent.jsx       ✅
│       └── ConsultationForm.jsx   ✅
└── data/
    └── guideContent.js            ✅
```

---

## 🎨 Visual Reference

Your guides interface should look like this:

```
┌─────────────────────────────────────────────────────────┐
│  PANDUAN LENGKAP                                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ [Persiapan] [Tiba] [Hidup] [Masa Depan]        │   │
│  │    ──────                                        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌────────────┐  ┌─────────────────────────────────┐   │
│  │ Daftar Isi │  │  Persiapan Sebelum Berangkat    │   │
│  │            │  ├─────────────────────────────────┤   │
│  │ • Syarat   │  │  # Syarat WHV                   │   │
│  │   WHV      │  │                                 │   │
│  │ • Biaya    │  │  Untuk mendapatkan visa...      │   │
│  │ • Dokumen  │  │                                 │   │
│  │ • Timeline │  │  [Content rendered here...]     │   │
│  │            │  │                                 │   │
│  └────────────┘  │  # Biaya yang Diperlukan       │   │
│                  │                                 │   │
│                  └─────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Butuh bantuan lebih lanjut?                    │   │
│  │                                                  │   │
│  │  Form:                                           │   │
│  │  ┌──────────────────────────────────────┐       │   │
│  │  │ Nama:                    [visible✅]  │       │   │
│  │  │ Email:                   [visible✅]  │       │   │
│  │  │ Kebutuhan: [dropdown ▼]   [visible✅]  │       │   │
│  │  │ No HP:                   [visible✅]  │       │   │
│  │  │                                  [Kirim]│       │   │
│  │  └──────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## ⚠️ Important Notes

1. **MUST FIX** consultation form contrast - no white text on white background
2. **DO NOT** skip the sticky TOC - it's critical for UX
3. **DO** use markdown for content - easier to maintain
4. **DO NOT** make all tabs visible on mobile - use horizontal scroll
5. **DO** ensure external links open in new tab (security)
6. **DO** validate all form inputs properly
7. **DO NOT** include sensitive information in guides

**Note:** You'll need to install `react-markdown` for markdown rendering:
```bash
npm install react-markdown
```

---

**Questions? Reference:**
- [../Prompt.md](../Prompt.md) - Section 3.6 for complete guides specs
- [../final-evaluation.md](../final-evaluation.md) - Section 4 for guides issues
- [../panduan-lengkap.png](../panduan-lengkap.png) - Visual reference
