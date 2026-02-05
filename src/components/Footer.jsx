import { ThumbsUp, Camera, MonitorPlay } from 'lucide-react';

export default function Footer() {
  return (
    <>
      {/* CTA Footer-ish */}
      <section className="relative bg-white dark:bg-gray-900 py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text-dark dark:text-white sm:text-4xl mb-6">Siap Memulai Babak Baru?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">Bergabunglah dengan ribuan orang Indonesia yang telah sukses membangun karir dan kehidupan di Australia bersama IndOz.work.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex min-w-[160px] items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-bold text-white hover:bg-primary/90 transition-all shadow-lg">
                Daftar Sekarang
            </button>
            <button className="flex min-w-[160px] items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 px-8 py-3 text-base font-bold text-text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                Hubungi Kami
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-background-light dark:bg-background-dark py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>© 2023 IndOz.work. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
              <ThumbsUp className="h-5 w-5" />
            </a>
            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
              <Camera className="h-5 w-5" />
            </a>
            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
              <MonitorPlay className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
