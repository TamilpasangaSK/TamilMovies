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
          <footer className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 mt-16">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* About Section */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">About TamilMoviesHub</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Your ultimate destination for high-quality Tamil movie entertainment. We provide a vast library of films, from classics to the latest blockbusters.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/trending" className="text-gray-300 hover:text-white transition-colors text-sm">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/latest" className="text-gray-300 hover:text-white transition-colors text-sm">
                        DMCA
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm">
                        Request A Movie
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Categories</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                        4K Movies
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                        1080p Movies
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                        Anime
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                        Web Series
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Newsletter */}
                <div>
                  <h3 className="text-white font-bold text-lg mb-4">Join Our Newsletter</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Get notified about the latest movie uploads and updates.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                    />
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-white/10 mt-8 pt-8 text-center">
                <p className="text-gray-400 text-sm">
                  © 2025 TamilMoviesHub. All Rights Reserved.
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