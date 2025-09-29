import React from 'react';
import { genres } from '../data/movies';
import { Filter, SortAsc } from 'lucide-react';

const FilterBar = ({ filters, onFilterChange }) => {
  const qualities = ['480p', '720p', '1080p', '4K'];
  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-purple-400" />
        <h3 className="text-white font-semibold text-lg">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Genre</label>
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre} className="bg-slate-800">
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Year</label>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year} className="bg-slate-800">
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Quality Filter */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Quality</label>
          <select
            value={filters.quality}
            onChange={(e) => handleFilterChange('quality', e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          >
            <option value="">All Qualities</option>
            {qualities.map((quality) => (
              <option key={quality} value={quality} className="bg-slate-800">
                {quality}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          >
            <option value="title" className="bg-slate-800">Title</option>
            <option value="year" className="bg-slate-800">Year</option>
            <option value="rating" className="bg-slate-800">Rating</option>
            <option value="uploadDate" className="bg-slate-800">Upload Date</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({
              search: '',
              genre: '',
              year: '',
              quality: '',
              sortBy: 'title'
            })}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <SortAsc className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;