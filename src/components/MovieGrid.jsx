import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white/10 rounded-xl overflow-hidden">
              <div className="bg-gray-700 h-80 w-full"></div>
              <div className="p-4">
                <div className="bg-gray-700 h-4 w-3/4 mb-2 rounded"></div>
                <div className="bg-gray-700 h-3 w-1/2 mb-3 rounded"></div>
                <div className="flex space-x-2">
                  <div className="bg-gray-700 h-6 w-16 rounded-full"></div>
                  <div className="bg-gray-700 h-6 w-16 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-md mx-auto">
          <h3 className="text-white text-xl font-semibold mb-2">No movies found</h3>
          <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;