import React from 'react';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'populer', label: 'Populer' },
    { id: 'hardMode', label: 'Hard Mode' },
    { id: 'niche', label: 'Niche' },
  ];

  return (
    <div className="flex p-1 bg-gray-100 rounded-lg mb-6 w-fit">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeCategory === category.id
              ? 'bg-white text-indo-red shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
