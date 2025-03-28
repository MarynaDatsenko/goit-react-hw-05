import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api";
import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div className={css.homePage}>
      <h2 className={css.title}>Trending today</h2>
      {isLoading && <p>Loading...</p>}
      {error && <b>Something went wrong. Please try again later.</b>}
      <MovieList movies={trendingMovies} />
    </div>
  );
}
