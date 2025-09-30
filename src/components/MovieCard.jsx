import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { incrementViews } = useMovies();

  const handleDownloadClick = () => {
    incrementViews(movie.id);
    navigate(`/movie/${movie.id}#download`);
  };

  const formatViews = (views) => {
    if (!views || views === 0 || views === '0') return '0';
    const num = parseInt(views);
    if (isNaN(num)) return '0';
    
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{formatViews(movie.views)} views</p>
      <button onClick={handleDownloadClick}>Download Now</button>
    </div>
  );
};

export default MovieCard;