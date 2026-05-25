import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react';

const PDFModal = ({ isOpen, onClose, pdfUrl, title = "Document Viewer" }) => {
  // Handle escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    if (pdfUrl) {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = title.replace(/\s+/g, '_') + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-modal-title"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h2 id="pdf-modal-title" className="text-lg font-semibold text-gray-800">
              {title}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
                title="Download PDF"
                aria-label="Download PDF"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close PDF viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="flex-1 relative">
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title={title}
                loading="lazy"
                onLoad={() => {
                  // Optional: Add any loading completion logic here
                }}
                onError={() => {
                  console.error('Error loading PDF in iframe');
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">
                    <X className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-600">No PDF URL provided</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <p className="text-xs text-gray-500 text-center">
              If the PDF doesn't load properly, try downloading it using the download button above.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PDFModal;
