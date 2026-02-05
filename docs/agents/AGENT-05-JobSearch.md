# AGENT 05: Job Search Feature (Cari Lowongan)

**Status:** PARALLEL (Can start after Agents 01-03 complete)
**Dependencies:** Agent 01 (Foundation), Agent 02 (Navigation)
**Priority:** HIGH - Core public feature

---

## 🎯 Your Mission

Build a comprehensive job search interface with advanced filters, skeleton loaders, and "88 Day Focus" toggle specifically designed for Working Holiday Visa seekers.

---

## 📚 Required Reading (Read FIRST)

Before writing ANY code, you MUST read:

1. **[../Prompt.md](../Prompt.md)** - Complete project specifications
   - Focus on: Section 3.4 (Cari Lowongan) - COMPLETE SPEC
   - Focus on: Section 2.1 (System Level MUST FIX issues)

2. **[../final-evaluation.md](../final-evaluation.md)** - Evaluation requirements
   - Focus on: Section 5 (Cari Lowongan) - all issues and good practices

3. **[AGENT-01-Foundation.md](AGENT-01-Foundation.md)** - For components and utilities
   - Skeleton, Button, Card, Input components

4. **Screenshots to Reference:**
   - `../cari-lowongan.png` - Main job search interface
   - `../cari-lowongan-glass-card.png` - Glass card effect on job cards

---

## 🎨 Critical Requirements

### MUST FIX (from evaluation):

1. ✅ **ADD** "Save Search" functionality for repeated searches
   - Store saved searches in localStorage
   - Allow quick access to previous searches

### MUST KEEP (Good Practices):

- Skeleton loader that matches actual card layout
- Search button with "Mencari..." status text
- Badge system for job age (1d, 2d) and source (Seek, Indeed)
- Toggle "88 Day Focus" for regulatory WHV needs

---

## 📋 Your Tasks (Step-by-Step)

### Task 1: Create Job Data Service

**File:** `src/services/jobsAPI.js`

```javascript
/**
 * Mock job data service
 * In production, this would connect to real job boards
 */

const MOCK_JOBS = [
  {
    id: 1,
    title: 'Fruit Picker',
    company: 'Sunny Coast Farms',
    location: 'Maroochydore, QLD',
    salary: '$28-32/hr',
    type: 'Full-time',
    description: 'Looking for experienced fruit pickers for upcoming season. Accommodation available.',
    is88DaysEligible: true,
    source: 'Seek',
    postedDate: '1d ago',
    requirements: ['No experience needed', 'Physical fitness required', 'Transport provided'],
  },
  {
    id: 2,
    title: 'Farm Hand',
    company: 'Riverdale Orchards',
    location: 'Shepparton, VIC',
    salary: '$30-35/hr',
    type: 'Full-time',
    description: 'General farm work including harvesting, packing, and equipment maintenance.',
    is88DaysEligible: true,
    source: 'Indeed',
    postedDate: '2d ago',
    requirements: ['Farm experience preferred', 'Driver license', 'Can work in weekends'],
  },
  {
    id: 3,
    title: 'Hospitality Staff',
    company: 'Backpacker Inn',
    location: 'Cairns, QLD',
    salary: '$25/hr + tips',
    type: 'Part-time',
    description: 'Front desk and housekeeping positions available in busy backpacker hostel.',
    is88DaysEligible: false,
    source: 'Seek',
    postedDate: '3d ago',
    requirements: ['Customer service skills', 'Friendly attitude', 'Flexibility with shifts'],
  },
  // Add more mock jobs...
];

export async function searchJobs(filters = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  let results = [...MOCK_JOBS];

  // Apply filters
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    results = results.filter(job =>
      job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.description.toLowerCase().includes(keyword)
    );
  }

  if (filters.location) {
    results = results.filter(job =>
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  if (filters.jobType) {
    results = results.filter(job => job.type === filters.jobType);
  }

  if (filters.is88DaysEligible) {
    results = results.filter(job => job.is88DaysEligible);
  }

  return results;
}

export async function getJobById(id) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_JOBS.find(job => job.id === id);
}
```

### Task 2: Create JobFilters Component

**File:** `src/components/jobs/JobFilters.jsx`

```jsx
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
```

### Task 3: Create JobCard Component

**File:** `src/components/jobs/JobCard.jsx`

