import React from 'react';
import DocumentCard from './DocumentCard';

const DocumentSection = ({ title, documents, onUpload, onView }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            document={doc}
            onUpload={onUpload}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentSection;
