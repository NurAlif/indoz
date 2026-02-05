# Evaluasi Heuristik: indoz.work

Evaluasi berdasarkan 10 Prinsip Usability Jakob Nielsen.

---

## 1. Umum / Level Sistem

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Skeleton loader konsisten di semua komponen dinamis (Jobs, AI Chat) memberikan kejelasan bahwa sistem sedang memuat data | Good Practice | H1: Visibility of System Status | - |
| Feedback visual instan (hover/click) pada tombol memberikan konfirmasi bahwa elemen interaktif | Good Practice | H1: Visibility of System Status | - |
| Bahasa "Backpacker Indonesia" (Gue/Lu) membangun koneksi dan kesesuaian mental model dengan target user | Good Practice | H2: Match between System and Real World | - |
| Peringatan hukum imigrasi Australia (Migration Act 1958) ditempatkan di lokasi yang sesuai konteksnya | Good Practice | H2: Match between System and Real World | - |
| Pengguna langsung diarahkan ke menu chat dengan AI tanpa penjelasan atau onboarding awal | Issue | H2: Match between System and Real World | Tambahkan onboarding/welcome modal yang menjelaskan apa itu WHV, SDUWHV, 88 days, dan tujuan aplikasi |
| Tidak ada penjelasan tentang singkatan WHV / SDUWHV, 88 days yang sering digunakan | Issue | H2: Match between System and Real World | Buat glossary section atau tooltip untuk menjelaskan istilah-istilah penting |
| Tidak jelas apakah aplikasi untuk perencanaan saja atau digunakan saat sedang WHV di Australia | Issue | H2: Match between System and Real World | Tambahkan penjelasan di landing page tentang use case aplikasi (planning vs tracking) |
| Arsitektur single-page memungkinkan transisi cepat antar tools tanpa reload halaman | Good Practice | H3: User Control and Freedom | - |
| Script `user-select: none` mencegah pengguna menyalin data untuk keperluan pribadi | Issue | H3: User Control and Freedom | Hapus restriksi copy untuk meningkatkan aksesibilitas |
| Script `oncontextmenu="return false;"` memblokir klik kanan untuk "open in new tab" | Issue | H3: User Control and Freedom | Hapus blokir klik kanan untuk memungkinkan "open in new tab" |
| Palet warna semantik konsisten (Indo Red, Oz Gold) memperkuat identitas brand | Good Practice | H4: Consistency and Standards | - |
| Padding dan lebar container distandarkan di seluruh halaman untuk konsistensi visual | Good Practice | H4: Consistency and Standards | - |
| Style pewarnaan tidak konsisten, membuat hubungan antar fitur/sistem seperti terpisah | Issue | H4: Consistency and Standards | Standarkan warna untuk elemen sejenis (tombol, link, card) di seluruh fitur |
| Fungsi `retryWithBackoff` di service layer mencegah crash UI saat gangguan jaringan | Good Practice | H5: Error Prevention | - |
| Sanitizer global mencegah serangan injeksi pada input data user | Good Practice | H5: Error Prevention | - |
| Navigasi sticky memastikan menu global selalu terlihat tanpa scroll ke atas | Good Practice | H6: Recognition Rather than Recall | - |
| Menu items di "Tools and Guides" sebaiknya langsung ditampilkan di topbar untuk akses lebih mudah | Issue | H6: Recognition Rather than Recall | Karena hanya 4 menu utama, tampilkan semua langsung di topbar tanpa dropdown |
| Dropdown "Tools and Guides" memaksa user mengingat menu di dalamnya | Issue | H6: Recognition Rather than Recall | Hapus dropdown dan ekspos semua menu di topbar |
| Load time cepat dan aset teroptimasi mendukung pengalaman pengguna yang lancar | Good Practice | H7: Flexibility and Efficiency | - |
| Tidak ada keyboard shortcut untuk power user di dalam tools kompleks seperti Logbook | Issue | H7: Flexibility and Efficiency | Tambahkan keyboard shortcut (mis: Ctrl+N untuk new entry, Ctrl+S untuk save) |
| Font "Inter" memberikan tingkat keterbacaan tinggi di berbagai ukuran layar | Good Practice | H8: Aesthetic and Minimalist Design | - |
| Desain minimalis dengan ikon berkualitas mengurangi cognitive load | Good Practice | H8: Aesthetic and Minimalist Design | - |
| Gaya AI yang terlalu "gaul" terasa agak cringe, user mungkin lebih yakin dengan bahasa biasa yang mudah dipahami | Issue | H8: Aesthetic and Minimalist Design | Gunakan bahasa yang lebih formal dan mudah dipahami untuk meningkatkan kredibilitas |
| Ketika service gagal, sistem menampilkan pesan "Sistem Sibuk" yang ramah | Good Practice | H9: Error Recognition and Recovery | - |
| Link "Help" di footer dan "Panduan" di header mudah diakses pengguna | Good Practice | H10: Help and Documentation | - |

