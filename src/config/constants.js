export const SUPPORTED_FILE_TYPES = {
  PDF: 'pdf',
  DOCX: 'docx',
  TEXT: 'text',
  IMAGE: 'image',
  UNKNOWN: 'unknown'
};

export const SUPPORTED_EXTENSIONS = {
  PDF: ['pdf'],
  DOCX: ['docx', 'doc'],
  TEXT: ['txt'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff']
};

export const CDN_URLS = {
  PDFJS: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  PDFJS_WORKER: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  MAMMOTH: 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js',
  TESSERACT: 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js'
};

export const API_CONFIG = {
  ENABLED: false, // Set to true when integrating with backend
  ENDPOINT: '/api/content/extract',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3
};

export const UI_CONFIG = {
  MAX_DISPLAY_LENGTH: 50000,
  COPY_SUCCESS_DURATION: 2000,
  MAX_FILE_SIZE: 50 * 1024 * 1024 // 50MB
};