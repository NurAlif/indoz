import React from 'react';
import { Search, Filter } from 'lucide-react';
import { cn } from '../../utils/cn';

const LOCATIONS = [
  'All Locations',
  'Sydney, NSW',
  'Melbourne, VIC',
  'Brisbane, QLD',
  'Perth, WA',
  'Adelaide, SA',
  'Regional NSW',
  'Regional VIC',
  'Regional QLD',
];

const JOB_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Contract', label: 'Contract' },
];

const JobFilters = ({
  filters = {},
  onFilterChange = () => {},
  onSearch = () => {},
  isLoading = false,
}) => {
  const handleLocationChange = (e) => {
    onFilterChange({ ...filters, location: e.target.value });
  };

  const handleJobTypeChange = (e) => {
    onFilterChange({ ...filters, jobType: e.target.value });
  };

  const handle88DaysToggle = () => {
    onFilterChange({ ...filters, is88DaysEligible: !filters.is88DaysEligible });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={filters.keyword || ''}
            onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            placeholder="Job title, keyword, or company"
            className="w-full pl-12 pr-32 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent"
          />
          <button
            onClick={onSearch}
            disabled={isLoading}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg font-medium transition-colors",
              isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indo-red text-white hover:bg-red-700"
            )}
          >
            {isLoading ? 'Mencari...' : 'Cari'}
          </button>
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={filters.location || 'All Locations'}
            onChange={handleLocationChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent"
          >
            {LOCATIONS.map((location) => (
              <option key={location} value={location === 'All Locations' ? '' : location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>
          <select
            value={filters.jobType || ''}
            onChange={handleJobTypeChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent"
          >
            {JOB_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* 88 Days Focus Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WHV Requirements
          </label>
          <button
            onClick={handle88DaysToggle}
            className={cn(
              "w-full px-4 py-2 border-2 rounded-lg font-medium transition-all",
              filters.is88DaysEligible
                ? "border-oz-gold bg-oz-gold/10 text-oz-gold"
                : "border-gray-300 text-gray-600 hover:border-gray-400"
            )}
          >
            <span className="flex items-center justify-center gap-2">
              {filters.is88DaysEligible && <span>✓</span>}
              88 Day Focus
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
