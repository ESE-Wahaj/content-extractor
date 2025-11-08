const API_CONFIG = {
  ENABLED: false,
  ENDPOINT: '/api/content/extract',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3
};

export const sendToAPI = async (data) => {
  if (!API_CONFIG.ENABLED) {
    console.log('API is disabled. Data would be sent to:', API_CONFIG.ENDPOINT);
    return { success: true, message: 'API is disabled in config' };
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    const response = await fetch(API_CONFIG.ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`API error: ${error.message}`);
  }
};

export const prepareAPIPayload = (file, extractedContent) => {
  return {
    filename: file.name,
    fileType: file.type,
    fileSize: file.size,
    extractedContent: extractedContent,
    timestamp: new Date().toISOString(),
    metadata: {
      processingDate: new Date().toISOString(),
      contentLength: extractedContent.length
    }
  };
};