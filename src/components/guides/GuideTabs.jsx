import React from 'react';
import { cn } from '../../utils/cn';
import { GUIDE_TABS } from '../../data/guideContent';

const GuideTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
      <div className="flex border-b border-gray-200 min-w-max">
        {GUIDE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "text-indo-red border-b-2 border-indo-red bg-indo-red/5"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GuideTabs;
