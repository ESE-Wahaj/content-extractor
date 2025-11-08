const CDN_URLS = {
  PDFJS: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  PDFJS_WORKER: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  MAMMOTH: 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js',
  TESSERACT: 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js'
};

const loadedLibraries = new Set();

const loadScript = (url, checkGlobal) => {
  return new Promise((resolve, reject) => {
    if (loadedLibraries.has(url)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
      loadedLibraries.add(url);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
};

export const loadPdfJs = async () => {
  if (!window.pdfjsLib) {
    await loadScript(CDN_URLS.PDFJS);
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = CDN_URLS.PDFJS_WORKER;
  }
};

export const loadMammoth = async () => {
  if (!window.mammoth) {
    await loadScript(CDN_URLS.MAMMOTH);
  }
};

export const loadTesseract = async () => {
  if (!window.Tesseract) {
    try {
      await loadScript(CDN_URLS.TESSERACT);
      
      // Wait a bit for Tesseract to fully initialize
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!window.Tesseract) {
        throw new Error('Tesseract failed to load');
      }
    } catch (error) {
      throw new Error('Failed to load OCR library. Please check your internet connection.');
    }
  }
};