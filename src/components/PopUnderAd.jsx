import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PopUnderAd = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Don't load ads for logged in users (both regular users and admin)
    if (!user) {
      // Load pop-under ad script only for non-logged in users
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//featuregangster.com/6e/ec/f6/6eecf6611098691af50882310d84ca09.js';
      script.async = true;
      
      document.head.appendChild(script);

      return () => {
        // Cleanup script on unmount
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [user]);

  // Don't show ads for admin users
  if (user && user.isAdmin) {
    return null;
  }

  // This component doesn't render anything visible
  return null;
};

export default PopUnderAd;