import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import toast from 'react-hot-toast';

export default function App() { 
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
    const handleSearch = async (formData: FormData) => {
      const query = formData.get('query')?.toString().trim();
    
      if (!query) {
        toast.error('Please enter your search query.');
        return;
      }
    
      setIsLoading(true);
      setError(false);
      setMovies([]);
      
      try {
        const result = await fetchMovies(query);
  
        if (result.length === 0) {
            toast.error('No movies found for your request.');
            setError(true);
            return;
        }
  
        setMovies(result);
      } catch{
          toast.error('Failed to fetch movies. Try again.');
          setError(true);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovie(movie);
      };
    
      const handleCloseModal = () => {
        setSelectedMovie(null);
      };
    return (
      <>
        <SearchBar action={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {!isLoading && !error && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      </>
    );
}