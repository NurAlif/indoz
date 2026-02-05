import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import ProgressHeader from './ProgressHeader';
import EntryForm from './EntryForm';
import LogbookTable from './LogbookTable';
import BulkEntryModal from './BulkEntryModal';
import { ArrowLeft } from 'lucide-react';

const Logbook = ({ onBack }) => {
  const [entries, setEntries] = useLocalStorage('indoz_logbook_entries', []);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const handleAdd = (newEntries) => {
    setEntries(prev => [...prev, ...newEntries]);
  };

  const handleDelete = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+N: Open Bulk Modal
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setIsBulkModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">88 Days Logbook</h1>
        <p className="text-gray-600">
          Catat hari kerja untuk memenuhi syarat 88 days WHV. Gunakan logbook ini untuk tracking saat bekerja di Australia.
        </p>
      </div>

      <ProgressHeader entries={entries} />

      <EntryForm
        onAdd={handleAdd}
        onOpenBulk={() => setIsBulkModalOpen(true)}
      />

      <LogbookTable
        entries={entries}
        onDelete={handleDelete}
      />

      <BulkEntryModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default Logbook;
