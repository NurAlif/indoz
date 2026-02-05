import React from 'react';
import { FileText, Check, Upload, Eye } from 'lucide-react';
import { cn } from '../../../utils/cn';

const DocumentCard = ({ document, onUpload, onView }) => {
  const { id, title, status } = document;

  const statusConfig = {
    empty: {
      icon: <div className="w-5 h-5 rounded border-2 border-gray-300" />,
      label: 'Empty',
      color: 'text-gray-400',
      bgColor: 'bg-white',
      borderColor: 'border-gray-200'
    },
    saved: {
      icon: <FileText className="text-oz-gold" size={20} />,
      label: 'Saved',
      color: 'text-oz-gold',
      bgColor: 'bg-oz-gold/5',
      borderColor: 'border-oz-gold/30'
    },
    verified: {
      icon: <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center"><Check className="text-white" size={14} /></div>,
      label: 'Verified',
      color: 'text-success',
      bgColor: 'bg-success/5',
      borderColor: 'border-success/30'
    },
  };

  const config = statusConfig[status] || statusConfig.empty;

  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-xl border transition-all",
      config.borderColor,
      config.bgColor
    )}>
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
            {config.icon}
        </div>
        <div>
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className={cn("text-xs font-medium", config.color)}>
                [{config.label}]
            </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {status === 'empty' ? (
            <button
                onClick={() => onUpload(document)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indo-red bg-white border border-indo-red/20 hover:bg-indo-red/5 hover:border-indo-red/50 rounded-lg transition-all"
            >
                <Upload size={16} />
                Upload
            </button>
        ) : (
            <button
                onClick={() => onView(document)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
            >
                <Eye size={16} />
                View
            </button>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
