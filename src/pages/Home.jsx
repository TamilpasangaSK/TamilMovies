import React, { useState, useMemo } from 'react';
import { useMovies } from '../contexts/MovieContext';
import HeroSlider from '../components/HeroSlider';
import FilterBar from '../components/FilterBar';
import MovieGrid from '../components/MovieGrid';

const Home = ({ searchQuery, pageType = 'home' }) => {
  const { movies } = useMovies();
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    year: '',
    quality: '',
    sortBy: pageType === 'home' ? 'uploadDate' : 'title'
  });
  const [displayCount, setDisplayCount] = useState(8);

  const filteredMovies = useMemo(() => {
    let filtered = [...movies];

    // Apply page-specific filtering
    if (pageType === 'trending') {
      // Sort by views for trending
      filtered = filtered.sort((a, b) => b.views - a.views);
    } else if (pageType === 'latest') {
      // Sort by upload date for latest
      filtered = filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    }

    // Apply search filter (from header or filters)
    const searchTerm = searchQuery || filters.search;
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply genre filter
    if (filters.genre) {
      filtered = filtered.filter(movie => movie.genre.includes(filters.genre));
    }

    // Apply year filter
    if (filters.year) {
      filtered = filtered.filter(movie => movie.year.toString() === filters.year);
    }

    // Apply quality filter
    if (filters.quality) {
      filtered = filtered.filter(movie => movie.quality.some(q => q.format.includes(filters.quality)));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'year':
          return b.year - a.year;
        case 'rating':
          return b.rating - a.rating;
        case 'uploadDate':
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [movies, filters, searchQuery, pageType]);

  const displayedMovies = filteredMovies.slice(0, displayCount);
  const hasMoreMovies = displayCount < filteredMovies.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 8);
  };

  const getPageTitle = () => {
    if (searchQuery) return 'Search Results';
    switch (pageType) {
      case 'trending': return 'Trending Movies';
      case 'latest': return 'Latest Movies';
      default: return 'Featured Movies';
    }
  };

  const getPageDescription = () => {
    if (searchQuery) return `Found ${filteredMovies.length} movies matching "${searchQuery}"`;
    switch (pageType) {
      case 'trending': return 'Most watched movies based on view counts';
      case 'latest': return 'Recently uploaded movies sorted by upload date';
      default: return 'Discover the latest blockbusters and timeless classics in premium quality';
    }
  };

  return (
    <div>
      {!searchQuery && pageType === 'home' && <HeroSlider />}
      
      <div className="container mx-auto px-4 py-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-4">
            {getPageTitle()}
          </h2>
          <p className="text-gray-400 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {getPageDescription()}
          </p>
        </div>

        {/* Filters */}
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {/* Movie Grid */}
        <MovieGrid movies={displayedMovies} />

        {/* Load More Button */}
        {hasMoreMovies && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Load More Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;