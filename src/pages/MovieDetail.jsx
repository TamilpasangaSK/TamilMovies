import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import { Star, Calendar, Clock, User, Download, Play, ArrowLeft, HardDrive, Eye, Award, Disc, Zap, CreditCard as Edit, Trash2 } from 'lucide-react';
import TrailerModal from '../components/TrailerModal';
import DownloadModal from '../components/DownloadModal';
import BannerAd from '../components/BannerAd';

const MovieDetail = () => {
  const { movies, incrementViews, deleteMovie } = useMovies();
  const { user } = useAuth();
  const { title } = useParams();
  const movie = movies.find(m => 
    encodeURIComponent(m.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')) === title
  );
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState(null);
  const [hasViewCounted, setHasViewCounted] = useState(false);

  // Increment view count when movie loads (only once per session)
  useEffect(() => {
    if (movie && !hasViewCounted) {
      incrementViews(movie.id);
      setHasViewCounted(true);
    }
  }, [movie, hasViewCounted, incrementViews]);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const getQualityIcon = (type) => {
    switch (type) {
      case 'hdr':
        return <Award className="w-8 h-8 text-white" />;
      case '4k-dv':
        return <Zap className="w-8 h-8 text-white" />;
      case 'blu-ray':
        return <Disc className="w-8 h-8 text-white" />;
      case 'imax':
        return <Award className="w-8 h-8 text-white" />;
      default:
        return <HardDrive className="w-8 h-8 text-white" />;
    }
  };

  const getQualityColor = (type) => {
    switch (type) {
      case 'hdr':
        return 'from-orange-600 to-red-600';
      case '4k-dv':
        return 'from-blue-600 to-purple-600';
      case 'blu-ray':
        return 'from-indigo-600 to-blue-600';
      case 'imax':
        return 'from-yellow-600 to-orange-600';
      case 'songs':
        return 'from-green-600 to-emerald-600';
      case '60fps':
        return 'from-cyan-600 to-blue-600';
      case '144fps':
        return 'from-purple-600 to-indigo-600';
      default:
        return 'from-purple-600 to-pink-600';
    }
  };

  const handleTrailerClick = () => {
    setIsTrailerOpen(true);
  };

  const generateDownloadLink = (quality, movie) => {
    // Generate unique sample download links for each quality
    // Return the actual link from the movie data if available
    if (quality.link) {
      return quality.link;
    }
    
    // Fallback to sample links if no link provided
    const sampleLinks = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    ];
    
    const linkIndex = (movie.id.charCodeAt(0) + quality.format.length) % sampleLinks.length;
    return sampleLinks[linkIndex];
  };

  const generateFileDescription = (quality, movie) => {
    const cleanTitle = movie.title.replace(/[^a-zA-Z0-9\s]/g, '');
    const qualityType = quality.type !== 'standard' ? quality.type.toUpperCase().replace('-', ' ') : '';
    const codec = quality.format.includes('4K') ? 'x265 HEVC' : 'x265';
    const audio = quality.format.includes('4K') ? 'DDP7.1' : 'DDP5.1';
    
    return `${cleanTitle} ${movie.year} ${quality.format} 10bit ${qualityType} WR ${audio} ${codec} - TMB`.trim().replace(/\s+/g, ' ');
  };

  const handleDownload = (quality, movie) => {
    const downloadLink = quality.link || generateDownloadLink(quality, movie);
    const fileDescription = quality.description || generateFileDescription(quality, movie);
    
    setDownloadInfo({
      link: downloadLink,
      description: fileDescription,
      quality: quality,
      movie: movie
    });
  };

  const handleDeleteMovie = () => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      deleteMovie(movie.id);
      alert('Movie deleted successfully!');
      window.location.href = '/';
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-4">Movie Not Found</h2>
          <Link
            to="/"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - Portrait Layout */}
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${movie.posterUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 dark:from-black/90 dark:via-black/60 dark:to-black/30"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-screen py-20">
          <div className="container mx-auto px-4">
            {/* Banner Ad - Top */}
            <div className="flex justify-center mb-8">
              <BannerAd />
            </div>
            
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Movie Poster */}
              <div className="lg:col-span-2 flex justify-center lg:justify-start">
                <div className="relative group">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full max-w-sm h-auto rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6">
                      <button 
                        onClick={handleTrailerClick}
                        className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-white/30 transition-all"
                      >
                        <Play className="w-5 h-5" />
                        <span>Watch Trailer</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Movie Details */}
              <div className="lg:col-span-3 text-center lg:text-left">
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Movies</span>
                </Link>

                {/* Admin Actions */}
                {user && user.isAdmin && (
                  <div className="flex items-center space-x-4 mb-6">
                    <Link
                      to={`/admin/edit/${movie.id}`}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Movie</span>
                    </Link>
                    <button
                      onClick={handleDeleteMovie}
                      className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Movie</span>
                    </button>
                  </div>
                )}

                <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-white mb-4 leading-tight">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-6 text-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-white dark:text-white font-semibold">{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-300">
                    <User className="w-4 h-4" />
                    <span>{movie.director}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 dark:text-gray-300">
                    <Eye className="w-4 h-4" />
                    <span>{formatViews(movie.views)} views</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                  {movie.genre.map((genre) => (
                    <span
                      key={genre}
                      className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-400/30 dark:border-purple-400/30"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-300 dark:text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                  {movie.description}
                </p>

                {/* Cast */}
                <div className="mb-8">
                  <h3 className="text-white dark:text-white font-semibold mb-3">Starring</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor) => (
                      <span
                        key={actor}
                        className="bg-white/10 dark:bg-white/10 backdrop-blur-sm text-gray-300 dark:text-gray-300 px-3 py-2 rounded-lg text-sm font-medium"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                {movie.languages && movie.languages.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-white dark:text-white font-semibold mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.languages.map((language) => (
                        <span
                          key={language}
                          className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-blue-300 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-400/30 dark:border-blue-400/30"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-slate-900 dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          {/* Banner Ad - Before Download Section */}
          <div className="flex justify-center mb-12">
            <BannerAd />
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-4">Download Options</h2>
            <p className="text-gray-400 dark:text-gray-400 text-lg">Choose your preferred quality and start downloading</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movie.quality.map((quality) => (
              <div key={quality.format} className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 dark:border-white/10 hover:border-purple-400/50 dark:hover:border-purple-400/50 transition-all group">
                <div className="text-center">
                  <div className={`bg-gradient-to-r ${getQualityColor(quality.type)} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {getQualityIcon(quality.type)}
                  </div>
                  
                  <h3 className="text-white dark:text-white font-bold text-xl mb-2">{quality.format}</h3>
                  <div className="mb-2">
                    {quality.type !== 'standard' && (
                      <span className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 dark:text-orange-300 px-2 py-1 rounded-full text-xs font-medium border border-orange-400/30 dark:border-orange-400/30 mb-2 inline-block">
                        {quality.type.toUpperCase().replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 dark:text-gray-400 text-sm mb-1">File Size</p>
                  <p className="text-purple-400 dark:text-purple-400 font-semibold text-lg mb-4">{quality.size}</p>
                  
                  <button 
                    onClick={() => handleDownload(quality, movie)}
                    className={`w-full bg-gradient-to-r ${getQualityColor(quality.type)} hover:opacity-90 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-purple-500/25`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {quality.format}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner Ad - After Download Options */}
          <div className="flex justify-center mt-12">
            <BannerAd />
          </div>
          {/* Download Instructions */}
          <div className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 dark:border-white/10 mt-12">
            <h3 className="text-white dark:text-white font-bold text-xl mb-6 text-center">Download Instructions</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="text-white dark:text-white font-semibold mb-2">Choose Quality</h4>
                <p className="text-gray-400 dark:text-gray-400 text-sm">Select your preferred video quality based on your device and storage.</p>
              </div>
              <div>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="text-white dark:text-white font-semibold mb-2">Click Download</h4>
                <p className="text-gray-400 dark:text-gray-400 text-sm">Click the download button and wait for the download to start.</p>
              </div>
              <div>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="text-white dark:text-white font-semibold mb-2">Enjoy Movie</h4>
                <p className="text-gray-400 dark:text-gray-400 text-sm">Once downloaded, enjoy watching the movie offline anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={movie.trailerUrl}
        movieTitle={movie.title}
      />

      {/* Download Modal */}
      <DownloadModal
        isOpen={!!downloadInfo}
        onClose={() => setDownloadInfo(null)}
        downloadInfo={downloadInfo}
      />
    </div>
  );
};

export default MovieDetail;