const api_key = import.meta.env.VITE_TMDB_API;

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMG_BASE_URL = 'https://image.tmdb.org/t/p/original/';

// movie routes
export const GET_DISCOVER_MOVIES = `${TMDB_BASE_URL}/discover/movie?api_key=${api_key}`;

export const TMDB_GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;

export const GET_GENRE_MOVIES = `${GET_DISCOVER_MOVIES}&with_genres=`;

export const NOW_PLAYING = `${TMDB_BASE_URL}/movie/now_playing?api_key=${api_key}`;
export const POPULAR = `${TMDB_BASE_URL}/movie/popular?api_key=${api_key}`;
export const TOP_RATED = `${TMDB_BASE_URL}/movie/top_rated?api_key=${api_key}`;

// tv show routes
export const GET_DISCOVER_TV = `${TMDB_BASE_URL}/discover/tv?api_key=${api_key}`;
