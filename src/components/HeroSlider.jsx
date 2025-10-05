import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import TrailerModal from './TrailerModal';

const HeroSlider = () => {
  const { movies } = useMovies();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  
  // Get recent 5 uploads (sorted by upload date)
  const recentMovies = movies
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % recentMovies.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [recentMovies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recentMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + recentMovies.length) % recentMovies.length);
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const handleTrailerClick = () => {
    setIsTrailerOpen(true);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {recentMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: `url('${movie.posterUrl}')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recent Upload
                  </span>
                  <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-300">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{formatViews(movie.views)} views</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
                  {movie.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 text-sm sm:text-base">
                  <span className="text-yellow-400 font-semibold">★ {movie.rating}</span>
                  <span className="text-gray-300">{movie.year}</span>
                  <span className="text-gray-300">{movie.duration}</span>
                </div>

                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-3xl">
                  {movie.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                  <button
                    onClick={handleTrailerClick}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 sm:px-8 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base"
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Now</span>
                  </button>
                  
                  <Link
                    to={`/movie/${encodeURIComponent(movie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))}`}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white py-3 px-6 sm:px-8 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <Info className="w-5 h-5" />
                    <span>More Info</span>
                  </Link>
                </div>

                {/* Quality badges */}
                <div className="flex flex-wrap gap-2">
                  {movie.quality.slice(0, 4).map((quality) => (
                    <span
                      key={quality.format}
                      className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-400/30 dark:border-purple-400/30"
                    >
                      {quality.format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {recentMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-purple-500 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Movie Counter */}
      <div className="absolute top-20 right-4 z-20 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
        <span className="text-sm">
          <span className="hidden sm:inline">{currentSlide + 1} / {recentMovies.length}</span>
          <span className="sm:hidden">{currentSlide + 1}/{recentMovies.length}</span>
        </span>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={recentMovies[currentSlide]?.trailerUrl || ''}
        movieTitle={recentMovies[currentSlide]?.title || ''}
      />
    </div>
  );
};

export default HeroSlider;