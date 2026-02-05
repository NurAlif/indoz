import React from 'react';
import { Megaphone, CheckCircle } from 'lucide-react';

const SidebarWidgets = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Notifications/Alerts */}
      <div className="rounded-xl bg-gradient-to-b from-indo-red/5 to-transparent border border-indo-red/10 p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
          <Megaphone className="text-indo-red" size={20} />
          Priority Alerts
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-start p-3 rounded-lg bg-white shadow-sm border border-gray-200">
            <div className="min-w-2 w-2 h-2 rounded-full bg-indo-red mt-1.5"></div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-gray-900">Visa Expiring Soon</p>
              <p className="text-[10px] text-gray-500 leading-relaxed">Your WHV expires in 45 days. Ensure your 88 days are logged.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start p-3 rounded-lg bg-white shadow-sm border border-gray-200">
            <div className="min-w-2 w-2 h-2 rounded-full bg-oz-gold mt-1.5"></div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-gray-900">New Scholarship Open</p>
              <p className="text-[10px] text-gray-500 leading-relaxed">Applications for Hospitality certs are now open for Indonesians.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Quick List */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900">Vault Status</h3>
          <span className="text-xs font-medium text-green-600">100% Complete</span>
        </div>
        <div className="space-y-3">
          {['Passport', 'English Test (IELTS)', 'Skill Assessment'].map((doc, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-xs text-gray-700">{doc}</span>
              </div>
              <span className="text-[10px] text-gray-400">{['Exp 2028', 'Score 7.5', 'Positive'][idx]}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-lg bg-gray-100 py-2 text-xs font-semibold text-gray-900 hover:bg-gray-200 transition-colors">
          Manage Documents
        </button>
      </div>
    </div>
  );
};

export default SidebarWidgets;
