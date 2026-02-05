import React, { useState } from 'react';
import PremiumSidebar from './PremiumSidebar';
import PremiumHeader from './PremiumHeader';

const PremiumLayout = ({ children, activeTab, onTabChange, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-gray-50 overflow-hidden font-sans text-gray-900 mt-16">
      {/* Sidebar - Desktop */}
      <PremiumSidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        onLogout={onLogout}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
           <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setSidebarOpen(false)} />
           <div className="relative bg-white h-full w-72 shadow-xl animate-in slide-in-from-left duration-300">
             <PremiumSidebar
                activeTab={activeTab}
                onTabChange={(tab) => { onTabChange(tab); setSidebarOpen(false); }}
                onLogout={onLogout}
                className="flex w-full border-none"
             />
           </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <PremiumHeader toggleSidebar={() => setSidebarOpen(true)} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-10 scroll-smooth">
           <div className="mx-auto max-w-6xl flex flex-col gap-8 pb-10">
             {children}
           </div>
        </div>
      </main>
    </div>
  );
};

export default PremiumLayout;
