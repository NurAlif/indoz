import React from 'react';
import { Menu, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import FeedbackModal from '../../common/FeedbackModal';

const PremiumHeader = ({ toggleSidebar }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white/90 px-8 backdrop-blur-sm z-10 sticky top-0">
      <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
      <div className="flex items-center gap-3 lg:hidden">
        <button onClick={toggleSidebar} className="p-2 text-gray-900">
          <Menu size={24} />
        </button>
      </div>

      <div className="hidden lg:flex flex-col">
        <h2 className="text-xl font-bold text-gray-900">Overview</h2>
        <p className="text-xs text-gray-500">Last updated: Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Feedback */}
        <button
          onClick={() => setShowFeedback(true)}
          className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors text-gray-900 font-medium"
        >
          <MessageSquare size={20} />
          <span>Feedback</span>
        </button>
      </div>
    </header>
  );
};

export default PremiumHeader;
