import React from 'react';
import { Calculator, TrendingUp, Timer, CheckCircle, Star } from 'lucide-react';
import { cn } from '../../../utils/cn';

const StatsOverview = ({ prPoints = 85, prTarget = 100, logbookDays = 54, logbookTarget = 88, docsReady = 8, docsTotal = 8 }) => {
  const prPercentage = Math.min((prPoints / prTarget) * 100, 100);
  const logbookPercentage = Math.min((logbookDays / logbookTarget) * 100, 100);
  const logbookRemaining = Math.max(logbookTarget - logbookDays, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* PR Points Card */}
      <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-2 rounded-full bg-oz-gold/10 blur-2xl transition-all group-hover:bg-oz-gold/20"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-oz-gold/10 text-oz-gold">
            <Calculator size={20} />
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
            <TrendingUp size={14} /> +5 pts
          </span>
        </div>
        <h3 className="text-sm font-medium text-gray-500">PR Points Score</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{prPoints}</span>
          <span className="text-sm text-gray-400">/ {prTarget} Target</span>
        </div>
        <div className="mt-4 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full bg-oz-gold transition-all duration-1000" style={{ width: `${prPercentage}%` }}></div>
        </div>
      </div>

      {/* 88 Days Card */}
      <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-2 rounded-full bg-indo-red/10 blur-2xl transition-all group-hover:bg-indo-red/20"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-indo-red/10 text-indo-red">
            <Timer size={20} />
          </div>
          <span className="text-xs font-medium text-gray-400">WHV 417/462</span>
        </div>
        <h3 className="text-sm font-medium text-gray-500">Days Completed</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{logbookDays}</span>
          <span className="text-sm text-gray-400">/ {logbookTarget} Days</span>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full bg-indo-red transition-all duration-1000" style={{ width: `${logbookPercentage}%` }}></div>
          </div>
          <p className="text-xs text-indo-red font-medium text-right mt-1">{logbookRemaining} days remaining</p>
        </div>
      </div>

      {/* Docs Card */}
      <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-oz-gold to-yellow-600 p-6 shadow-md text-white transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-8 translate-y-8 rounded-full bg-white/20 blur-2xl"></div>
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex w-10 h-10 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm">
            <CheckCircle size={20} />
          </div>
          <Star className="text-white/60" size={20} />
        </div>
        <div className="relative z-10">
          <h3 className="text-sm font-medium text-white/80">Document Vault</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{docsReady}/{docsTotal}</span>
            <span className="text-sm text-white/80">Ready</span>
          </div>
          <p className="mt-4 text-xs font-medium text-white/90 bg-white/20 inline-block px-2 py-1 rounded">Ready for Visa Application</p>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
