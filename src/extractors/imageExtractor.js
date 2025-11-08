import { loadTesseract } from '../utils/libraryLoader.js';
import { readFileAsDataURL } from '../utils/fileHelpers.js';

export const extractImageContent = async (file, onProgress) => {
  let worker = null;
  
  try {
    onProgress?.('Loading OCR engine...');
    await loadTesseract();
    
    // Convert file to data URL for Tesseract
    onProgress?.('Reading image file...');
    const imageDataUrl = await readFileAsDataURL(file);
    
    onProgress?.('Initializing Tesseract worker...');
    
    // Create worker with proper error handling
    worker = await window.Tesseract.createWorker({
      logger: (m) => {
        if (m.status === 'recognizing text') {
          const progress = Math.round(m.progress * 100);
          onProgress?.(`OCR Progress: ${progress}%`);
        } else if (m.status) {
          onProgress?.(m.status);
        }
      },
      errorHandler: (err) => {
        console.error('Tesseract error:', err);
      }
    });
    
    onProgress?.('Loading language data...');
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    onProgress?.('Performing OCR on image...');
    const { data: { text } } = await worker.recognize(imageDataUrl);
    
    onProgress?.('Cleaning up...');
    await worker.terminate();
    
    if (!text || text.trim().length === 0) {
      throw new Error('No text could be extracted from the image. The image may not contain readable text.');
    }
    
    onProgress?.('Image extraction complete');
    return text;
  } catch (error) {
    // Ensure worker is terminated even on error
    if (worker) {
      try {
        await worker.terminate();
      } catch (e) {
        console.error('Error terminating worker:', e);
      }
    }
    
    throw new Error(`Image extraction failed: ${error.message}`);
  }
};