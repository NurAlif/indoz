import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import { cn } from '../../utils/cn';
import GlossaryTooltip from '../common/GlossaryTooltip';

// Card components for visual layouts
const RequirementCard = ({ icon, title, items, color = 'info' }) => {
  const colorClasses = {
    info: 'bg-info/10 border-info/30 text-info',
    success: 'bg-success/10 border-success/30 text-success',
    warning: 'bg-warning/10 border-warning/30 text-warning',
    danger: 'bg-danger/10 border-danger/30 text-danger',
    purple: 'bg-purple-100 border-purple-300 text-purple-700',
    blue: 'bg-blue-100 border-blue-300 text-blue-700',
  };

  return (
    <div className={cn(
      "bg-white rounded-xl p-6 border-2 shadow-sm hover:shadow-md transition-shadow",
      colorClasses[color]
    )}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
            <span className="text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CostCard = ({ category, items, total, color = 'info' }) => {
  const bgColors = {
    info: 'bg-info/5',
    success: 'bg-success/5',
    warning: 'bg-warning/5',
    purple: 'bg-purple-50',
  };

  return (
    <div className={cn("bg-white rounded-xl p-5 border border-gray-200", bgColors[color])}>
      <h4 className="font-semibold text-gray-900 mb-3">{category}</h4>
      <ul className="space-y-1.5 text-sm">
        {items.map((item, idx) => (
          <li key={idx} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
      {total && (
        <div className="mt-3 pt-3 border-t border-gray-300 font-semibold text-gray-900">
          {total}
        </div>
      )}
    </div>
  );
};

const ChecklistItem = ({ checked, text }) => (
  <li className="flex items-start gap-3 py-2">
    <span className={cn(
      "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-sm",
      checked ? "bg-success text-white" : "bg-gray-200 text-gray-500"
    )}>
      {checked ? "✓" : ""}
    </span>
    <span className="text-gray-700">{text}</span>
  </li>
);

const TimelineCard = ({ period, items, icon }) => (
  <div className="relative pl-8 pb-6 border-l-2 border-info/30">
    <div className="absolute left-0 top-0 w-8 h-8 -translate-x-1/2 bg-info text-white rounded-full flex items-center justify-center text-sm font-bold">
      {icon}
    </div>
    <h4 className="font-semibold text-gray-900 mb-2">{period}</h4>
    <ul className="space-y-1">
      {items.map((item, idx) => (
        <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
          <span className="text-info mt-0.5">▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Visual section renders
const renderSyaratWHV = () => (
  <div className="space-y-6">
    <p className="text-gray-700 leading-relaxed">
      Untuk mendapatkan visa <GlossaryTooltip term="WHV" /> Subclass 417, Anda harus memenuhi syarat-syarat berikut:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <RequirementCard
        icon="👤"
        title="Usia"
        color="info"
        items={[
          "18-30 tahun (inklusif) pada saat aplikasi",
          "Warga negara Indonesia"
        ]}
      />
      <RequirementCard
        icon="🏥"
        title="Kesehatan"
        color="success"
        items={[
          "Memenuhi persyaratan kesehatan tertentu",
          "Dapat diminta melakukan pemeriksaan medis"
        ]}
      />
      <RequirementCard
        icon="🛡️"
        title="Karakter"
        color="warning"
        items={[
          "Tidak memiliki catatan kriminal serius",
          "Bersedia menjalani pemeriksaan background"
        ]}
      />
      <RequirementCard
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CostCard
        category="💳 Visa Application"
        color="info"
        items={[
          <span>Biaya aplikasi <GlossaryTooltip term="WHV" />: AUD 510</span>,
          "Asuransi wajib: AUD 300-500/tahun"
        ]}
      />
      <CostCard
        category="📄 Persiapan Dokumen"
        color="success"
        items={[
          "IELTS: Rp 3,000,000",
          "SKCK: Rp 50,000 - Rp 100,000",
          "Surat Keterangan Sehat: Rp 500,000 - Rp 1,000,000"
        ]}
      />
      <CostCard
        category="✈️ Biaya Lain"
        color="warning"
        items={[
          "Tiket pesawat: Rp 10,000,000 - Rp 15,000,000",
          "Perlengkapan awal: Rp 2,000,000 - Rp 5,000,000"
        ]}
        total="Total: Rp 20,000,000 - Rp 30,000,000"
      />
    </div>
  </div>
);

const renderDokumen = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-success">✓</span> Dokumen Wajib
        </h4>
        <ul>
          <ChecklistItem checked text="Paspor (valid minimal 6 bulan)" />
          <ChecklistItem checked text="IELTS Certificate (Overall 4.5+)" />
          <ChecklistItem checked text="SKCK dari Polda" />
          <ChecklistItem checked text="Surat Keterangan Sehat" />
          <ChecklistItem checked text="Bukti dana cukup (bank statement)" />
        </ul>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-gray-400">○</span> Dokumen Disarankan
        </h4>
        <ul>
          <ChecklistItem checked={false} text="CV/Resume dalam bahasa Inggris" />
          <ChecklistItem checked={false} text="Referensi kerja (jika ada)" />
          <ChecklistItem checked={false} text="Sertifikasi skill tambahan" />
          <ChecklistItem checked={false} text="Driver License (jika ada)" />
        </ul>
      </div>
    </div>
    <div className="bg-info/10 border-l-4 border-info p-4 rounded-r-lg text-sm text-gray-700">
      <strong>Tip:</strong> Scan semua dokumen dan simpan di cloud/email sebagai backup.
    </div>
  </div>
);

const renderTimeline = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <TimelineCard
        icon="1"
        period="3-6 Bulan Sebelumnya"
        items={[
          "Persiapkan dokumen (IELTS, SKCK, dll)",
          "Simpan dana untuk biaya aplikasi",
          "Riset tentang tempat tujuan"
        ]}
      />
      <TimelineCard
        icon="2"
        period="1-2 Bulan Sebelumnya"
        items={[
          "Submit aplikasi visa online",
          "Bayar biaya visa",
          "Tunggu proses (biasanya 2-6 minggu)"
        ]}
      />
      <TimelineCard
        icon="3"
        period="1 Bulan Sebelumnya"
        items={[
          "Booking tiket pesawat",
          "Cari akomodasi sementara (hostel)",
          "Packing barang bawaan"
        ]}
      />
      <TimelineCard
        icon="4"
        period="1 Minggu Sebelumnya"
        items={[
          "Konfirmasi semua reservasi",
          "Siapkan dokumen fisik",
          "Informasikan bank & operator seluler"
        ]}
      />
    </div>
  </div>
);

const renderBiayaHidup = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
        <h4 className="font-bold text-red-800 mb-4">🏙️ Sydney/Melbourne (Mahal)</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between"><span>Share room:</span><span>Rp 4-6jt</span></li>
          <li className="flex justify-between"><span>Makan:</span><span>Rp 3-4jt</span></li>
          <li className="flex justify-between"><span>Transport:</span><span>Rp 1-1.5jt</span></li>
          <li className="flex justify-between"><span>Internet/Phone:</span><span>Rp 500-800rb</span></li>
          <li className="flex justify-between"><span>Lain-lain:</span><span>Rp 1-2jt</span></li>
        </ul>
        <div className="mt-4 pt-4 border-t border-red-300 font-bold text-red-900">
          Total: Rp 9.5 - 14.3jt/bulan
        </div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h4 className="font-bold text-green-800 mb-4">🌾 Regional (Lebih Murah)</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between"><span>Share room:</span><span>Rp 2.5-4jt</span></li>
          <li className="flex justify-between"><span>Makan:</span><span>Rp 2-3jt</span></li>
          <li className="flex justify-between"><span>Transport:</span><span>Rp 500rb</span></li>
        </ul>
        <div className="mt-4 pt-4 border-t border-green-300 font-bold text-green-900">
          Total: Rp 6 - 9.5jt/bulan
        </div>
        <p className="mt-3 text-xs text-green-700">✓ Regional lebih murah dan hitung untuk 88 days!</p>
      </div>
    </div>
  </div>
);

const renderImigrasi = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl p-6 border-2 border-info/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">✈️</span>
          <h3 className="font-bold text-lg">Saat Turun dari Pesawat</h3>
        </div>
        <ol className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="bg-info text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
            <span>Ikuti tanda "Arrivals" dan "Immigration"</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-info text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
            <span>Siapkan paspor dan visa grant letter</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-info text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
            <span>Isi Incoming Passenger Card (diberikan di pesawat)</span>
          </li>
        </ol>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-warning/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🛂</span>
          <h3 className="font-bold text-lg">Di Counter Imigrasi</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-warning mt-0.5">▸</span>
            <span>Jawab pertanyaan petugas dengan jujur</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning mt-0.5">▸</span>
            <span>Sebutkan datang dengan <GlossaryTooltip term="WHV" /> untuk holiday & work</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning mt-0.5">▸</span>
            <span>Tidak perlu menyebutkan rencana kerja spesifik</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-success/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🛄</span>
          <h3 className="font-bold text-lg">Setelah Imigrasi</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">▸</span>
            <span>Ambil bagasi</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">▸</span>
            <span>Lewati biosecurity (declare makanan/obat)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">▸</span>
            <span>Keluar ke arrival hall</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-r-lg">
      <p className="font-semibold text-danger flex items-center gap-2">
        <span>⚠️</span>
        <span>PENTING: Jangan bawa makanan/obat tanpa declare - dendanya besar!</span>
      </p>
    </div>
  </div>
);

const renderAkomodasi = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h4 className="font-bold text-blue-900 mb-2">🏨 Hostel/Backpacker</h4>
        <p className="text-sm text-blue-700 mb-3">Rp 300,000 - 600,000/malam</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">✓</span>
            <span>Paling populer untuk pemegang <GlossaryTooltip term="WHV" /></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">✓</span>
            <span>Mudah bertemu orang lain</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">✓</span>
            <span>Kontrak fleksibel (bisa per minggu)</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h4 className="font-bold text-green-900 mb-2">🏠 Share House</h4>
        <p className="text-sm text-green-700 mb-3">Rp 3,000,000 - 6,000,000/bulan</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Lebih murah untuk jangka panjang</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Butuh deposit (2-4 minggu sewa)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Cari di Facebook Marketplace, Gumtree</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h4 className="font-bold text-purple-900 mb-2">🏢 Rental Sendiri</h4>
        <p className="text-sm text-purple-700 mb-3">Rp 8,000,000+/bulan</p>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">✓</span>
            <span>Lebih privasi tapi mahal</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">✓</span>
            <span>Kontrak minimal 6-12 bulan</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">✓</span>
            <span>Butuh referensi & bukti income</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h4 className="font-bold text-gray-900 mb-4">🌐 Website Populer</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="https://flatmates.com.au" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-info/5 hover:bg-info/10 transition-colors">
          <span className="text-2xl">👥</span>
          <div>
            <p className="font-semibold text-sm">Flatmates.com.au</p>
            <p className="text-xs text-gray-600">Cari roommate</p>
          </div>
        </a>
        <a href="https://facebook.com/marketplace" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-info/5 hover:bg-info/10 transition-colors">
          <span className="text-2xl">📘</span>
          <div>
            <p className="font-semibold text-sm">Facebook Marketplace</p>
            <p className="text-xs text-gray-600">Share house</p>
          </div>
        </a>
        <a href="https://realestate.com.au" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-info/5 hover:bg-info/10 transition-colors">
          <span className="text-2xl">🏘️</span>
          <div>
            <p className="font-semibold text-sm">Realestate.com.au</p>
            <p className="text-xs text-gray-600">Rental apartment</p>
          </div>
        </a>
      </div>
    </div>
  </div>
);

const renderTFNSuper = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 border-2 border-info/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">📋</span>
          <div>
            <h3 className="font-bold text-lg">TFN (Tax File Number)</h3>
            <p className="text-sm text-gray-600">Wajib punya jika ingin bekerja secara legal</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-2">Cara Apply</h4>
            <ol className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <span className="bg-info text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                <span>Kunjungi <a href="https://ato.gov.au" target="_blank" rel="noopener noreferrer" className="text-info underline">ato.gov.au</a></span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="bg-info text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                <span>Apply online (butuh paspor)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="bg-info text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                <span>Gratis, proses 2-4 minggu</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="bg-info text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</span>
                <span>TFN akan dikirim ke alamat di Australia</span>
              </li>
            </ol>
          </div>

          <div className="bg-info/5 rounded-lg p-4">
            <h4 className="font-semibold text-sm text-gray-900 mb-2">Pentingnya TFN</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-info mt-0.5">✓</span>
                <span>Wajib untuk buka bank account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-info mt-0.5">✓</span>
                <span>Wajib untuk kerja legal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-info mt-0.5">✓</span>
                <span>Tanpa TFN: tax rate 47% (dengan TFN max 32%)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border-2 border-success/30">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">💼</span>
          <div>
            <h3 className="font-bold text-lg">Superannuation</h3>
            <p className="text-sm text-gray-600">Tabungan wajib untuk masa depan</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-success/5 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">💰</span>
                <span>Tabungan wajib dari gaji (11%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">🏦</span>
                <span>Bisa di-claim saat pulang permanen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">📊</span>
                <span>Pilih fund: AustralianSuper, Hostplus</span>
              </li>
            </ul>
          </div>

          <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              <strong>💡 Tip:</strong> Apply TFN segera setelah punya alamat Australia!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const renderTransport = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🚊</span> Public Transport
        </h4>
        <div className="space-y-3">
          <div className="bg-info/5 rounded-lg p-3">
            <p className="font-semibold text-sm text-info">Sydney</p>
            <p className="text-xs text-gray-600">Opal Card (Train/Bus/Ferry)</p>
          </div>
          <div className="bg-info/5 rounded-lg p-3">
            <p className="font-semibold text-sm text-info">Melbourne</p>
            <p className="text-xs text-gray-600">Myki Card (Train/Tram/Bus)</p>
          </div>
          <div className="bg-info/5 rounded-lg p-3">
            <p className="font-semibold text-sm text-info">Brisbane</p>
            <p className="text-xs text-gray-600">Go Card (Train/Bus)</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="text-sm font-semibold mb-2">Harga (Per Trip)</h5>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Peak hour:</span>
              <span className="font-semibold">Rp 30,000 - 50,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Off-peak:</span>
              <span className="font-semibold">Rp 20,000 - 35,000</span>
            </div>
            <div className="flex justify-between text-success">
              <span className="text-gray-600">Sunday cap:</span>
              <span className="font-semibold">Rp 60,000 (unlimited trips)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🚗</span> Kendaraan Pribadi
        </h4>
        <div className="space-y-3">
          <div className="bg-warning/5 rounded-lg p-3">
            <p className="font-semibold text-sm text-gray-900">🏍️ Motor Bekas</p>
            <p className="text-lg font-bold text-warning">Rp 8 - 15 juta</p>
          </div>
          <div className="bg-warning/5 rounded-lg p-3">
            <p className="font-semibold text-sm text-gray-900">🚗 Mobil Bekas</p>
            <p className="text-lg font-bold text-warning">Rp 50 - 100 juta</p>
          </div>
          <div className="bg-danger/5 rounded-lg p-3">
            <p className="font-semibold text-sm text-gray-900">Biaya Tambahan</p>
            <ul className="text-xs text-gray-600 mt-1 space-y-1">
              <li>• Asuransi wajib: Rp 1jt+/tahun</li>
              <li>• Bengkel & sparepart mahal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-info/10 border-l-4 border-info p-4 rounded-r-lg text-sm text-gray-700">
      <strong>💡 Rekomendasi:</strong> Di kota besar pakai public transport. Di regional pertimbangkan beli motor.
    </div>
  </div>
);

const renderMencariKerja = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h4 className="font-bold text-gray-900 mb-4">🌐 Website Populer</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <a href="https://seek.com.au" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-info/5 hover:bg-info/10 transition-colors">
          <span className="text-2xl">💼</span>
          <div>
            <p className="font-semibold text-sm">Seek</p>
            <p className="text-xs text-gray-600">Job board terbesar</p>
          </div>
        </a>
        <a href="https://indeed.com.au" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-info/5 hover:bg-info/10 transition-colors">
          <span className="text-2xl">🔍</span>
          <div>
            <p className="font-semibold text-sm">Indeed</p>
            <p className="text-xs text-gray-600">Job board internasional</p>
          </div>
        </a>
        <a href="https://gumtree.com.au" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-info/5 hover:bg-info/10 transition-colors">
          <span className="text-2xl">📰</span>
          <div>
            <p className="font-semibold text-sm">Gumtree</p>
            <p className="text-xs text-gray-600">Classified ads (banyak casual jobs)</p>
          </div>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-info/5 hover:bg-info/10 transition-colors">
          <span className="text-2xl">👥</span>
          <div>
            <p className="font-semibold text-sm">Facebook Groups</p>
            <p className="text-xs text-gray-600"><GlossaryTooltip term="WHV" /> Australia Groups</p>
          </div>
        </a>
      </div>
    </div>

    <div>
      <h4 className="font-bold text-gray-900 mb-4">💼 Jenis Kerja Populer untuk <GlossaryTooltip term="WHV" /></h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-200">
          <h5 className="font-bold text-amber-900 mb-2">☕ Hospitality</h5>
          <p className="text-xs text-amber-700 mb-3">Cafe/Restaurant</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li>• Barista, Waitstaff, Kitchen Hand</li>
            <li>• Gaji: Rp 150rb - 250rb/jam</li>
            <li>• Sering ada cash tip</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
          <h5 className="font-bold text-green-900 mb-2">🌾 Farm Work</h5>
          <p className="text-xs text-green-700 mb-3"><GlossaryTooltip term="88 Days" /> Eligible ✓</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li>• Fruit Picking, Packing, Farm Hand</li>
            <li>• Gaji: Rp 170rb - 300rb/jam</li>
            <li>• Biasanya ada akomodasi gratis</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
          <h5 className="font-bold text-blue-900 mb-2">🛍️ Retail</h5>
          <p className="text-xs text-blue-700 mb-3">Sales & Service</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li>• Sales Assistant, Cashier</li>
            <li>• Gaji: Rp 150rb - 220rb/jam</li>
            <li>• Butuh bahasa Inggris baik</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-success/10 border-l-4 border-success p-4 rounded-r-lg text-sm text-gray-700">
      <strong>💡 Tip:</strong> Untuk <GlossaryTooltip term="88 Days" />, cari kerja di regional area!
    </div>
  </div>
);

const renderExtensionWHV = () => (
  <div className="space-y-6">
    <div className="bg-success/5 rounded-xl p-6 border-2 border-success/30">
      <h4 className="font-bold text-success mb-4 flex items-center gap-2">
        <span className="text-2xl">✅</span> Syarat Utama
      </h4>
      <ul className="space-y-2">
        <ChecklistItem checked text={<span>Selesaikan <GlossaryTooltip term="88 Days" /> regional work</span>} />
        <ChecklistItem checked text={<span>Apply sebelum <GlossaryTooltip term="WHV" /> pertama expired</span>} />
        <ChecklistItem checked text="Usia masih di bawah 31 tahun" />
      </ul>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📅</span> Apa itu <GlossaryTooltip term="88 Days" />?
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-info mt-0.5">▸</span>
            <span>3 bulan kerja di regional Australia</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-info mt-0.5">▸</span>
            <span>Boleh tidak berturut-turut</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-info mt-0.5">▸</span>
            <span>Boleh di beberapa employer</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-info mt-0.5">▸</span>
            <span>Boleh part-time (jam dihitung)</span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🗺️</span> Regional Areas
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li><strong>NSW:</strong> Selain Sydney, Newcastle, Wollongong</li>
          <li><strong>QLD:</strong> Selain Brisbane, Gold Coast</li>
          <li><strong>VIC:</strong> Selain Melbourne, Geelong</li>
          <li>Seluruh WA, SA, TAS, NT adalah regional</li>
        </ul>
      </div>
    </div>

    <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg text-sm text-gray-700">
      <strong>📎 Dokumen:</strong> Simpan slip gaji, contract, reference letter untuk bukti!
    </div>
  </div>
);

const renderPathwayPR = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">189</span>
          <h4 className="font-bold text-blue-900">Skilled Independent</h4>
        </div>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Tidak butuh sponsor</li>
          <li>• Butuh skill assessment</li>
          <li>• Butuh high English score (IELTS 8+)</li>
          <li>• Points test: 65+ poin</li>
          <li className="text-danger font-semibold">• Competition sangat tinggi</li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">190</span>
          <h4 className="font-bold text-green-900">Skilled Nominated</h4>
        </div>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Butuh state sponsorship</li>
          <li className="text-success font-semibold">• Lebih mudah daripada 189</li>
          <li>• Harus tinggal di sponsoring state</li>
          <li>• Points test: 65+ poin</li>
          <li className="text-success font-semibold">• Lower cutoff</li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold">491</span>
          <h4 className="font-bold text-purple-900">Skilled Work Regional</h4>
        </div>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Regional area only</li>
          <li>• 5 years visa (leading to <GlossaryTooltip term="PR" />)</li>
          <li>• Butuh regional sponsorship</li>
          <li className="text-purple-700 font-semibold">• Lebih mudah daripada 189/190</li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-bold">500</span>
          <h4 className="font-bold text-amber-900">Student Visa</h4>
        </div>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Study 2 years di Australia</li>
          <li>• Graduate → 485 visa → 189/190</li>
          <li className="text-amber-700 font-semibold">• Biaya kuliah: Rp 150jt+/tahun</li>
        </ul>
      </div>
    </div>

    <div className="bg-info/10 border-l-4 border-info p-4 rounded-r-lg text-sm text-gray-700">
      <strong>💡 Tip:</strong> Kalkulator poin <GlossaryTooltip term="PR" /> ada di menu IndOz+ (Premium)
    </div>
  </div>
);

const renderSkillAssessment = () => (
  <div className="space-y-6">
    <div className="bg-info/5 rounded-xl p-6 border border-info/30">
      <h4 className="font-bold text-info mb-3 flex items-center gap-2">
        <span className="text-2xl">📋</span> Apa itu Skill Assessment?
      </h4>
      <p className="text-gray-700">Evaluasi kualifikasi & pengalaman kerja oleh organisasi profesional di Australia.</p>
    </div>

    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h4 className="font-bold text-gray-900 mb-4">🏢 Organisasi Populer</h4>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="bg-info/5 rounded-lg p-3 text-center">
          <p className="font-bold text-info text-sm">Accounting</p>
          <p className="text-xs text-gray-600">CPA/CA/IPA</p>
        </div>
        <div className="bg-success/5 rounded-lg p-3 text-center">
          <p className="font-bold text-success text-sm">IT</p>
          <p className="text-xs text-gray-600">ACS</p>
        </div>
        <div className="bg-warning/5 rounded-lg p-3 text-center">
          <p className="font-bold text-warning text-sm">Engineering</p>
          <p className="text-xs text-gray-600">Engineers Australia</p>
        </div>
        <div className="bg-purple-5 rounded-lg p-3 text-center bg-purple-50">
          <p className="font-bold text-purple-700 text-sm">Nursing</p>
          <p className="text-xs text-gray-600">ANMAC</p>
        </div>
        <div className="bg-danger/5 rounded-lg p-3 text-center">
          <p className="font-bold text-danger text-sm">Trades</p>
          <p className="text-xs text-gray-600">TRA</p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h4 className="font-bold text-gray-900 mb-4">📝 Proses Umum</h4>
      <div className="space-y-3">
        <div className="flex items-start gap-4">
          <span className="bg-info text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
          <p className="text-gray-700">Cek ANZSCO code untuk job Anda</p>
        </div>
        <div className="flex items-start gap-4">
          <span className="bg-info text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
          <p className="text-gray-700">Persiapkan dokumen (ijazah, transkrip, referensi kerja)</p>
        </div>
        <div className="flex items-start gap-4">
          <span className="bg-info text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
          <p className="text-gray-700">Apply ke assessing body</p>
        </div>
        <div className="flex items-start gap-4">
          <span className="bg-info text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
          <p className="text-gray-700">Biaya: <span className="font-bold">Rp 10,000,000 - 25,000,000</span></p>
        </div>
        <div className="flex items-start gap-4">
          <span className="bg-info text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
          <p className="text-gray-700">Proses: <span className="font-bold">2-6 bulan</span></p>
        </div>
      </div>
    </div>

    <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-r-lg text-sm text-gray-700">
      <strong>⚠️ Penting:</strong> Skill assessment hanya bisa dilakukan untuk occupation di <a href="https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list" target="_blank" rel="noopener noreferrer" className="text-warning underline">MLTSSL/STSOL list</a>.
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
