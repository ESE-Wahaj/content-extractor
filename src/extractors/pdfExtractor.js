import { readFileAsArrayBuffer } from '../utils/fileHelpers.js';
import { loadPdfJs } from '../utils/libraryLoader.js';

export const extractPdfContent = async (file, onProgress) => {
  try {
    onProgress?.('Loading PDF library...');
    await loadPdfJs();
    
    onProgress?.('Reading PDF file...');
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const typedArray = new Uint8Array(arrayBuffer);
    
    onProgress?.('Parsing PDF document...');
    const pdf = await window.pdfjsLib.getDocument(typedArray).promise;
    
    let fullText = '';
    const totalPages = pdf.numPages;
    
    for (let i = 1; i <= totalPages; i++) {
      onProgress?.(`Extracting page ${i} of ${totalPages}...`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += `\n--- Page ${i} ---\n${pageText}\n`;
    }
    
    onProgress?.('PDF extraction complete');
    return fullText.trim();
  } catch (error) {
    throw new Error(`PDF extraction failed: ${error.message}`);
  }
};