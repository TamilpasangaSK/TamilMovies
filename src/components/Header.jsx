import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PremiumModal from './PremiumModal';

const Header = ({ isPremium, isAdmin }) => {
  const { user } = useAuth();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handlePremiumClick = () => {
    setShowPremiumModal(true);
  };

  return (
    <header className="header">
      <h1>TamilMovies</h1>
      {!isAdmin && (
        <div className="premium-status">
          {isPremium ? (
            <span className="crown gold">👑</span>
          ) : (
            <button className="buy-premium" onClick={handlePremiumClick}>
              Buy Premium
            </button>
          )}
        </div>
      )}
      
      {showPremiumModal && (
        <PremiumModal 
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          isPremium={isPremium}
        />
      )}
    </header>
  );
};

export default Header;