import React from 'react';
import { FileText, X } from 'lucide-react';
import { formatFileSize, getFileType } from '../utils/fileHelpers.js';

export const FileInfo = ({ file, onClear }) => {
  const fileType = getFileType(file);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FileText className="text-blue-600" size={32} />
        <div>
          <h4 className="font-semibold text-gray-800">{file.name}</h4>
          <p className="text-sm text-gray-500">
            {fileType.toUpperCase()} • {formatFileSize(file.size)}
          </p>
        </div>
      </div>
      <button
        onClick={onClear}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X size={20} className="text-gray-500" />
      </button>
    </div>
  );
};