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
              <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Site Info */}
                <div>
                  <h3 className="text-white font-semibold mb-3">TamilMoviesHub</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Your ultimate destination for high-quality Tamil movie downloads.
                  </p>
                  <p className="text-gray-500 text-xs">
                    Providing premium content in multiple formats and languages.
                  </p>
                </div>

                {/* Legal & Disclaimer */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Legal Notice</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    All content is for educational and entertainment purposes only.
                  </p>
                  <p className="text-gray-500 text-xs mb-1">
                    We do not host any files on our servers.
                  </p>
                  <p className="text-gray-500 text-xs">
                    All links are provided by third-party sources.
                  </p>
                </div>

                {/* Contact & Support */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Support</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    For any issues or DMCA requests, contact us immediately.
                  </p>
                  <p className="text-gray-500 text-xs mb-1">
                    Telegram: @TMB_Rips
                  </p>
                  <p className="text-gray-500 text-xs">
                    We respect copyright and will remove content upon request.
                  </p>
                </div>
              </div>

              {/* Bottom Copyright */}
              <div className="border-t border-white/10 mt-8 pt-6 text-center">
                <p className="text-gray-400 text-sm mb-2">
                  © 2024 TamilMoviesHub. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs">
                  This website is protected by copyright law. Unauthorized reproduction is prohibited.
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