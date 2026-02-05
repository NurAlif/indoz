import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import Input from '../../common/Input';
import Button from '../../common/Button';

const EntryForm = ({ onAdd, onOpenBulk }) => {
  const [entry, setEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    employer: '',
    hours: 8,
    location: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validate = (data) => {
     if (!data.employer) return 'Nama employer wajib diisi';
     const today = new Date();
     today.setHours(23, 59, 59, 999);
     if (new Date(data.date) > today) return 'Tanggal tidak boleh di masa depan';
     if (data.hours < 1 || data.hours > 24) return 'Jam kerja harus antara 1-24 jam';
     return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(entry);
    if (err) {
        setError(err);
        return;
    }
    onAdd([{
        ...entry,
        id: Date.now() + Math.random()
    }]);

    // Reset date to tomorrow? Or keep as is.
    // I'll keep employer and hours/location for easier consecutive entry
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
             <h3 className="font-semibold text-gray-900">Add Entry</h3>
             <button
                onClick={onOpenBulk}
                className="text-sm text-indo-red font-medium hover:underline flex items-center"
             >
                <Calendar size={16} className="mr-1" />
                Bulk Entry / Add Multiple Days
             </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
             <div className="md:col-span-3">
                <Input
                type="date"
                name="date"
                value={entry.date}
                onChange={handleChange}
                className="mb-0"
                />
             </div>
             <div className="md:col-span-3">
                <Input
                name="employer"
                value={entry.employer}
                onChange={handleChange}
                placeholder="Employer Name"
                className="mb-0"
                />
             </div>
             <div className="md:col-span-2">
                <Input
                type="number"
                name="hours"
                value={entry.hours}
                onChange={handleChange}
                placeholder="Hours"
                className="mb-0"
                />
             </div>
             <div className="md:col-span-2">
                 <Input
                name="location"
                value={entry.location}
                onChange={handleChange}
                placeholder="Location"
                className="mb-0"
                />
             </div>
             <div className="md:col-span-2">
                <Button onClick={handleSubmit} variant="primary" className="w-full">
                    <Plus size={20} className="mr-2" /> Add
                </Button>
             </div>
        </div>

        {error && <p className="text-error text-sm mt-2">{error}</p>}
    </div>
  );
};

export default EntryForm;
