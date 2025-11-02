import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const BannerAd = ({ className = "" }) => {
  const adRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    let adContainer, bannerScript, invokeScript;
    
    // Clear any existing content
    if (adRef.current) {
      adRef.current.innerHTML = '';
    }

    // Don't load ads for any logged in users (admin or regular)
    if (user) {
      return;
    }

    const loadBannerAd = () => {
      if (adRef.current && !user) {
        // Clear existing content
        adRef.current.innerHTML = '';
        
        try {
          // Load banner ad configuration script
          bannerScript = document.createElement('script');
          bannerScript.type = 'text/javascript';
          bannerScript.innerHTML = `
            atOptions = {
              'key': '874f9b580ee153b038f34d778d444072',
              'format': 'iframe',
              'height': 300,
              'width': 160,
              'params': {}
            };
          `;
          
          // Load banner ad invoke script
          invokeScript = document.createElement('script');
          invokeScript.type = 'text/javascript';
          invokeScript.src = '//installerastonishment.com/874f9b580ee153b038f34d778d444072/invoke.js';
          invokeScript.async = true;
          invokeScript.defer = true;
          
          // Add error handling
          invokeScript.onerror = () => {
            console.log('Banner ad script failed to load (likely blocked)');
            // Show placeholder
            if (adRef.current) {
              adRef.current.innerHTML = `
                <div class="w-40 h-72 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                  <span class="text-gray-500 text-xs">Ad Blocked</span>
                </div>
              `;
            }
          };
          
          invokeScript.onload = () => {
            console.log('Banner ad script loaded successfully');
          };
          
          // Add scripts to the ad container
          adRef.current.appendChild(bannerScript);
          adRef.current.appendChild(invokeScript);
          
        } catch (error) {
          console.log('Error loading banner ads:', error);
          // Show placeholder on error
          if (adRef.current) {
            adRef.current.innerHTML = `
              <div class="w-40 h-72 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                <span class="text-gray-500 text-xs">Loading Ad...</span>
              </div>
            `;
          }
        }
      }
    };

    // Load ads initially for non-logged users only
    if (!user) {
      // Delay loading to ensure page is ready
      setTimeout(loadBannerAd, 1500);
    }

    // Listen for adblock dismissed event to reload ads
    const handleAdblockDismissed = () => {
      if (!user) {
        console.log('Adblock dismissed, reloading banner ads');
        setTimeout(loadBannerAd, 500);
      }
    };
    
    window.addEventListener('adblock-dismissed', handleAdblockDismissed);

    return () => {
      // Cleanup on unmount
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
      // Remove event listeners
      window.removeEventListener('adblock-dismissed', handleAdblockDismissed);
    };
  }, [user]);

  // Don't show ads for any logged in users (admin or regular)
  if (user) {
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