import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setNoResults(false);
      return;
    }

    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        setNoResults(false);
        const data = await fetchSearchMovies(query);

        if (data.length === 0) {
          setNoResults(true);
        } else {
          setMovies(data);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, [query]);

  return (
    <div className={css.moviesPage}>
      <SearchForm onSubmit={handleSubmit} />
      {isLoading && <b>Loading...</b>}
      {error && <b>The query is empty, please input a search request</b>}
      {noResults && <b>No movies found for your query.</b>}{" "}
      <div className={css.wrapper}>
        {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    </div>
  );
}
