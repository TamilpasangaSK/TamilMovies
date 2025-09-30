import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Film, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Film className={`h-8 w-8 ${isDark ? 'text-red-500' : 'text-red-600'} group-hover:scale-110 transition-transform duration-200`} />
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-red-500 transition-colors duration-200`}>
              MovieHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} font-medium transition-colors duration-200`}
            >
              Home
            </Link>
            <Link 
              to="/?genre=action" 
              className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} font-medium transition-colors duration-200`}
            >
              Action
            </Link>
            <Link 
              to="/?genre=comedy" 
              className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} font-medium transition-colors duration-200`}
            >
              Comedy
            </Link>
            <Link 
              to="/?genre=drama" 
              className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} font-medium transition-colors duration-200`}
            >
              Drama
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 w-64 rounded-lg border ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500'
                } focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-colors duration-200`}
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              } transition-colors duration-200`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                {user.role !== 'admin' && (
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105">
                    Premium
                  </button>
                )}
                {user.role === 'admin' && (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/admin/upload"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      Upload
                    </Link>
                    <Link
                      to="/admin/edit"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                    >
                      Edit
                    </Link>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <User className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105">
                  Premium
                </button>
                <Link
                  to="/login"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              isDark 
                ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-2">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 w-full rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500'
                    } focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-colors duration-200`}
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2 px-2">
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} font-medium transition-colors duration-200`}
                >
                  Home
                </Link>
                <Link 
                  to="/?genre=action" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} font-medium transition-colors duration-200`}
                >
                  Action
                </Link>
                <Link 
                  to="/?genre=comedy" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} font-medium transition-colors duration-200`}
                >
                  Comedy
                </Link>
                <Link 
                  to="/?genre=drama" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} font-medium transition-colors duration-200`}
                >
                  Drama
                </Link>
              </nav>

              {/* Mobile User Actions */}
              <div className="px-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Theme</span>
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg ${
                      isDark 
                        ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                    } transition-colors duration-200`}
                  >
                    {isDark ? '☀️' : '🌙'}
                  </button>
                </div>

                {user ? (
                  <div className="space-y-3">
                    {user.role !== 'admin' && (
                      <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                        Premium
                      </button>
                    )}
                    {user.role === 'admin' && (
                      <div className="space-y-2">
                        <Link
                          to="/admin/upload"
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                        >
                          Upload Movie
                        </Link>
                        <Link
                          to="/admin/edit"
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-center"
                        >
                          Edit Movies
                        </Link>
                      </div>
                    )}
                    <div className={`flex items-center space-x-2 p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <User className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {user.email}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
                      Premium
                    </button>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 text-center"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;