---

## 2. Top Bar / Navigasi

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Bar indikator merah di bawah "AI Chat" dengan jelas menunjukkan view yang sedang aktif | Good Practice | H1: Visibility of System Status | - |
| Hover states pada menu "Tools & Guides" berubah warna sedikit untuk konfirmasi interaksi | Good Practice | H1: Visibility of System Status | - |
| Active state untuk "Tools & Guides" kurang mencolok dibanding active state "AI Chat" | Issue | H1: Visibility of System Status | Samakan gaya active state untuk semua menu |
| Logo berfungsi sebagai link jelas untuk kembali ke Home/reset view | Good Practice | H3: User Control and Freedom | - |
| Ikon standar industri (Koper untuk Jobs, Dokumen untuk Resume) membantu recognisi cepat | Good Practice | H4: Consistency and Standards | - |
| Logo 🇮🇩 di topbar terlihat seperti tombol switch language padahal bukan | Issue | H4: Consistency and Standards | Hapus emoji 🇮🇩 dari logo atau pindahkan ke lokasi yang tidak mengganggu |
| AI Chat disebut "Home" di breadcrumb, padahal AI Chat adalah menu home - ambigu dan tidak konsisten | Issue | H4: Consistency and Standards | Hapus breadcrumb atau gunakan nama "AI Chat" secara konsisten |
| Branding "IndOz Work" berfungsi sebagai persistent anchor untuk fungsi "Home" | Good Practice | H6: Recognition Rather than Recall | - |
| Ikon mendampingi label teks mempercepat recognisi visual tanpa membaca seluruh teks | Good Practice | H6: Recognition Rather than Recall | - |
| Breadcrumb tidak berguna karena hanya 1 level, sebaiknya dihilangkan | Issue | H8: Aesthetic and Minimalist Design | Hapus breadcrumb karena hanya 1 level dan tidak memberikan nilai |
| Ikon di sebelah kanan dropdown terlihat seperti slash (path SVG gagal) | Issue | H8: Aesthetic and Minimalist Design | Perbaiki icon SVG atau ganti dengan icon chevron-down yang benar |
| 3 menu di "Tools and Guides" cukup rapi | Good Practice | H8: Aesthetic and Minimalist Design | - |

---

