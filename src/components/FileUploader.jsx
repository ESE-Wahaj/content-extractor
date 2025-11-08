import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export const FileUploader = ({ onFileSelect, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };
  
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };
  
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-12 text-center transition-all
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400 hover:bg-blue-50'}
      `}
    >
      <Upload className="mx-auto mb-4 text-gray-400" size={48} />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Drop your file here or click to browse
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Supports: PDF, DOCX, TXT, Images (JPG, PNG, etc.)
      </p>
      <input
        type="file"
        onChange={handleFileInput}
        accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff"
        className="hidden"
        id="fileInput"
        disabled={isProcessing}
      />
      <label
        htmlFor="fileInput"
        className={`
          inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'}
        `}
      >
        Choose File
      </label>
    </div>
  );
};