```jsx
import React from 'react';
import { MapPin, DollarSign, Building2, ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';

const JobCard = ({ job = {}, onViewDetails = () => {} ) => {
  const {
    title = '',
    company = '',
    location = '',
    salary = '',
    type = '',
    description = '',
    is88DaysEligible = false,
    source = '',
    postedDate = '',
  } = job;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-gray-600 flex items-center gap-2">
            <Building2 size={16} />
            {company}
          </p>
        </div>

        {/* 88 Days Badge */}
        {is88DaysEligible && (
          <div className="flex-shrink-0 ml-4">
            <span className="inline-flex items-center px-3 py-1 bg-oz-gold/20 text-oz-gold text-xs font-semibold rounded-full">
              ✓ 88 Days Eligible
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          {location}
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={16} />
          {salary}
        </div>
        <div className="flex items-center gap-1">
          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
            {type}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-medium">{source}</span>
          <span>•</span>
          <span>{postedDate}</span>
        </div>

        <button
          onClick={() => onViewDetails(job)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            "bg-indo-red text-white hover:bg-red-700"
          )}
        >
          Apply
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
```

### Task 4: Create JobSkeleton Component

**File:** `src/components/jobs/JobSkeleton.jsx`

```jsx
import React from 'react';
import Skeleton from '../common/Skeleton';

const JobSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      {/* Details */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Description */}
      <div className="mb-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
};

export default JobSkeleton;
```

### Task 5: Create SaveSearchModal Component

**File:** `src/components/jobs/SaveSearchModal.jsx`

```jsx
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SaveSearchModal = ({ isOpen, onClose, filters = {}, onSave }) => {
  const [searchName, setSearchName] = useState('');
  const [savedSearches, setSavedSearches] = useLocalStorage('indoz_saved_searches', []);

  const handleSave = () => {
    if (!searchName.trim()) return;

    const newSearch = {
      id: Date.now(),
      name: searchName,
      filters: { ...filters },
      createdAt: new Date().toISOString(),
    };

    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    onSave(newSearch);
    setSearchName();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Simpan Pencarian" size="md">
      <div className="space-y-4">
        <Input
          label="Nama Pencarian"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Contoh: Farm jobs di Queensland"
          helperText="Beri nama untuk pencarian ini agar mudah ditemukan kembali"
        />

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-900 mb-2">Filter saat ini:</p>
          <div className="text-sm text-gray-600 space-y-1">
            {filters.keyword && <p>• Keyword: {filters.keyword}</p>}
            {filters.location && <p>• Location: {filters.location}</p>}
            {filters.jobType && <p>• Type: {filters.jobType}</p>}
            {filters.is88DaysEligible && <p>• 88 Days Focus: Aktif</p>}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={!searchName.trim()}
            variant="primary"
            className="flex-1"
          >
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveSearchModal;
```

### Task 6: Create SavedSearches Component

**File:** `src/components/jobs/SavedSearches.jsx`

```jsx
import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { cn } from '../../utils/cn';

const SavedSearches = ({ onLoadSearch = () => {}, onDeleteSearch = () => {} }) => {
  const [savedSearches, setSavedSearches] = useLocalStorage('indoz_saved_searches', []);

  const handleDelete = (id) => {
    const updated = savedSearches.filter(search => search.id !== id);
    setSavedSearches(updated);
    onDeleteSearch(id);
  };

  if (savedSearches.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock size={48} className="mx-auto mb-3 text-gray-400" />
        <p className="text-sm">Belum ada pencarian yang disimpan</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Pencarian Tersimpan</h3>
      {savedSearches.map((search) => (
        <div
          key={search.id}
          className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
        >
          <button
            onClick={() => onLoadSearch(search.filters)}
            className="flex-1 text-left"
          >
            <p className="text-sm font-medium text-gray-900">{search.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(search.createdAt).toLocaleDateString('id-ID')}
            </p>
          </button>

          <button
            onClick={() => handleDelete(search.id)}
            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-error transition-all"
            aria-label="Delete saved search"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SavedSearches;
```

### Task 7: Create Main JobSearchContainer Component

