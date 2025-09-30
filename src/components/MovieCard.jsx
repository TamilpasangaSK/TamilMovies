import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { incrementViews } = useMovies();
  const { user } = useAuth();

  const formatViews = (views) => {
    if (!views || views === 0) return '0';
    const num = parseInt(views);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const handleDownloadClick = (e) => {
    e.stopPropagation();
    incrementViews(movie.id);
    navigate(`/movie/${movie.id}#download`);
  };

  const handleCardClick = () => {
    incrementViews(movie.id);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
      <div onClick={handleCardClick}>
        <div className="relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            {movie.quality?.format || 'HD'}
          </div>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            {formatViews(movie.views)} views
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <span>{movie.year}</span>
            <span>{movie.genre}</span>
            <span>{movie.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <span>⭐ {movie.rating}</span>
            <span>{movie.size}</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <button
          onClick={handleDownloadClick}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
        >
          Download Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;