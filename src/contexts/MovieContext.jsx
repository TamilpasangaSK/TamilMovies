import React, { createContext, useContext, useState } from 'react';
import { movies as initialMovies } from '../data/movies';

// Create the context
const MovieContext = createContext(undefined);

// Custom hook to use the context
export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

// Provider component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(initialMovies);

  const addMovie = (movieData) => {
    const newId = (Math.max(...movies.map(m => parseInt(m.id))) + 1).toString();
    const newMovie = {
      ...movieData,
      id: newId,
      views: movieData.views || 0,
      uploadDate: movieData.uploadDate || new Date().toISOString().split('T')[0]
    };
    setMovies(prev => [newMovie, ...prev]);
    return newMovie;
  };

  const updateMovie = (id, movieData) => {
    setMovies(prev => prev.map(movie =>
      movie.id === id ? { ...movie, ...movieData } : movie
    ));
  };

  const deleteMovie = (id) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  const incrementViews = (id) => {
    setMovies(prev => prev.map(movie =>
      movie.id === id ? { ...movie, views: movie.views + 1 } : movie
    ));
  };

  const getMovieById = (id) => {
    return movies.find(movie => movie.id === id);
  };

  return (
    <MovieContext.Provider value={{
      movies,
      addMovie,
      updateMovie,
      deleteMovie,
      incrementViews,
      getMovieById
    }}>
      {children}
    </MovieContext.Provider>
  );
};

// ✅ Export the context itself for direct access if needed
export { MovieContext };
