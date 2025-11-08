import { SUPPORTED_FILE_TYPES } from '../config/constants.js';
import { extractTextContent } from './textExtractor.js';
import { extractPdfContent } from './pdfExtractor.js';
import { extractDocxContent } from './docxExtractor.js';
import { extractImageContent } from './imageExtractor.js';

export const getExtractor = (fileType) => {
  const extractors = {
    [SUPPORTED_FILE_TYPES.TEXT]: extractTextContent,
    [SUPPORTED_FILE_TYPES.PDF]: extractPdfContent,
    [SUPPORTED_FILE_TYPES.DOCX]: extractDocxContent,
    [SUPPORTED_FILE_TYPES.IMAGE]: extractImageContent
  };
  
  return extractors[fileType] || null;
};