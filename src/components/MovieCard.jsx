import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    navigate(`/movie/${movie.id}#download`);
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.views ? `${movie.views} views` : '0 views'}</p>
      <button onClick={handleDownloadClick}>Download Now</button>
    </div>
  );
};

export default MovieCard;
