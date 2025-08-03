import css from './App.module.css';
import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import SearchBar from '../SearchBar/SearchBar';
import getMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loader, setLoader] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

const handleSearch = async (query: string) => {
  console.log("SEARCH QUERY:", query);
    try {
      setError(null);
      setLoader(true);
      const results = await getMovies(query)

      if(results.length === 0) {
         toast.error("No movies found.");
      }
      setMovies(results); 
    } catch(err) {
      setError("Something went wrong.");
      toast.error("Something went wrong.");
    } finally {
      setLoader(false);
    }    
};

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <MovieGrid
        movies={movies}
        onSelect={(movie) => setSelectedMovie(movie)}
      />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      {loader && <Loader />}
      {error && <ErrorMessage />}
      <Toaster />
    </div>
  );
}




