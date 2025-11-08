import React, { useState } from 'react';

export const ContentDisplay = ({ content, onSendToAPI }) => {
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleSendToAPI = async () => {
    setSending(true);
    try {
      await onSendToAPI();
    } finally {
      setSending(false);
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Extracted Content</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
          <button
            onClick={handleSendToAPI}
            disabled={sending}
            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send to API'}
          </button>
        </div>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">
        <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
          {content}
        </pre>
      </div>
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
        Content Length: {content.length} characters
      </div>
    </div>
  );
};