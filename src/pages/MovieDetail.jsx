import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import TrailerModal from '../components/TrailerModal';
import DownloadModal from '../components/DownloadModal';
import BannerAd from '../components/BannerAd';
import PopUnderAd from '../components/PopUnderAd';
import AdBlockDetector from '../components/AdBlockDetector';

const MovieDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const { movies } = useMovies();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [showTrailer, setShowTrailer] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const movie = movies?.find(m =>
    m.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === decodeURIComponent(title)
  );

  useEffect(() => {
    if (!movie) {
      navigate('/');
    }
  }, [movie, navigate]);

  if (!movie) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <p>The requested movie could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-900'
    }`}>
      {!user && <AdBlockDetector />}
      {!user && <BannerAd />}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm ${
                isDark ? 'bg-purple-600' : 'bg-amber-200 text-amber-800'
              }`}>
                {movie.year}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                isDark ? 'bg-blue-600' : 'bg-blue-200 text-blue-800'
              }`}>
                {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                isDark ? 'bg-green-600' : 'bg-green-200 text-green-800'
              }`}>
                {movie.rating || 'N/A'}
              </span>
            </div>

            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => setShowTrailer(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Watch Trailer
              </button>
              <button
                onClick={() => setShowDownload(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Download Now
              </button>
            </div>

            <div className={`grid grid-cols-2 gap-4 p-6 rounded-lg ${
              isDark ? 'bg-slate-800/50' : 'bg-white/70 backdrop-blur-sm'
            }`}>
              <div>
                <h3 className="font-semibold mb-2">Director</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {movie.director || 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Duration</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {movie.duration || 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Language</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {Array.isArray(movie.languages) ? movie.languages.join(', ') : (movie.language || 'Tamil')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {Array.isArray(movie.quality) ? movie.quality.map(q => q.format || q).join(', ') : (movie.quality || 'HD')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal movie={movie} onClose={() => setShowTrailer(false)} />
      )}
      {showDownload && (
        <DownloadModal movie={movie} onClose={() => setShowDownload(false)} />
      )}
      {!user && <PopUnderAd />}
    </div>
  );
};

export default MovieDetail;
