import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Briefcase, Building, Hash } from 'lucide-react';
import { cn } from '../../utils/cn';
import GlossaryTooltip from '../common/GlossaryTooltip';

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

// Popular search suggestions
const SEARCH_SUGGESTIONS = {
  jobTitles: [
    'Accountant',
    'Chef',
    'Waiter',
    'Barista',
    'Retail Assistant',
    'Farm Worker',
    'Housekeeper',
    'Receptionist',
    'Driver',
    'Warehouse Worker',
  ],
  keywords: [
    'Hospitality',
    'Retail',
    'Farm Work',
    'Customer Service',
    'Warehouse',
    'Cleaning',
    'Sales',
    'Administration',
    'Healthcare',
    'Construction',
  ],
  companies: [
    'Woolworths',
    'Coles',
    'McDonalds',
    'KFC',
    'Starbucks',
    'Bunnings',
    'Domino\'s',
    'Subway',
    'Amazon',
    'TJ Maxx',
  ],
};

const JobFilters = ({
  filters = {},
  onFilterChange = () => {},
  onSearch = () => {},
  isLoading = false,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.keyword || '');
  const searchRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationChange = (e) => {
    onFilterChange({ ...filters, location: e.target.value });
  };

  const handleJobTypeChange = (e) => {
    onFilterChange({ ...filters, jobType: e.target.value });
  };

  const handle88DaysToggle = () => {
    onFilterChange({ ...filters, is88DaysEligible: !filters.is88DaysEligible });
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onFilterChange({ ...filters, keyword: value });
    setShowSuggestions(true);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    onFilterChange({ ...filters, keyword: suggestion });
    setShowSuggestions(false);
    onSearch();
  };

  const handleSearchClick = () => {
    onSearch();
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">
        Temukan pekerjaan yang sesuai untuk <GlossaryTooltip term="WHV" /> Anda
      </p>

      {/* Search Bar with Suggestions */}
      <div className="mb-4 relative" ref={searchRef}>
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
          />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchKeyPress}
            onFocus={handleFocus}
            placeholder="Cari job title, keyword, atau company..."
            className={cn(
              "w-full pl-12 pr-32 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indo-red focus:border-transparent transition-all",
              showSuggestions
                ? "border-indo-red rounded-b-none border-b-0"
                : "border-gray-300"
            )}
          />
          <button
            onClick={handleSearchClick}
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

        {/* Search Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute w-full border border-indo-red border-t-0 rounded-b-lg bg-white shadow-lg z-50">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              {/* Left Column - Job Titles */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-3 px-2">
                  <Briefcase size={16} className="text-indo-red" />
                  <span className="text-sm font-semibold text-gray-700">Job Titles</span>
                </div>
                <div className="space-y-1">
                  {SEARCH_SUGGESTIONS.jobTitles.map((title) => (
                    <button
                      key={title}
                      onClick={() => handleSuggestionClick(title)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indo-red/5 rounded-lg transition-colors"
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Middle Column - Companies */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-3 px-2">
                  <Building size={16} className="text-indo-red" />
                  <span className="text-sm font-semibold text-gray-700">Companies</span>
                </div>
                <div className="space-y-1">
                  {SEARCH_SUGGESTIONS.companies.map((company) => (
                    <button
                      key={company}
                      onClick={() => handleSuggestionClick(company)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indo-red/5 rounded-lg transition-colors"
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column - Keywords */}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-3 px-2">
                  <Hash size={16} className="text-indo-red" />
                  <span className="text-sm font-semibold text-gray-700">Keywords</span>
                </div>
                <div className="space-y-1">
                  {SEARCH_SUGGESTIONS.keywords.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handleSuggestionClick(keyword)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indo-red/5 rounded-lg transition-colors"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer hint */}
            <div className="border-t border-gray-200 px-3 py-2 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                Klik salah satu untuk langsung mencari
              </p>
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
