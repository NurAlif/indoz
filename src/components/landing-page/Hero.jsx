import { ArrowRight, PlayCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 lg:pt-24 lg:pb-28">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Hero Content */}
          <div className="flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1 mb-6 w-fit shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#FFD700]"></span>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Resmi & Terpercaya</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl mb-6 leading-tight">
              Gerbang Karir & <br/>
              <span className="text-red-600 relative inline-block">
                Residensial Australia
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFD700] opacity-50" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3"></path>
                </svg>
              </span>
              <br/> untuk Indonesia
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              Platform terpercaya untuk memandu setiap langkah perjalanan karir dan kehidupan baru Anda, mulai dari persiapan dokumen hingga menetap dengan nyaman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3.5 text-base font-bold text-white shadow-md hover:bg-red-700 transition-all focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              >
                Konsultasikan dengan Ollie Chat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="relative inline-flex items-center justify-center rounded-lg px-6 py-3.5 text-base font-bold text-white bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 shadow-lg hover:shadow-xl hover:from-yellow-600 hover:via-yellow-500 hover:to-amber-600 transition-all duration-300 border border-yellow-300/30 group overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-300/30 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <PlayCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                <span className="relative">Pelajari IndoZ Premium</span>
                <svg className="absolute -top-1 -right-1 w-4 h-4 text-yellow-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:ml-auto w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-2xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:bg-gray-100/5 dark:ring-gray-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div
                className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 shadow-2xl relative bg-cover bg-center"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPxp0MXEUfuez9Hq9qAL3xy_nokHswsj90Y_v1FB8ZWC4_zvzPQw5g4iiMVkRfIKTnxCnCzJfs0KB1fNXs_UmyX3octac_L1b_7V1oMMv-d-9LU7ina5XnRCHqdptmv3iq0qUkQNBmFlPNzXPc4jCAjXclH5N3L7xA-moZof7lLYFwdxBA8RGGVssRrQPMqIZ5Z7qgFZtIFYw7Yqoz--aPiw1BJI3htIqLj4jE0WrdhtOk60PkqwxdcdNvel4PT_81shE-r4DPcYDH')" }}
              >
                {/* Floating Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Visa Granted</p>
                    <p className="text-xs text-gray-500">Subclass 462 Work and Holiday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
