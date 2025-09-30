import React from 'react';

const Header = ({ isPremium, isAdmin }) => {
  return (
    <header className="header">
      <h1>TamilMovies</h1>
      {!isAdmin && (
        <div className="premium-status">
          {isPremium ? (
            <span className="crown gold">👑</span>
          ) : (
            <button className="buy-premium">Buy Premium</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
