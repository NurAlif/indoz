import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import { cn } from '../../utils/cn';
import { GuideCard, GuideTimeline } from './shared';
import GlossaryTooltip from '../common/GlossaryTooltip';

const ChecklistItem = ({ checked, text }) => (
  <li className="flex items-start gap-3 py-2">
    <span className={cn(
      "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-sm transition-colors duration-300",
      checked ? "bg-success text-white shadow-sm" : "bg-gray-200 text-gray-500"
    )}>
      {checked ? "✓" : ""}
    </span>
    <span className="text-gray-700">{text}</span>
  </li>
);

// Visual section renders
const renderSyaratWHV = () => (
  <div className="space-y-6">
    <p className="text-gray-700 leading-relaxed">
      Untuk mendapatkan visa <GlossaryTooltip term="WHV" /> Subclass 417, Anda harus memenuhi syarat-syarat berikut:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <GuideCard
        icon="👤"
        title="Usia"
        color="info"
        items={[
          "18-30 tahun (inklusif) pada saat aplikasi",
          "Warga negara Indonesia"
        ]}
      />
      <GuideCard
        icon="🏥"
        title="Kesehatan"
        color="success"
        items={[
          "Memenuhi persyaratan kesehatan tertentu",
          "Dapat diminta melakukan pemeriksaan medis"
        ]}
      />
      <GuideCard
        icon="🛡️"
        title="Karakter"
        color="warning"
        items={[
          "Tidak memiliki catatan kriminal serius",
          "Bersedia menjalani pemeriksaan background"
        ]}
      />
      <GuideCard
        icon="💰"
        title="Dana"
        color="purple"
        items={[
          "Memiliki dana cukup untuk dukungan awal (~AUD 5,000)",
          "Biaya tiket pesawat pulang"
        ]}
      />
    </div>
  </div>
);

const renderBiaya = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GuideCard
        title="💳 Visa Application"
        color="info"
        items={[
          "Biaya aplikasi WHV: AUD 510",
          "Asuransi wajib: AUD 300-500/tahun"
        ]}
      />
      <GuideCard
        title="📄 Persiapan Dokumen"
        color="success"
        items={[
          "IELTS: Rp 3,000,000",
          "SKCK: Rp 50,000 - Rp 100,000",
          "Surat Keterangan Sehat: Rp 500,000 - Rp 1,000,000"
        ]}
      />
      <GuideCard
        title="✈️ Biaya Lain"
        color="warning"
        items={[
          "Tiket pesawat: Rp 10,000,000 - Rp 15,000,000",
          "Perlengkapan awal: Rp 2,000,000 - Rp 5,000,000"
        ]}
        footer={
          <div className="font-bold text-gray-900 flex justify-between">
            <span>Estimasi Total:</span>
            <span className="text-indo-red">Rp 20 - 30jt</span>
          </div>
        }
      />
    </div>
  </div>
);

const renderDokumen = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-success text-xl">✓</span> Dokumen Wajib
        </h4>
        <ul className="divide-y divide-gray-100">
          <ChecklistItem checked text="Paspor (valid minimal 6 bulan)" />
          <ChecklistItem checked text="IELTS Certificate (Overall 4.5+)" />
          <ChecklistItem checked text="SKCK dari Polda" />
          <ChecklistItem checked text="Surat Keterangan Sehat" />
          <ChecklistItem checked text="Bukti dana cukup (bank statement)" />
        </ul>
      </div>
      <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-gray-400 text-xl">○</span> Dokumen Disarankan
        </h4>
        <ul className="divide-y divide-gray-100">
          <ChecklistItem checked={false} text="CV/Resume dalam bahasa Inggris" />
          <ChecklistItem checked={false} text="Referensi kerja (jika ada)" />
          <ChecklistItem checked={false} text="Sertifikasi skill tambahan" />
          <ChecklistItem checked={false} text="Driver License (jika ada)" />
        </ul>
      </div>
    </div>
    <div className="bg-info/10 border-l-4 border-info p-4 rounded-r-lg text-sm text-gray-700 shadow-sm animate-in fade-in slide-in-from-bottom-4">
      <strong>💡 Tip:</strong> Scan semua dokumen dan simpan di cloud/email sebagai backup untuk keamanan.
    </div>
  </div>
);

