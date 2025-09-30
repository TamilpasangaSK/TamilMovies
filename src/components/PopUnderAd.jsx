import React, { useEffect } from 'react';

const PopUnderAd = () => {
  useEffect(() => {
    // Load pop-under ad script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//installerastonishment.com/3f/bc/54/3fbc5467bc86b7c4085f7c8b7cea18ed.js';
    script.async = true;
    
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default PopUnderAd;