import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { CHAT_SUGGESTIONS } from '../../data/chatSuggestions';

const TABS = [
  { id: 'persiapan', label: 'Persiapan' },
  { id: 'kerja', label: 'Kerja & 88 Days' },
  { id: 'menetap', label: 'Menetap' },
];

const ChatTabMenu = ({ onSuggestionClick, disabled = false }) => {
  const [activeTab, setActiveTab] = useState('persiapan');

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-indo-red border-b-2 border-indo-red bg-indo-red/5"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content - Suggestions */}
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-3">Pilih topik untuk memulai:</p>
        <div className="space-y-2">
          {CHAT_SUGGESTIONS[activeTab].map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => !disabled && onSuggestionClick(suggestion.query)}
              disabled={disabled}
              className={cn(
                "w-full px-4 py-3 text-left rounded-lg text-sm transition-colors",
                disabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-50 hover:bg-indo-red/5 hover:text-indo-red cursor-pointer"
              )}
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatTabMenu;
