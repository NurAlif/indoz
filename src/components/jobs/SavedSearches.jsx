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
