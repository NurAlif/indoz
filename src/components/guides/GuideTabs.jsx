import React from 'react';
import { cn } from '../../utils/cn';
import { GUIDE_TABS } from '../../data/guideContent';
import { ClipboardList, Plane, Home, Sparkles } from 'lucide-react';

const icons = {
  clipboard: ClipboardList,
  plane: Plane,
  home: Home,
  sparkles: Sparkles,
};

const GuideTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl overflow-hidden overflow-x-auto shadow-md supports-[backdrop-filter]:bg-white/60">
      <div className="flex border-b border-gray-200 min-w-max">
        {GUIDE_TABS.map((tab) => {
          const Icon = icons[tab.icon];
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-1 px-8 py-5 text-sm font-bold transition-all whitespace-nowrap flex items-center justify-center gap-3 relative group",
                activeTab === tab.id
                  ? "text-indo-red bg-indo-red/5"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {Icon && <Icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                activeTab === tab.id ? "text-indo-red" : "text-gray-400"
              )} />}
              <span>{tab.label}</span>

              {/* Active Indicator */}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indo-red rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GuideTabs;