const renderTimeline = () => (
  <div className="space-y-6">
    <GuideTimeline
      steps={[
        {
          icon: "1",
          title: "3-6 Bulan Sebelumnya",
          items: [
            "Persiapkan dokumen (IELTS, SKCK, dll)",
            "Simpan dana untuk biaya aplikasi",
            "Riset tentang tempat tujuan"
          ]
        },
        {
          icon: "2",
          title: "1-2 Bulan Sebelumnya",
          items: [
            "Submit aplikasi visa online",
            "Bayar biaya visa",
            "Tunggu proses (biasanya 2-6 minggu)"
          ]
        },
        {
          icon: "3",
          title: "1 Bulan Sebelumnya",
          items: [
            "Booking tiket pesawat",
            "Cari akomodasi sementara (hostel)",
            "Packing barang bawaan"
          ]
        },
        {
          icon: "4",
          title: "1 Minggu Sebelumnya",
          items: [
            "Konfirmasi semua reservasi",
            "Siapkan dokumen fisik",
            "Informasikan bank & operator seluler"
          ]
        }
      ]}
    />
  </div>
);

const renderBiayaHidup = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GuideCard
        title="🏙️ Sydney/Melbourne (Mahal)"
        color="danger"
        className="from-red-50 to-orange-50 bg-gradient-to-br"
        footer={
          <div className="font-bold text-error flex justify-between">
            <span>Total Estimasi:</span>
            <span>Rp 9.5 - 14.3jt/bln</span>
          </div>
        }
      >
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex justify-between"><span>Share room:</span><span className="font-medium">Rp 4-6jt</span></li>
          <li className="flex justify-between"><span>Makan:</span><span className="font-medium">Rp 3-4jt</span></li>
          <li className="flex justify-between"><span>Transport:</span><span className="font-medium">Rp 1-1.5jt</span></li>
          <li className="flex justify-between"><span>Internet/Phone:</span><span className="font-medium">Rp 500-800rb</span></li>
          <li className="flex justify-between"><span>Lain-lain:</span><span className="font-medium">Rp 1-2jt</span></li>
        </ul>
      </GuideCard>

      <GuideCard
        title="🌾 Regional (Lebih Murah)"
        color="success"
        className="from-green-50 to-emerald-50 bg-gradient-to-br"
        footer={
          <div className="space-y-2">
            <div className="font-bold text-success flex justify-between">
              <span>Total Estimasi:</span>
              <span>Rp 6 - 9.5jt/bln</span>
            </div>
            <p className="text-xs text-green-700 font-medium italic">✓ Regional lebih murah dan hitung untuk <GlossaryTooltip term="88 Days" />!</p>
          </div>
        }
      >
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex justify-between"><span>Share room:</span><span className="font-medium">Rp 2.5-4jt</span></li>
          <li className="flex justify-between"><span>Makan:</span><span className="font-medium">Rp 2-3jt</span></li>
          <li className="flex justify-between"><span>Transport:</span><span className="font-medium">Rp 500rb</span></li>
          <li className="flex justify-between"><span>Lain-lain:</span><span className="font-medium">Rp 1jt</span></li>
        </ul>
      </GuideCard>
    </div>
  </div>
);

const renderImigrasi = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GuideCard
        icon="✈️"
        title="Saat Turun Pesawat"
        color="info"
        items={[
          "Ikuti tanda \"Arrivals\" dan \"Immigration\"",
          "Siapkan paspor dan visa grant letter",
          "Isi Incoming Passenger Card"
        ]}
      />
      <GuideCard
        icon="🛂"
        title="Di Counter Imigrasi"
        color="warning"
        items={[
          "Jawab pertanyaan petugas dengan jujur",
          "Sebutkan datang dengan WHV untuk holiday & work",
          "Tidak perlu menyebutkan rencana kerja spesifik"
        ]}
      />
      <GuideCard
        icon="🛄"
        title="Setelah Imigrasi"
        color="success"
        items={[
          "Ambil bagasi di conveyor belt",
          "Lewati biosecurity (declare makanan/obat)",
          "Keluar ke arrival hall"
        ]}
      />
    </div>

    <div className="bg-error/10 border-l-4 border-error p-4 rounded-r-lg shadow-sm animate-in fade-in slide-in-from-bottom-4">
      <p className="font-semibold text-error flex items-center gap-2">
        <span>⚠️</span>
        <span>PENTING: Jangan bawa makanan/obat tanpa declare - dendanya sangat besar!</span>
      </p>
    </div>
  </div>
);

