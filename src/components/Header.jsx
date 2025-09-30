import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Menu, X, Search, Home, Star, Calendar, User, Sun, Moon, Upload } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 dark:bg-slate-900/80 border-b border-white/10 dark:border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white dark:text-white hover:text-purple-400 transition-colors">
            <Film className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent dark:from-purple-300 dark:to-pink-300">
              TamilMoviesHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/trending" className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">
              <Star className="w-4 h-4" />
              <span>Trending</span>
            </Link>
            <Link to="/latest" className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Latest</span>
            </Link>
            {!user ? (
              <Link to="/login" className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            ) : (
              <>
                {user.isAdmin && (
                  <Link to="/admin/upload" className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>

          {/* Search Bar & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/20 rounded-full py-2 px-10 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all w-64"
              />
            </div>
            </form>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors rounded-lg hover:bg-white/10 dark:hover:bg-white/10"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg mt-2 p-4 border border-white/10 dark:border-white/10">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-white/10 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/20 rounded-full py-2 px-10 text-white dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
                />
              </div>
            </form>

            {/* Theme Toggle Mobile */}
            <div className="mb-4 flex justify-center">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/trending"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10"
              >
                <Star className="w-4 h-4" />
                <span>Trending</span>
              </Link>
              <Link
                to="/latest"
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Latest</span>
              </Link>
              {!user ? (
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              ) : (
                <>
                  {user.isAdmin && (
                    <Link
                      to="/admin/upload"
                      onClick={toggleMenu}
                      className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center space-x-2 text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/10 w-full text-left"
                  >
                    <User className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;