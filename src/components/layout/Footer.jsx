import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import FeedbackModal from '../common/FeedbackModal';
import Modal from '../common/Modal';
import ConsultationForm from '../guides/ConsultationForm';

const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = React.useState(false);

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
              <li>
                <button
                  onClick={() => setIsFeedbackOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Feedback
                </button>
              </li>
              <li><a href="#contact" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
            {/* Additional Feedback Button for "Footer Bagian Kanan" */}
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="mt-2 text-sm text-white bg-indo-red px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Beri Masukan
            </button>
          </div>
        </div>

        {/* Butuh Bantuan Lanjut Section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-4 text-lg">Butuh Bantuan Lanjut?</h4>
            <p className="text-sm mb-6 max-w-2xl mx-auto">
              Tim kami siap membantu Anda dengan konsultasi gratis untuk visa, karir, dan kehidupan di Australia
            </p>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indo-red text-white rounded-lg hover:bg-red-700 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              <HelpCircle size={20} />
              <span>Konsultasi Sekarang</span>
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} IndOz. All rights reserved.</p>
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      <Modal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        title="Butuh Bantuan Lebih Lanjut?"
      >
        <p className="text-gray-600 text-sm mb-6">
          Konsultasi gratis dengan ahli imigrasi Australia
        </p>
        <ConsultationForm />
      </Modal>
    </footer>
  );
};

export default Footer;
