import React from 'react';
import { Trash2 } from 'lucide-react';

const LogbookTable = ({ entries, onDelete }) => {
  // Sort entries by date descending
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (entries.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">Belum ada entry. Silakan tambahkan hari kerja Anda.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-700 text-sm font-medium border-b border-gray-200">
            <th className="p-4">Tanggal</th>
            <th className="p-4">Employer</th>
            <th className="p-4">Lokasi</th>
            <th className="p-4">Jam</th>
            <th className="p-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sortedEntries.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 text-gray-900">
                {new Date(entry.date).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric'
                })}
              </td>
              <td className="p-4 text-gray-900 font-medium">{entry.employer}</td>
              <td className="p-4 text-gray-500">{entry.location || '-'}</td>
              <td className="p-4 text-gray-900">{entry.hours}h</td>
              <td className="p-4 text-right">
                <button
                  onClick={() => onDelete(entry.id)}
                  className="text-gray-400 hover:text-error transition-colors p-1 rounded hover:bg-red-50"
                  aria-label="Delete entry"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogbookTable;
