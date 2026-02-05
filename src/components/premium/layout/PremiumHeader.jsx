import React from 'react';
import { Menu, Bell, HelpCircle } from 'lucide-react';

const PremiumHeader = ({ toggleSidebar }) => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white/90 px-8 backdrop-blur-sm z-10 sticky top-0">
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
        {/* Notifications */}
        <button className="relative rounded-full p-2 hover:bg-gray-100 transition-colors text-gray-900">
          <Bell size={24} />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-indo-red ring-2 ring-white"></span>
        </button>

        {/* Help */}
        <button className="rounded-full p-2 hover:bg-gray-100 transition-colors text-gray-900">
          <HelpCircle size={24} />
        </button>
      </div>
    </header>
  );
};

export default PremiumHeader;