**File:** `src/components/jobs/JobSearchContainer.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { Save, Briefcase } from 'lucide-react';
import { searchJobs } from '../../services/jobsAPI';
import JobFilters from './JobFilters';
import JobCard from './JobCard';
import JobSkeleton from './JobSkeleton';
import SaveSearchModal from './SaveSearchModal';
import SavedSearches from './SavedSearches';
import Button from '../common/Button';

const JobSearchContainer = () => {
  const [filters, setFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const results = await searchJobs(filters);
      setJobs(results);
    } catch (error) {
      console.error('Error searching jobs:', error);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSavedSearch = (savedFilters) => {
    setFilters(savedFilters);
    handleSearch();
    setShowSavedSearches(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cari Lowongan Kerja</h1>
          <p className="text-gray-600 text-sm mt-1">
            Temukan pekerjaan yang sesuai untuk WHV Anda
          </p>
        </div>

        <div className="flex gap-2">
          {hasSearched && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSavedSearches(!showSavedSearches)}
              icon={<Clock size={16} />}
            >
              Tersimpan
            </Button>
          )}
          {hasSearched && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowSaveModal(true)}
              icon={<Save size={16} />}
            >
              Simpan Pencarian
            </Button>
          )}
        </div>
      </div>

      {/* Saved Searches Panel */}
      {showSavedSearches && (
        <div className="mb-6 bg-white border border-gray-200 rounded-xl p-4">
          <SavedSearches
            onLoadSearch={handleLoadSavedSearch}
            onDeleteSearch={() => {}}
          />
        </div>
      )}

      {/* Filters */}
      <JobFilters
        filters={filters}
        onFilterChange={setFilters}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <JobSkeleton key={i} />
          ))}
        </div>
      ) : hasSearched ? (
        <>
          {jobs.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Menampilkan {jobs.length} lowongan
              </div>

              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onViewDetails={(job) => console.log('View details:', job)}
                  />
                ))}
              </div>

              {jobs.length >= 10 && (
                <div className="mt-6 text-center">
                  <Button variant="outline" size="lg">
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Briefcase size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak ada lowongan ditemukan
              </h3>
              <p className="text-gray-600 mb-4">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <Button onClick={() => setFilters({})} variant="outline">
                Reset Filter
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
          <Briefcase size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mulai Pencarian
          </h3>
          <p className="text-gray-600">
            Gunakan filter di atas untuk mencari lowongan kerja
          </p>
        </div>
      )}

      {/* Save Search Modal */}
      <SaveSearchModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        filters={filters}
        onSave={() => {}}
      />
    </div>
  );
};

export default JobSearchContainer;
```

---

## ✅ Checklist Before Completing

- [ ] JobFilters component with all 4 filters
- [ ] JobCard component with 88 Days badge
- [ ] JobSkeleton component matching card layout
- [ ] SaveSearchModal component
- [ ] SavedSearches component
- [ ] JobSearchContainer main component
- [ ] Mock job data service (jobsAPI.js)
- [ ] Search functionality working
- [ ] Filters working correctly
- [ ] 88 Days Focus toggle highlighting eligible jobs
- [ ] Save search to localStorage
- [ ] Load saved searches
- [ ] Delete saved searches
- [ ] Skeleton loader during search
- [ ] "Mencari..." button text while loading
- [ ] Empty state when no results
- [ ] Responsive design works
- [ ] Tested: All filters work together
- [ ] Tested: Save/load/delete searches

---

## 📤 Deliverables

When you're done, the following should exist:

```
src/
├── components/
│   └── jobs/
│       ├── JobSearchContainer.jsx    ✅
│       ├── JobFilters.jsx            ✅
│       ├── JobCard.jsx               ✅
│       ├── JobSkeleton.jsx           ✅
│       ├── SaveSearchModal.jsx       ✅
│       └── SavedSearches.jsx         ✅
└── services/
    └── jobsAPI.js                    ✅
```

---

## 🎨 Visual Reference

Your job search interface should look like this:

```
┌─────────────────────────────────────────────────────────┐
│  CARI LOWONGAN KERJA                          [Tersimpan][Simpan] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🔍  [Job title, keyword, or company]    [Cari]  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────┬──────────┬──────────┬──────────────┐     │
│  │Location  │Job Type  │88 Day    │              │     │
│  │[▼]       │[▼]       │Focus [✓] │              │     │
│  └──────────┴──────────┴──────────┴──────────────┘     │
│                                                         │
│  Results: "Menampilkan 24 lowongan"                     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ┌─────────────────────────────────────────┐     │   │
│  │ │ Fruit Picker - Sunny Coast Farms        │     │   │
│  │ │ 📍 Maroochydore, QLD  💰 $28-32/hr     │     │   │
│  │ │                                          │     │   │
│  │ │ Looking for experienced fruit pickers   │     │   │
│  │ │ for upcoming season...                   │     │   │
│  │ │                                          │     │   │
│  │ │ [88 Days Eligible] • Seek • 1d ago      │     │   │
│  │ └─────────────────────────────────────────┘     │   │
│  │                            [Apply →]             │   │
│  ├─────────────────────────────────────────────────┤   │
│  │ [Job Card 2...]                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│                    [Load More]                          │
└─────────────────────────────────────────────────────────┘
```

---

## ⚠️ Important Notes

1. **DO NOT** skip skeleton loader - it's critical for UX
2. **DO NOT** forget 88 Days eligibility highlighting
3. **DO** implement save/search properly with localStorage
4. **DO NOT** show results until user clicks search or loads saved search
5. **DO** provide clear empty state
6. **DO** ensure all filters can work together
7. **DO NOT** make the 88 Days focus toggle confusing - use gold color

---

**Questions? Reference:**
- [../Prompt.md](../Prompt.md) - Section 3.4 for complete job search specs
- [../final-evaluation.md](../final-evaluation.md) - Section 5 for job search issues
- [../cari-lowongan.png](../cari-lowongan.png) - Visual reference
