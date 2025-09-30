import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isPremium, isAdmin } = useAuth();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-black text-white">
      <h1 className="text-2xl font-bold">TamilMovies</h1>

      {!isAdmin && (
        <div className="flex items-center space-x-4">
          {isPremium ? (
            <span className="text-yellow-400 text-lg flex items-center space-x-1">
              <span className="text-xl">👑</span>
              <span className="font-semibold">Premium</span>
            </span>
          ) : (
            <Link
              to="/premium"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Buy Premium
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
