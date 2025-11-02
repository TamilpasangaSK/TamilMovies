import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PopUnderAd = () => {
  const { user } = useAuth();

  useEffect(() => {
    let adScript, popUnderScript;
    
    // Load pop-under ad script
    const loadAds = () => {
      // Don't load ads for any logged in users (admin or regular)
      if (user) {
        return;
      }

      try {
        // Load the new popup ad script
        popUnderScript = document.createElement('script');
        popUnderScript.type = 'text/javascript';
        popUnderScript.src = '//featuregangster.com/6e/ec/f6/6eecf6611098691af50882310d84ca09.js';
        popUnderScript.async = true;
        popUnderScript.defer = true;
        
        // Add error handling
        popUnderScript.onerror = () => {
          console.log('Popup ad script failed to load (likely blocked)');
        };
        
        popUnderScript.onload = () => {
          console.log('Popup ad script loaded successfully');
        };
        
        document.head.appendChild(popUnderScript);
      } catch (error) {
        console.log('Error loading popup ads:', error);
      }
    };

    // Load ads initially for non-logged users only
    if (!user) {
      // Delay loading to ensure page is ready
      setTimeout(loadAds, 2000);
    }

    // Listen for adblock dismissed event to reload ads
    const handleAdblockDismissed = () => {
      if (!user) {
        console.log('Adblock dismissed, reloading popup ads');
        setTimeout(loadAds, 500);
      }
    };
    
    window.addEventListener('adblock-dismissed', handleAdblockDismissed);

    return () => {
      // Cleanup script on unmount
      if (popUnderScript && document.head.contains(popUnderScript)) {
        document.head.removeChild(popUnderScript);
      }
      window.removeEventListener('adblock-dismissed', handleAdblockDismissed);
    };
  }, [user]);

  // Don't show ads for any logged in users
  if (user) {
    return null;
  }

  // This component doesn't render anything visible
  return null;
};

export default PopUnderAd;