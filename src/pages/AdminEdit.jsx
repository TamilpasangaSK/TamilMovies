import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { Upload, Film, Plus, X, Save, ArrowLeft, Image, Video, Star, Calendar, Clock, User, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MovieContext';
import BannerAd from '../components/BannerAd';

const AdminEdit = () => {
  const { user } = useAuth();
  const { getMovieById, updateMovie } = useMovies();
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Redirect if not admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const existingMovie = getMovieById(id);
  
  // Redirect if movie not found
  if (!existingMovie) {
    return <Navigate to="/" replace />;
  }

  const [movieData, setMovieData] = useState({
    ...existingMovie,
    languages: existingMovie.languages || []
  });

  const [newGenre, setNewGenre] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCast, setNewCast] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableGenres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Adult', 'Crime', 
    'Drama', 'Fantasy', 'History', 'Horror', 'Mystery', 'Romance', 
    'Sci-Fi', 'Sport', 'Thriller', 'War'
  ];

  const availableLanguages = [
    'Tamil', 'English', 'Hindi', 'Telugu', 'Malayalam', 'Kannada', 
    'Bengali', 'Marathi', 'Gujarati', 'Punjabi', 'Urdu', 'Korean', 
    'Japanese', 'Chinese', 'French', 'Spanish', 'German', 'Italian'
  ];

  const qualityTypes = [
    { value: 'standard', label: 'Standard' },
    { value: 'hdr', label: 'HDR' },
    { value: '4k-dv', label: '4K Dolby Vision' },
    { value: 'blu-ray', label: 'Blu-ray' },
    { value: 'imax', label: 'IMAX' },
    { value: 'songs', label: 'Songs' },
    { value: '60fps', label: '60fps' },
    { value: '144fps', label: '144fps' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addGenre = (genre) => {
    if (genre && !movieData.genre.includes(genre)) {
      setMovieData(prev => ({
        ...prev,
        genre: [...prev.genre, genre]
      }));
    }
    setNewGenre('');
  };

  const removeGenre = (genreToRemove) => {
    setMovieData(prev => ({
      ...prev,
      genre: prev.genre.filter(g => g !== genreToRemove)
    }));
  };

  const addLanguage = (language) => {
    if (language && !movieData.languages.includes(language)) {
      setMovieData(prev => ({
        ...prev,
        languages: [...prev.languages, language]
      }));
    }
    setNewLanguage('');
  };

  const removeLanguage = (languageToRemove) => {
    setMovieData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== languageToRemove)
    }));
  };

  const addCast = () => {
    if (newCast.trim() && !movieData.cast.includes(newCast.trim())) {
      setMovieData(prev => ({
        ...prev,
        cast: [...prev.cast, newCast.trim()]
      }));
      setNewCast('');
    }
  };

  const removeCast = (castToRemove) => {
    setMovieData(prev => ({
      ...prev,
      cast: prev.cast.filter(c => c !== castToRemove)
    }));
  };

  const updateQuality = (index, field, value) => {
    setMovieData(prev => ({
      ...prev,
      quality: prev.quality.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const addQuality = () => {
    setMovieData(prev => ({
      ...prev,
      quality: [...prev.quality, { format: '4K', size: '8.0 GB', type: 'standard', link: '', description: '' }]
    }));
  };

  const removeQuality = (index) => {
    setMovieData(prev => ({
      ...prev,
      quality: prev.quality.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update movie in project data
      updateMovie(id, movieData);
      
      // Show success message
      alert(`Movie "${movieData.title}" updated successfully!`);
      
      // Navigate back to movie detail
      navigate(`/movie/${encodeURIComponent(movieData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))}`);
    } catch (error) {
      alert('Error updating movie: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link
                to={`/movie/${encodeURIComponent(existingMovie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))}`}
                className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Movie</span>
              </Link>
              <h1 className="text-4xl font-bold text-white mb-2">Edit Movie</h1>
              <p className="text-gray-400">Update movie details</p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center">
              <Film className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <Film className="w-5 h-5" />
                  <span>Basic Information</span>
                </h3>

                {/* Title */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Movie Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={movieData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter movie title"
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Year & Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Year *</label>
                    <input
                      type="number"
                      name="year"
                      value={movieData.year}
                      onChange={handleInputChange}
                      required
                      min="1900"
                      max="2030"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Rating *</label>
                    <input
                      type="number"
                      name="rating"
                      value={movieData.rating}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="10"
                      step="0.1"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Duration & Director */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={movieData.duration}
                      onChange={handleInputChange}
                      required
                      placeholder="120 min"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Director *</label>
                    <input
                      type="text"
                      name="director"
                      value={movieData.director}
                      onChange={handleInputChange}
                      required
                      placeholder="Director name"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>

                {/* Views & Upload Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Views</label>
                    <input
                      type="number"
                      name="views"
                      value={movieData.views}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Upload Date *</label>
                    <input
                      type="date"
                      name="uploadDate"
                      value={movieData.uploadDate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
              </div>

              {/* Media & Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <Image className="w-5 h-5" />
                  <span>Media & Details</span>
                </h3>

                {/* Poster URL */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Poster URL *</label>
                  <input
                    type="url"
                    name="posterUrl"
                    value={movieData.posterUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Backdrop URL */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Backdrop URL</label>
                  <input
                    type="url"
                    name="backdropUrl"
                    value={movieData.backdropUrl}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Trailer URL */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Trailer URL</label>
                  <input
                    type="url"
                    name="trailerUrl"
                    value={movieData.trailerUrl}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={movieData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Enter movie description..."
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Genres</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {availableGenres.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => addGenre(genre)}
                    disabled={movieData.genre.includes(genre)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      movieData.genre.includes(genre)
                        ? 'bg-purple-600 text-white cursor-not-allowed'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {movieData.genre.map(genre => (
                  <span
                    key={genre}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <span>{genre}</span>
                    <button
                      type="button"
                      onClick={() => removeGenre(genre)}
                      className="hover:bg-white/20 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {availableLanguages.map(language => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => addLanguage(language)}
                    disabled={movieData.languages.includes(language)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      movieData.languages.includes(language)
                        ? 'bg-blue-600 text-white cursor-not-allowed'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {movieData.languages.map(language => (
                  <span
                    key={language}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <span>{language}</span>
                    <button
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="hover:bg-white/20 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Cast */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Cast</h3>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newCast}
                  onChange={(e) => setNewCast(e.target.value)}
                  placeholder="Add cast member"
                  className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCast())}
                />
                <button
                  type="button"
                  onClick={addCast}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {movieData.cast.map(actor => (
                  <span
                    key={actor}
                    className="bg-white/10 text-gray-300 px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-2"
                  >
                    <span>{actor}</span>
                    <button
                      type="button"
                      onClick={() => removeCast(actor)}
                      className="hover:bg-white/20 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Quality Options */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Quality Options</h3>
                <button
                  type="button"
                  onClick={addQuality}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Quality</span>
                </button>
              </div>
              <div className="space-y-4">
                {movieData.quality.map((quality, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={quality.format}
                        onChange={(e) => updateQuality(index, 'format', e.target.value)}
                        placeholder="Format (e.g., 1080p)"
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="text"
                        value={quality.size}
                        onChange={(e) => updateQuality(index, 'size', e.target.value)}
                        placeholder="Size (e.g., 4.5 GB)"
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <select
                        value={quality.type}
                        onChange={(e) => updateQuality(index, 'type', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                      >
                        {qualityTypes.map(type => (
                          <option key={type.value} value={type.value} className="bg-slate-800">
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeQuality(index)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="url"
                        value={quality.link || ''}
                        onChange={(e) => updateQuality(index, 'link', e.target.value)}
                        placeholder="Download Link (e.g., https://server.com/movie.mkv)"
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="text"
                        value={quality.description || ''}
                        onChange={(e) => updateQuality(index, 'description', e.target.value)}
                        placeholder="File Description (Optional - e.g., Movie Title 2024 1080p 10bit WR DDP5.1 x265 - TMB)"
                        className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end space-x-4">
              <Link
                to={`/movie/${encodeURIComponent(existingMovie.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))}`}
                className="bg-white/10 text-gray-300 py-3 px-8 rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Movie</span>
                  </>
                )}
              </button>
            </div>

            {/* Demo Notice */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-6">
              <p className="text-blue-300 text-sm text-center">
                <strong>Edit Mode:</strong> Changes will be applied immediately to your project.
              </p>
              <p className="text-blue-300 text-xs text-center mt-2">
                <strong>Note:</strong> Data is stored in browser memory and will reset on page refresh.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEdit;