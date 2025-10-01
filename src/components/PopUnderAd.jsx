import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const PopUnderAd = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Load pop-under ad script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//installerastonishment.com/3f/bc/54/3fbc5467bc86b7c4085f7c8b7cea18ed.js';
    script.async = true;
    
    // Don't load ads for admin users
    if (!(user && user.isAdmin)) {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script) && !(user && user.isAdmin)) {
        document.head.removeChild(script);
      }
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