## 3. AI Chat (Ollie)

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Status "Online" dengan titik hijau di bawah profil memberikan kepastian ketersediaan | Good Practice | H1: Visibility of System Status | - |
| Tombol saran mengubah tampilan saat diklik untuk mengkonfirmasi seleksi user | Good Practice | H1: Visibility of System Status | - |
| Animasi pulse saat text generation bisa lebih jelas untuk proses yang lama | Issue | H1: Visibility of System Status | Tambahkan typing indicator yang lebih jelas untuk proses generate yang lama |
| Ollie memperkenalkan diri sebagai "5 year survivor in Aussie" membangun otoritas dan empati | Good Practice | H2: Match between System and Real World | - |
| Privacy Notice secara proaktif memperingatkan JANGAN share TFN atau Passport sebelum user mulai mengetik | Good Practice | H5: Error Prevention | - |
| Input field tetap aktif saat response sedang di-generate, berpotensi memicu input flooding | Issue | H5: Error Prevention | Disable input field saat response sedang di-generate |
| Menu in-chat bertumpukan: 2 menu besar di atas dan menu bawah yang tabed | Issue | H8: Aesthetic and Minimalist Design | Pisahkan menu besar dan tab, jangan gabung menjadi satu |
| Style menu besar dan menu di dalam tabs tidak dibedakan, struktur sulit dipahami | Issue | H8: Aesthetic and Minimalist Design | Bedakan style menu besar dan tab dengan container/warna yang berbeda |
| Style tab bisa dibuat lebih jelas dengan container agar lebih terstruktur | Issue | H8: Aesthetic and Minimalist Design | Tambahkan container/border untuk tab agar lebih jelas strukturnya |
| Tombol saran one-click (misal "Tips IELTS 4.5 kilat?") menjadi shortcut efisien untuk query umum | Good Practice | H7: Flexibility and Efficiency | - |

---

## 4. Panduan Lengkap

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Tab aktif ("Persiapan") ditandai dengan underline dan teks bold untuk kejelasan posisi | Good Practice | H1: Visibility of System Status | - |
| Tombol "Konsultasi Gratis": form text berwarna putih jadi tidak terlihat | Issue | H1: Visibility of System Status | Perbaiki warna form text agar kontras dan terlihat |
| Konten diurutkan sesuai urutan logika perjalanan traveler (Persiapan → Tiba → Hidup → Masa Depan) | Good Practice | H2: Match between System and Real World | - |
| Pola link (biru, underline) konsisten di seluruh dokumen untuk recognisi cepat | Good Practice | H4: Consistency and Standards | - |
| Link eksternal seperti "Official Checklist 462" terintegrasi langsung dalam dokumentasi | Good Practice | H10: Help and Documentation | - |
| Dokumen sangat panjang tanpa "Daftar Isi" atau side-navigation untuk lompat antar section | Issue | H10: Help and Documentation | Tambahkan sticky table of contents atau side navigation |

---

## 5. Cari Lowongan

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Tombol search menampilkan status "Mencari..." untuk menginformasikan proses sedang berjalan | Good Practice | H1: Visibility of System Status | - |
| Skeleton loader merepresentasikan layout kartu yang sebenarnya akan muncul | Good Practice | H1: Visibility of System Status | - |
| Badge umur job (1d, 2d) dan label sumber (Seek, Indeed) mengikuti standar job board | Good Practice | H4: Consistency and Standards | - |
| Toggle "88 Day Focus" menyediakan filter spesifik untuk kebutuhan regulatory WHV | Good Practice | H7: Flexibility and Efficiency | - |
| Tidak ada fitur "Save Search" untuk user yang ingin melakukan pencarian berulang | Issue | H7: Flexibility and Efficiency | Tambahkan fitur "Save Search" untuk pencarian berulang |

---

## 6. Cek Resume

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Batasan file (PDF, Max 4MB) ditampilkan dengan jelas sebelum upload | Good Practice | H1: Visibility of System Status | - |
| "Isi Contoh Resume" memungkinkan user memahami kemampuan tool tanpa perlu memiliki file sendiri | Good Practice | H6: Recognition Rather than Recall | - |
| Layout dual choice (Upload vs Paste) dipisahkan dengan divider "ATAU" yang jelas | Good Practice | H8: Aesthetic and Minimalist Design | - |

---

## 7. Premium IndOz Landing Page

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Status "Beta" IndOz+ ditampilkan dengan jelas di header untuk mengatur ekspektasi user | Good Practice | H1: Visibility of System Status | - |
| Field "Access Code" tidak memberikan hint di mana user bisa mendapatkan kode tersebut | Issue | H1: Visibility of System Status | Tambahkan hint/cara mendapatkan access code |
| Hirarki visual kuat dengan tipografi besar dan pengelompokan kartu yang rapi | Good Practice | H8: Aesthetic and Minimalist Design | - |
| Ikon berwarna kuning mungkin terlihat seperti indikator status, bukan target klik | Issue | H8: Aesthetic and Minimalist Design | Gunakan warna/icon yang lebih jelas sebagai clickable element |

