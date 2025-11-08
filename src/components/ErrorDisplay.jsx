import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export const ErrorDisplay = ({ error, onDismiss }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1">
        <h4 className="font-semibold text-red-800 mb-1">Error</h4>
        <p className="text-sm text-red-700">{error}</p>
      </div>
      <button
        onClick={onDismiss}
        className="p-1 hover:bg-red-100 rounded transition-colors"
      >
        <X size={16} className="text-red-600" />
      </button>
    </div>
  );
};