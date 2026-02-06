import Hero from './Hero';
import Journey from './Journey';
import Features from './Features';
import { Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <main className="flex-1">
        <Hero />
        <Journey />
        <Features />

        {/* IndOz Premium Promotion Section */}
        <section className="relative overflow-hidden py-24 bg-gray-900 border-t border-gray-800">
          {/* Background with gradient and pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-yellow-600/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-bold tracking-wide text-yellow-400 uppercase">IndOz Premium</span>
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6">
              Tingkatkan Perjalanan Anda ke <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">Level Selanjutnya</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Gabung dengan <span className="text-white font-semibold">IndOz Pro</span> untuk akses eksklusif ke panduan mendalam, konsultasi prioritas, dan tools canggih yang mempercepat kesuksesan Anda di Australia.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/premium"
                className="group relative flex min-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 hover:scale-[1.02] transition-all duration-300"
              >
                Gabung IndOz Pro
                <Crown className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
