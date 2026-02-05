import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { searchJobs } from '../../services/jobsAPI';
import JobFilters from './JobFilters';
import JobCard from './JobCard';
import JobSkeleton from './JobSkeleton';
import Button from '../common/Button';

const JobSearchContainer = () => {
  const [filters, setFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cari Lowongan Kerja</h1>
        </div>

        <div className="flex gap-2">

        </div>
      </div>

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
    </div>
  );
};

export default JobSearchContainer;
