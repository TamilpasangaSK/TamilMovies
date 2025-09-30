import React, { useEffect, useRef } from 'react';

const BannerAd = ({ className = "" }) => {
  const adRef = useRef(null);

  useEffect(() => {
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
    document.head.appendChild(script);

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//installerastonishment.com/874f9b580ee153b038f34d778d444072/invoke.js';
    invokeScript.async = true;
    
    if (adRef.current) {
      adRef.current.appendChild(invokeScript);
    }

    return () => {
      // Cleanup scripts on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`banner-ad ${className}`}>
      <div ref={adRef} className="ad-container flex justify-center items-center">
        {/* Ad will be loaded here */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 text-center">
          <p className="text-gray-400 text-xs mb-2">Advertisement</p>
          <div className="w-40 h-72 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-xs">Loading Ad...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerAd;