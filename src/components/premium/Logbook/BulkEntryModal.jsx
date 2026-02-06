import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';
import Input from '../../common/Input';
import Button from '../../common/Button';

const BulkEntryModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    employer: '',
    hours: 8,
    location: ''
  });
  const [error, setError] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        startDate: '',
        endDate: '',
        employer: '',
        hours: 8,
        location: ''
      });
      setError('');
    }
  }, [isOpen]);

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    // Add 1 to include start date, but handle negative diff properly
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = () => {
    const { startDate, endDate, employer, hours, location } = formData;

    // Validation
    if (!startDate || !endDate) {
        setError('Tanggal mulai dan akhir wajib diisi');
        return;
    }
    if (!employer) {
        setError('Nama employer wajib diisi');
        return;
    }
    if (new Date(startDate) > new Date(endDate)) {
        setError('Tanggal mulai tidak boleh lebih dari tanggal akhir');
        return;
    }
    // Check for future date (allow today)
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (new Date(endDate) > today) {
        setError('Tanggal tidak boleh di masa depan');
        return;
    }
    if (hours < 1 || hours > 24) {
        setError('Jam kerja harus antara 1-24 jam');
        return;
    }

    // Generate entries
    const entries = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      entries.push({
        id: Date.now() + Math.random() + entries.length, // Ensure unique IDs
        date: current.toISOString().split('T')[0],
        employer,
        hours,
        location
      });
      current.setDate(current.getDate() + 1);
    }

    onAdd(entries);
    onClose();
  };

  const daysCount = (formData.startDate && formData.endDate && !isNaN(new Date(formData.startDate)) && !isNaN(new Date(formData.endDate)))
    ? calculateDays(formData.startDate, formData.endDate)
    : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tambah Banyak Hari Kerja"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              label="Mulai Tanggal"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="Sampai Tanggal"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
        </div>

        <Input
            label="Nama Employer / Farm"
            name="employer"
            value={formData.employer}
            onChange={handleChange}
            placeholder="contoh: Sunny Farms Pty Ltd"
        />

        <div className="grid grid-cols-2 gap-4">
             <Input
                type="number"
                label="Jam per Hari"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                min="1"
                max="24"
            />
            <Input
                label="Lokasi (Opsional)"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="contoh: Mildura, VIC"
            />
        </div>

        {error && (
            <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex justify-end pt-4">
             <Button onClick={handleSubmit} variant="primary">
                Tambah {daysCount > 0 ? daysCount : ''} Hari
             </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BulkEntryModal;
