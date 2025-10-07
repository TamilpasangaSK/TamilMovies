import React, { useState, useEffect } from 'react';
import { X, Download, FileText, HardDrive, Clock, CheckCircle, ExternalLink } from 'lucide-react';

const DownloadModal = ({ isOpen, onClose, downloadInfo }) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [countdown, setCountdown] = useState(5); // 5 seconds

  useEffect(() => {
    if (isOpen) {
      setDownloadStarted(false);
      setCountdown(5);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (downloadStarted && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (downloadStarted && countdown === 0) {
      // Force redirect to download link
      if (downloadInfo?.link) {
        // Try multiple redirect methods
        try {
          window.open(downloadInfo.link, '_blank');
          window.location.href = downloadInfo.link;
        } catch (error) {
          // Fallback method
          const link = document.createElement('a');
          link.href = downloadInfo.link;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    }
    return () => clearTimeout(timer);
  }, [downloadStarted, countdown, downloadInfo, onClose]);

  if (!isOpen || !downloadInfo) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownloadClick = () => {
    if (downloadInfo?.link) {
      setDownloadStarted(true);
    } else {
      alert('Download link not available');
    }
  };

  const formatTime = (seconds) => {
    return `${seconds}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Download Ready</h2>
            <p className="text-gray-400">Your movie download is prepared</p>
          </div>

          {/* Movie Info */}
          <div className="bg-white/5 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <img
                src={downloadInfo.movie.posterUrl}
                alt={downloadInfo.movie.title}
                className="w-20 h-28 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">{downloadInfo.movie.title}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <HardDrive className="w-4 h-4" />
                    <span>Quality: {downloadInfo.quality.format}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <FileText className="w-4 h-4" />
                    <span>Size: {downloadInfo.quality.size}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <ExternalLink className="w-4 h-4" />
                    <span>Type: {downloadInfo.quality.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Description */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <h4 className="text-white font-medium mb-2 flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>File Description</span>
            </h4>
            <p className="text-gray-300 text-sm font-mono bg-black/30 p-3 rounded-lg break-all">
              {downloadInfo.description}
            </p>
          </div>

          {/* Download Buttons */}
          {!downloadStarted ? (
            <button
              onClick={handleDownloadClick}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25"
            >
              <Download className="w-5 h-5" />
              <span>Start Download (5 sec countdown)</span>
            </button>
          ) : (
            <div className="text-center">
              {countdown > 0 ? (
                <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Download starting in {formatTime(countdown)} seconds...</span>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Download Started!</span>
                </div>
              )}
            </div>
          )}

          {/* Demo Notice */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-6">
            <p className="text-blue-300 text-sm text-center">
              <strong>Download Notice:</strong> Please wait for the countdown to complete before your download begins.
            </p>
            <p className="text-blue-300 text-xs text-center mt-2">
              For support or issues, contact: <strong>@TMB_Rips</strong> on Telegram
            </p>
          </div>

          {/* Telegram Button */}
          <div className="mt-4">
            <a
              href="https://t.me/TMB_Rips"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span>Join Telegram Channel</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;