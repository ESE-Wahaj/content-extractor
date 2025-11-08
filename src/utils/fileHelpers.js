const { SUPPORTED_FILE_TYPES, SUPPORTED_EXTENSIONS, UI_CONFIG } = {
  SUPPORTED_FILE_TYPES: { PDF: 'pdf', DOCX: 'docx', TEXT: 'text', IMAGE: 'image', UNKNOWN: 'unknown' },
  SUPPORTED_EXTENSIONS: {
    PDF: ['pdf'],
    DOCX: ['docx', 'doc'],
    TEXT: ['txt'],
    IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff']
  },
  UI_CONFIG: { MAX_FILE_SIZE: 50 * 1024 * 1024 }
};

export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

export const getFileType = (file) => {
  const ext = getFileExtension(file.name);
  const mimeType = file.type.toLowerCase();
  
  if (SUPPORTED_EXTENSIONS.PDF.includes(ext) || mimeType === 'application/pdf') {
    return SUPPORTED_FILE_TYPES.PDF;
  }
  
  if (SUPPORTED_EXTENSIONS.DOCX.includes(ext) || 
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return SUPPORTED_FILE_TYPES.DOCX;
  }
  
  if (SUPPORTED_EXTENSIONS.TEXT.includes(ext) || mimeType === 'text/plain') {
    return SUPPORTED_FILE_TYPES.TEXT;
  }
  
  if (SUPPORTED_EXTENSIONS.IMAGE.includes(ext) || mimeType.startsWith('image/')) {
    return SUPPORTED_FILE_TYPES.IMAGE;
  }
  
  return SUPPORTED_FILE_TYPES.UNKNOWN;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }
  
  if (file.size > UI_CONFIG.MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File size exceeds ${formatFileSize(UI_CONFIG.MAX_FILE_SIZE)} limit` 
    };
  }
  
  const fileType = getFileType(file);
  if (fileType === SUPPORTED_FILE_TYPES.UNKNOWN) {
    return { 
      valid: false, 
      error: 'Unsupported file type. Please upload PDF, DOCX, TXT, or image files.' 
    };
  }
  
  return { valid: true, fileType };
};

export const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};