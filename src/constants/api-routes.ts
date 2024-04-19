import { CineType } from "./types";

const api_key = import.meta.env.VITE_TMDB_API;

export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMG_BASE_URL = "https://image.tmdb.org/t/p/original/";

export const TMDB_DISCOVER_URL = (type: CineType): string =>
  `${TMDB_BASE_URL}/discover/${type}?api_key=${api_key}`;

export const TMDB_GENRE_URL = (type: CineType): string =>
  `https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}`;

export const POPULAR = (type: CineType): string =>
  `${TMDB_BASE_URL}/${type}/popular?api_key=${api_key}`;

export const TOP_RATED = (type: CineType): string =>
  `${TMDB_BASE_URL}/${type}/top_rated?api_key=${api_key}`;

export const GET_ITEMS_BY_GENRE = (type: CineType): string =>
  `${TMDB_DISCOVER_URL(type)}&with_genres=`;

export const NOW_PLAYING = `${TMDB_BASE_URL}/movie/now_playing?api_key=${api_key}`;
