import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleLocationChange = (e) => {
    onFilterChange({ ...filters, location: e.target.value });
  };

  const handleJobTypeChange = (e) => {
    onFilterChange({ ...filters, jobType: e.target.value });
  };

  const handle88DaysToggle = () => {
    onFilterChange({ ...filters, is88DaysEligible: !filters.is88DaysEligible });
  };

  const handleJobTitleChange = (e) => {
    onFilterChange({ ...filters, jobTitle: e.target.value });
  };

  const handleKeywordChange = (e) => {
    onFilterChange({ ...filters, keyword: e.target.value });
  };

  const handleCompanyChange = (e) => {
    onFilterChange({ ...filters, company: e.target.value });
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const hasAdvancedFilters = () => {
    return (filters.jobTitle && filters.jobTitle.trim()) ||
           (filters.company && filters.company.trim());
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
          />
          <input
            type="text"
            value={filters.keyword || ''}
            onChange={(e) => onFilterChange({ ...filters, keyword: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            placeholder="Cari dengan keyword..."
            className={cn(
              "w-full pl-12 pr-32 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent transition-all",
              showAdvancedSearch || hasAdvancedFilters()
                ? "border-indo-red/50 rounded-b-none border-b-0"
                : "border-gray-300"
            )}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={toggleAdvancedSearch}
              className={cn(
                "px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1",
                showAdvancedSearch || hasAdvancedFilters()
                  ? "bg-indo-red/10 text-indo-red"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {showAdvancedSearch ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
              <Filter size={16} />
            </button>
            <button
              onClick={onSearch}
              disabled={isLoading}
              className={cn(
                "px-6 py-2 rounded-lg font-medium transition-colors",
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indo-red text-white hover:bg-red-700"
              )}
            >
              {isLoading ? 'Mencari...' : 'Cari'}
            </button>
          </div>
        </div>

        {/* Advanced Search Dropdown - 3 Columns */}
        {(showAdvancedSearch || hasAdvancedFilters()) && (
          <div className="border border-indo-red/50 border-t-0 rounded-b-lg bg-gray-50 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={filters.jobTitle || ''}
                  onChange={handleJobTitleChange}
                  onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                  placeholder="Contoh: Accountant, Chef..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent bg-white"
                />
              </div>

              {/* Keyword */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keyword
                </label>
                <input
                  type="text"
                  value={filters.keyword || ''}
                  onChange={handleKeywordChange}
                  onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                  placeholder="Contoh: hospitality, retail..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent bg-white"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={filters.company || ''}
                  onChange={handleCompanyChange}
                  onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                  placeholder="Contoh: Woolworths, Coles..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent bg-white"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Gunakan filter di atas untuk pencarian lebih spesifik
              </p>
              {(filters.jobTitle || filters.company) && (
                <button
                  onClick={() => onFilterChange({ ...filters, jobTitle: '', company: '', keyword: '' })}
                  className="text-sm text-indo-red hover:text-red-700 font-medium"
                >
                  Reset Semua
                </button>
              )}
            </div>
          </div>
        )}
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
