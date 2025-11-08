import { getFileType, validateFile } from '../utils/fileHelpers.js';
import { getExtractor } from '../extractors/extractorFactory.js';

export const extractContent = async (file, onProgress) => {
  try {
    onProgress?.('Validating file...');
    
    const validation = validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    
    const { fileType } = validation;
    onProgress?.(`Detected file type: ${fileType.toUpperCase()}`);
    
    const extractor = getExtractor(fileType);
    if (!extractor) {
      throw new Error('No extractor available for this file type');
    }
    
    const content = await extractor(file, onProgress);
    
    if (!content || content.trim().length === 0) {
      throw new Error('No content could be extracted from the file');
    }
    
    return content;
  } catch (error) {
    // Provide more helpful error messages
    console.error('Extraction error:', error);
    
    if (error.message.includes('Failed to load')) {
      throw new Error('Failed to load required libraries. Please check your internet connection and try again.');
    }
    
    throw error;
  }
};