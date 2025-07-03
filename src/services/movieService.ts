import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export async function fetchMovies(query: string): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error('TMDB token is missing in environment variables');
  }

  const config = {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<{ results: Movie[] }>(BASE_URL, config);
  return response.data.results;
}