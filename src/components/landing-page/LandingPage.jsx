import Hero from './Hero';
import Journey from './Journey';
import Features from './Features';
import LandingFooter from './LandingFooter';

export default function LandingPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <main className="flex-1">
        <Hero />
        <Journey />
        <Features />
      </main>
      <LandingFooter />
    </div>
  );
}
