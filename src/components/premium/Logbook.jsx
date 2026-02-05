import React from 'react';

const Logbook = ({ onBack }) => (
  <div className="p-8">
    <button onClick={onBack} className="mb-4 text-gray-600 hover:text-gray-900">← Back</button>
    <h1 className="text-2xl font-bold">88 Days Logbook</h1>
    <p>Feature coming soon...</p>
  </div>
);

export default Logbook;
