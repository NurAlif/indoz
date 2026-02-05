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
