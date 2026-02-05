import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

const TableOfContents = ({ sections = [], activeSection = '' }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for fixed header
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
    <div
      className={cn(
        "hidden lg:block w-64 flex-shrink-0 transition-all",
        isSticky ? "sticky top-24" : ""
      )}
    >
      <div className="bg-white border border-gray-200 rounded-xl p-4">
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
