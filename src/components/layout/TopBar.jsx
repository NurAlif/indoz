import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import FeedbackModal from '../common/FeedbackModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const NAV_ITEMS = [
  { name: 'Chat AI', path: '/chat' },
  { name: 'Cari Lowongan', path: '/jobs' },
  { name: 'Cek Resume', path: '/resume' },
  { name: 'Panduan Lengkap', path: '/guides' },
  { name: '⚡ IndOz+ (Beta)', path: '/premium', isPremium: true },
];

const TopBar = ({ darkMode = false }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [accessCode] = useLocalStorage('indoz_premium_code', 'PREMIUM_UNLOCKED');
  // Always consider "authenticated" if we have the default code or if we just want to show Dashboard
  const isAuthenticated = true; // We made it free for all, so header should always show Dashboard/Masuk logic appropriately

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 border-b transition-colors",
      darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
    )}>
      <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-indo-red hover:text-red-700 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>IndOz</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;

              if (item.isPremium) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="ml-4 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm hover:bg-yellow-200 transition-colors flex items-center gap-1"
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-4 py-5 text-sm font-medium transition-colors",
                    isActive
                      ? (darkMode ? "text-white" : "text-gray-900")
                      : (darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900")
                  )}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-indo-red" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Masuk Button */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <Link to="/premium/dashboard" className="btn-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/premium" className="btn-primary">
                Masuk
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 transition-colors",
              darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={cn(
          "md:hidden border-t transition-colors",
          darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        )}>
          <div className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;

              if (item.isPremium) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 rounded-lg text-sm font-bold bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors"
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? (darkMode ? "bg-indo-red/20 text-indo-red" : "bg-indo-red/10 text-indo-red")
                      : (darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100")
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            {isAuthenticated ? (
              <Link
                to="/premium/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-2 text-center text-sm font-medium bg-indo-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/premium"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-4 py-2 text-center text-sm font-medium bg-indo-red text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
