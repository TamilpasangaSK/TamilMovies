import React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { Star, Calendar, Clock, Download, Eye } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const { incrementViews } = useMovies();

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const handleCardClick = () => {
    // Increment view count when card is clicked
    incrementViews(movie.id);
  };

  return (
    <div className="group relative bg-white/10 dark:bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 dark:border-white/20 hover:border-purple-400/50 dark:hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/20">
      {/* Poster Image */}
      <div className="relative overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Quality Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {movie.quality[movie.quality.length - 1]?.format}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{movie.rating}</span>
        </div>

        {/* Views Badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <Eye className="w-3 h-3" />
          <span>{formatViews(movie.views)}</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <Link
              to={`/movie/${movie.id}`}
              to={`/movie/${encodeURIComponent(movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))}`}
              onClick={handleCardClick}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>View Details</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <h3 className="text-white dark:text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 dark:group-hover:text-purple-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-gray-400 dark:text-gray-400 text-sm mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{movie.duration}</span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium border border-purple-400/30 dark:border-purple-400/30"
            >
              {genre}
            </span>
          ))}
          {movie.genre.length > 3 && (
            <span className="text-gray-400 dark:text-gray-400 text-xs px-2 py-1">
              +{movie.genre.length - 3} more
            </span>
          )}
        </div>

        {/* Quality Options */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {movie.quality.slice(0, 3).map((quality) => (
              <span
                key={quality.format}
                className="bg-white/10 dark:bg-white/10 text-gray-300 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium"
              >
                {quality.format}
              </span>
            ))}
            {movie.quality.length > 3 && (
              <span className="text-gray-400 dark:text-gray-400 text-xs px-2 py-1">
                +{movie.quality.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;