import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded bg-primary/10 p-1.5 text-primary">
              <Globe className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-text-dark dark:text-white">IndOz.work</h2>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium hover:text-primary transition-colors text-text-dark dark:text-gray-300" href="#">AI Chat</a>
            <a className="text-sm font-medium hover:text-primary transition-colors text-text-dark dark:text-gray-300" href="#">Cari Lowongan</a>
            <a className="text-sm font-medium hover:text-primary transition-colors text-text-dark dark:text-gray-300" href="#">Cek Resume</a>
            <a className="text-sm font-medium hover:text-primary transition-colors text-text-dark dark:text-gray-300" href="#">Panduan</a>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark">
              Masuk
            </button>
            <button
              className="md:hidden p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <a href="#" className="block px-3 py-2 text-base font-medium text-text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">AI Chat</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Cari Lowongan</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Cek Resume</a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Panduan</a>
            <button className="mt-4 w-full rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary/90">
              Masuk
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
