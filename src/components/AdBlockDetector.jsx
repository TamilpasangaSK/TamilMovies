import React, { useState, useEffect } from 'react';
import { Shield, X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdBlockDetector = () => {
  const [isAdBlockDetected, setIsAdBlockDetected] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const detectAdBlock = () => {
      // Don't run ad detection for admin users
      if (user && user.isAdmin) {
        return;
      }

      // Multiple detection methods for better accuracy
      let adBlockDetected = false;
      
      // Method 1: Test element detection
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox adsbygoogle ads ad-banner';
      testAd.style.position = 'absolute';
      testAd.style.left = '-10000px';
      testAd.style.width = '1px';
      testAd.style.height = '1px';
      
      document.body.appendChild(testAd);
      
      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0 || testAd.offsetWidth === 0;
        if (isBlocked) adBlockDetected = true;
        
        document.body.removeChild(testAd);
        
        // Method 2: Check for common ad blocker variables
        if (typeof window.adnxs === 'undefined' || 
            typeof window.googletag === 'undefined' ||
            typeof window.pbjs === 'undefined') {
          adBlockDetected = true;
        }
        
        // Method 3: Check for blocked requests
        const img = new Image();
        img.onload = () => {
          // Ad loaded successfully
        };
        img.onerror = () => {
          adBlockDetected = true;
          setIsAdBlockDetected(true);
          setShowWarning(true);
        };
        img.src = 'https://pagead2.googlesyndication.com/pagead/show_ads.js';
        
        // Set final result
        if (adBlockDetected) {
          setIsAdBlockDetected(true);
          setShowWarning(true);
        }
      }, 200);
    };


    // Run detection after page loads
    setTimeout(detectAdBlock, 1500);
  }, [user]);

  // Don't show ads or adblock detection for admin users
  if (user && user.isAdmin) {
    return null;
  }

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
        <button
          onClick={() => setShowWarning(false)}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">AdBlock Detected</h2>
          
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <span className="text-orange-300 font-medium">Please Disable AdBlock</span>
            </div>
            <p className="text-orange-200 text-sm">
              We rely on ads to keep our movie downloads free. Please whitelist our site or disable your ad blocker to continue.
            </p>
          </div>

          <div className="space-y-3 text-left text-gray-300 text-sm mb-6">
            <p className="flex items-start space-x-2">
              <span className="text-purple-400 font-bold">1.</span>
              <span>Click on your AdBlock extension icon</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-purple-400 font-bold">2.</span>
              <span>Select "Disable on this site" or "Pause AdBlock"</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-purple-400 font-bold">3.</span>
              <span>Refresh the page to continue</span>
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
          >
            I've Disabled AdBlock
          </button>

          <p className="text-gray-400 text-xs mt-4">
            Thank you for supporting free movie downloads!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdBlockDetector;