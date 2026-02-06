import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import ProgressHeader from './ProgressHeader';
import EntryForm from './EntryForm';
import LogbookTable from './LogbookTable';
import BulkEntryModal from './BulkEntryModal';

const Logbook = () => {
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
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Logbook 88 Hari</h1>
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