---

## 8. Premium Dashboard

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Menu dashboard premium sebaiknya dibuat tampilan dan sistem terpisah dari landing page | Issue | H4: Consistency and Standards | Buat tampilan terpisah untuk dashboard premium yang sudah login |
| Menu tab bertumpuk dengan menu topbar dan breadcrumb | Issue | H8: Aesthetic and Minimalist Design | Hindari tab bertumpuk, gunakan single-level navigation |
| Dashboard Premium sebaiknya berisi overview menu-menu premium, bukan tabed view fitur | Issue | H8: Aesthetic and Minimalist Design | Buat dashboard sebagai overview dengan cards untuk setiap fitur premium |
| Tidak perlu diberi judul "Dashboard" sama sekali | Issue | H8: Aesthetic and Minimalist Design | Hapus judul "Dashboard", gunakan branding section yang lebih natural |

---

## 9. Dokumen Menu (Premium)

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Progress bar dengan indikator numerik (misal 8/8) memberikan kejelasan status kelengkapan | Good Practice | H1: Visibility of System Status | - |
| Perbedaan status "Saved" dan "Verified" kurang jelas, mengandalkan intuisi user | Issue | H1: Visibility of System Status | Tambahkan legend/tooltip untuk menjelaskan perbedaan status |
| Progress kesiapan dokumen seharusnya menampilkan validasi/feedback saat complete 8/8 (progress bar hijau, checkmark, box completion) | Issue | H1: Visibility of System Status | Tambahkan celebration feedback saat complete: progress bar hijau, checkmark, box completion dengan instruksi lanjutan |
| Menu dokumen tidak jelas kegunaannya: manajemen dokumen dengan upload atau hanya mencatat progress? | Issue | H2: Match between System and Real World | Tambahkan penjelasan fungsi menu dokumen di awal section |
| Sebaiknya bisa upload dokumen dan sistem memvalidasi ukuran file atau kompres otomatis | Issue | H5: Error Prevention | Tambahkan fitur upload dengan validasi ukuran file dan kompresi otomatis |
| Checklist terperinci memastikan tidak ada dokumen yang terlupa (misal SKCK Polda Level) | Good Practice | H5: Error Prevention | - |

---

## 10. 88 Days Logbook (Premium)

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Progress bar "3 / 88 Hari" selalu menampilkan target makro yang sedang ditempuh | Good Practice | H1: Visibility of System Status | - |
| Feedback untuk "invalid entry" (misal tanggal masa depan) bisa lebih jelas | Issue | H1: Visibility of System Status | Berikan pesan error yang spesifik untuk setiap jenis invalid entry |
| Tombol quick-add (+) untuk menambah hari dengan cepat | Good Practice | H7: Flexibility and Efficiency | - |
| Tidak ada fitur bulk edit untuk menambah satu minggu kerja sekaligus | Issue | H7: Flexibility and Efficiency | Tambahkan fitur bulk entry untuk menambah beberapa hari sekaligus |
| Menu "88 Days Logbook" tidak jelas kegunaannya, tidak ada instruksi | Issue | H2: Match between System and Real World | Tambahkan penjelasan: "Catat hari kerja untuk memenuhi syarat 88 days WHV" |
| Tidak ada penjelasan apakah logbook digunakan saat bekerja di Australia | Issue | H2: Match between System and Real World | Jelaskan use case: digunakan saat bekerja di Australia untuk tracking |
| Field darkmode di bawah tidak nyambung dengan konteks | Issue | H8: Aesthetic and Minimalist Design | Hapus atau pindahkan toggle darkmode ke lokasi yang lebih appropriate |

---

