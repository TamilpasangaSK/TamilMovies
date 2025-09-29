// Movie data structure for the application
export const MovieType = {
  id: 'string',
  title: 'string',
  year: 'number',
  genre: 'array',
  rating: 'number',
  duration: 'string',
  description: 'string',
  posterUrl: 'string',
  backdropUrl: 'string',
  trailerUrl: 'string',
  quality: 'array',
  director: 'string',
  cast: 'array',
  views: 'number',
  uploadDate: 'string'
};

export const FilterStateType = {
  search: 'string',
  genre: 'string',
  year: 'string',
  quality: 'string',
  sortBy: 'string' // 'title' | 'year' | 'rating'
};