import { readFileAsText } from '../utils/fileHelpers.js';

export const extractTextContent = async (file, onProgress) => {
  try {
    onProgress?.('Reading text file...');
    const content = await readFileAsText(file);
    onProgress?.('Text extraction complete');
    return content;
  } catch (error) {
    throw new Error(`Text extraction failed: ${error.message}`);
  }
};