## 11. PR-Calc (Premium)

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Live update: mengubah dropdown langsung mengupdate "Estimasi Poin" tanpa perlu tombol submit | Good Practice | H1: Visibility of System Status | - |
| Interpretasi hasil (misal "Eligible, tapi butuh strategi") membantu user memahami konteks skor | Good Practice | H9: Error Recognition and Recovery | - |
| Tidak ada penjelasan apa itu PR (Permanent Residency) | Issue | H2: Match between System and Real World | Tambahkan tooltip/inline explanation: "PR = Permanent Residency (izin tinggal permanen)" |
| Tidak ada penjelasan angka 189/190 | Issue | H2: Match between System and Real World | Jelaskan: 189/190 adalah visa subclass untuk skilled independent/ nominated |
| Setelah dikalkulasi seharusnya muncul rekomendasi/suggestion untuk user | Issue | H9: Error Recognition and Recovery | Tampilkan rekomendasi langkah yang harus dilakukan berdasarkan hasil |
| Tidak ditampilkan tantangan apa jika "eligible, tapi butuh strategi" atau kondisi lain | Issue | H9: Error Recognition and Recovery | Tampilkan section "tantangan & strategi" untuk setiap kondisi hasil |
| Field diisi dengan default value, sebaiknya blank dan user isi lengkap untuk memastikan sesuai kondisi | Issue | H9: Error Recognition and Recovery | Buat semua field blank dari awal, wajib user isi lengkap untuk hasil yang akurat |

---

## 12. Future Strategy (Premium)

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Kategorisasi tingkat tinggi ("Populer", "Hard Mode", "Niche") membantu user mengelompokkan opsi imigrasi yang kompleks | Good Practice | H6: Recognition Rather than Recall | - |
| Menu "Strategi Kembali ke Australia" kurang lengkap dan terlalu minimalis | Issue | H10: Help and Documentation | Tambahkan detail lebih lengkap untuk setiap opsi strategi imigrasi |

---

## 13. Contact / Konsult Modal

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Dropdown "Kebutuhan Anda" mencegah request yang terlalu umum dan mengatur ekspektasi | Good Practice | H5: Error Prevention | - |
| Field nomor HP menerima input teks apa saja, seharusnya hanya angka | Issue | H5: Error Prevention | Tambahkan validasi input hanya angka untuk field nomor HP |

---

## 14. Feedback Modal

| Evaluasi | Tipe | Heuristik | Saran |
|----------|------|-----------|-------|
| Rating bintang berubah visual (hollow ke filled) saat hover/click untuk konfirmasi | Good Practice | H1: Visibility of System Status | - |
| Tombol "Kirim Feedback" disabled saat input kosong, tapi tidak menjelaskan alasannya ke user | Issue | H1: Visibility of System Status | Tambahkan hint/pesan mengapa tombol disabled |
| Saat field kosong dan tombol disabled diklik, seharusnya muncul notice field/bintang belum diisi | Issue | H9: Error Recognition and Recovery | Tampilkan notice/tooltip saat klik tombol disabled: "Mohon isi rating dan feedback terlebih dahulu" |

---

## Ringkasan

IndOz Work menunjukkan **tingkat polish tinggi** dan **desain yang empatik terhadap pengguna**.

**Kelebihan utama:**
- H2 (Match between System and Real World) - Bahasa dan tone sesuai target user
- H8 (Aesthetic and Minimalist Design) - Visual clean dan konsisten

**Perhatian utama:**
- Kurangnya penjelasan tentang terminologi penting (WHV, SDUWHV, 88 days, PR)
- Struktur menu yang bertumpuk dan membingungkan (in-chat tabs, breadcrumbs tidak berguna)
- Dashboard premium sebaiknya dipisahkan dari landing page
- Gaya AI yang terlalu "gaul" mungkin mengurangi kredibilitas
- Restriksi level sistem terhadap kontrol pengguna (Copy dan Klik Kanan) sebaiknya ditinjau ulang untuk aksesibilitas
