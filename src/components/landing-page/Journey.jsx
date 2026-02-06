import { ClipboardCheck, PlaneTakeoff, MapPin } from 'lucide-react';

export default function Journey() {
  return (
    <section className="py-10 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Tahapan Perjalanan Anda</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Tiga langkah mudah menuju karir impian di Australia.</p>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 border-4 border-white dark:border-gray-900 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <ClipboardCheck className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Persiapan</h3>
              <p className="text-sm font-medium text-red-600 mt-1">(Preparation)</p>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-xs">
                Pengurusan Visa (WHV/PR), verifikasi dokumen, dan persiapan skill bahasa Inggris.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-50 dark:bg-yellow-900/20 border-4 border-white dark:border-gray-900 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <PlaneTakeoff className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Keberangkatan</h3>
              <p className="text-sm font-medium text-yellow-600 mt-1">(Departure)</p>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-xs">
                Pemesanan tiket pesawat, asuransi perjalanan, dan pencarian akomodasi sementara.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 border-4 border-white dark:border-gray-900 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Menetap</h3>
              <p className="text-sm font-medium text-blue-600 mt-1">(Settling In)</p>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-xs">
                Pencarian kerja, adaptasi budaya, dan bergabung dengan komunitas Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
