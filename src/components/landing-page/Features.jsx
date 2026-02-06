import { BookOpen, Briefcase, Award, GraduationCap, FileText, History, BadgeCheck, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Content */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Kamus Singkat Migrasi
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Dunia migrasi Australia penuh dengan istilah teknis. Pahami istilah penting yang sering digunakan agar proses Anda lebih lancar.
            </p>
            <div className="pt-4">
              <Link
                to="/guides"
                className="inline-flex items-center justify-center rounded-lg border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors px-6 py-3 text-base font-bold"
              >
                Lihat Panduan Lengkap
                <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all hover:border-red-600/30">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <History className="h-24 w-24 text-red-600" />
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">WHV (Working Holiday Visa)</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Visa sementara (Subclass 462) yang memungkinkan WNI berusia 18-30 tahun untuk bekerja dan berlibur di Australia.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all hover:border-yellow-600/50">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award className="h-24 w-24 text-yellow-600" />
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">PR (Permanent Resident)</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Status penduduk tetap yang memberikan hak tinggal, kerja, dan akses layanan kesehatan (Medicare) tanpa batas waktu.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-500/30">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap className="h-24 w-24 text-blue-500" />
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Student Visa</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Visa (Subclass 500) untuk studi jangka panjang yang juga memberikan hak kerja paruh waktu selama masa studi.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-all hover:border-green-500/30">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileSearch className="h-24 w-24 text-green-500" />
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">EOI (Expression of Interest)</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Langkah awal untuk mengajukan visa terampil, di mana Anda menyatakan minat untuk migrasi ke Australia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