const renderAkomodasi = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GuideCard
        icon="🏨"
        title="Hostel/Backpacker"
        color="blue"
        className="from-blue-50 to-indigo-50 bg-gradient-to-br"
        footer={<p className="text-xs font-bold text-blue-700">Rp 300rb - 600rb / malam</p>}
        items={[
          "Paling populer untuk pemegang WHV",
          "Mudah bertemu orang lain & cari info",
          "Kontrak fleksibel (bisa per minggu)"
        ]}
      />
      <GuideCard
        icon="🏠"
        title="Share House"
        color="success"
        className="from-green-50 to-emerald-50 bg-gradient-to-br"
        footer={<p className="text-xs font-bold text-green-700">Rp 3jt - 6jt / bulan</p>}
        items={[
          "Lebih murah untuk jangka panjang",
          "Butuh deposit (2-4 minggu sewa)",
          "Cari di FB Marketplace atau Gumtree"
        ]}
      />
      <GuideCard
        icon="🏢"
        title="Rental Sendiri"
        color="purple"
        className="from-purple-50 to-pink-50 bg-gradient-to-br"
        footer={<p className="text-xs font-bold text-purple-700">Rp 8jt+ / bulan</p>}
        items={[
          "Lebih privasi tapi biaya sangat mahal",
          "Kontrak minimal 6-12 bulan",
          "Butuh referensi & bukti income stabil"
        ]}
      />
    </div>

    <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-info">🌐</span> Website Populer Cari Akomodasi
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'Flatmates.com.au', desc: 'Cari roommate & kamar', url: 'https://flatmates.com.au', emoji: '👥' },
          { name: 'FB Marketplace', desc: 'Share house & barang', url: 'https://facebook.com/marketplace', emoji: '📘' },
          { name: 'Realestate.com.au', desc: 'Rental apartment resmi', url: 'https://realestate.com.au', emoji: '🏘️' }
        ].map((site) => (
          <a key={site.name} href={site.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-info hover:bg-info/5 transition-all group shadow-sm">
            <span className="text-3xl group-hover:scale-110 transition-transform">{site.emoji}</span>
            <div>
              <p className="font-bold text-sm text-gray-900">{site.name}</p>
              <p className="text-xs text-gray-500">{site.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const renderTFNSuper = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GuideCard
        icon="📋"
        title="TFN (Tax File Number)"
        color="info"
        footer={
          <div className="bg-info/5 rounded-lg p-3">
            <h4 className="font-bold text-xs text-info mb-1 uppercase tracking-wider">Mengapa Penting?</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Wajib untuk buka rekening bank</li>
              <li>• Wajib untuk bekerja secara legal</li>
              <li>• Tanpa TFN: Pajak 47% (Dengan TFN: max 32%)</li>
            </ul>
          </div>
        }
      >
        <p className="text-sm text-gray-600 mb-4">Wajib punya jika ingin bekerja secara legal di Australia.</p>
        <h4 className="font-bold text-sm text-gray-900 mb-2">Cara Apply:</h4>
        <ol className="space-y-2">
          {[
            { step: '1', text: <span>Kunjungi <a href="https://ato.gov.au" target="_blank" rel="noopener noreferrer" className="text-info underline hover:text-info/80 font-medium">ato.gov.au</a></span> },
            { step: '2', text: 'Apply online (siapkan paspor)' },
            { step: '3', text: 'Gratis, proses 2-4 minggu' },
            { step: '4', text: 'TFN dikirim ke alamat Australia' }
          ].map((item) => (
            <li key={item.step} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="bg-info text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 shadow-sm font-bold">{item.step}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ol>
      </GuideCard>

      <GuideCard
        icon="💼"
        title="Superannuation"
        color="success"
        footer={
          <div className="bg-warning/10 border-l-4 border-warning p-3 rounded-r-lg">
            <p className="text-xs text-gray-700 font-medium italic">
              <strong>💡 Tip:</strong> Apply <GlossaryTooltip term="TFN" /> segera setelah Anda tiba dan punya alamat tetap!
            </p>
          </div>
        }
      >
        <p className="text-sm text-gray-600 mb-4">Tabungan masa tua wajib bagi semua pekerja di Australia.</p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="bg-success/20 text-success p-1.5 rounded-lg text-lg">💰</span>
            <div>
              <p className="font-bold text-sm text-gray-900">Potongan Gaji</p>
              <p className="text-xs text-gray-600">Employer wajib bayar 11% di luar gaji pokok</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-success/20 text-success p-1.5 rounded-lg text-lg">🏦</span>
            <div>
              <p className="font-bold text-sm text-gray-900">Claim Dana</p>
              <p className="text-xs text-gray-600">Bisa di-claim (DASP) saat pulang permanen ke Indonesia</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-success/20 text-success p-1.5 rounded-lg text-lg">📊</span>
            <div>
              <p className="font-bold text-sm text-gray-900">Pilih Fund</p>
              <p className="text-xs text-gray-600">Populer: AustralianSuper, Hostplus, atau ART</p>
            </div>
          </li>
        </ul>
      </GuideCard>
    </div>
  </div>
);

const renderTransport = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <GuideCard
        icon="🚊"
        title="Public Transport"
        color="info"
        footer={
          <div className="space-y-2 pt-2">
            <h5 className="text-sm font-bold text-gray-900 flex items-center gap-1">
              <span className="text-indo-red">★</span> Estimasi Harga (Per Trip)
            </h5>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span>Peak hour:</span><span className="font-bold">Rp 30k - 50k</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1">
                <span>Off-peak:</span><span className="font-bold">Rp 20k - 35k</span>
              </div>
              <div className="flex justify-between text-success bg-success/5 p-1 rounded">
                <span className="font-medium">Sunday cap:</span><span className="font-bold">Rp 60k (Unlimited)</span>
              </div>
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { city: 'Sydney', card: 'Opal Card', color: 'info' },
            { city: 'Melbourne', card: 'Myki Card', color: 'success' },
            { city: 'Brisbane', card: 'Go Card', color: 'warning' }
          ].map((item) => (
            <div key={item.city} className={`bg-gray-50 border border-gray-200 rounded-xl p-3 text-center transition-all hover:border-info hover:shadow-sm`}>
              <p className="font-bold text-xs text-gray-500 uppercase tracking-tighter">{item.city}</p>
              <p className="text-sm font-bold text-gray-900">{item.card}</p>
            </div>
          ))}
        </div>
      </GuideCard>

      <GuideCard
        icon="🚗"
        title="Kendaraan Pribadi"
        color="warning"
        footer={
          <div className="bg-error/5 rounded-lg p-3 border border-error/10">
            <h5 className="text-xs font-bold text-error mb-1 uppercase">Hidden Costs</h5>
            <ul className="text-[10px] text-gray-600 space-y-0.5">
              <li>• Rego & Insuarance: Rp 15jt+/tahun</li>
              <li>• Petrol: Rp 20k - 25k/liter</li>
              <li>• Maintenance & Parkir sangat mahal</li>
            </ul>
          </div>
        }
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-warning transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏍️</span>
              <span className="font-bold text-sm text-gray-700">Motor Bekas</span>
            </div>
            <span className="text-sm font-bold text-warning">Rp 8 - 15 juta</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-warning transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚗</span>
              <span className="font-bold text-sm text-gray-700">Mobil Bekas</span>
            </div>
            <span className="text-sm font-bold text-warning">Rp 50 - 100 juta</span>
          </div>
        </div>
      </GuideCard>
    </div>

    <div className="bg-info/10 border-l-4 border-info p-4 rounded-r-lg shadow-sm">
      <p className="text-sm text-gray-700">
        <strong>💡 Rekomendasi:</strong> Di kota besar gunakan public transport. Di area regional, mobil/motor hampir wajib untuk mobilitas kerja.
      </p>
    </div>
  </div>
);

const renderMencariKerja = () => (
  <div className="space-y-8">
    <div className="bg-white rounded-xl p-6 border-2 border-gray-100 shadow-sm">
      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-info text-xl">🌐</span> Platform Cari Kerja Terpopuler
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: 'Seek.com.au', desc: 'Job board terbesar & resmi', url: 'https://seek.com.au', color: 'bg-blue-600', emoji: '💼' },
          { name: 'Indeed.com.au', desc: 'Job board internasional', url: 'https://indeed.com.au', color: 'bg-blue-400', emoji: '🔍' },
          { name: 'Gumtree.com.au', desc: 'Casual jobs & local gigs', url: 'https://gumtree.com.au', color: 'bg-green-600', emoji: '📰' },
          { name: 'FB Groups', desc: 'WHV Australia Community', url: 'https://facebook.com', color: 'bg-indigo-600', emoji: '👥' }
        ].map((job) => (
          <a key={job.name} href={job.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-info hover:bg-info/5 transition-all group shadow-sm bg-gray-50/50">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm text-white", job.color)}>
              {job.emoji}
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 group-hover:text-info transition-colors">{job.name}</p>
              <p className="text-xs text-gray-500">{job.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="font-bold text-gray-900 flex items-center gap-2">
        <span className="w-10 h-10 bg-oz-gold/20 text-oz-gold rounded-xl flex items-center justify-center">💼</span>
        Jenis Pekerjaan Populer (WHV)
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GuideCard
          title="☕ Hospitality"
          color="warning"
          className="from-amber-50 to-orange-50 bg-gradient-to-br"
          footer={<p className="text-[10px] text-amber-700 italic">Cafe, Restaurant, Hotel, Barista</p>}
          items={[
            "Waitstaff, Kitchen Hand, Barista",
            "Gaji: Rp 250rb - 350rb/jam",
            "Sering mendapatkan cash tips"
          ]}
        />
        <GuideCard
          title="🌾 Farm Work"
          color="success"
          className="from-green-50 to-emerald-50 bg-gradient-to-br"
          footer={<p className="text-[10px] text-green-700 font-bold italic">Eligible for 88 Days ✓</p>}
          items={[
            "Fruit Picking, Packing, Farm Hand",
            "Gaji: Rp 280rb - 400rb/jam",
            "Akomodasi sering disediakan"
          ]}
        />
        <GuideCard
          title="🛍️ Retail & Service"
          color="blue"
          className="from-blue-50 to-indigo-50 bg-gradient-to-br"
          footer={<p className="text-[10px] text-blue-700 italic">Sales, Warehouse, Cleaning</p>}
          items={[
            "Sales Assistant, Cashier, Packer",
            "Gaji: Rp 250rb - 320rb/jam",
            "Butuh Bahasa Inggris yang lancar"
          ]}
        />
      </div>
    </div>

    <div className="bg-success/10 border-l-4 border-success p-4 rounded-r-lg shadow-sm">
      <p className="text-sm text-gray-700 font-medium">
        <strong>💡 Tip Pro:</strong> Untuk <GlossaryTooltip term="88 Days" />, pastikan Anda mencari kerja di area regional agar bisa memperpanjang visa ke tahun ke-2!
      </p>
    </div>
  </div>
);

const renderExtensionWHV = () => (
  <div className="space-y-6">
    <GuideCard
      icon="✅"
      title="Syarat Utama Extension"
      color="success"
      className="from-green-50 to-emerald-50 bg-gradient-to-br"
    >
      <ul className="divide-y divide-green-100">
        <ChecklistItem checked text={<span>Selesaikan <GlossaryTooltip term="88 Days" /> regional work</span>} />
        <ChecklistItem checked text="Apply sebelum WHV pertama expired" />
        <ChecklistItem checked text="Usia masih di bawah 31 tahun (saat apply)" />
        <ChecklistItem checked text="Memiliki paspor Indonesia yang valid" />
      </ul>
    </GuideCard>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GuideCard
        icon="📅"
        title="Apa itu 88 Days?"
        color="info"
        items={[
          "Total 3 bulan (88 hari) kerja di regional",
          "Boleh tidak berturut-turut (akumulasi)",
          "Boleh di beberapa employer berbeda",
          "Pekerjaan harus full-time atau part-time yang setara"
        ]}
      />
      <GuideCard
        icon="🗺️"
        title="Regional Areas"
        color="info"
        items={[
          "NSW: Selain Sydney, Newcastle, Wollongong",
          "QLD: Selain Brisbane, Gold Coast",
          "VIC: Selain Melbourne metro, Geelong",
          "Seluruh WA, SA, TAS, NT adalah regional"
        ]}
      />
    </div>

    <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg shadow-sm animate-in fade-in slide-in-from-bottom-4">
      <p className="text-sm text-gray-700">
        <strong>📎 Bukti Dokumen:</strong> Simpan semua slip gaji (payslips), kontrak kerja, dan reference letter sebagai bukti kuat untuk imigrasi!
      </p>
    </div>
  </div>
);

const renderPathwayPR = () => (
  <div className="space-y-6">
    <p className="text-gray-700 leading-relaxed">
      Berikut adalah jalur umum untuk mendapatkan <GlossaryTooltip term="PR" /> di Australia dari jalur skilled migration:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GuideCard
        title="189 - Skilled Independent"
        color="info"
        className="from-blue-50 to-indigo-50 bg-gradient-to-br shadow-sm"
        footer={<p className="text-[10px] text-error font-bold">Persaingan sangat ketat & poin tinggi</p>}
      >
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Tidak butuh sponsor (State/Employer)</li>
          <li>• Wajib lulus Skill Assessment</li>
          <li>• High English score (PTE 79+ / IELTS 8+)</li>
          <li>• Points test min 65 (Realita 90+)</li>
        </ul>
      </GuideCard>

      <GuideCard
        title="190 - Skilled Nominated"
        color="success"
        className="from-green-50 to-emerald-50 bg-gradient-to-br shadow-sm"
        footer={<p className="text-[10px] text-success font-bold italic">Jalur paling populer & realistis ✓</p>}
      >
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Butuh sponsorship dari Negara Bagian</li>
          <li>• Mendapat tambahan 5 poin bonus</li>
          <li>• Harus tinggal di negara bagian sponsor (2 thn)</li>
          <li>• Kuota lebih banyak daripada 189</li>
        </ul>
      </GuideCard>

      <GuideCard
        title="491 - Skilled Work Regional"
        color="purple"
        className="from-purple-50 to-pink-50 bg-gradient-to-br shadow-sm"
        footer={<p className="text-[10px] text-purple-700 font-bold">Visa 5 thn → Jalur ke PR (191)</p>}
      >
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Khusus untuk bekerja di area Regional</li>
          <li>• Mendapat tambahan 15 poin bonus</li>
          <li>• Butuh regional sponsorship</li>
          <li>• Syarat poin jauh lebih rendah</li>
        </ul>
      </GuideCard>

      <GuideCard
        title="500 - Student Visa"
        color="warning"
        className="from-amber-50 to-orange-50 bg-gradient-to-br shadow-sm"
        footer={<p className="text-[10px] text-amber-700 font-bold uppercase">Membutuhkan modal besar</p>}
      >
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Kuliah min 2 tahun di Australia</li>
          <li>• Graduate → 485 Visa (Kerja) → Skiled Visa</li>
          <li>• Menambah poin Australian Study</li>
          <li>• Biaya kuliah: Rp 150jt - 400jt/tahun</li>
        </ul>
      </GuideCard>
    </div>

    <div className="bg-info/10 border-l-4 border-info p-4 rounded-r-lg text-sm text-gray-700 shadow-sm">
      <strong>💡 Premium Info:</strong> Kalkulator poin <GlossaryTooltip term="PR" /> lengkap tersedia di fitur Premium IndOz.
    </div>
  </div>
);

const renderSkillAssessment = () => (
  <div className="space-y-8">
    <div className="bg-info/5 rounded-2xl p-8 border border-info/20 shadow-inner">
      <h4 className="font-bold text-info mb-4 flex items-center gap-3">
        <span className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">📋</span>
        Apa itu Skill Assessment?
      </h4>
      <p className="text-gray-700 leading-relaxed">
        Proses evaluasi kualifikasi pendidikan dan pengalaman kerja Anda oleh organisasi profesional resmi di Australia untuk memastikan standar Anda setara dengan standar Australia.
      </p>
    </div>

    <div className="space-y-4">
      <h4 className="font-bold text-gray-900 flex items-center gap-2">🏢 Lembaga Assessing Authority</h4>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { name: 'Accounting', tech: 'CPA / CA', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { name: 'IT / Tech', tech: 'ACS', color: 'bg-green-50 text-green-700 border-green-200' },
          { name: 'Engineering', tech: 'EA', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { name: 'Nursing', tech: 'ANMAC', color: 'bg-purple-50 text-purple-700 border-purple-200' },
          { name: 'Trade / Skill', tech: 'TRA', color: 'bg-error/5 text-error border-error/20' }
        ].map((item) => (
          <div key={item.name} className={cn("p-4 rounded-xl border text-center transition-all hover:scale-105 shadow-sm", item.color)}>
            <p className="font-bold text-sm mb-1">{item.name}</p>
            <p className="text-[10px] opacity-80 uppercase tracking-widest">{item.tech}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm space-y-6">
      <h4 className="font-bold text-gray-900 flex items-center gap-2 text-lg">📝 Langkah-langkah Proses</h4>
      <div className="space-y-4">
        {[
          { step: '1', title: 'Cek ANZSCO Code', desc: 'Tentukan kode pekerjaan yang sesuai dengan profesi Anda di daftar resmi.' },
          { step: '2', title: 'Kumpulkan Dokumen', desc: 'Ijazah, Transkrip Nilai, Surat Referensi Kerja, dan Bukti Gaji (Payslips).' },
          { step: '3', title: 'Sertifikasi Bahasa', desc: 'Siapkan sertifikat IELTS/PTE/TOEFL dengan skor yang diminta lembaga.' },
          { step: '4', title: 'Submit & Bayar', desc: 'Biaya rata-rata berkisar antara Rp 10jt - 25jt tergantung lembaga.' },
          { step: '5', title: 'Tunggu Hasil', desc: 'Proses evaluasi biasanya memakan waktu antara 2 hingga 6 bulan.' }
        ].map((item) => (
          <div key={item.step} className="flex gap-4 group">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-info/10 text-info flex items-center justify-center font-bold group-hover:bg-info group-hover:text-white transition-colors">{item.step}</span>
            <div>
              <p className="font-bold text-gray-900 text-sm mb-0.5">{item.title}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg shadow-sm">
      <p className="text-sm text-gray-700">
        <strong>⚠️ Penting:</strong> Skill assessment hanya berlaku untuk pekerjaan yang ada dalam daftar <a href="https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list" target="_blank" rel="noopener noreferrer" className="text-warning underline font-bold">Skilled Occupation List (SOL)</a>.
      </p>
    </div>
  </div>
);

// Special render map
const visualSectionRenderers = {
  'syarat-whv': renderSyaratWHV,
  'biaya': renderBiaya,
  'dokumen': renderDokumen,
  'timeline': renderTimeline,
  'biaya-hidup': renderBiayaHidup,
  'imigrasi': renderImigrasi,
  'akomodasi': renderAkomodasi,
  'tfn-super': renderTFNSuper,
  'transport': renderTransport,
  'mencari-kerja': renderMencariKerja,
  'extension-whv': renderExtensionWHV,
  'pathway-pr': renderPathwayPR,
  'skill-assessment': renderSkillAssessment,
};

const GuideContent = ({ sections = [], onSectionChange }) => {
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => document.getElementById(s.id));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            if (onSectionChange) {
              onSectionChange(sections[i].id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, onSectionChange]);

  return (
    <div className="flex-1 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        {sections.map((section, index) => {
          const visualRenderer = visualSectionRenderers[section.id];

          return (
            <section
              key={section.id}
              id={section.id}
              className="mb-16 scroll-mt-24"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {section.title}
              </h1>

              {visualRenderer ? (
                <div className="visual-content">
                  {visualRenderer()}
                </div>
              ) : (
                <Markdown
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
                </Markdown>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default GuideContent;
