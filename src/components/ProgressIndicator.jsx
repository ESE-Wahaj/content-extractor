import React from 'react';

export const ProgressIndicator = ({ message }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
      <p className="text-blue-800 font-medium">{message}</p>
    </div>
  );
};