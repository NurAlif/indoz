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
