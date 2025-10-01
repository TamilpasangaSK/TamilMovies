import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BannerAd = ({ className = "" }) => {
  const adRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    // Clear any existing content
    if (adRef.current) {
      adRef.current.innerHTML = '';
    }

    // Don't load ads for admin users
    if (user && user.isAdmin) {
      return;
    }

    // Load banner ad script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      atOptions = {
        'key': '874f9b580ee153b038f34d778d444072',
        'format': 'iframe',
        'height': 300,
        'width': 160,
        'params': {}
      };
    `;
    
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//installerastonishment.com/874f9b580ee153b038f34d778d444072/invoke.js';
    invokeScript.async = true;
    
    // Add scripts to the ad container
    if (adRef.current) {
      adRef.current.appendChild(script);
      adRef.current.appendChild(invokeScript);
    }

    return () => {
      // Cleanup on unmount
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [user]);

  // Don't show ads for admin users
  if (user && user.isAdmin) {
    return null;
  }

  return (
    <div className={`banner-ad ${className}`}>
      <div className="flex justify-center items-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
          <p className="text-gray-400 text-xs mb-2">Advertisement</p>
          <div ref={adRef} className="ad-container">
            {/* Ad will be loaded here */}
            <div className="w-40 h-72 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-xs">Loading Ad...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerAd;