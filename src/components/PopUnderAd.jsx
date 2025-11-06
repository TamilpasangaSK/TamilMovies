import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PopUnderAd = () => {
  const { user } = useAuth();

  useEffect(() => {
    let adScript;
    
    // Load pop-under ad script
    const loadAds = () => {
      // Don't load ads for logged in users
      if (user) {
        return;
      }

      adScript = document.createElement('script');
      adScript.type = 'text/javascript';
      adScript.src = '//featuregangster.com/6e/ec/f6/6eecf6611098691af50882310d84ca09.js';
      adScript.async = true;
      
      document.head.appendChild(adScript);
    };

    // Load ads initially if user is not logged in
    if (!user) {
      loadAds();
    }

    // Listen for adblock dismissed event
    const handleAdblockDismissed = () => {
      if (!user) {
        setTimeout(loadAds, 1000);
      }
    };
    
    window.addEventListener('adblock-dismissed', handleAdblockDismissed);

    return () => {
      // Cleanup script on unmount
      if (adScript && document.head.contains(adScript)) {
        document.head.removeChild(adScript);
      }
      window.removeEventListener('adblock-dismissed', handleAdblockDismissed);
    };
  }, [user]);

  // Don't show ads for admin users
  if (user && user.isAdmin) {
    return null;
  }

  // This component doesn't render anything visible
  return null;
};

export default PopUnderAd;