import React from 'react';
import { MapPin, DollarSign, Building2, ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';

const JobCard = ({ job = {}, onViewDetails = () => {} }) => {
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
