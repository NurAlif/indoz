import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">IndOz</h3>
            <p className="text-sm">
              Gerbang Karir & Residensial Australia untuk Indonesia
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/chat" className="hover:text-white transition-colors">AI Chat</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Cari Lowongan</Link></li>
              <li><Link to="/resume" className="hover:text-white transition-colors">Cek Resume</Link></li>
              <li><Link to="/guides" className="hover:text-white transition-colors">Panduan Lengkap</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/guides" className="hover:text-white transition-colors">Panduan</Link></li>
              <li><a href="#feedback" className="hover:text-white transition-colors">Feedback</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} IndOz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
