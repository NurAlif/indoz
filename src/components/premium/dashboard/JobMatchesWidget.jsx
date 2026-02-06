import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JobMatchesWidget = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Lowongan Premium Cocok</h3>
        <div className="flex gap-2">
          <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
            <ChevronLeft size={20} />
          </button>
          <button className="p-1 rounded hover:bg-gray-100 text-gray-600">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Card 1 */}
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-indo-red/30 hover:shadow-md cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded bg-gray-100 bg-center bg-cover"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCV2-AmCPPqW1BrNu3DeZ0GzcUlB6JkS-xKb_0oVoVrUMKvwRIdIpNvek5p7SDUBFJskndaqUGq_vnyj0YTSadoxHbU95A-A0-NPAF_5mxpBaslYKEouKq0QdKX00nKGqweFXiRROhgW0W_ItDEA9vsYlp20SPRwD7XH_MHfLUEbqlg87z0rMK023zBzGsLGjqxzCw8klzUSjbg1clCfVuthU_KMbyzG8DbB1t66v0qcxEKW_dG3hGbH6xxahMjzMcnxEsqQZ6hxkgB")' }}
              />
              <div>
                <h4 className="font-bold text-gray-900 text-sm group-hover:text-indo-red transition-colors">Forklift Operator</h4>
                <p className="text-xs text-gray-500">Logistics AU • Melbourne</p>
              </div>
            </div>
            <span className="rounded bg-indo-red/10 px-2 py-1 text-[10px] font-bold uppercase text-indo-red">Baru</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="rounded bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600">Full Time</span>
            <span className="rounded bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600">$32/hr</span>
            <span className="rounded bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600">Sponsorship</span>
          </div>
        </div>

        {/* Job Card 2 */}
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-indo-red/30 hover:shadow-md cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded bg-gray-100 bg-center bg-cover"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAumKxci_PfVdaI-bIUXaBxzD8ursE0dn-1PwO3EMrVp58wx9xFEoO3m4s-AHhjlBa7TjLDj9y0G5gaCniE9dE7s8PvOynahpEOYtnK45nBLFmHeVfka8Qe78h3QW0q4j1lTzMvfSFRjqi57SYNZnVvYIDbWOGxBGMzh_oevAQQh6T1Ip4tIbWHQ8wxIPe9lKOeHUS9CcfJjYr0BFpk6kUgQWd39ny0PHudkaF-fZBnNoGpkCf_LS9MOY8etn2wV7oAGefQ7XdiZJUp")' }}
              />
              <div>
                <h4 className="font-bold text-gray-900 text-sm group-hover:text-indo-red transition-colors">Chef de Partie</h4>
                <p className="text-xs text-gray-500">Crown Resorts • Perth</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="rounded bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600">Contract</span>
            <span className="rounded bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-600">$75k + Super</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatchesWidget;
