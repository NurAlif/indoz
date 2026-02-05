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
    setSearchName('');
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
