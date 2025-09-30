import React, { createContext, useContext, useState } from 'react';
import { movies as initialMovies } from '../data/movies';

const MovieContext = createContext(undefined);

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    // Initialize movies with proper view counts
    return initialMovies.map(movie => ({
      ...movie,
      views: movie.views || 0
    }));
  });

  const addMovie = (movieData) => {
    // Generate unique ID
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
      movie.id === id ? { ...movie, views: (movie.views || 0) + 1 } : movie
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