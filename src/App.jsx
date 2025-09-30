import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import AdBlockDetector from './components/AdBlockDetector';
import PopUnderAd from './components/PopUnderAd';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import AdminUpload from './pages/AdminUpload';
import AdminEdit from './pages/AdminEdit';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
          {/* AdBlock Detection */}
          <AdBlockDetector />
          
          {/* Pop-under Ads */}
          <PopUnderAd />
          
          <Header onSearch={handleSearch} />
          
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} pageType="home" />} />
            <Route path="/movie/:title" element={<MovieDetail />} />
            <Route path="/trending" element={<Home searchQuery="" pageType="trending" />} />
            <Route path="/latest" element={<Home searchQuery="" pageType="latest" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/upload" element={<AdminUpload />} />
            <Route path="/admin/edit/:id" element={<AdminEdit />} />
          </Routes>

          {/* Footer */}
          <footer className="bg-black/50 dark:bg-black/50 backdrop-blur-sm border-t border-white/10 dark:border-white/10 mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <p className="text-gray-400 dark:text-gray-400 text-sm">
                  © 2024 TamilMoviesHub. All rights reserved. For educational purposes only.
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                  This is a demo website. All movie data is for demonstration purposes.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;