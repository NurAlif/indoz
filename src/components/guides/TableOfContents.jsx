import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

const TableOfContents = ({ sections = [], activeSection = '' }) => {
  const handleClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 180; // Account for fixed header + tabs
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className="hidden lg:block w-64 flex-shrink-0 relative">
      <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Daftar Isi</h4>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={cn(
                "block text-sm py-1 px-2 rounded transition-colors",
                activeSection === section.id
                  ? "bg-indo-red/10 text-indo-red font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;
