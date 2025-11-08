# Content Extractor

A modular, client-side content extraction system that processes PDF, DOCX, TXT, and image files entirely in the browser without external API dependencies.

## Features

- **Multi-Format Support**: Extracts text from PDF, DOCX, TXT, and image files (JPG, PNG, GIF, BMP, WEBP, TIFF)
- **Client-Side Processing**: All extraction happens locally in the browser - no data transmission to external servers
- **OCR Capability**: Tesseract.js integration for optical character recognition on images
- **Modular Architecture**: Separate extractors for each file type with factory pattern implementation
- **API Ready**: Built-in API service layer for seamless integration into larger workflows
- **Drag & Drop Interface**: Intuitive file upload with progress tracking and error handling

## Technology Stack

- **React** - Component-based UI framework
- **PDF.js** - PDF text extraction
- **Mammoth.js** - DOCX document processing
- **Tesseract.js** - OCR engine for images
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first styling

## Installation
```bash
# Clone the repository
git clone <repository-url>
cd content-extractor

# Install dependencies
npm install

# Start development server
npm start
```

## Project Structure
```
src/
├── config/
│   └── constants.js          # Configuration constants & CDN URLs
├── utils/
│   ├── fileHelpers.js        # File validation & type detection
│   └── libraryLoader.js      # Dynamic library loading
├── extractors/
│   ├── textExtractor.js      # Plain text extraction
│   ├── pdfExtractor.js       # PDF processing
│   ├── docxExtractor.js      # DOCX processing
│   ├── imageExtractor.js     # OCR-based image extraction
│   └── extractorFactory.js   # Extractor selection logic
├── services/
│   ├── extractionService.js  # Main extraction orchestration
│   └── apiService.js         # API integration layer
├── components/
│   ├── FileUploader.jsx      # File upload interface
│   ├── FileInfo.jsx          # File metadata display
│   ├── ProgressIndicator.jsx # Processing status
│   ├── ErrorDisplay.jsx      # Error handling UI
│   └── ContentDisplay.jsx    # Extracted content viewer
└── App.jsx                    # Main application component
```

## Usage

1. **Upload a file** via drag-and-drop or file selector
2. **Processing begins automatically** with real-time progress updates
3. **View extracted content** in the text viewer
4. **Copy to clipboard** or **send to API** for downstream processing

## API Integration

Enable API integration by configuring `constants.js`:
```javascript
export const API_CONFIG = {
  ENABLED: true,
  ENDPOINT: 'https://your-api.com/extract',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3
};
```

The system sends extracted content in the following format:
```json
{
  "filename": "document.pdf",
  "fileType": "application/pdf",
  "fileSize": 1024000,
  "extractedContent": "Full extracted text...",
  "timestamp": "2025-11-08T...",
  "metadata": {
    "processingDate": "2025-11-08T...",
    "contentLength": 5000
  }
}
```

## Configuration

Key configuration options in `src/config/constants.js`:

- **File size limit**: 50MB (adjustable)
- **Supported formats**: PDF, DOCX, TXT, Images
- **API timeout**: 30 seconds
- **OCR language**: English (expandable)

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Opera: Full support

Requires modern browser with ES6+ support and FileReader API.

## Performance Considerations

- **PDF**: ~500ms per page
- **DOCX**: ~200-500ms depending on size
- **Images**: 2-10 seconds depending on image complexity and text density
- **TXT**: Near-instantaneous

## Security & Privacy

All processing occurs client-side. No files or data are transmitted to external servers unless explicitly configured via API integration.

## Future Enhancements

- Multi-language OCR support
- Batch file processing
- Progress persistence across sessions
- Export formats (JSON, XML)
- Advanced text preprocessing options

## License

MIT License - See LICENSE file for details

## Author

Developed as part of FYP Module 1 - Content Extraction System

## Support

For issues or questions, please open an issue in the repository.