import { readFileAsArrayBuffer } from '../utils/fileHelpers.js';
import { loadMammoth } from '../utils/libraryLoader.js';

export const extractDocxContent = async (file, onProgress) => {
  try {
    onProgress?.('Loading DOCX library...');
    await loadMammoth();
    
    onProgress?.('Reading DOCX file...');
    const arrayBuffer = await readFileAsArrayBuffer(file);
    
    onProgress?.('Extracting text from document...');
    const result = await window.mammoth.extractRawText({ arrayBuffer });
    
    onProgress?.('DOCX extraction complete');
    return result.value;
  } catch (error) {
    throw new Error(`DOCX extraction failed: ${error.message}`);
  }
};