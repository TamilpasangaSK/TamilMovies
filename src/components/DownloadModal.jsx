import React, { useState, useEffect } from 'react';
import { X, Download, FileText, HardDrive, Clock, CheckCircle } from 'lucide-react';

const DownloadModal = ({ isOpen, onClose, downloadInfo }) => {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [countdown, setCountdown] = useState(5);

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
      // Simulate download start
      window.open(downloadInfo?.link, '_blank');
    }
    return () => clearTimeout(timer);
  }, [downloadStarted, countdown, downloadInfo]);

  if (!isOpen || !downloadInfo) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownloadClick = () => {
    setDownloadStarted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl mx-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
        <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/20 overflow-hidden shadow-2xl">
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Download Ready</h2>
            <p className="text-gray-600 dark:text-gray-400">Your movie download is prepared</p>
          </div>

          {/* Movie Info */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <img
                src={downloadInfo.movie.posterUrl}
                alt={downloadInfo.movie.title}
                className="w-20 h-28 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2">{downloadInfo.movie.title}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <HardDrive className="w-4 h-4" />
                    <span>Quality: {downloadInfo.quality.format}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <FileText className="w-4 h-4" />
                    <span>Size: {downloadInfo.quality.size}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File Description */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 mb-6">
            <h4 className="text-gray-900 dark:text-white font-medium mb-2 flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>File Description</span>
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm font-mono bg-gray-100 dark:bg-black/30 p-3 rounded-lg break-all">
              {downloadInfo.description}
            </p>
          </div>

          {/* Download Button or Countdown */}
          {!downloadStarted ? (
            <button
              onClick={handleDownloadClick}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25"
            >
              <Download className="w-5 h-5" />
              <span>Start Download</span>
            </button>
          ) : (
            <div className="text-center">
              {countdown > 0 ? (
                <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Download starting in {countdown}s...</span>
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
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mt-6">
            <p className="text-orange-300 text-sm text-center">
              <strong>Telegram</strong> @TMB_Rips
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;